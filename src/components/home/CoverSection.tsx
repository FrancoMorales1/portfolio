import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"

export default function CoverSection() {
  return (
    <section className="w-full min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-5">
          Disponible para oportunidades
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-4">
          Franco Morales
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground mb-5">
          Ingeniero en Informática
        </h2>
        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mb-8">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>Mar del Plata, Argentina</span>
        </div>
        <p className="text-base text-muted-foreground mb-10 text-pretty max-w-xl mx-auto leading-relaxed">
          Estudiante avanzado de Ingeniería en Informática con foco en{" "}
          <span className="text-foreground font-medium">Deep Learning</span>,{" "}
          <span className="text-foreground font-medium">seguridad en smart contracts</span>{" "}
          y desarrollo fullstack. Fast learner apasionado por los desafíos técnicos complejos.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/FrancoMorales1" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://www.linkedin.com/in/franc0-morales/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:francomorales0001@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
