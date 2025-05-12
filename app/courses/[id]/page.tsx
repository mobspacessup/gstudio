"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, GraduationCap, Users, CheckCircle } from "lucide-react"
import { notFound, useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitCourseEnrollment } from "@/app/actions/course-form"

// Добавьте импорт в начало файла
import CountdownTimer from "@/components/countdown-timer"

export default function CoursePage() {
  const params = useParams()
  const id = Number.parseInt(params.id as string)

  // State for enrollment modal
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formResponse, setFormResponse] = useState<{
    success?: boolean
    message?: string
    errors?: Record<string, string[]>
  } | null>(null)

  // Проверка на валидный ID
  if (isNaN(id) || id < 1 || id > 4) {
    notFound()
  }

  // Данные о курсах
  const courses = [
    {
      id: 1,
      title: "Проектировщик мебели START",
      description:
        "Для тех, кто хочет войти в мебельную сферу, но не имеет опыта и хочет научиться проектировать в программе Базис Мебельщик.",
      fullDescription:
        "Курс предназначен для тех, кто хочет войти в мебельную сферу, но не имеет опыта. Вы изучите основы корпусной мебели, принципы построения мебели для производства и работу в программе Базис Мебельщик с нуля. Вы научитесь создавать проекты: кухни, шкафы, прихожие и передавать их на производство. По окончании курса вы получите сертификат и гарантированное трудоустройство.",
      price: "30 000 MDL",
      startDate: "7 июля 2025",
      duration: "3 месяца",
      level: "Начинающий",
      format: "Очное обучение по адресу G-Studio г. Кишинев, ш. Мунчешть 147/1 , мини-группы до 7 человек",
      time: "Утренняя группа: 9:00-12:00\nВечерняя группа: 19:00-22:00\nЗанятия проходят через день",
      skills: [
        "Основы корпусной мебели: конструкции, материалы, фурнитура",
        "Принципы построения мебели для производства",
        "Работа в программе Базис Мебельщик с нуля",
        "Подготовка сборочных чертежей и проектов для производства",
        "Создание проектов: кухни, шкафы, прихожие",
        "Передача проектов на производство",
      ],
      benefits: [
        "Сертификат об окончании",
        "Гарантированное трудоустройство после завершения курса",
        "Библиотека фурнитуры и материалов.",
        "Поддержка после окончания курса: консультации, разбор проектов и доработка моделей.",
      ],
      modules: [
        {
          title: "Модуль 1: Введение в мебельное производство",
          lessons: [
            "Урок 1: Основы корпусной мебели",
            "Урок 2: Материалы и фурнитура, работа с библиотеками",
            "Урок 3: Принципы конструирования",
          ],
        },
        {
          title: "Модуль 2: Базис Мебельщик - основы",
          lessons: [
            "Урок 1: Интерфейс программы",
            "Урок 2: Создание простых элементов",
            "Урок 3: Работа с материалами",
          ],
        },
        {
          title: "Модуль 3: Проектирование мебели",
          lessons: [
            "Урок 1: Проектирование шкафов",
            "Урок 2: Проектирование кухонь",
            "Урок 3: Проектирование прихожих",
          ],
        },
        {
          title: "Модуль 4: Подготовка к производству",
          lessons: ["Урок 1: Создание чертежей", "Урок 2: Карты присадки", "Урок 3: Спецификации материалов"],
        },
      ],
      image: "/images/furniture-design-course.png",
    },
    {
      id: 2,
      title: "Проектировщик мебели START+",
      description:
        "Для тех, кто хочет войти в мебельную сферу, но не имеет опыта и хочет научиться проектировать в программе Базис Мебельщик. Дополнительно вы получаете КЛЮЧ к программе Базис Мебельщик.",
      fullDescription:
        "Курс предназначен для тех, кто хочет войти в мебельную сферу, но не имеет опыта. Вы изучите основы корпусной мебели, принципы построения мебели для производства и работу в программе Базис Мебельщик с нуля. Вы научитесь создавать проекты: кухни, шкафы, прихожие и передавать их на производство. По окончании курса вы получите сертификат и гарантированное трудоустройство.",
      price: "34 500 MDL",
      duration: "3 месяца",
      level: "Начинающий",
      format: "Очное обучение по адресу G-Studio г. Кишинев, ш. Мунчешть 147/1 , мини-группы до 7 человек",
      time: "Утренняя группа: 9:00-12:00\nВечерняя группа: 19:00-22:00\nЗанятия проходят через день",
      skills: [
        "Основы корпусной мебели: конструкции, материалы, фурнитура",
        "Принципы построения мебели для производства",
        "Работа в программе Базис Мебельщик с нуля",
        "Подготовка сборочных чертежей и проектов для производства",
        "Создание проектов: кухни, шкафы, прихожие",
        "Передача проектов на производство",
      ],
      benefits: [
        "Ключ для программы Базис Мебельщик",
        "Сертификат об окончании",
        "Гарантированное трудоустройство после завершения курса",
        "Поддержка после окончания курса: консультации, разбор проектов и доработка моделей",
        "Библиотека фурнитуры и материалов",
      ],
      modules: [
        {
          title: "Модуль 1: Введение в мебельное производство",
          lessons: [
            "Урок 1: Основы корпусной мебели",
            "Урок 2: Материалы и фурнитура, Работа с библиотеками",
            "Урок 3: Принципы конструирования",
          ],
        },
        {
          title: "Модуль 2: Базис Мебельщик - основы",
          lessons: [
            "Урок 1: Интерфейс программы",
            "Урок 2: Создание простых элементов",
            "Урок 3: Работа с материалами",
          ],
        },
        {
          title: "Модуль 3: Проектирование мебели",
          lessons: [
            "Урок 1: Проектирование шкафов",
            "Урок 2: Проектирование кухонь",
            "Урок 3: Проектирование прихожих",
          ],
        },
        {
          title: "Модуль 4: Подготовка к производству",
          lessons: ["Урок 1: Создание чертежей", "Урок 2: Карты присадки", "Урок 3: Спецификации материалов"],
        },
      ],
      image: "/images/basis-design-course.png",
    },
    {
      id: 3,
      title: "Проектировщик мебели PRO",
      description: "Для тех, кто уже работает с мебелью и хочет научиться проектировать в программе Базис Мебельщик.",
      fullDescription:
        "Курс предназначен для тех, кто уже работает с мебелью и хочет научиться проектировать в программе Базис Мебельщик. Вы научитесь работать в Базис Мебельщик на продвинутом уровне, создавать проекты: кухни, шкафы, прихожие, делать деталировки, карты присадки, чертежи и передавать проекты сборщикам и на производство.",
      price: "20 000 MDL",
      startDate: "26 мая 2025",
      duration: "2 месяца",
      level: "Продвинутый",
      format: "Очное обучение по адресу G-Studio г. Кишинев, ш. Мунчешть 147/1 , мини-группы до 7 человек",
      time: "Утренняя группа: 9:00-12:00\nВечерняя группа: 19:00-22:00\nЗанятия проходят через день",
      skills: [
        "Работа в Базис Мебельщик на продвинутом уровне",
        "Создание проектов: кухни, шкафы, прихожие",
        "Деталировки, карты присадки, чертежи",
        "Передача проектов сборщикам и на производство",
      ],
      benefits: [
        "Сертификат об окончании",
        "Гарантированное трудоустройство после завершения курса",
        "Поддержка после окончания курса: консультации, разбор проектов и доработка моделей",
        "Библиотека фурнитуры и материалов",
      ],
      modules: [
        {
          title: "Модуль 1: Продвинутые функции Базис Мебельщик",
          lessons: [
            "Урок 1: Интерфейс и настройки программы",
            "Урок 2: Работа с библиотеками",
            "Урок 3: Создание собственных элементов",
          ],
        },
        {
          title: "Модуль 2: Проектирование сложных конструкций",
          lessons: [
            "Урок 1: Проектирование кухонь",
            "Урок 2: Проектирование шкафов-купе",
            "Урок 3: Проектирование прихожих",
          ],
        },
        {
          title: "Модуль 3: Подготовка документации",
          lessons: ["Урок 1: Создание деталировок", "Урок 2: Карты присадки", "Урок 3: Чертежи для производства"],
        },
        {
          title: "Модуль 4: Взаимодействие с производством",
          lessons: [
            "Урок 1: Подготовка файлов для вырезов",
            "Урок 2: Спецификации материалов",
            "Урок 3: Коммуникация с производством",
          ],
        },
      ],
      image: "/images/furniture-pro-course.png",
    },
    {
      id: 4,
      title: "Проектировщик мебели PRO+",
      description:
        "Для тех, кто уже работает с мебелью и хочет научиться проектировать в программе Базис Мебельщик. Дополнительно вы получаете КЛЮЧ к программе Базис Мебельщик.",
      fullDescription:
        "Курс предназначен для тех, кто уже работает с мебелью и хочет научиться проектировать в программе Базис Мебельщик. Вы научитесь работать в Базис Мебельщик на продвинутом уровне, создавать проекты: кухни, шкафы, прихожие, делать деталировки, карты присадки, чертежи и передавать проекты сборщикам и на производство.",
      price: "24 500 MDL",
      duration: "2 месяца",
      level: "Продвинутый",
      format: "Очное обучение по адресу G-Studio г. Кишинев, ш. Мунчешть 147/1 , мини-группы до 7 человек",
      time: "Утренняя группа: 9:00-12:00\nВечерняя группа: 19:00-22:00\nЗанятия проходят через день",
      skills: [
        "Работа в Базис Мебельщик на продвинутом уровне",
        "Создание проектов: кухни, шкафы, прихожие",
        "Деталировки, карты присадки, чертежи",
        "Передача проектов сборщикам и на производство",
      ],
      benefits: [
        "Ключ для программы Базис Мебельщик",
        "Сертификат об окончании",
        "Поддержка после окончания курса: консультации, разбор проектов и доработка моделей",
        "Библиотека фурнитуры и материалов",
      ],
      modules: [
        {
          title: "Модуль 1: Продвинутые функции Базис Мебельщик",
          lessons: [
            "Урок 1: Интерфейс и настройки программы",
            "Урок 2: Работа с библиотеками",
            "Урок 3: Создание собственных элементов",
          ],
        },
        {
          title: "Модуль 2: Проектирование сложных конструкций",
          lessons: [
            "Урок 1: Проектирование кухонь",
            "Урок 2: Проектирование шкафов-купе",
            "Урок 3: Проектирование прихожих",
          ],
        },
        {
          title: "Модуль 3: Подготовка документации",
          lessons: ["Урок 1: Создание деталировок", "Урок 2: Карты присадки", "Урок 3: Чертежи для производства"],
        },
        {
          title: "Модуль 4: Взаимодействие с производством",
          lessons: [
            "Урок 1: Подготовка файлов для ЧПУ",
            "Урок 2: Спецификации материалов",
            "Урок 3: Коммуникация с производством",
          ],
        },
      ],
      image: "/images/furniture-proplus-course.png",
    },
  ]

  const course = courses.find((c) => c.id === id)

  if (!course) {
    notFound()
  }

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormResponse(null)

    try {
      console.log("Course enrollment form submission started")
      const response = await submitCourseEnrollment(formData)
      console.log("Course enrollment form submission response:", response)
      setFormResponse(response)

      // Close modal if successful after a delay
      if (response.success) {
        const form = document.getElementById("enrollmentForm") as HTMLFormElement
        form?.reset()

        setTimeout(() => {
          setIsEnrollModalOpen(false)
          setFormResponse(null)
        }, 3000)
      }
    } catch (error) {
      console.error("Course enrollment client-side error:", error)
      setFormResponse({
        success: false,
        message: `Произошла ошибка при отправке заявки: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Link
            href="/courses"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к курсам
          </Link>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {course.level}
                  </Badge>
                  <Badge variant="outline" className="bg-muted">
                    {course.duration}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
                <p className="mt-2 text-muted-foreground">{course.description}</p>
              </div>

              <div className="aspect-video relative rounded-lg overflow-hidden border shadow-sm">
                <Image
                  src={course.image || `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(course.title)}`}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">О курсе</TabsTrigger>
                  <TabsTrigger value="program">Программа</TabsTrigger>
                  <TabsTrigger value="format">Формат</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Описание курса</h2>
                    <p className="text-muted-foreground">{course.fullDescription}</p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Чему вы научитесь</h2>
                    <ul className="space-y-2">
                      {course.skills.map((skill, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Дополнительные преимущества</h2>
                    <ul className="space-y-2">
                      {course.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="program" className="space-y-6 mt-6">
                  <h2 className="text-2xl font-bold">Программа курса</h2>
                  <div className="space-y-4">
                    {course.modules.map((module, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/50 p-4 font-medium">{module.title}</div>
                        <ul className="p-4 space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                {lessonIndex + 1}
                              </div>
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="format" className="space-y-6 mt-6">
                  <h2 className="text-2xl font-bold">Формат обучения</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-6">
                      <h3 className="font-bold mb-2">Формат занятий</h3>
                      <p className="text-muted-foreground">{course.format}</p>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-bold mb-2">Расписание</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{course.time}</p>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-bold mb-2">Продолжительность</h3>
                      <p className="text-muted-foreground">{course.duration}</p>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h3 className="font-bold mb-2">Размер группы</h3>
                      <p className="text-muted-foreground">До 7 человек</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <div className="sticky top-24">
                <Card className="overflow-hidden">
                  <div className="bg-primary/5 p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{course.price}</div>
                      <p className="text-sm text-muted-foreground mt-1">Полный доступ к курсу</p>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Длительность: {course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Уровень: {course.level}</span>
                      </div>
                      {course.startDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm font-medium text-primary">Старт: {course.startDate}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Формат: Очное обучение</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Группа: до 7 человек</span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <Button className="w-full" size="lg" onClick={() => setIsEnrollModalOpen(true)}>
                        Записаться на курс
                      </Button>
                      <Link href="/contacts">
                        <Button variant="outline" className="w-full">
                          Задать вопрос
                        </Button>
                      </Link>
                    </div>

                    {/* Добавляем счетчик акции */}
                    <div className="pt-4 border-t">
                      <h3 className="font-medium text-sm mb-2">Курс включает:</h3>
                      <ul className="space-y-2">
                        {course.id === 1 &&
                          [
                            "Основы корпусной мебели",
                            "Принципы построения мебели",
                            "Обучение программы Базис Мебельщик",
                            "Доступ к Библиотеке",
                            "Практические задания",
                            "Проверка домашних работ",
                            "Сертификат о прохождении",
                            "Трудоустройство",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}

                        {course.id === 2 &&
                          [
                            "Ключ к программе Базис Мебельщик",
                            "Основы корпусной мебели",
                            "Принципы построения мебели",
                            "Обучение программы Базис Мебельщик",
                            "Доступ к Библиотеке",
                            "Практические задания",
                            "Проверка домашних работ",
                            "Сертификат о прохождении",
                            "Трудоустройство",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}

                        {course.id === 3 &&
                          [
                            "Обучение программы Базис Мебельщик",
                            "Доступ к Библиотеке",
                            "Практические задания",
                            "Проверка домашних работ",
                            "Сертификат о прохождении",
                            "Трудоустройство",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}

                        {course.id === 4 &&
                          [
                            "Ключ к программе Базис Мебельщик",
                            "Обучение программы Базис Мебельщик",
                            "Доступ к Библиотеке",
                            "Практические задания",
                            "Проверка домашних работ",
                            "Сертификат о прохождении",
                            "Трудоустройство",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>

                      {/* Добавляем счетчик акции */}
                      <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center border border-primary/20">
                        <p className="font-bold text-sm mb-2">До конца акции осталось:</p>
                        <div className="bg-background rounded-md p-2 inline-block shadow-sm">
                          <CountdownTimer targetDate={new Date("2025-04-22T23:59:59")} />
                        </div>
                        <p className="text-sm font-medium mt-2 text-primary">Скидка 2000 MDL при полной оплате!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Modal */}
        <Dialog open={isEnrollModalOpen} onOpenChange={setIsEnrollModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Запись на курс</DialogTitle>
              <DialogDescription>Заполните форму ниже, и мы свяжемся с вами для уточнения деталей</DialogDescription>
            </DialogHeader>

            {formResponse && (
              <Alert
                className={`mb-4 ${formResponse.success ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
              >
                <AlertTitle>{formResponse.success ? "Успешно!" : "Ошибка!"}</AlertTitle>
                <AlertDescription>{formResponse.message}</AlertDescription>
              </Alert>
            )}

            <form id="enrollmentForm" action={handleSubmit} className="space-y-4">
              <input type="hidden" name="courseId" value={course.id} />
              <input type="hidden" name="courseTitle" value={course.title} />

              <div className="grid gap-2">
                <Label htmlFor="name">ФИО</Label>
                <Input id="name" name="name" required />
                {formResponse?.errors?.name && <p className="text-sm text-red-500">{formResponse.errors.name[0]}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
                {formResponse?.errors?.email && <p className="text-sm text-red-500">{formResponse.errors.email[0]}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" name="phone" required />
                {formResponse?.errors?.phone && <p className="text-sm text-red-500">{formResponse.errors.phone[0]}</p>}
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

              {/* Добавляем выбор способа оплаты */}
              <div className="grid gap-2">
                <Label htmlFor="paymentMethod">Способ оплаты</Label>
                <div className="space-y-2 mt-1">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="payment-installment"
                      name="paymentMethod"
                      value="Рассрочка 0%"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="payment-installment" className="font-normal">
                      Рассрочка 0% (без переплат)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="payment-bank"
                      name="paymentMethod"
                      value="Банковский перевод"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <Label htmlFor="payment-bank" className="font-normal">
                      Банковский перевод
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="payment-cash"
                      name="paymentMethod"
                      value="Наличные"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="payment-cash" className="font-normal">
                      Наличные (через банк)
                    </Label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  При выборе рассрочки наш менеджер свяжется с вами для оформления.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      <SiteFooter />
      <div className="fixed bottom-0 left-0 w-full bg-yellow-100 border-t border-yellow-200 text-center py-2">
        <p className="text-sm text-yellow-700">Скидка 2000 MDL при полной оплате!</p>
      </div>
    </div>
  )
}
