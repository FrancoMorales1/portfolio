"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Números Quiniela",
    description: "Página simple para ver números de la Quiniela.",
    technologies: ["Next.js", "Tailwind CSS", "Supabase"],
    github: "https://github.com/FrancoMorales1/quiniela",
    demo: "https://quiniela-rust.vercel.app/",
  },
  {
    title: "PokeNextJS",
    description: "Aplicación educativa para ver información de pokemones.",
    technologies: ["Next.js", "MaterialUI", "MongoDB", "TanstackQuery", "Gsap"],
    github: "https://github.com/FrancoMorales1/FrancoMoralesSistemasDistribuidos",
    demo: "https://francomoralessistemasdistribuidos.onrender.com/",
  },
  {
    title: "TinZip",
    description: "Página web para comprimir archivos, encriptarlos y compartirlos con enlace + clave.",
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
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full min-h-screen flex items-center py-24 md:py-32 bg-muted/50">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Proyectos</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Código
                    </a>
                  </Button>
                  <Button size="sm" asChild className="flex-1">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}