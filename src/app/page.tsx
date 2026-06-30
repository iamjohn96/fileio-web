import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { ArrowIcon, CheckIcon, Icon } from "@/components/icons";
import { blogPosts, faqs, features, guides } from "@/data/product";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]">
        <div className="absolute inset-x-0 top-0 -z-0 mx-auto h-[34rem] max-w-5xl bg-[radial-gradient(circle_at_50%_0%,rgba(96,165,250,.2),transparent_65%)]" />
        <div className="page-shell relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
              <span className="size-1.5 rounded-full bg-blue-500" /> Built for Android
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-6xl">Your files,<br /><span className="text-blue-600">simple and clear.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Fileio is a simple Android file manager, document viewer, and PDF scanner. Find local files, open common document formats, and keep everyday file tasks in one place.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/download" className="button-primary">Download for Android <ArrowIcon /></Link>
              <Link href="#features" className="button-secondary">Explore features</Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">No Fileio account required for local file management.</p>
          </div>

          <div className="relative mx-auto w-full max-w-lg" aria-label="Fileio app feature preview">
            <div className="absolute -inset-8 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="relative rounded-[2rem] border border-slate-200 bg-slate-950 p-3 shadow-2xl shadow-slate-900/20">
              <div className="overflow-hidden rounded-[1.4rem] bg-slate-50">
                <div className="flex items-center justify-between bg-white px-6 py-5">
                  <div><p className="text-xs font-medium text-slate-500">Good morning</p><p className="mt-0.5 font-semibold text-slate-950">Your files</p></div>
                  <span className="grid size-9 place-items-center rounded-full bg-blue-50 text-blue-600"><Icon name="search" className="size-4" /></span>
                </div>
                <div className="space-y-5 p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {[{ name: "Documents", count: "24 files", icon: "document" as const }, { name: "Images", count: "118 files", icon: "folder" as const }, { name: "Favorites", count: "8 files", icon: "star" as const }].map((item) => (
                      <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-3.5"><span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon name={item.icon} className="size-5" /></span><p className="mt-4 text-xs font-semibold text-slate-800">{item.name}</p><p className="mt-0.5 text-[10px] text-slate-400">{item.count}</p></div>
                    ))}
                  </div>
                  <div>
                    <div className="mb-3 flex items-center justify-between"><p className="text-sm font-semibold text-slate-900">Recent files</p><span className="text-[10px] font-medium text-blue-600">View all</span></div>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      {[{ name: "Project brief.docx", type: "DOCX · 1.2 MB" }, { name: "Expenses.xlsx", type: "XLSX · 840 KB" }, { name: "Receipt scan.pdf", type: "PDF · 2.4 MB" }].map((file, index) => (
                        <div key={file.name} className={`flex items-center gap-3 px-4 py-3 ${index > 0 ? "border-t border-slate-100" : ""}`}><span className="grid size-9 place-items-center rounded-lg bg-blue-50 text-blue-600"><Icon name="document" className="size-4" /></span><div><p className="text-xs font-medium text-slate-800">{file.name}</p><p className="mt-0.5 text-[10px] text-slate-400">{file.type}</p></div></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-20 py-20 sm:py-28">
        <div className="page-shell">
          <div className="max-w-2xl"><p className="eyebrow">Everyday file tools</p><h2 className="section-title mt-4">The essentials, without the clutter.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Manage local files and open the documents you use most, all from a focused Android app.</p></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => <div key={feature.title} className="card p-6"><span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon name={feature.icon} /></span><h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white sm:py-28">
        <div className="page-shell grid items-center gap-14 lg:grid-cols-2">
          <div><p className="eyebrow !text-blue-400">Document viewer for Android</p><h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">Open the formats your day depends on.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">View office documents, PDFs, and images without switching between several apps.</p><div className="mt-8 flex flex-wrap gap-2">{["PDF", "DOCX", "XLSX", "PPTX", "JPG", "PNG"].map((format) => <span key={format} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200">{format}</span>)}</div></div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8"><div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-xl bg-blue-600 text-white"><Icon name="document" /></span><div><p className="font-semibold">One focused viewer</p><p className="text-sm text-slate-400">Local and supported cloud files</p></div></div><div className="mt-8 space-y-4">{["Open common document and image formats", "Find files with search, sort, favorites, and recents", "Share supported files from your device"].map((item) => <p key={item} className="flex items-center gap-3 text-sm text-slate-300"><span className="text-blue-400"><CheckIcon /></span>{item}</p>)}</div></div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="page-shell grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-8 sm:p-10"><span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-white"><Icon name="cloud" /></span><p className="eyebrow mt-8">Pro feature</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-slate-950">Browse cloud files, read-only.</h2><p className="mt-4 leading-7 text-slate-600">Connect Google Drive or Dropbox to browse folders and open supported files. Fileio does not upload, modify, delete, or sync files in your cloud account.</p><Link className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-700" href="/blog/what-read-only-cloud-access-means">Learn about read-only access <ArrowIcon /></Link></div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10"><span className="grid size-12 place-items-center rounded-2xl bg-slate-900 text-white"><Icon name="scan" /></span><p className="eyebrow mt-8 !text-slate-500">PDF scanner</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-slate-950">Paper to PDF, on Android.</h2><p className="mt-4 leading-7 text-slate-600">Capture a paper document with your phone and save it as a PDF file. Then organize, find, and open it with Fileio.</p><Link className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-700" href="/guides/how-to-scan-documents-to-pdf-on-android">Read the scanning guide <ArrowIcon /></Link></div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-28">
        <div className="page-shell"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">Learn with Fileio</p><h2 className="section-title mt-4">Latest guides and articles.</h2></div><Link href="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">View all guides <ArrowIcon /></Link></div><div className="mt-10 grid gap-5 md:grid-cols-3">{[guides[0], guides[1], blogPosts[0]].map((article) => <ArticleCard key={article.slug} article={article} basePath={article === blogPosts[0] ? "/blog" : "/guides"} />)}</div></div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="page-shell grid gap-10 lg:grid-cols-[.65fr_1fr]"><div><p className="eyebrow">FAQ</p><h2 className="section-title mt-4">Straight answers.</h2><p className="mt-4 text-slate-600">What Fileio does—and what it does not do.</p></div><div className="divide-y divide-slate-200 border-y border-slate-200">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900"><span>{faq.question}</span><span className="text-xl font-normal text-slate-400 group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl pr-8 text-sm leading-6 text-slate-600">{faq.answer}</p></details>)}</div></div>
      </section>

      <section className="page-shell pb-20 sm:pb-28"><div className="overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 text-center text-white shadow-xl shadow-blue-600/20 sm:px-12 sm:py-16"><p className="text-sm font-semibold text-blue-100">Fileio for Android</p><h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Your everyday files, in one simple app.</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">Manage local files, view documents, and scan PDFs with Fileio.</p><Link href="/download" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm">Download for Android <ArrowIcon /></Link></div></section>
    </>
  );
}
