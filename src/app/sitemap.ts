import type { MetadataRoute } from "next";
import { blogPosts, guides, siteUrl } from "@/data/product";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/download", "/blog", "/guides", "/privacy", "/terms"].map((path, index) => ({ url: `${siteUrl}${path}`, lastModified: "2026-06-30", changeFrequency: (path === "/blog" || path === "/guides" ? "weekly" : "monthly") as "weekly" | "monthly", priority: index === 0 ? 1 : path === "/download" ? .9 : .7 }));
  const articles = [...blogPosts.map((item) => ({ ...item, path: "blog" })), ...guides.map((item) => ({ ...item, path: "guides" }))].map((item) => ({ url: `${siteUrl}/${item.path}/${item.slug}`, lastModified: item.publishedAt, changeFrequency: "monthly" as const, priority: .7 }));
  return [...staticRoutes, ...articles];
}
