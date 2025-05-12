"use client"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitContactForm } from "../actions/contact-form"

export default function ContactsPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formResponse, setFormResponse] = useState<{
    success?: boolean
    message?: string
    errors?: Record<string, string[]>
  } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormResponse(null)

    try {
      console.log("Contact form submission started")
      const response = await submitContactForm(formData)
      console.log("Contact form submission response:", response)
      setFormResponse(response)

      // Reset form if successful
      if (response.success) {
        const form = document.getElementById("contactForm") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      console.error("Contact form client-side error:", error)
      setFormResponse({
        success: false,
        message: `Произошла ошибка при отправке формы: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Свяжитесь с нами</h1>
                <p className="text-muted-foreground md:text-xl">У вас есть вопросы? Мы с радостью на них ответим!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>
                  <div className="grid gap-6">
                    <Card>
                      <CardContent className="p-6 flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-bold">Телефон</h3>
                          <p className="text-muted-foreground">+37378932008</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-bold">Email</h3>
                          <p className="text-muted-foreground">curs@g-studio.md</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-bold">Адрес</h3>
                          <p className="text-muted-foreground">г. Кишинев, ш. Мунчешть 147/1</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Часы работы</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Понедельник - Пятница</span>
                      <span className="font-medium">9:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Суббота</span>
                      <span className="font-medium">10:00 - 15:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Воскресенье</span>
                      <span className="font-medium">Выходной</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="aspect-video relative rounded-lg overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2722.1963959975!2d28.8518!3d47.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3afea45927%3A0xd0b5f658f13f32eb!2z0YjQvtGB0YHQtSDQnNGD0L3Rh9C10YjRgtGMIDE0Ny8xLCBDaGnImWluxIN1LCDQnNC-0LvQtNCw0LLQuNGP!5e0!3m2!1sru!2s!4v1649236881500!5m2!1sru!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Отправить сообщение</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {formResponse && (
                      <Alert
                        className={`mb-6 ${formResponse.success ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
                      >
                        <AlertTitle>{formResponse.success ? "Успешно!" : "Ошибка!"}</AlertTitle>
                        <AlertDescription>{formResponse.message}</AlertDescription>
                      </Alert>
                    )}

                    <form id="contactForm" action={handleSubmit} className="space-y-6">
                      <div className="grid gap-2">
                        <Label htmlFor="name">ФИО</Label>
                        <Input id="name" name="name" required />
                        {formResponse?.errors?.name && (
                          <p className="text-sm text-red-500">{formResponse.errors.name[0]}</p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                        {formResponse?.errors?.email && (
                          <p className="text-sm text-red-500">{formResponse.errors.email[0]}</p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" name="phone" required />
                        {formResponse?.errors?.phone && (
                          <p className="text-sm text-red-500">{formResponse.errors.phone[0]}</p>
                        )}
                      </div>

                      {/* Выбор курса */}
                      <div className="grid gap-2">
                        <Label htmlFor="course">Интересующий курс</Label>
                        <select
                          id="course"
                          name="course"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <option value="none">Не выбрано</option>
                          <option value="Проектировщик мебели START">Проектировщик мебели START</option>
                          <option value="Проектировщик мебели START+">Проектировщик мебели START+</option>
                          <option value="Проектировщик мебели PRO">Проектировщик мебели PRO</option>
                          <option value="Проектировщик мебели PRO+">Проектировщик мебели PRO+</option>
                        </select>
                      </div>

                      {/* Выбор времени */}
                      <div className="grid gap-2">
                        <Label htmlFor="timePreference">Предпочтительное время</Label>
                        <select
                          id="timePreference"
                          name="timePreference"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <option value="none">Не выбрано</option>
                          <option value="Утреннее время (9:00-12:00)">Утреннее время (9:00-12:00)</option>
                          <option value="Вечернее время (19:00-22:00)">Вечернее время (19:00-22:00)</option>
                        </select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="message">Сообщение</Label>
                        <Textarea id="message" name="message" rows={5} required />
                        {formResponse?.errors?.message && (
                          <p className="text-sm text-red-500">{formResponse.errors.message[0]}</p>
                        )}
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Отправка..." : "Отправить"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
