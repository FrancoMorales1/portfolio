"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, ExternalLink } from "lucide-react"

export default function EducationSection() {
  const certifications = [
    {
      issuer: "ETH Kipu",
      name: "Ethereum Developer Pack",
      link: "https://campus.ethkipu.org/pluginfile.php/1/tool_certificate/issues/1764790656/2041290537FM.pdf",
    },
    {
      issuer: "Cyfrin Updraft",
      name: "Certification: Blockchain Basics",
      link: "https://profiles.cyfrin.io/u/francomorales0001/achievements/blockchain-basics",
    },
  ]

  return (
    <section id="education" className="w-full min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">Educación y Certificaciones</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Tarjeta de Ingeniería - Ocupa todo el ancho en desktop */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-background/60 backdrop-blur-sm border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">Ingeniería en Informática</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>Actualmente cursando <strong className="text-foreground">5.º año</strong> con graduación estimada en <strong className="text-foreground">2026</strong>.</p>
              <p className="italic border-l-2 border-primary/30 pl-4 py-1">
                Tesis: &quot;Aplicación de técnicas de Deep Learning para la detección automática de vulnerabilidades en Smart Contracts sobre tecnología blockchain Ethereum.&quot;
              </p>
              <div className="flex gap-8 pt-2">
                <div>
                  <p className="text-xs uppercase tracking-wider">Promedio sin aplazos</p>
                  <p className="text-xl font-bold text-foreground">7.80</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider">Promedio con aplazos</p>
                  <p className="text-xl font-bold text-foreground">7.67</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mapeo de Certificaciones */}
          {certifications.map((cert, index) => (
            <Card key={index} className="flex flex-col justify-between bg-background/60 backdrop-blur-sm border-none shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">Certificación</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} – <strong className="text-foreground">{cert.name}</strong>
                  </p>
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline group"
                  >
                    Ver certificado online
                    <ExternalLink className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}

        </div>
      </div>
    </section>
  )
}