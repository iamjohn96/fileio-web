import Link from "next/link";
import { Brand } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="page-shell grid gap-10 py-12 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <Brand />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">A simple file manager, document viewer, and PDF scanner for Android.</p>
        </div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-slate-600 sm:grid-cols-3">
          <Link className="hover:text-slate-950" href="/#features">Features</Link>
          <Link className="hover:text-slate-950" href="/guides">Guides</Link>
          <Link className="hover:text-slate-950" href="/blog">Blog</Link>
          <Link className="hover:text-slate-950" href="/download">Download</Link>
          <Link className="hover:text-slate-950" href="/privacy">Privacy</Link>
          <Link className="hover:text-slate-950" href="/terms">Terms</Link>
        </nav>
      </div>
      <div className="page-shell border-t border-slate-200 py-6 text-xs text-slate-500">© {new Date().getFullYear()} JonnyLab. All rights reserved.</div>
    </footer>
  );
}
