# Fileio blog automation

Fileio uses a thin product wrapper around a reusable Markdown SEO engine:

- `scripts/fileio_blog.py` selects the Fileio product configuration.
- `scripts/seo_blog_engine.py` handles keyword selection, Hermes-compatible generation, validation, checks, Git publishing, and Telegram notification.
- `config/seo-products/fileio.json` is the only product-specific prompt, facts, keyword, claim, and Git configuration.

The configured model is exactly `deepseek-chat`. Do not replace it with an inferred or versioned model name.

## Environment

The client uses an OpenAI-compatible chat completions endpoint. Hermes variables take precedence over direct DeepSeek variables:

```sh
export HERMES_LLM_BASE_URL="https://api.deepseek.com"
export HERMES_LLM_API_KEY="..."
```

`DEEPSEEK_BASE_URL` and `DEEPSEEK_API_KEY` are accepted as fallbacks. When the base URL is omitted, it defaults to `https://api.deepseek.com`.

Telegram is optional and enabled when both values are present:

```sh
export TELEGRAM_BOT_TOKEN="..."
export TELEGRAM_CHAT_ID="..."
```

## Commands

Publish the next unused keyword, run lint and build, commit the article and tracker, push `main`, and notify Telegram:

```sh
npm run blog:fileio
```

Generate a specific configured keyword:

```sh
npm run blog:fileio -- --keyword "Android file manager"
```

Validate all existing Markdown and the keyword tracker without making changes:

```sh
npm run blog:fileio:validate
```

For local generation without Git operations, use `--no-git`. `--skip-checks` is available for debugging only and should not be used by the scheduled job.

## Cron example

Run every Monday at 09:00 in the server's local timezone. Load secrets from the Hermes service environment rather than writing them into the crontab.

```cron
0 9 * * 1 cd /Users/jonny/Desktop/github/fileio-web && /usr/bin/env npm run blog:fileio >> /tmp/fileio-blog.log 2>&1
```

Vercel deployment is intentionally not called by the script. A successful push to the connected `main` branch triggers the existing Vercel Git deployment.
