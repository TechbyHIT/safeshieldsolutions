import type { Metadata, Viewport } from "next";
import { Manrope, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema } from "@/lib/schema";
import { site } from "@/config/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/** Site-wide defaults only. Do not set robots/canonical here — they leak onto noindex pages. */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </head>
      <body className={`${manrope.variable} ${fraunces.variable} font-sans`}>
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:inline-block focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-brand-900"
        >
          Skip to main content
        </a>
        <JsonLd data={buildOrganizationSchema()} />
        <Header />
        <main id="main-content" className="mobile-fab-padding">
          {children}
        </main>
        <Footer />
        <FloatingActionButtons />
      </body>
    </html>
  );
}
