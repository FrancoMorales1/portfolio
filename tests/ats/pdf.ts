import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { extractText, getDocumentProxy } from "unpdf";

import { parseJobDescription, type JobDescription, type Lang } from "./scorer";

/** Extrae el texto de un PDF como lo haría un parser ATS (capa de texto, sin OCR). */
export async function readPdf(file: string) {
  const bytes = new Uint8Array(await readFile(file));
  // Type3 = glifos dibujados como figuras: muchos parsers extraen texto roto o nada.
  // Heurística: solo ve diccionarios de fuente sin comprimir (como los que escribe Chromium).
  const type3Fonts = Buffer.from(bytes).toString("latin1").includes("/Type3");
  const pdf = await getDocumentProxy(bytes);
  const { totalPages, text } = await extractText(pdf, { mergePages: true });
  return { pages: totalPages, text, type3Fonts };
}

export async function loadJobs(lang: Lang): Promise<JobDescription[]> {
  const dir = path.join(__dirname, "job-descriptions");
  const files = (await readdir(dir)).filter((f) => f.startsWith(`${lang}-`) && f.endsWith(".txt")).sort();
  return Promise.all(files.map(async (f) => parseJobDescription(f, await readFile(path.join(dir, f), "utf8"))));
}
