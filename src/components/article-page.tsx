import Link from "next/link";
import { ArrowIcon } from "./icons";
import { formatDate, type Article } from "@/data/product";

export function ArticlePage({ article, type }: { article: Article; type: "Blog" | "Guide" }) {
  const basePath = type === "Blog" ? "/blog" : "/guides";
  return (
    <article className="page-shell py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link href={basePath} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700"><ArrowIcon className="size-4 rotate-180" />Back to {type === "Blog" ? "blog" : "guides"}</Link>
        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">{article.category}</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span>•</span><span>{article.readTime}</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl">{article.title}</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">{article.description}</p>
        <div className="article-body mt-12 border-t border-slate-200 pt-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}
        </div>
        <div className="mt-14 rounded-3xl bg-blue-600 p-8 text-white sm:flex sm:items-center sm:justify-between">
          <div><p className="text-sm font-semibold text-blue-100">Fileio for Android</p><p className="mt-1 text-xl font-semibold">Manage, view, and scan in one app.</p></div>
          <Link href="/download" className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 sm:mt-0">Get Fileio</Link>
        </div>
      </div>
    </article>
  );
}
