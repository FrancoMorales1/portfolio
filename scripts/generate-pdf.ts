/**
 * Genera los PDF descargables (public/cv/Franco-Morales-CV-{ES,EN}.pdf) imprimiendo
 * la propia página con Chromium. Uso: `npm run cv:pdf` (hace build + start + print).
 *
 * El teléfono se agrega solo al PDF: se inyecta en la lista de contacto antes de imprimir,
 * así nunca forma parte del HTML/JS público del sitio.
 */
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

import { LANGS, contact, cv, pdfPath } from "../src/data/cv";

const PORT = Number(process.env.CV_PDF_PORT ?? 3123);
const BASE = `http://127.0.0.1:${PORT}`;

async function waitForServer(url: string, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // todavía arrancando
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`El servidor no respondió en ${url}`);
}

async function main() {
  // detached => grupo de procesos propio, para poder matar también al next-server hijo.
  const server = spawn(path.join("node_modules", ".bin", "next"), ["start", "-p", String(PORT), "-H", "127.0.0.1"], {
    stdio: ["ignore", "inherit", "inherit"],
    detached: true,
  });
  try {
    await waitForServer(`${BASE}/es`);
    // Sin hinting => posicionamiento de glifos subpíxel. Con hinting, Chromium redondea cada glifo
    // a píxeles enteros y los parsers leen espacios espurios ("T inZip", "534 -2256").
    const browser = await chromium.launch({ args: ["--font-render-hinting=none"] });
    await mkdir(path.join("public", "cv"), { recursive: true });

    for (const lang of LANGS) {
      const page = await browser.newPage();
      await page.emulateMedia({ media: "print", colorScheme: "light" });
      await page.goto(`${BASE}/${lang}`, { waitUntil: "networkidle" });
      await page.evaluate((phone) => {
        const list = document.querySelector("[data-contact-list]");
        if (!list) throw new Error("No se encontró la lista de contacto");
        const li = document.createElement("li");
        li.textContent = phone;
        list.insertBefore(li, list.children[1] ?? null);
      }, contact.phone);

      const out = path.join("public", pdfPath(lang));
      await page.pdf({
        path: out,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        tagged: true,
        outline: true,
      });
      console.log(`✓ ${out} (${cv[lang].name})`);
      await page.close();
    }
    await browser.close();
  } finally {
    if (server.pid) process.kill(-server.pid, "SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
