"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpenCheck, Award } from "lucide-react"

export default function EducationSection() {
  return (
    <section id="education" className="w-full min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Educación</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">Ingeniería en Informática</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Actualmente cursando <strong>5.º año</strong>.</p>
              <p>Graduación estimada: <strong>2026</strong>.</p>
              <p>Tesis: <strong>"Aplicación de técnicas de Deep Learning para la detección automática de vulnerabilidades en Smart Contracts sobre tecnología blockchain Ethereum."</strong></p>
              <div className="flex gap-6 mt-4">
                <div>
                  <p className="text-sm">Promedio sin aplazos</p>
                  <p className="font-semibold">7.80</p>
                </div>
                <div>
                  <p className="text-sm">Promedio con aplazos</p>
                  <p className="font-semibold">7.67</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Certificación</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                ETH Kipu – <strong>Ethereum Developer Pack</strong>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Certificación</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cyfrin Updraft – <strong>Certification: Blockchain Basics</strong>
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}
