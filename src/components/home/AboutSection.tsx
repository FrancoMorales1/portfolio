import { Card, CardContent } from "@/components/ui/card"
import { Code2, Rocket, Users, Brain, Languages, ShieldCheck, Database, Cpu } from "lucide-react"

export default function AboutSection() {
  const skills = [
    {
      title: "Desarrollo y Programación",
      icon: <Code2 className="h-8 w-8 text-primary" />,
      description: "Dominio de múltiples lenguajes de programación."
    },
    {
      title: "Tecnologías Emergentes",
      icon: <Brain className="h-8 w-8 text-primary" />,
      description: "Conocimientos avanzados en Inteligencia Artificial y protocolos Blockchain. Implementación ética y responsable de herramientas de IA."
    },
    {
      title: "Aprendizaje Continuo",
      icon: <Rocket className="h-8 w-8 text-primary" />,
      description: "Alta capacidad de aprendizaje y adaptabilidad técnica (Fast learner). Actualmente cursando nivel VI en el Instituto de Inglés CEM."
    },
    {
      title: "Colaboración Eficaz",
      icon: <Users className="h-8 w-8 text-primary" />,
      description: "Experiencia en trabajo en equipo multidisciplinario."
    },
    {
      title: "Resolución de Problemas",
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      description: "Pensamiento analítico aplicado a la resolución de conflictos técnicos."
    }
  ]

  return (
    <section id="about" className="w-full min-h-screen flex items-center py-24 md:py-32 bg-muted/50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Aptitudes y Conocimientos</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <Card key={index} className="border-none shadow-md bg-background/60 backdrop-blur-sm transition-transform hover:scale-[1.02]">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    {skill.icon}
                  </div>
                  <h3 className="font-bold text-lg">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}