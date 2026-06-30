import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { guides } from "@/data/product";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const guide = guides.find((item) => item.slug === slug); if (!guide) return {}; return { title: guide.title, description: guide.description, alternates: { canonical: `/guides/${guide.slug}` }, openGraph: { type: "article", title: guide.title, description: guide.description, publishedTime: guide.publishedAt } }; }
export default async function GuidePage({ params }: Props) { const { slug } = await params; const guide = guides.find((item) => item.slug === slug); if (!guide) notFound(); return <ArticlePage article={guide} type="Guide" />; }
