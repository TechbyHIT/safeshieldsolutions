import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Invisible Grills Near Me | Safety Nets & Premium Home Protection",
    description:
      "Best premium invisible grills, safety nets, pigeon nets, mosquito nets and cloth hangers near me. Free site survey in Chennai, Hyderabad, Coimbatore and Kochi — 700k+ local pages.",
    path: "/",
  }),
  metadataBase: new URL(site.url),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className={`${inter.variable} font-sans`}>
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
