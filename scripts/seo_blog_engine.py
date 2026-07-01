#!/usr/bin/env python3
"""Reusable Hermes/DeepSeek Markdown SEO publishing engine."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import shlex
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FRONTMATTER = {
    "title", "slug", "description", "date", "category", "tags", "keyword", "canonical"
}
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
WORD_RE = re.compile(r"\b[\w'-]+\b")


class BlogError(RuntimeError):
    pass


def load_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def first_env(names: list[str]) -> str | None:
    return next((os.environ[name] for name in names if os.environ.get(name)), None)


def parse_frontmatter(markdown: str) -> tuple[dict[str, Any], str]:
    if not markdown.startswith("---\n"):
        raise BlogError("Markdown must begin with a frontmatter delimiter")
    try:
        header, body = markdown[4:].split("\n---\n", 1)
    except ValueError as exc:
        raise BlogError("Frontmatter closing delimiter is missing") from exc

    values: dict[str, Any] = {}
    for line in header.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            raise BlogError(f"Invalid frontmatter line: {line}")
        key, raw_value = line.split(":", 1)
        key, raw_value = key.strip(), raw_value.strip()
        if key in values:
            raise BlogError(f"Duplicate frontmatter field: {key}")
        if raw_value.startswith("["):
            try:
                values[key] = json.loads(raw_value)
            except json.JSONDecodeError as exc:
                raise BlogError(f"Invalid JSON array for frontmatter field {key}") from exc
        else:
            values[key] = raw_value.strip('"').strip("'")
    return values, body.strip()


def markdown_files(config: dict[str, Any]) -> list[Path]:
    return sorted((ROOT / config["content_dir"]).glob("*.md"))


def used_keywords(config: dict[str, Any]) -> set[str]:
    path = ROOT / config["keyword_file"]
    tracked = load_json(path).get("used", []) if path.exists() else []
    discovered = []
    for article_path in markdown_files(config):
        try:
            frontmatter, _ = parse_frontmatter(article_path.read_text(encoding="utf-8"))
            discovered.append(frontmatter.get("keyword", ""))
        except BlogError:
            pass
    return {str(item).casefold() for item in [*tracked, *discovered] if item}


def existing_slugs(config: dict[str, Any], exclude: Path | None = None) -> set[str]:
    slugs = set(config.get("reserved_slugs", []))
    for article_path in markdown_files(config):
        if exclude and article_path.resolve() == exclude.resolve():
            continue
        try:
            frontmatter, _ = parse_frontmatter(article_path.read_text(encoding="utf-8"))
            slugs.add(str(frontmatter.get("slug", "")))
        except BlogError:
            slugs.add(article_path.stem)
    return slugs


def validate_article(
    markdown: str,
    config: dict[str, Any],
    *,
    path: Path | None = None,
    check_keyword_duplicate: bool = True,
) -> dict[str, Any]:
    errors: list[str] = []
    try:
        frontmatter, body = parse_frontmatter(markdown)
    except BlogError as exc:
        raise BlogError(str(exc)) from exc

    missing = REQUIRED_FRONTMATTER - frontmatter.keys()
    if missing:
        errors.append(f"missing frontmatter fields: {', '.join(sorted(missing))}")
    for field in REQUIRED_FRONTMATTER - {"tags"}:
        if field in frontmatter and (not isinstance(frontmatter[field], str) or not frontmatter[field].strip()):
            errors.append(f"frontmatter field {field} must be a non-empty string")

    slug = str(frontmatter.get("slug", ""))
    keyword = str(frontmatter.get("keyword", ""))
    canonical = str(frontmatter.get("canonical", ""))
    site_url = config["product"]["site_url"].rstrip("/")
    if not SLUG_RE.fullmatch(slug):
        errors.append("slug must contain lowercase letters, numbers, and single hyphens only")
    if slug in existing_slugs(config, exclude=path):
        errors.append(f"duplicate slug: {slug}")
    if path and path.stem != slug:
        errors.append(f"filename must match slug: expected {slug}.md")
    if canonical != f"{site_url}/blog/{slug}":
        errors.append("canonical must be the full Fileio blog URL for the slug")
    try:
        dt.date.fromisoformat(str(frontmatter.get("date", "")))
    except ValueError:
        errors.append("date must use YYYY-MM-DD")
    tags = frontmatter.get("tags")
    if not isinstance(tags, list) or not tags or not all(isinstance(tag, str) for tag in tags):
        errors.append("tags must be a non-empty JSON string array")
    if keyword.casefold() not in {item.casefold() for item in config["keywords"]}:
        errors.append(f"keyword is not configured for this product: {keyword}")
    if check_keyword_duplicate:
        duplicates = used_keywords(config)
        if path and path.exists():
            try:
                current, _ = parse_frontmatter(path.read_text(encoding="utf-8"))
                duplicates.discard(str(current.get("keyword", "")).casefold())
            except BlogError:
                pass
        if keyword.casefold() in duplicates:
            errors.append(f"duplicate keyword: {keyword}")

    lower_markdown = markdown.casefold()
    for phrase in config["banned_phrases"]:
        if phrase.casefold() in lower_markdown:
            errors.append(f"banned phrase found: {phrase}")
    for pattern in config.get("unsupported_claim_patterns", []):
        if re.search(pattern, markdown, re.DOTALL):
            errors.append(f"unsupported product claim matched: {pattern}")

    play_store_url = config["product"]["play_store_url"]
    if play_store_url not in body:
        errors.append("Play Store URL is missing")
    word_count = len(WORD_RE.findall(re.sub(r"https?://\S+", "", body)))
    limits = config["word_count"]
    if not limits["min"] <= word_count <= limits["max"]:
        errors.append(f"body word count {word_count} is outside {limits['min']}-{limits['max']}")
    if body.count("```") % 2:
        errors.append("Markdown has an unclosed fenced code block")
    if re.search(r"^# ", body, re.MULTILINE):
        errors.append("body must not contain an H1; frontmatter title is the article H1")
    headings = list(re.finditer(r"^##\s+(.+)$", body, re.MULTILINE))
    if len(headings) < 4:
        errors.append("body must contain at least four H2 sections")
    elif config["product"]["name"].casefold() in body[:headings[-1].start()].casefold():
        errors.append("Fileio may only be introduced in the final CTA section")

    if errors:
        raise BlogError("Validation failed:\n- " + "\n- ".join(errors))
    return {"frontmatter": frontmatter, "word_count": word_count}


def validate_all(config: dict[str, Any]) -> None:
    seen_slugs = set(config.get("reserved_slugs", []))
    seen_keywords: set[str] = set()
    failures: list[str] = []
    for path in markdown_files(config):
        try:
            result = validate_article(
                path.read_text(encoding="utf-8"), config, path=path, check_keyword_duplicate=False
            )
            frontmatter = result["frontmatter"]
            slug = str(frontmatter["slug"])
            keyword = str(frontmatter["keyword"]).casefold()
            if slug in seen_slugs:
                raise BlogError(f"duplicate slug across content: {slug}")
            if keyword in seen_keywords:
                raise BlogError(f"duplicate keyword across content: {frontmatter['keyword']}")
            seen_slugs.add(slug)
            seen_keywords.add(keyword)
        except BlogError as exc:
            failures.append(f"{path.relative_to(ROOT)}: {exc}")
    tracked = load_json(ROOT / config["keyword_file"]).get("used", [])
    if {str(item).casefold() for item in tracked} != seen_keywords:
        failures.append("keyword tracker must exactly match keywords in Markdown content")
    if failures:
        raise BlogError("\n".join(failures))
    print(f"Validated {len(seen_slugs) - len(config.get('reserved_slugs', []))} Markdown article(s).")


def choose_keyword(config: dict[str, Any], requested: str | None) -> str:
    available = {item.casefold(): item for item in config["keywords"]}
    if requested:
        if requested.casefold() not in available:
            raise BlogError(f"Unknown keyword: {requested}")
        if requested.casefold() in used_keywords(config):
            raise BlogError(f"Keyword already used: {requested}")
        return available[requested.casefold()]
    for keyword in config["keywords"]:
        if keyword.casefold() not in used_keywords(config):
            return keyword
    raise BlogError("No unused keywords remain")


def build_prompt(config: dict[str, Any], keyword: str) -> str:
    product = config["product"]
    banned = ", ".join(config["banned_phrases"])
    features = "\n".join(f"- {feature}" for feature in product["features"])
    today = dt.date.today().isoformat()
    return f"""Write one natural, problem-solving English SEO article for {product['name']}.

