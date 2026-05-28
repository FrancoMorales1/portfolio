import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Rocket, Users, Brain, ShieldCheck } from "lucide-react"

const skills = [
  {
    title: "Desarrollo y Programación",
    icon: <Code2 className="h-8 w-8 text-primary" />,
    description: "Dominio de múltiples lenguajes: Python, C, JavaScript/TypeScript. Desarrollo fullstack con Next.js y bases de datos como MongoDB.",
  },
  {
    title: "Tecnologías Emergentes",
    icon: <Brain className="h-8 w-8 text-primary" />,
    description: "Conocimientos avanzados en Deep Learning (PyTorch) y protocolos Blockchain. Investigación en detección de vulnerabilidades en smart contracts.",
  },
  {
    title: "Aprendizaje Continuo",
    icon: <Rocket className="h-8 w-8 text-primary" />,
    description: "Alta capacidad de aprendizaje y adaptabilidad técnica. Inglés nivel intermedio-avanzado, actualmente cursando nivel VI en el Instituto CEM.",
  },
  {
    title: "Colaboración Eficaz",
    icon: <Users className="h-8 w-8 text-primary" />,
    description: "Experiencia en trabajo en equipo multidisciplinario, incluyendo proyectos académicos y Global Game Jam.",
  },
  {
    title: "Resolución de Problemas",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    description: "Pensamiento analítico aplicado a problemas técnicos complejos. Consultoría en optimización y automatización de operaciones.",
  },
]

const techStack = [
  "Next.js", "Python", "PyTorch", "TypeScript", "C",
  "MongoDB", "Solidity", "Unity", "Tailwind CSS",
]

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-24 md:py-32 bg-muted/50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Aptitudes y Conocimientos
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-14">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="border-none shadow-md bg-background/60 backdrop-blur-sm transition-transform hover:scale-[1.02]"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-xl">{skill.icon}</div>
                  <h3 className="font-bold text-lg">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-5">
            Stack tecnológico
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="px-3 py-1 text-sm font-medium"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
