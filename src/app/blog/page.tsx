import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { blogPosts } from "@/data/product";

export const metadata: Metadata = { title: "Android File Management Blog", description: "Practical articles about Android file management, document viewing, PDF scanning, and read-only cloud access.", alternates: { canonical: "/blog" } };
export default function BlogPage() { return <section className="py-16 sm:py-24"><div className="page-shell"><div className="max-w-2xl"><p className="eyebrow">Fileio blog</p><h1 className="section-title mt-4">Clear notes on working with files.</h1><p className="mt-5 text-lg leading-8 text-slate-600">Practical articles about Android file management, document viewing, and Fileio.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{blogPosts.map((article) => <ArticleCard key={article.slug} article={article} basePath="/blog" />)}</div></div></section>; }
