"use client"

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { contactSchema } from "@/schemas/contactSchema"
import { useContact } from "@/hooks/useContact"
import { toast } from "sonner"

export default function ContactSection() {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  }

  const { send, error } = useContact();


    const handleSubmit = async (
    values: typeof initialValues,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (v: boolean) => void }
    ) => {
        const ok = await send(values);

        if (ok) {
            toast.success("Mensaje enviado. ¡Gracias por contactarme!")
            resetForm()
        } else {
            toast.error("No se pudo enviar el mensaje. Inténtalo de nuevo.")
        }
        setSubmitting(false)
    }

  return (
    <section id="contact" className="w-full min-h-screen flex items-center py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contacto</h1>
            <p className="text-lg text-muted-foreground">¿Tienes un proyecto en mente? Me encantaría escucharlo</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    <Card>
                    <CardHeader>
                        <CardTitle>Envíame un mensaje</CardTitle>
                        <CardDescription>Completa el formulario y me pondré en contacto contigo</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Formik
                        initialValues={initialValues}
                        validationSchema={contactSchema}
                        onSubmit={handleSubmit}
                        >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Field as={Input} id="name" name="name" placeholder="Tu nombre" />
                                <ErrorMessage name="name" component="p" className="text-sm text-red-500" />
                                </div>

                                <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Field as={Input} id="email" name="email" type="email" placeholder="tu@email.com" />
                                <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Asunto</Label>
                                <Field as={Input} id="subject" name="subject" placeholder="¿Sobre qué quieres hablar?" />
                                <ErrorMessage name="subject" component="p" className="text-sm text-red-500" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Mensaje</Label>
                                <Field
                                as={Textarea}
                                id="message"
                                name="message"
                                placeholder="Cuéntame sobre tu proyecto..."
                                rows={6}
                                />
                                <ErrorMessage name="message" component="p" className="text-sm text-red-500" />
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                            </Button>
                            </Form>
                        )}
                        </Formik>
                    </CardContent>
                    </Card>
                </div>

                {/* PANEL DERECHA */}
                <div className="space-y-4">
                    <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Email</h3>
                            <p className="text-sm text-muted-foreground">francomorales0001@gmail.com</p>
                        </div>
                        </div>
                    </CardContent>
                    </Card>

                    <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Teléfono</h3>
                            <p className="text-sm text-muted-foreground">+54 9 223 534 2256</p>
                        </div>
                        </div>
                    </CardContent>
                    </Card>

                    <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Ubicación</h3>
                            <p className="text-sm text-muted-foreground">Mar del Plata, Argentina</p>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </section>
  )
}