Primary keyword: {keyword}
Length: {config['word_count']['min']}-{config['word_count']['max']} words in the body.
Date: {today}

Verified product facts (do not infer any other capability):
{features}

Rules:
- Focus on solving the reader's problem. Do not promote the app until the final H2 CTA section.
- In that final CTA only, briefly introduce {product['name']} and include this exact URL: {product['play_store_url']}
- Cloud access must be described as Pro-only and read-only. Never imply changing remote files.
- Do not discuss implementation details, billing internals, OAuth internals, or provider APIs.
- Never use these phrases, even in a negated sentence: {banned}
- Use Markdown with useful H2/H3 sections, short paragraphs, and lists where helpful.
- Do not include an H1 in the body.
- Return only the Markdown document, without a code fence or commentary.

The document must start with this exact frontmatter shape. Use a lowercase hyphenated slug and 3-6 tags. canonical must match the slug.
---
title: Natural title containing or closely matching the keyword
slug: generated-slug
description: 140-160 character search description
date: {today}
category: Android tips
tags: ["Android", "File management"]
keyword: {keyword}
canonical: {product['site_url']}/blog/generated-slug
---
"""


def generate_markdown(config: dict[str, Any], keyword: str) -> str:
    provider = config["provider"]
    if provider["model"] != "deepseek-chat":
        raise BlogError("Provider model must remain deepseek-chat")
    api_key = first_env(provider["api_key_env"])
    if not api_key:
        raise BlogError(f"Missing API key. Set one of: {', '.join(provider['api_key_env'])}")
    base_url = (first_env(provider["base_url_env"]) or provider["default_base_url"]).rstrip("/")
    endpoint = base_url if base_url.endswith("/chat/completions") else f"{base_url}/chat/completions"
    payload = {
        "model": provider["model"],
        "messages": [
            {"role": "system", "content": "You are a careful SEO editor. Accuracy is mandatory."},
            {"role": "user", "content": build_prompt(config, keyword)},
        ],
        "temperature": 0.6,
        "max_tokens": 5000,
    }
    request = urllib.request.Request(
        endpoint,
        data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            result = json.load(response)
    except (urllib.error.URLError, TimeoutError) as exc:
        raise BlogError(f"Hermes provider request failed: {exc}") from exc
    try:
        markdown = result["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError, TypeError) as exc:
        raise BlogError("Hermes provider returned an unexpected response") from exc
    if markdown.startswith("```markdown") and markdown.endswith("```"):
        markdown = markdown[len("```markdown"): -3].strip()
    return markdown + "\n"


def run(command: str) -> None:
    subprocess.run(shlex.split(command), cwd=ROOT, check=True)


def update_tracker(config: dict[str, Any], keyword: str) -> Path:
    path = ROOT / config["keyword_file"]
    payload = load_json(path) if path.exists() else {"product": "fileio", "used": []}
    payload["used"] = [*payload.get("used", []), keyword]
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    return path


def notify(config: dict[str, Any], message: str) -> bool:
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")
    if not token or not chat_id:
        return False
    payload = urllib.parse.urlencode({"chat_id": chat_id, "text": message}).encode()
    request = urllib.request.Request(f"https://api.telegram.org/bot{token}/sendMessage", data=payload)
    try:
        with urllib.request.urlopen(request, timeout=20):
            return True
    except urllib.error.URLError as exc:
        print(f"Telegram notification failed: {exc}", file=sys.stderr)
        return False


def publish(config: dict[str, Any], args: argparse.Namespace) -> None:
    keyword = choose_keyword(config, args.keyword)
    markdown = generate_markdown(config, keyword)
    result = validate_article(markdown, config)
    slug = str(result["frontmatter"]["slug"])
    article_path = ROOT / config["content_dir"] / f"{slug}.md"
    article_path.parent.mkdir(parents=True, exist_ok=True)
    article_path.write_text(markdown, encoding="utf-8")
    tracker_path = update_tracker(config, keyword)
    committed = False
    try:
        validate_all(config)
        if not args.skip_checks:
            for check in config["git"]["checks"]:
                run(check)
        if not args.no_git:
            subprocess.run(
                ["git", "add", "--", str(article_path.relative_to(ROOT)), str(tracker_path.relative_to(ROOT))],
                cwd=ROOT,
                check=True,
            )
            message = config["git"]["commit_message"].format(slug=slug)
            subprocess.run(["git", "commit", "-m", message], cwd=ROOT, check=True)
            committed = True
            if not args.no_push:
                subprocess.run(["git", "push", "origin", config["git"]["branch"]], cwd=ROOT, check=True)
        sent = notify(config, f"Published Fileio article: {slug}\nKeyword: {keyword}")
        print(f"Published {slug} ({result['word_count']} words). Telegram: {'sent' if sent else 'not configured'}")
    except Exception:
        if not committed:
            if not args.no_git:
                subprocess.run(
                    [
                        "git", "restore", "--staged", "--",
                        str(article_path.relative_to(ROOT)),
                        str(tracker_path.relative_to(ROOT)),
                    ],
                    cwd=ROOT,
                    check=False,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                )
            article_path.unlink(missing_ok=True)
            tracker = load_json(tracker_path)
            tracker["used"] = [item for item in tracker.get("used", []) if item != keyword]
            tracker_path.write_text(json.dumps(tracker, indent=2) + "\n", encoding="utf-8")
        notify(config, f"Fileio article automation failed for keyword: {keyword}")
        raise


def main(config_path: Path) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--keyword", help="Generate the specified configured keyword")
    parser.add_argument("--validate-all", action="store_true", help="Validate existing Markdown and tracker")
    parser.add_argument("--no-git", action="store_true", help="Do not commit or push")
    parser.add_argument("--no-push", action="store_true", help="Commit but do not push")
    parser.add_argument("--skip-checks", action="store_true", help="Skip npm lint and build")
    args = parser.parse_args()
    config = load_json(config_path)
    try:
        if args.validate_all:
            validate_all(config)
        else:
            publish(config, args)
        return 0
    except (BlogError, subprocess.CalledProcessError) as exc:
        print(exc, file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit("Run a product wrapper such as scripts/fileio_blog.py")
