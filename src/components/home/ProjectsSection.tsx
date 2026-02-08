"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Números Quiniela",
    description: "Página web para ver números de la Quiniela.",
    technologies: ["Next.js", "Tailwind CSS", "Supabase"],
    github: "https://github.com/FrancoMorales1/quiniela",
    demo: "https://quiniela-rust.vercel.app/",
  },
  {
    title: "PokeNextJS",
    description: "Página web educativa.",
    technologies: ["Next.js", "MaterialUI", "MongoDB", "TanstackQuery", "Gsap"],
    github: "https://github.com/FrancoMorales1/FrancoMoralesSistemasDistribuidos",
    demo: "https://francomoralessistemasdistribuidos.onrender.com/",
  },
  {
    title: "TinZip",
    description: "Página web para comprimir, encriptar y compartir archivos.",
    technologies: ["Next.js", "Tailwind CSS", "MongoDB"],
    github: "https://github.com/FrancoMorales1/TinZip",
    demo: "",
  },
  {
    title: "KipuBankV3",
    description: "Smart contract DeFi del curso de ethkipu.",
    technologies: ["Solidity"],
    github: "https://github.com/FrancoMorales1/KipuBankV3",
    demo: "https://sepolia.etherscan.io/address/0x0b23726dfFbBC4E67a9dEb0Ec8aEBdb3e46fb23d",
  },
  {
    title: "Portfolio",
    description: "Portfolio personal desarrollado con Next.js.",
    technologies: ["Next.js"],
    github: "https://github.com/FrancoMorales1/portfolio.git",
    demo: "https://francomoralesdev.vercel.app/",
  },
  {
    title: "OverReaction",
    description: "Juego diseñado para la GGJ 2026, con Unity.",
    technologies: ["Unity"],
    github: "https://github.com/FrancoMorales1/Overreaction.git",
    demo: "https://globalgamejam.org/games/2026/over-reaction-2",
  },
  {
    title: "TradingBot",
    description: "Software diseñado para trading de criptomonedas.",
    technologies: ["Python"],
    github: "https://github.com/FrancoMorales1/trading.git",
    demo: "",
  }
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full min-h-screen flex items-center py-24 md:py-32 bg-muted/50">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">Proyectos</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {projects.map((project, index) => {
            // Verificamos si existe el link de la demo
            const hasDemo = project.demo && project.demo.trim() !== "";

            return (
              <Card key={index} className="flex flex-col bg-background/60 backdrop-blur-sm border-none shadow-sm transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px] uppercase tracking-wider">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {/* Botón de GitHub: Siempre activo según tu lista */}
                    <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent border-primary/20 hover:bg-primary/5">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Código
                      </a>
                    </Button>

                    {/* Botón de Demo: Condicional */}
                    {hasDemo ? (
                      <Button size="sm" asChild className="flex-1">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" disabled className="flex-1 opacity-50 cursor-not-allowed">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        No Disponible
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  )
}