import { Card, CardContent } from "@/components/ui/card"
import { Code2, Rocket, Users } from "lucide-react"
export default function AboutSection() {
    return (
        <section id="about" className="w-full min-h-screen flex items-center py-24 md:py-32 bg-muted/50">
            <div className="mx-auto max-w-5xl">
                <h2 className="text-3xl font-bold mb-12 text-center">Sobre mí</h2>

                <div className="grid gap-6 md:grid-cols-3 mb-12">
                <Card>
                    <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                        <Code2 className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold">Desarrollo Full Stack</h3>
                        <p className="text-sm text-muted-foreground">
                        Experiencia en frontend y backend con tecnologías modernas
                        </p>
                    </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                        <Rocket className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold">Innovación</h3>
                        <p className="text-sm text-muted-foreground">
                        Siempre buscando nuevas tecnologías y mejores soluciones
                        </p>
                    </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                        <Users className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold">Trabajo en equipo</h3>
                        <p className="text-sm text-muted-foreground">Colaboración efectiva y comunicación clara</p>
                    </div>
                    </CardContent>
                </Card>
                </div>
            </div>
        </section>
  )
}
