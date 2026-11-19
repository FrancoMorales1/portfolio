"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Download, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LANGS, type Lang } from "@/data/cv";
import { cn } from "@/lib/utils";

type Props = {
  lang: Lang;
  pdfHref: string;
  labels: { download: string; downloadAria: string; themeLight: string; themeDark: string; switchLang: string };
};

export default function Header({ lang, pdfHref, labels }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="print:hidden sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
        <a href="#top" className="font-semibold tracking-tight">
          Franco<span className="text-primary">Morales</span>
        </a>

        <div className="flex items-center gap-2">
          <nav aria-label={labels.switchLang} className="flex rounded-md border p-0.5 text-xs font-medium">
            {LANGS.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                hrefLang={l}
                aria-current={l === lang ? "page" : undefined}
                className={cn(
                  "rounded-[5px] px-2 py-1 uppercase transition-colors",
                  l === lang ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l}
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? labels.themeLight : labels.themeDark}
            title={isDark ? labels.themeLight : labels.themeDark}
          >
            {/* Ambos íconos se renderizan; CSS muestra el correcto y evita el parpadeo de hidratación. */}
            <Sun className="hidden dark:block" />
            <Moon className="block dark:hidden" />
          </Button>

          <Button asChild size="sm">
            <a href={pdfHref} download aria-label={labels.downloadAria}>
              <Download />
              <span className="hidden sm:inline">{labels.download}</span>
              <span className="sm:hidden">PDF</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
