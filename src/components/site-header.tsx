import Link from "next/link";

const navigation = [
  { label: "Features", href: "/#features" },
  { label: "Guides", href: "/guides" },
  { label: "Blog", href: "/blog" },
];

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-[-0.02em] text-slate-950" aria-label="Fileio home">
      <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
        <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h3l2 2h4A2.5 2.5 0 0 1 19 9.5v7A2.5 2.5 0 0 1 16.5 19h-9A2.5 2.5 0 0 1 5 16.5v-9Z" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 12h7M8.5 15h4" strokeLinecap="round" /></svg>
      </span>
      <span className="text-lg">Fileio</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-1 sm:flex sm:gap-2">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950">{item.label}</Link>
          ))}
          <Link href="/download" className="button-primary ml-1 !min-h-9 !px-4 !py-2 text-sm">Download</Link>
        </nav>
        <details className="group relative sm:hidden">
          <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-xl border border-slate-200 bg-white text-slate-700" aria-label="Open navigation menu">
            <svg aria-hidden="true" className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" /></svg>
          </summary>
          <nav aria-label="Mobile navigation" className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
            {navigation.map((item) => <Link key={item.label} href={item.href} className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">{item.label}</Link>)}
            <Link href="/download" className="mt-1 block rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">Download</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
