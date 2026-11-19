/**
 * Test de score ATS del CV (PDF descargable, que es lo que recibe un sistema de screening).
 * Corre con `npm test`. Si cambiás src/data/cv.ts, regenerá los PDF con `npm run cv:pdf`.
 */
import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";

import { LANGS, contact, cv, pdfPath } from "../src/data/cv";
import { loadJobs, readPdf } from "./ats/pdf";
import { formatReport, scoreResume } from "./ats/scorer";

/** Umbral mínimo del score total. 70+ = CV competitivo según los checkers públicos. */
const MIN_TOTAL = 70;
/** El formato tiene que ser prácticamente perfecto: si no parsea, nada más importa. */
const MIN_PARSE_RATIO = 0.9;

for (const lang of LANGS) {
  describe(`CV ${lang.toUpperCase()}`, () => {
    const data = cv[lang];
    const file = path.join("public", pdfPath(lang));

    it("el PDF está actualizado con src/data/cv.ts", async () => {
      const { text } = await readPdf(file);
      const flat = text.replace(/\s+/g, " ");
      const expected = [
        data.name,
        data.headline,
        contact.email,
        contact.phone,
        data.labels.experience,
        ...data.experience.map((e) => e.title),
        ...data.projects.map((e) => e.title),
        ...data.education.map((e) => e.title),
        ...data.experience.flatMap((e) => e.bullets),
        ...data.skills.flatMap((g) => g.items),
      ];
      const missing = expected.filter((s) => !flat.includes(s));
      assert.deepEqual(missing, [], `El PDF no refleja los datos actuales. Corré "npm run cv:pdf". Faltan: ${missing.join(" | ")}`);
    });

    it(`score ATS ≥ ${MIN_TOTAL}/100 y formato parseable`, async () => {
      const { text, pages, type3Fonts } = await readPdf(file);
      const jobs = await loadJobs(lang);
      assert.ok(jobs.length > 0, "No hay avisos de referencia para este idioma");

      const report = scoreResume(
        {
          lang,
          text,
          pages,
          type3Fonts,
          bullets: [...data.experience, ...data.projects].flatMap((e) => e.bullets),
          summary: data.summary,
          periods: [...data.experience, ...data.projects, ...data.education].map((e) => e.period),
        },
        jobs,
      );
      console.log(formatReport(`${lang.toUpperCase()} (${path.basename(file)})`, report));

      const parse = report.categories.find((c) => c.id === "parse")!;
      assert.ok(parse.ratio >= MIN_PARSE_RATIO, `Formato no parseable: ${parse.suggestions.join(" ")}`);
      assert.ok(report.total >= MIN_TOTAL, `Score ATS ${report.total} < ${MIN_TOTAL}`);
    });
  });
}
