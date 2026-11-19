import { ExternalLink, Github, Globe, Linkedin, Mail, MapPin } from "lucide-react";

import { contact, type CV, type Entry } from "@/data/cv";

/**
 * CV completo. Server component: el teléfono nunca llega a la web; el script de PDF
 * lo agrega solo en el archivo descargable (ver scripts/generate-pdf.ts).
 *
 * El orden del DOM es el orden de lectura del PDF (una sola columna en impresión),
 * que es lo que parsean los ATS.
 */
export default function CurriculumVitae({ data }: { data: CV }) {
  const { labels } = data;
  const contactItems = [
    { icon: MapPin, label: data.location },
    { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
    { icon: Globe, ...contact.website },
    { icon: Linkedin, ...contact.linkedin },
    { icon: Github, ...contact.github },
  ];

  return (
    <main id="top" className="cv mx-auto max-w-5xl px-4 pb-20 pt-10 sm:pt-14 print:max-w-none print:p-0">
      <header className="cv-header mb-10 print:mb-2">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl print:text-[22pt]">{data.name}</h1>
        <p className="mt-2 text-lg font-medium text-primary sm:text-xl print:mt-0.5 print:text-[11.5pt]">{data.headline}</p>
        <ul data-contact-list className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground print:mt-1.5 print:gap-x-3 print:gap-y-0">
          {contactItems.map(({ icon: Icon, label, href }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon aria-hidden className="size-4 shrink-0 print:hidden" />
              {href ? (
                <a href={href} className="hover:text-primary hover:underline" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {label}
                </a>
              ) : (
                <span>{label}</span>
              )}
            </li>
          ))}
        </ul>
      </header>

      <div className="grid gap-x-12 gap-y-10 md:grid-cols-[minmax(0,1fr)_16rem] print:block">
        <div className="space-y-10 print:space-y-0">
          <Section title={labels.summary}>
            <p className="leading-relaxed text-pretty print:leading-snug">{data.summary}</p>
          </Section>
          <Section title={labels.experience}>
            <EntryList entries={data.experience} />
          </Section>
          <Section title={labels.projects}>
            <EntryList entries={data.projects} />
          </Section>
          <Section title={labels.education}>
            <EntryList entries={data.education} />
          </Section>
        </div>

        <aside className="space-y-10 print:space-y-0">
          <Section title={labels.skills}>
            <dl className="space-y-4 print:space-y-0.5">
              {data.skills.map((group) => (
                <div key={group.name} className="print:flex print:gap-1">
                  <dt className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground print:mb-0 print:shrink-0 print:text-[9.5pt] print:normal-case print:tracking-normal print:text-foreground">
                    {group.name}
                    <span className="hidden print:inline">:</span>
                  </dt>
                  <dd>
                    <ul className="tag-list flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="tag rounded-md bg-secondary px-2 py-0.5 text-sm text-secondary-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title={labels.languages}>
            <ul className="space-y-2 print:space-y-0">
              {data.languages.map((l) => (
                <li key={l.name}>
                  <span className="font-medium">{l.name}</span>
                  <span className="text-muted-foreground"> — {l.level}</span>
                  {l.detail && <span className="block text-sm text-muted-foreground print:inline print:text-[inherit]"><span className="hidden print:inline"> · </span>{l.detail}</span>}
                </li>
              ))}
            </ul>
          </Section>

          <Section title={labels.certifications}>
            <ul className="space-y-3 print:space-y-0.5">
              {data.certifications.map((c) => (
                <li key={c.name}>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="group font-medium hover:text-primary">
                      {c.name}
                      <ExternalLink aria-hidden className="ml-1 inline size-3.5 align-[-2px] opacity-60 group-hover:opacity-100 print:hidden" />
                    </a>
                  ) : (
                    <span className="font-medium">{c.name}</span>
                  )}
                  <span className="block text-sm text-muted-foreground print:inline">
                    <span className="hidden print:inline"> — </span>
                    {c.issuer}
                    {c.detail && <span className="block break-all text-xs print:inline print:text-[inherit]"><span className="hidden print:inline"> · </span>{c.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </aside>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-section">
      <h2 className="mb-4 border-b pb-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-primary print:mb-1 print:mt-2.5 print:pb-0.5 print:text-[10.5pt]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <div className="space-y-7 print:space-y-1.5">
      {entries.map((e) => (
        <article key={e.title} className="cv-entry">
          <div className="flex flex-col gap-x-4 sm:flex-row sm:items-baseline sm:justify-between print:flex-row print:items-baseline print:justify-between">
            <h3 className="font-semibold leading-snug">{e.title}</h3>
            {e.period && <p className="shrink-0 text-sm tabular-nums text-muted-foreground">{e.period}</p>}
          </div>
          <p className="text-sm">
            <span className="font-medium text-primary print:text-foreground">{e.org}</span>
            {e.location && <span className="text-muted-foreground"> · {e.location}</span>}
          </p>
          {e.bullets.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary/60 print:mt-0.5 print:space-y-0">
              {e.bullets.map((b) => (
                <li key={b} className="leading-relaxed print:leading-snug">{b}</li>
              ))}
            </ul>
          )}
          {(!!e.tags?.length || !!e.links?.length) && (
            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 print:hidden">
              {e.tags && (
                <ul className="flex flex-wrap gap-1.5 print:hidden">
                  {e.tags.map((t) => (
                    <li key={t} className="tag rounded-md border px-2 py-0.5 text-xs text-muted-foreground">{t}</li>
                  ))}
                </ul>
              )}
              {e.links && (
                <ul className="flex gap-3 text-sm print:hidden">
                  {e.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                        {l.label}
                        <ExternalLink aria-hidden className="size-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
