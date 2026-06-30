import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { blogPosts } from "@/data/product";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const post = blogPosts.find((item) => item.slug === slug); if (!post) return {}; return { title: post.title, description: post.description, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.publishedAt } }; }
export default async function BlogPostPage({ params }: Props) { const { slug } = await params; const post = blogPosts.find((item) => item.slug === slug); if (!post) notFound(); return <ArticlePage article={post} type="Blog" />; }
