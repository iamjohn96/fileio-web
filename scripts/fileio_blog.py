#!/usr/bin/env python3
"""Fileio entry point for the shared SEO blog engine."""

from pathlib import Path

from seo_blog_engine import main


if __name__ == "__main__":
    raise SystemExit(main(Path(__file__).resolve().parents[1] / "config/seo-products/fileio.json"))
