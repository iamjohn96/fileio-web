import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getBlogPosts().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const post = getBlogPost(slug); if (!post) return {}; return { title: post.title, description: post.description, alternates: { canonical: post.canonical ?? `/blog/${post.slug}` }, openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.publishedAt, tags: post.tags } }; }
export default async function BlogPostPage({ params }: Props) { const { slug } = await params; const post = getBlogPost(slug); if (!post) notFound(); return <ArticlePage article={post} type="Blog" />; }
