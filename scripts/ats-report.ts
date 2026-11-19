/**
 * Score ATS de cualquier PDF contra los avisos de referencia.
 * Uso: npm run ats -- <archivo.pdf> [es|en]
 */
import { loadJobs, readPdf } from "../tests/ats/pdf";
import { formatReport, scoreResume, type Lang } from "../tests/ats/scorer";

async function main() {
  const [file, langArg = "en"] = process.argv.slice(2);
  if (!file) throw new Error("Uso: npm run ats -- <archivo.pdf> [es|en]");
  const lang = langArg as Lang;
  const { text, pages, type3Fonts } = await readPdf(file);
  console.log(formatReport(file, scoreResume({ lang, text, pages, type3Fonts }, await loadJobs(lang))));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
