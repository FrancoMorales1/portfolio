import { Button } from "@/components/ui/button"
import { Github, Linkedin } from "lucide-react"

export default function CoverSection() {
  return (
    <section className="w-full min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-balance">Software Engineer</h1>
        <p className="text-lg text-muted-foreground mb-8 text-pretty">
          En la búsqueda constante de desafios.<br />
          Apasionado por la creación de soluciones tecnológicas que ayuden a las personas.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
        </div>
        <div className="flex items-center justify-center gap-4">
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
        </div>
      </div>
    </section>
  );
}
