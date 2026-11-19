/**
 * Fuente única del CV. La web, los PDF descargables y el test de score ATS
 * se generan a partir de estos datos: editá acá y corré `npm run cv:pdf`.
 */

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export type Link = { label: string; href: string };

export type Entry = {
  title: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
  tags?: string[];
  links?: Link[];
};

export type SkillGroup = { name: string; items: string[] };

export type CV = {
  name: string;
  headline: string;
  location: string;
  summary: string;
  experience: Entry[];
  projects: Entry[];
  education: Entry[];
  skills: SkillGroup[];
  languages: { name: string; level: string; detail?: string }[];
  certifications: { name: string; issuer: string; detail?: string; href?: string }[];
  labels: {
    summary: string;
    experience: string;
    projects: string;
    education: string;
    skills: string;
    languages: string;
    certifications: string;
    download: string;
    downloadAria: string;
    themeLight: string;
    themeDark: string;
    switchLang: string;
    pageTitle: string;
    metaDescription: string;
  };
};

/** Datos de contacto comunes a ambos idiomas. */
export const contact = {
  email: "francomorales0001@gmail.com",
  /** Solo se imprime en el PDF descargable (no se renderiza en la web). */
  phone: "+54 223 534-2256",
  website: { label: "francomorales.me", href: "https://www.francomorales.me/" },
  linkedin: { label: "linkedin.com/in/franc0-morales", href: "https://www.linkedin.com/in/franc0-morales/" },
  github: { label: "github.com/FrancoMorales1", href: "https://github.com/FrancoMorales1" },
};

export const pdfPath = (lang: Lang) => `/cv/Franco-Morales-CV-${lang.toUpperCase()}.pdf`;

const ggjLinks: Link[] = [
  { label: "GitHub", href: "https://github.com/FrancoMorales1/Overreaction" },
  { label: "Global Game Jam", href: "https://globalgamejam.org/games/2026/over-reaction-2" },
];
const tinzipLinks: Link[] = [{ label: "GitHub", href: "https://github.com/FrancoMorales1/TinZip" }];
const certificatePdf = "/certificates/certificate-language-proficiency.pdf";
const cyberarUrl = "https://www.cyberar.fie.undef.edu.ar/certificados/CYBERAR-2026-000234";
const credentialId = "15c68c5f-0d97-490c-bdc1-1b59bc234be5";

