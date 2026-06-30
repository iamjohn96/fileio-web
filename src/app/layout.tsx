import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { playStoreUrl, product, siteUrl } from "@/data/product";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: product.title, template: "%s | Fileio" },
  description: product.description,
  applicationName: product.name,
  alternates: { canonical: "/" },
  keywords: ["Android file manager", "document viewer for Android", "PDF scanner app", "open DOCX on Android", "open XLSX on Android", "open PPTX on Android", "Google Drive document viewer", "Dropbox document viewer", "read-only cloud access"],
  openGraph: { type: "website", url: siteUrl, siteName: product.name, title: product.title, description: product.description, locale: "en_US" },
  twitter: { card: "summary_large_image", title: product.title, description: product.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.storeName,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Android",
    description: product.description,
    url: playStoreUrl,
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <SiteHeader />
        <main className="min-h-[70vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
