/**
 * Diccionario de keywords para el matching estilo ATS.
 * Cada entrada tiene un nombre canónico y patrones (regex, sobre texto en minúsculas y sin tildes).
 * Incluye sinónimos ES/EN porque los ATS modernos agregan una capa semántica, pero un
 * matching literal sigue siendo la base (Workday, Taleo, búsqueda booleana del reclutador).
 */
export type Keyword = { name: string; patterns: string[] };

const k = (name: string, ...patterns: string[]): Keyword => ({ name, patterns: patterns.length ? patterns : [escape(name.toLowerCase())] });

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const HARD_SKILLS: Keyword[] = [
  k("Python"),
  k("Java", "java(?!script)"),
  k("JavaScript", "javascript", "\\bjs\\b"),
  k("TypeScript", "typescript"),
  k("SQL", "\\bsql\\b"),
  k("C++", "c\\+\\+"),
  k("C#", "c#"),
  k("Solidity"),
  k("HTML", "\\bhtml5?\\b"),
  k("CSS", "\\bcss3?\\b"),
  k("React", "\\breact(\\.js|js)?\\b"),
  k("Next.js", "\\bnext\\.?js\\b"),
  k("Node.js", "\\bnode\\.?js\\b"),
  k("Express", "\\bexpress(\\.js)?\\b"),
  k("Django"),
  k("FastAPI", "fast ?api"),
  k("Flask"),
  k("Tailwind CSS", "tailwind"),
  k("PyTorch", "pytorch"),
  k("TensorFlow", "tensorflow"),
  k("Keras"),
  k("scikit-learn", "scikit-?learn", "sklearn"),
  k("Pandas", "\\bpandas\\b"),
  k("NumPy", "numpy"),
  k("Machine Learning", "machine learning", "aprendizaje automatico", "\\bml\\b"),
  k("Deep Learning", "deep learning", "aprendizaje profundo", "redes neuronales", "neural networks?"),
  k("NLP", "\\bnlp\\b", "natural language processing", "procesamiento de lenguaje natural"),
  k("Computer Vision", "computer vision", "vision por computadora"),
  k("LLM", "\\bllms?\\b", "large language models?"),
  k("MongoDB", "mongo ?db"),
  k("PostgreSQL", "postgres(ql)?"),
  k("MySQL", "mysql"),
  k("Redis"),
  k("Relational databases", "relational databases?", "bases? de datos relacionales?", "database systems", "\\brdbms\\b"),
  k("Git", "\\bgit\\b"),
  k("GitHub", "github"),
  k("Docker"),
  k("Kubernetes", "kubernetes", "\\bk8s\\b"),
  k("AWS", "\\baws\\b", "amazon web services"),
  k("Azure"),
  k("GCP", "\\bgcp\\b", "google cloud"),
  k("Linux"),
  k("CI/CD", "ci/cd", "continuous integration", "integracion continua"),
  k("REST APIs", "\\brest(ful)?\\b", "\\bapis?\\b"),
  k("Testing", "unit test(s|ing)?", "\\btesting\\b", "pruebas unitarias", "\\btests?\\b"),
  k("Agile", "\\bagile\\b", "scrum", "metodologias? agiles?", "kanban"),
  k("Blockchain", "blockchain"),
  k("Ethereum"),
  k("Smart contracts", "smart contracts?", "contratos inteligentes"),
  k("Security", "\\bsecurity\\b", "\\bseguridad\\b", "vulnerabilit(y|ies)", "vulnerabilidad(es)?", "ciberseguridad", "cybersecurity"),
  k("Unity", "\\bunity\\b"),
  k("Automation", "automat(ion|ed|e)", "automatiz(acion|aciones|ar|e|o)", "automatice"),
];

export const SOFT_SKILLS: Keyword[] = [
  k("Teamwork", "team ?work", "\\bteams?\\b", "trabajo en equipo", "\\ben equipo\\b"),
  k("Problem solving", "problem[- ]solving", "solv(e|ed|ing) .{0,20}problems", "resolucion de problemas", "resolvi"),
  k("Communication", "communication", "comunicacion"),
  k("Fast learner", "fast learner", "learn(s|ing)? quickly", "accelerated learning", "aprendizaje acelerado", "capacidad de aprendizaje"),
  k("Adaptability", "adaptab(le|ility)", "adaptacion", "adaptabilidad"),
  k("English", "\\benglish\\b", "\\bingles\\b"),
  k("Leadership", "leadership", "\\bled\\b", "liderazgo", "lidere"),
  k("Resilience", "resilien(ce|t)", "resiliencia", "disciplin(e|a)"),
  k("Autonomy", "autonom(y|ous|ously)", "autonomia", "autonomo", "proactiv(e|o|idad)", "self-employed", "freelance"),
];

export function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function findKeywords(text: string, dictionary: Keyword[]) {
  const norm = normalize(text);
  return dictionary.filter((kw) => kw.patterns.some((p) => new RegExp(p, "i").test(norm)));
}
