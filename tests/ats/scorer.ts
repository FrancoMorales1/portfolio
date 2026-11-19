/**
 * Score ATS determinístico (0–100), modelado sobre lo que miden los sistemas de
 * screening y los checkers públicos. Ver tests/ats/README.md para fuentes y pesos.
 *
 *  - Parseo y formato (25): texto extraíble, 1 página, contacto, encabezados estándar,
 *    sin glifos de íconos ni palabras pegadas (lo que rompe Workday/Taleo/Lever).
 *  - Hard skills vs. aviso (35): % de keywords técnicas del aviso presentes (Jobscan: objetivo ≥ 75 %).
 *  - Título del puesto (10): el título del aviso aparece literal en el CV (Jobscan).
 *  - Soft skills (5): habilidades blandas del aviso presentes.
 *  - Redacción (15): verbos de acción, sin pronombres, sin buzzwords, largo de bullets y del
 *    resumen, formato de fechas consistente (Resume Worded: impact/brevity/style).
 *  - Impacto cuantificado (10): % de bullets con números/métricas (Resume Worded: impact).
 */
import { HARD_SKILLS, SOFT_SKILLS, findKeywords, normalize } from "./keywords";

export type Lang = "es" | "en";

export type JobDescription = { file: string; title: string; text: string };

export type ResumeInput = {
  lang: Lang;
  /** Texto tal cual lo extrae un parser de PDF. */
  text: string;
  pages: number;
  /** El PDF usa fuentes Type3 (ver pdf.ts). */
  type3Fonts?: boolean;
  /** Bullets de experiencia/proyectos. Si no se pasan, se infieren de líneas con viñeta. */
  bullets?: string[];
  summary?: string;
  periods?: string[];
};

export type Category = {
  id: string;
  label: string;
  weight: number;
  /** 0..1 */
  ratio: number;
  points: number;
  details: string[];
  suggestions: string[];
};

export type Report = { total: number; categories: Category[] };

const HEADINGS: Record<Lang, Record<string, string[]>> = {
  en: {
    summary: ["summary", "profile", "professional summary", "about"],
    experience: ["experience", "work experience", "professional experience", "employment"],
    education: ["education"],
    skills: ["skills", "technical skills", "strengths"],
  },
  es: {
    summary: ["perfil", "resumen", "perfil profesional", "sobre mi", "acerca de mi"],
    experience: ["experiencia", "experiencia laboral", "experiencia profesional"],
    education: ["educacion", "formacion", "formacion academica"],
    skills: ["habilidades", "competencias", "conocimientos", "aptitudes"],
  },
};

const ACTION_VERBS: Record<Lang, string[]> = {
  en: [
    "achieved", "analyzed", "apply", "applied", "architected", "automate", "automated", "build", "built", "created",
    "delivered", "design", "designed", "develop", "developed", "drove", "engineered", "evaluate", "evaluated",
    "implement", "implemented", "improved", "increased", "launched", "lead", "led", "maintain", "maintained",
    "mentor", "mentored", "migrated", "optimize", "optimized", "reduced", "refactored", "refined", "research",
    "researched", "resolved", "shipped", "solved", "streamlined", "teach", "taught", "train", "trained", "tutor",
    "tutored", "deployed", "integrated", "grade", "graded", "coordinated", "managed", "prototyped", "modeled",
  ],
  es: [
    "aplico", "aplique", "automatice", "automatizo", "construi", "construyo", "coordine", "coordino", "cree",
    "creo", "desarrolle", "desarrollo", "diseñe", "diseño", "disene", "diseno", "doy", "di", "entrene", "entreno",
    "evalue", "evaluo", "implemente", "implemento", "integre", "integro", "investigo", "investigue", "itere",
    "itero", "lidere", "lidero", "logre", "mejore", "mejoro", "migre", "optimice", "optimizo", "reduje",
    "reduzco", "resolvi", "resuelvo", "enseño", "enseno", "ensene", "dicto", "dicte",
    "corrijo", "corregi", "modele", "modelo", "despliegue", "despliego", "gestione", "gestiono", "lance",
  ],
};

const WEAK_OPENERS: Record<Lang, string[]> = {
  en: ["helped", "assisted", "support", "supported", "responsible", "worked", "participated", "involved", "tasked"],
  es: ["ayude", "ayudo", "asisti", "acompano", "acompaño", "colabore", "participe", "encargado", "responsable", "apoyo", "trabaje"],
};

const PRONOUNS: Record<Lang, RegExp> = {
  en: /\b(i|me|my|mine|myself)\b/,
  es: /\b(yo|mi|mis|me|conmigo)\b/,
};

