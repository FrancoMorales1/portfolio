import { notFound } from "next/navigation";

import CurriculumVitae from "@/components/cv/CurriculumVitae";
import { contact, cv, isLang } from "@/data/cv";

type Props = { params: Promise<{ lang: string }> };

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const data = cv[lang];

  // Datos estructurados (schema.org) para buscadores y crawlers de IA. Sin teléfono a propósito.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.headline,
    email: `mailto:${contact.email}`,
    url: contact.website.href,
    sameAs: [contact.linkedin.href, contact.github.href],
    address: { "@type": "PostalAddress", addressLocality: "Mar del Plata", addressCountry: "AR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Nacional de Mar del Plata" },
    knowsLanguage: ["es", "en"],
    knowsAbout: data.skills.filter((_, i) => i < data.skills.length - 1).flatMap((g) => g.items),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <CurriculumVitae data={data} />
    </>
  );
}
