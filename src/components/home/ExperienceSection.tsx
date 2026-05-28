import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, MapPin, CalendarDays } from "lucide-react"

const experiences = [
  {
    role: "Ayudante Alumno Adscripto",
    company: "Universidad Nacional de Mar del Plata",
    period: "Marzo 2026 — Actualidad",
    location: "Mar del Plata, Argentina",
    bullets: ["Apoyo docente en la asignatura Base de Datos."],
  },
  {
    role: "Consultor de Operaciones y Tecnología",
    company: "Sector Servicios (Confidencial)",
    period: "Jun. 2021 — Dic. 2024",
    location: "Remoto / Híbrido",
    bullets: [
      "Optimización y automatización de procesos operativos.",
      "Resolución de problemas técnicos complejos.",
    ],
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">
          Experiencia
        </h2>

        <div className="relative border-l border-border pl-8 space-y-10 ml-4">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[2.65rem] top-5 h-4 w-4 rounded-full bg-primary border-2 border-background" />
              <Card className="bg-background/60 backdrop-blur-sm border-none shadow-sm">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-lg">{exp.role}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                      <Briefcase className="h-4 w-4 shrink-0" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
