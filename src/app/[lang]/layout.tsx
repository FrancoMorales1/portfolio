import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";

import Header from "@/components/layout/Header";
import ThemeProvider from "@/components/layout/ThemeProvider";
import { LANGS, cv, isLang, pdfPath } from "@/data/cv";

// Geist (OFL) en instancias estáticas generadas desde la fuente variable. Con la variable,
// Chromium la embebe en el PDF como Type3 y los parsers ATS extraen texto roto ("T inZip").
const geistSans = localFont({
  variable: "--font-geist-sans",
  display: "swap",
  src: [
    { path: "../../fonts/Geist-400.woff2", weight: "400" },
    { path: "../../fonts/Geist-500.woff2", weight: "500" },
    { path: "../../fonts/Geist-600.woff2", weight: "600" },
    { path: "../../fonts/Geist-700.woff2", weight: "700" },
  ],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const data = cv[lang];
  return {
    metadataBase: new URL("https://www.francomorales.me"),
    title: data.labels.pageTitle,
    description: data.labels.metaDescription,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "profile",
      title: data.labels.pageTitle,
      description: data.labels.metaDescription,
      locale: lang === "es" ? "es_AR" : "en_US",
    },
  };
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode } & Props>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { labels } = cv[lang];

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header
            lang={lang}
            pdfHref={pdfPath(lang)}
            labels={{
              download: labels.download,
              downloadAria: labels.downloadAria,
              themeLight: labels.themeLight,
              themeDark: labels.themeDark,
              switchLang: labels.switchLang,
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
