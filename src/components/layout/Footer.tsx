import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          
          <div className="text-xl font-bold tracking-tighter">
            Franco<span className="text-primary">Morales</span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/FrancoMorales1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="www.linkedin.com/in/franc0-morales"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:francomorales0001@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-muted-foreground max-w-xs">
              Estudiante de Ingeniería en Informática.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-4">
              © {currentYear} — Diseñado y desarrollado por Franco Morales.
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  )
}