const BUZZWORDS = [
  "hard-working", "hardworking", "team player", "results-driven", "results driven", "detail-oriented",
  "go-getter", "synergy", "think outside the box", "self-starter", "dynamic", "passionate", "motivated",
  "rockstar", "ninja", "guru", "best of breed", "proactivo", "dinamico", "apasionado", "orientado a resultados",
  "multitarea", "fuera de la caja", "motivado",
];

/** Camel-case legítimo; cualquier otro "minúsculaMayúscula" indica palabras pegadas por el parser. */
const CAMEL_ALLOW = /^(PyTorch|JavaScript|TypeScript|MongoDB|GitHub|NodeJS|NextJS|OverReaction|goFLUENT|TinZip|FastAPI|PostgreSQL|MySQL|NumPy|TensorFlow|LinkedIn|CyberAR|FrancoMorales\d*|DevOps|iOS|macOS|McDonald)$/;

const pct = (n: number) => `${Math.round(n * 100)} %`;

export function parseJobDescription(file: string, text: string): JobDescription {
  const m = text.match(/^(?:title|t[ií]tulo):\s*(.+)$/im);
  return { file, title: m ? m[1].trim() : file, text };
}

function inferBullets(text: string) {
  return text
    .split(/\n/)
    .map((l) => l.trim())
    .filter((l) => /^[•▪◦‣\-–]\s*/.test(l))
    .map((l) => l.replace(/^[•▪◦‣\-–]\s*/, ""));
}

