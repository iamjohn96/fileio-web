import Link from "next/link";
import { ArrowIcon } from "./icons";
import { formatDate, type Article } from "@/data/product";

export function ArticleCard({ article, basePath }: { article: Article; basePath: "/blog" | "/guides" }) {
  return (
    <article className="card group flex h-full flex-col p-6">
      <div className="mb-5 flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">{article.category}</span>
        <span>{article.readTime}</span>
      </div>
      <h2 className="text-xl font-semibold leading-snug tracking-[-0.025em] text-slate-950">
        <Link href={`${basePath}/${article.slug}`} className="hover:text-blue-700">{article.title}</Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{article.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <time className="text-slate-500" dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <Link aria-label={`Read ${article.title}`} href={`${basePath}/${article.slug}`} className="flex items-center gap-1 font-semibold text-blue-700 group-hover:gap-2">Read <ArrowIcon /></Link>
      </div>
    </article>
  );
}
