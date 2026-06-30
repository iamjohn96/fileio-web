import type { IconName } from "@/data/product";

export function Icon({ name, className = "size-6" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    folder: <path d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h3l2.25 2.25H18A2.25 2.25 0 0 1 20.25 9v7.5A2.25 2.25 0 0 1 18 18.75H6a2.25 2.25 0 0 1-2.25-2.25V6.75Z" />,
    search: <><circle cx="10.5" cy="10.5" r="6.25" /><path d="m15.25 15.25 4.5 4.5" /></>,
    star: <path d="m12 3.8 2.45 4.96 5.48.8-3.97 3.86.94 5.46L12 16.3l-4.9 2.58.94-5.46-3.97-3.86 5.48-.8L12 3.8Z" />,
    document: <><path d="M7 3.75h6.25L18 8.5v11.75H7a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z" /><path d="M13 3.75V8.5h5M8.5 12h6M8.5 15.5h6" /></>,
    scan: <><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M7 12h10" /></>,
    cloud: <path d="M7.25 18h10a3.75 3.75 0 0 0 .67-7.44A6 6 0 0 0 6.5 9.5 4.25 4.25 0 0 0 7.25 18Z" />,
  };

  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.8"><path d="M4 10h12m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function CheckIcon() {
  return <svg aria-hidden="true" className="size-4 shrink-0" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2"><path d="m4 10 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