export function scoreResume(input: ResumeInput, jobs: JobDescription[]): Report {
  const { lang, text } = input;
  const norm = normalize(text);
  const bullets = input.bullets ?? inferBullets(text);
  const categories: Category[] = [];

  // ---------------- 1. Parseo y formato ----------------
  {
    const checks: [string, boolean, string][] = [];
    const words = norm.split(" ").filter((w) => /[a-z]/.test(w)).length;
    checks.push([`Texto extraíble (${words} palabras)`, words >= 250, "El PDF casi no tiene texto extraíble: un ATS lo vería vacío."]);
    checks.push([`Largo: ${input.pages} página(s)`, input.pages === 1, "Con < 5 años de experiencia, apuntá a 1 página."]);
    checks.push(["Email", /[\w.+-]+@[\w-]+\.[\w.]+/.test(text), "Falta un email en texto plano."]);
    checks.push(["Teléfono", /(\+?\d[\d\s().-]{7,}\d)/.test(text.replace(/\b\d{4}\s*[–-]\s*(\d{4}|present|actualidad)/gi, "")), "Falta el teléfono en el PDF."]);
    checks.push(["LinkedIn", /linkedin\.com\/in\//i.test(text), "Incluí la URL de LinkedIn como texto visible."]);
    checks.push(["Ubicación", /mar del plata|argentina/i.test(text), "Incluí ciudad y país."]);
    // Encabezado = línea propia (no una palabra suelta dentro de un párrafo).
    const lines = text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    for (const [key, variants] of Object.entries(HEADINGS[lang])) {
      const found = variants.some((v) => new RegExp(`(^|\\n)[ \\t]*${v}[ \\t]*:?[ \\t]*(\\n|$)`).test(lines));
      checks.push([`Encabezado estándar: ${key}`, found, `Usá un encabezado estándar para "${key}" (${variants.slice(0, 2).join(" / ")}) en su propia línea.`]);
    }
    if (input.type3Fonts !== undefined)
      checks.push(["Fuentes embebidas como texto (sin Type3)", !input.type3Fonts, "El PDF usa fuentes Type3: usá fuentes estáticas TrueType/OpenType."]);
    const glyphs = (text.match(/[-�]/g) ?? []).length;
    checks.push([`Sin glifos de íconos/caracteres inválidos (${glyphs})`, glyphs === 0, "Hay íconos de fuente (FontAwesome, etc.) que el parser convierte en basura: reemplazalos por texto."]);
    const glued = (text.match(/\b[\p{L}][\p{Ll}]+[\p{Lu}][\p{L}]*\b/gu) ?? []).filter((w) => !CAMEL_ALLOW.test(w));
    checks.push([
      `Sin palabras pegadas${glued.length ? `: ${[...new Set(glued)].slice(0, 5).join(", ")}` : ""}`,
      glued.length <= 1,
      "El parser pega palabras (típico de negritas/columnas en LaTeX): una columna y texto simple lo evitan.",
    ]);
    const passed = checks.filter((c) => c[1]).length;
    categories.push({
      id: "parse",
      label: "Parseo y formato",
      weight: 25,
      ratio: passed / checks.length,
      points: 0,
      details: checks.map(([l, ok]) => `${ok ? "✓" : "✗"} ${l}`),
      suggestions: checks.filter((c) => !c[1]).map((c) => c[2]),
    });
  }

  // ---------------- 2. Hard skills ----------------
  {
    const cvSkills = new Set(findKeywords(text, HARD_SKILLS).map((s) => s.name));
    const details: string[] = [];
    const missing = new Map<string, number>();
    let sum = 0;
    for (const job of jobs) {
      const req = findKeywords(job.text, HARD_SKILLS);
      const hit = req.filter((s) => cvSkills.has(s.name));
      const rate = req.length ? hit.length / req.length : 1;
      sum += rate;
      details.push(`${job.title}: ${hit.length}/${req.length} (${pct(rate)})`);
      req.filter((s) => !cvSkills.has(s.name)).forEach((s) => missing.set(s.name, (missing.get(s.name) ?? 0) + 1));
    }
    const avg = jobs.length ? sum / jobs.length : 0;
    const top = [...missing.entries()].sort((a, b) => b[1] - a[1]).map(([n]) => n);
    categories.push({
      id: "hard",
      label: "Hard skills vs. avisos",
      weight: 35,
      ratio: Math.min(1, avg / 0.75),
      points: 0,
      details: [`Match promedio ${pct(avg)} (objetivo Jobscan ≥ 75 %)`, ...details],
      suggestions: top.length ? [`Keywords pedidas que faltan (sumalas solo si las manejás): ${top.join(", ")}`] : [],
    });
  }

  // ---------------- 3. Título del puesto ----------------
  {
    const details: string[] = [];
    let sum = 0;
    for (const job of jobs) {
      const core = normalize(job.title)
        .replace(/\b(junior|jr\.?|senior|sr\.?|semi ?senior|ssr|trainee|\(.*?\))/g, "")
        .replace(/\s+/g, " ")
        .trim();
      const exact = norm.includes(core);
      const tokens = core.split(" ").filter((t) => t.length > 2);
      const partial = tokens.length ? tokens.filter((t) => norm.includes(t)).length / tokens.length : 0;
      const s = exact ? 1 : partial * 0.5;
      sum += s;
      details.push(`${exact ? "✓" : "✗"} "${core}"${exact ? "" : ` (parcial ${pct(partial)})`}`);
    }
    const ratio = jobs.length ? sum / jobs.length : 0;
    categories.push({
      id: "title",
      label: "Título del puesto",
      weight: 10,
      ratio,
      points: 0,
      details,
      suggestions: ratio < 1 ? ["Adaptá el titular (headline) al título exacto del aviso al que te postulás."] : [],
    });
  }

  // ---------------- 4. Soft skills ----------------
  {
    const cvSoft = new Set(findKeywords(text, SOFT_SKILLS).map((s) => s.name));
    let sum = 0;
    const missing = new Set<string>();
    for (const job of jobs) {
      const req = findKeywords(job.text, SOFT_SKILLS);
      req.filter((s) => !cvSoft.has(s.name)).forEach((s) => missing.add(s.name));
      sum += req.length ? req.filter((s) => cvSoft.has(s.name)).length / req.length : 1;
    }
    const ratio = jobs.length ? sum / jobs.length : 0;
    categories.push({
      id: "soft",
      label: "Soft skills",
      weight: 5,
      ratio,
      points: 0,
      details: [`Match promedio ${pct(ratio)}`],
      suggestions: missing.size ? [`Soft skills pedidas que no aparecen: ${[...missing].join(", ")}`] : [],
    });
  }

  // ---------------- 5. Redacción ----------------
  {
    const firstWord = (b: string) => normalize(b).split(" ")[0].replace(/[^a-zñ]/g, "");
    const actionVerbs = new Set(ACTION_VERBS[lang].map((v) => normalize(v)));
    const weak = new Set(WEAK_OPENERS[lang]);
    const withVerb = bullets.filter((b) => actionVerbs.has(firstWord(b)));
    const weakOnes = bullets.filter((b) => weak.has(firstWord(b)));
    const lengthOk = bullets.filter((b) => {
      const n = b.split(/\s+/).length;
      return n >= 5 && n <= 30;
    });
    const pronouns = bullets.concat(input.summary ?? []).filter((b) => PRONOUNS[lang].test(normalize(b)));
    const buzz = BUZZWORDS.filter((w) => norm.includes(w));
    const summaryWords = input.summary?.split(/\s+/).length;
    const periods = input.periods?.filter(Boolean) ?? [];
    const dateStyle = (p: string) => p.replace(/[A-Za-zÁÉÍÓÚáéíóúñ]+\.?/g, "M").replace(/\d{4}/g, "Y").replace(/\s+/g, "");
    const styles = new Set(periods.map(dateStyle).map((s) => s.replace(/^(M?Y)–(M?Y|M)$/, "range")));

    const checks: [string, number, string | null][] = [
      [
        `Bullets que empiezan con verbo de acción: ${withVerb.length}/${bullets.length}`,
        bullets.length ? withVerb.length / bullets.length : 0,
        withVerb.length < bullets.length ? "Empezá cada bullet con un verbo de acción (desarrollé, implementé, optimicé…)." : null,
      ],
      [
        `Sin verbos débiles (helped/assisted/apoyo…): ${weakOnes.length}`,
        weakOnes.length === 0 ? 1 : Math.max(0, 1 - weakOnes.length / Math.max(1, bullets.length)),
        weakOnes.length ? `Reemplazá aperturas débiles por lo que hacés concretamente: "${weakOnes[0]}"` : null,
      ],
      [
        `Bullets de 5–30 palabras: ${lengthOk.length}/${bullets.length}`,
        bullets.length ? lengthOk.length / bullets.length : 0,
        lengthOk.length < bullets.length ? "Hay bullets demasiado cortos (sin contexto) o largos." : null,
      ],
      [`Sin pronombres personales: ${pronouns.length}`, pronouns.length === 0 ? 1 : 0, pronouns.length ? "Evitá pronombres (I/my, yo/mi)." : null],
      [`Sin buzzwords/clichés${buzz.length ? `: ${buzz.join(", ")}` : ""}`, buzz.length === 0 ? 1 : 0, buzz.length ? "Sacá los clichés; mostrá evidencia en vez de adjetivos." : null],
    ];
    if (summaryWords !== undefined)
      checks.push([
        `Resumen de ${summaryWords} palabras (ideal 30–90)`,
        summaryWords >= 30 && summaryWords <= 90 ? 1 : 0.5,
        summaryWords >= 30 && summaryWords <= 90 ? null : "Ajustá el resumen a 2–4 oraciones.",
      ]);
    if (periods.length)
      checks.push([
        `Formato de fechas consistente (${styles.size} estilo/s)`,
        styles.size <= 2 ? 1 : 0.5,
        styles.size <= 2 ? null : "Usá el mismo formato de fecha en todo el CV.",
      ]);
    if (!bullets.length) checks.push(["No se detectaron bullets", 0, "Describí experiencia y proyectos con bullets."]);

    categories.push({
      id: "writing",
      label: "Redacción",
      weight: 15,
      ratio: checks.reduce((a, c) => a + c[1], 0) / checks.length,
      points: 0,
      details: checks.map(([l, r]) => `${r >= 1 ? "✓" : r > 0 ? "~" : "✗"} ${l}`),
      suggestions: checks.map((c) => c[2]).filter((s): s is string => !!s),
    });
  }

  // ---------------- 6. Impacto cuantificado ----------------
  {
    const quantified = bullets.filter((b) => /\d|%|\$|\b(one|two|three|four|five|ten|dozens?|hundreds?|thousands?|uno|dos|tres|cuatro|cinco|diez|decenas|cientos|miles)\b/i.test(b));
    const rate = bullets.length ? quantified.length / bullets.length : 0;
    categories.push({
      id: "impact",
      label: "Impacto cuantificado",
      weight: 10,
      ratio: Math.min(1, rate / 0.5),
      points: 0,
      details: [`Bullets con números/métricas: ${quantified.length}/${bullets.length} (objetivo ≥ 50 %)`],
      suggestions:
        rate < 0.5
          ? ["Cuantificá resultados: cantidad de alumnos/comisiones, horas ahorradas con automatizaciones, clientes/proyectos entregados, métricas del modelo (F1, accuracy)."]
          : [],
    });
  }

  for (const c of categories) c.points = Math.round(c.ratio * c.weight * 10) / 10;
  const total = Math.round(categories.reduce((a, c) => a + c.points, 0));
  return { total, categories };
}

export function formatReport(name: string, r: Report) {
  const lines = [`\n=== Score ATS ${name}: ${r.total}/100 ===`];
  for (const c of r.categories) {
    lines.push(`\n[${c.points.toFixed(1)}/${c.weight}] ${c.label}`);
    c.details.forEach((d) => lines.push(`    ${d}`));
    c.suggestions.forEach((s) => lines.push(`    → ${s}`));
  }
  return lines.join("\n");
}
