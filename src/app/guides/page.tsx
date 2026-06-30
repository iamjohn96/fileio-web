import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { guides } from "@/data/product";

export const metadata: Metadata = { title: "Android File & Document Guides", description: "Step-by-step guides for opening DOCX, XLSX, and PPTX files and scanning documents to PDF on Android.", alternates: { canonical: "/guides" } };
export default function GuidesPage() { return <section className="py-16 sm:py-24"><div className="page-shell"><div className="max-w-2xl"><p className="eyebrow">Fileio guides</p><h1 className="section-title mt-4">Do more with your Android files.</h1><p className="mt-5 text-lg leading-8 text-slate-600">Short, direct guides for opening documents, managing files, and scanning PDFs on Android.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{guides.map((article) => <ArticleCard key={article.slug} article={article} basePath="/guides" />)}</div></div></section>; }
