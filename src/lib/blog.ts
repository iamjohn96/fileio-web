import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { blogPosts as builtInBlogPosts, type Article } from "@/data/product";

const blogDirectory = path.join(process.cwd(), "content", "blog");

function assertString(value: unknown, field: string, filename: string): asserts value is string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${filename}: frontmatter field ${field} must be a non-empty string`);
  }
}

function loadMarkdownPost(filename: string): Article {
  const source = fs.readFileSync(path.join(blogDirectory, filename), "utf8");
  const { data, content } = matter(source);
  for (const field of ["title", "slug", "description", "category", "keyword", "canonical"]) {
    assertString(data[field], field, filename);
  }
  const publishedAt = data.date instanceof Date
    ? data.date.toISOString().slice(0, 10)
    : data.date;
  assertString(publishedAt, "date", filename);
  if (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === "string")) {
    throw new Error(`${filename}: frontmatter field tags must be a string array`);
  }
  if (`${data.slug}.md` !== filename) {
    throw new Error(`${filename}: filename must match its frontmatter slug`);
  }
  const words = content.match(/\b[\w'-]+\b/g)?.length ?? 0;
  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    category: data.category,
    publishedAt,
    readTime: `${Math.max(1, Math.ceil(words / 225))} min read`,
    sections: [],
    content,
    tags: data.tags,
    keyword: data.keyword,
    canonical: data.canonical,
  };
}

export function getBlogPosts(): Article[] {
  const markdownPosts = fs.existsSync(blogDirectory)
    ? fs.readdirSync(blogDirectory)
        .filter((filename) => filename.endsWith(".md"))
        .map(loadMarkdownPost)
    : [];
  return [...markdownPosts, ...builtInBlogPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getBlogPost(slug: string): Article | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}
