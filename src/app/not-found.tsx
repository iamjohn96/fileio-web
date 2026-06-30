import Link from "next/link";

export default function NotFound() { return <section className="page-shell py-28 text-center"><p className="eyebrow">404</p><h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Page not found</h1><p className="mt-4 text-slate-600">The page you requested does not exist.</p><Link href="/" className="button-primary mt-8">Back to home</Link></section>; }