export const cv: Record<Lang, CV> = {
  es: {
    name: "Franco Emanuel Morales",
    headline: "Desarrollador de Software · Estudiante avanzado de Ingeniería en Informática",
    location: "Mar del Plata, Argentina",
    summary:
      "Estudiante avanzado de Ingeniería en Informática (promedio 7.80/10) y desarrollador de software freelance, con fuerte interés en Deep Learning, desarrollo de software y resolución de problemas complejos. Experiencia en consultoría técnica y docencia universitaria, con gran capacidad de aprendizaje acelerado y adaptación. Actualmente investigo la detección de vulnerabilidades en smart contracts de Ethereum con Python y PyTorch.",
    experience: [
      {
        title: "Desarrollador de Software Freelance",
        org: "Autónomo",
        period: "Ene. 2026 – Actualidad",
        location: "Remoto",
        bullets: ["Desarrollo soluciones de software a medida para clientes independientes."],
      },
      {
        title: "Ayudante Alumno Adscripto – Bases de Datos",
        org: "Universidad Nacional de Mar del Plata",
        period: "Mar. 2026 – Actualidad",
        location: "Mar del Plata, Argentina",
        bullets: ["Acompaño la enseñanza de la asignatura Bases de Datos como apoyo docente."],
      },
      {
        title: "Consultor de Operaciones y Tecnología",
        org: "Sector Servicios (Confidencial)",
        period: "Jun. 2021 – Dic. 2024",
        location: "Remoto / Híbrido",
        bullets: [
          "Optimicé y automaticé procesos operativos.",
          "Resolví problemas técnicos complejos del negocio.",
        ],
      },
    ],
    projects: [
      {
        title: "Deep Learning para la detección de vulnerabilidades en smart contracts",
        org: "Proyecto final de carrera · Universidad Nacional de Mar del Plata",
        period: "Ene. 2026 – Actualidad",
        bullets: [
          "Aplico técnicas de Deep Learning para detectar automáticamente vulnerabilidades en smart contracts sobre la blockchain de Ethereum.",
          "Implemento los modelos en Python con PyTorch.",
        ],
        tags: ["Python", "PyTorch", "Deep Learning", "Ethereum"],
      },
      {
        title: "OverReaction · Global Game Jam 2026",
        org: "Proyecto grupal",
        period: "Ene. 2026 – Feb. 2026",
        location: "Mar del Plata, Argentina",
        bullets: [
          "Desarrollé un videojuego en equipo con Unity durante la Global Game Jam.",
          "Iteré el diseño con una metodología iterativa y aprendizaje acelerado.",
        ],
        tags: ["Unity", "Trabajo en equipo"],
        links: ggjLinks,
      },
      {
        title: "TinZip",
        org: "Proyecto personal",
        period: "",
        bullets: ["Construí una aplicación web con Next.js, Tailwind CSS y MongoDB para comprimir, encriptar y compartir archivos."],
        tags: ["Next.js", "Tailwind CSS", "MongoDB"],
        links: tinzipLinks,
      },
    ],
    education: [
      {
        title: "Ingeniería en Informática",
        org: "Universidad Nacional de Mar del Plata",
        period: "2018 – Actualidad",
        location: "Mar del Plata, Argentina",
        bullets: ["Promedio: 7.80 / 10.", "Desarrollando el proyecto final de carrera (tesis de grado)."],
      },
      {
        title: "Bachiller en Humanidades",
        org: "Colegio Alfred Nobel",
        period: "2012 – 2017",
        location: "Mar del Plata, Argentina",
        bullets: [],
      },
    ],
    skills: [
      { name: "Lenguajes", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
      { name: "Frameworks y librerías", items: ["PyTorch", "Next.js", "React", "Node.js", "Tailwind CSS", "Unity"] },
      { name: "Bases de datos", items: ["MongoDB", "Bases de datos relacionales"] },
      { name: "Áreas", items: ["Deep Learning", "Machine Learning", "Smart contracts", "Blockchain (Ethereum)"] },
      { name: "Herramientas", items: ["Git", "GitHub"] },
      {
        name: "Habilidades blandas",
        items: ["Aprendizaje acelerado", "Resolución de problemas", "Disciplina y resiliencia", "Trabajo en equipo"],
      },
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "C2", detail: "Reading & Listening C2 (goFLUENT)" },
    ],
    certifications: [
      {
        name: "Certificación de dominio de inglés – C2",
        issuer: "goFLUENT",
        detail: `ID de credencial: ${credentialId}`,
        href: certificatePdf,
      },
      { name: "Participación en el Congreso CyberAR 2026", issuer: "CyberAR", href: cyberarUrl },
    ],
    labels: {
      summary: "Perfil",
      experience: "Experiencia",
      projects: "Proyectos",
      education: "Educación",
      skills: "Habilidades",
      languages: "Idiomas",
      certifications: "Certificaciones",
      download: "Descargar CV",
      downloadAria: "Descargar CV en PDF (español)",
      themeLight: "Cambiar a modo claro",
      themeDark: "Cambiar a modo oscuro",
      switchLang: "Idioma",
      pageTitle: "Franco Morales — CV · Desarrollador de Software",
      metaDescription:
        "CV de Franco Morales: desarrollador de software y estudiante avanzado de Ingeniería en Informática (UNMdP). Deep Learning, Python, PyTorch, Next.js.",
    },
  },
  en: {
    name: "Franco Emanuel Morales",
    headline: "Software Developer · Advanced Computer Engineering Student",
    location: "Mar del Plata, Argentina",
    summary:
      "Advanced Computer Engineering student (GPA 7.80/10) and freelance software developer with a strong interest in Deep Learning, software development, and complex problem-solving. Experienced in technical consulting and university teaching roles, with a proven capacity for accelerated learning and adaptability. Currently researching vulnerability detection in Ethereum smart contracts with Python and PyTorch.",
    experience: [
      {
        title: "Freelance Software Developer",
        org: "Self-employed",
        period: "Jan 2026 – Present",
        location: "Remote",
        bullets: ["Develop custom software solutions for independent clients."],
      },
      {
        title: "Teaching Assistant – Database Systems",
        org: "Universidad Nacional de Mar del Plata",
        period: "Mar 2026 – Present",
        location: "Mar del Plata, Argentina",
        bullets: ["Support instruction of the undergraduate Database Systems course."],
      },
      {
        title: "Operations and Technology Consultant",
        org: "Services Sector (Confidential)",
        period: "Jun 2021 – Dec 2024",
        location: "Remote / Hybrid",
        bullets: ["Optimized and automated operational processes.", "Solved complex technical problems for the business."],
      },
    ],
    projects: [
      {
        title: "Deep Learning for Smart Contract Vulnerability Detection",
        org: "Capstone Project · Universidad Nacional de Mar del Plata",
        period: "Jan 2026 – Present",
        bullets: [
          "Apply Deep Learning techniques to automatically detect vulnerabilities in smart contracts on the Ethereum blockchain.",
          "Implement the models in Python with PyTorch.",
        ],
        tags: ["Python", "PyTorch", "Deep Learning", "Ethereum"],
      },
      {
        title: "OverReaction · Global Game Jam 2026",
        org: "Team project",
        period: "Jan 2026 – Feb 2026",
        location: "Mar del Plata, Argentina",
        bullets: [
          "Built a video game as a team with Unity during the Global Game Jam.",
          "Refined the design through an iterative methodology and accelerated learning.",
        ],
        tags: ["Unity", "Teamwork"],
        links: ggjLinks,
      },
      {
        title: "TinZip",
        org: "Personal project",
        period: "",
        bullets: ["Built a web application with Next.js, Tailwind CSS, and MongoDB to compress, encrypt, and share files."],
        tags: ["Next.js", "Tailwind CSS", "MongoDB"],
        links: tinzipLinks,
      },
    ],
    education: [
      {
        title: "B.S. in Computer Engineering",
        org: "Universidad Nacional de Mar del Plata",
        period: "2018 – Present",
        location: "Mar del Plata, Argentina",
        bullets: ["GPA: 7.80 / 10.", "Currently developing the Capstone Project (graduation thesis)."],
      },
      {
        title: "High School Diploma in Humanities",
        org: "Colegio Alfred Nobel",
        period: "2012 – 2017",
        location: "Mar del Plata, Argentina",
        bullets: [],
      },
    ],
    skills: [
      { name: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
      { name: "Frameworks & libraries", items: ["PyTorch", "Next.js", "React", "Node.js", "Tailwind CSS", "Unity"] },
      { name: "Databases", items: ["MongoDB", "Relational databases"] },
      { name: "Areas", items: ["Deep Learning", "Machine Learning", "Smart contracts", "Blockchain (Ethereum)"] },
      { name: "Tools", items: ["Git", "GitHub"] },
      {
        name: "Soft skills",
        items: ["Accelerated learning", "Problem solving", "Discipline and resilience", "Teamwork"],
      },
    ],
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "C2", detail: "Reading & Listening C2 (goFLUENT)" },
    ],
    certifications: [
      {
        name: "English Proficiency Certification – C2",
        issuer: "goFLUENT",
        detail: `Credential ID: ${credentialId}`,
        href: certificatePdf,
      },
      { name: "CyberAR 2026 Congress Participation", issuer: "CyberAR", href: cyberarUrl },
    ],
    labels: {
      summary: "Summary",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      certifications: "Certifications",
      download: "Download CV",
      downloadAria: "Download CV as PDF (English)",
      themeLight: "Switch to light mode",
      themeDark: "Switch to dark mode",
      switchLang: "Language",
      pageTitle: "Franco Morales — CV · Software Developer",
      metaDescription:
        "CV of Franco Morales: software developer and advanced Computer Engineering student (UNMdP). Deep Learning, Python, PyTorch, Next.js.",
    },
  },
};
