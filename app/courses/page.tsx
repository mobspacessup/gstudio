import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CourseCard } from "@/components/course-card"
import CountdownTimer from "@/components/countdown-timer"

export const metadata = {
  title: "Курсы по проектированию мебели в Базис Мебельщик",
  description:
    "Выберите подходящий курс по проектированию мебели в программе Базис Мебельщик. Обучение с гарантией трудоустройства в Кишиневе.",
  alternates: {
    canonical: "https://g-studio.md/courses",
  },
}

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "Проектировщик мебели START",
      description:
        "Для тех, кто хочет войти в мебельную сферу, но не имеет опыта и хочет научиться проектировать в программе Базис Мебельщик.",
      price: "30 000 MDL",
      startDate: "7 июля 2025",
      duration: "3 месяца",
      level: "Начинающий",
      featured: true,
      image: "/images/furniture-design-course.png",
    },
    {
      id: 2,
      title: "Проектировщик мебели START+",
      description:
        "Для тех, кто хочет войти в мебельную сферу, но не имеет опыта и хочет научиться проектировать в программе Базис Мебельщик. Дополнительно вы получаете КЛЮЧ к программе Базис Мебельщик.",
      price: "34 500 MDL",
      duration: "3 месяца",
      level: "Начинающий",
      image: "/images/basis-design-course.png",
    },
    {
      id: 3,
      title: "Проектировщик мебели PRO",
      description: "Для тех, кто уже работает с мебелью и хочет научиться проектировать в программе Базис Мебельщик.",
      price: "20 000 MDL",
      startDate: "26 мая 2025",
      duration: "2 месяца",
      level: "Продвинутый",
      image: "/images/furniture-pro-course.png",
    },
    {
      id: 4,
      title: "Проектировщик мебели PRO+",
      description:
        "Для тех, кто уже работает с мебелью и хочет научиться проектировать в программе Базис Мебельщик. Дополнительно вы получаете КЛЮЧ к программе Базис Мебельщик.",
      price: "24 500 MDL",
      duration: "2 месяца",
      level: "Продвинутый",
      image: "/images/furniture-proplus-course.png",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Наши курсы</h1>
                <p className="text-muted-foreground md:text-xl">Выберите курс, который подходит именно вам</p>
              </div>
            </div>

            {/* Плашка с акцией */}
            <div className="mt-6 bg-primary text-primary-foreground rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="font-bold">Скидка 2000 MDL при полной оплате!</p>
                  <p className="text-sm">Акция действует до 22 апреля 2025</p>
                </div>
                <div className="bg-primary-foreground/20 rounded-lg p-2">
                  <CountdownTimer targetDate={new Date("2025-04-22T23:59:59")} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter">Часто задаваемые вопросы</h2>
                <p className="text-muted-foreground">Ответы на популярные вопросы о наших курсах</p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-8 space-y-4">
              {[
                {
                  question: "Какой формат обучения?",
                  answer:
                    "Очное обучение по адресу G-Studio, мини-группы до 7 человек. Утренняя и вечерняя группы проходят занятия через день, по 3 часа, 2–3 раза в неделю.",
                },
                {
                  question: "Гарантируете ли вы трудоустройство?",
                  answer:
                    "Да, мы гарантируем трудоустройство после завершения любого из наших курсов. Мы сотрудничаем с ведущими мебельными компаниями, которые заинтересованы в наших выпускниках.",
                },
                {
                  question: "Что такое поддержка после окончания курса?",
                  answer:
                    "Поддержка включает разбор ваших проектов, помощь по вопросам, консультации в течение 2 месяцев после окончания курса. Вы можете обращаться за консультацией, разбором проектов и доработкой своих моделей.",
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-lg border p-6">
                  <h3 className="font-bold">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
              <div className="flex justify-center mt-8">
                <Link href="/faq">
                  <Button variant="outline">
                    Все вопросы
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter">Остались вопросы?</h2>
                <p className="md:text-xl">Свяжитесь с нами, и мы поможем выбрать подходящий курс</p>
              </div>

              {/* Добавляем счетчик акции */}
              <div className="bg-primary-foreground/20 rounded-lg p-4 mt-4 mb-2 flex flex-col items-center">
                <p className="font-bold mb-2 text-primary-foreground">Акция заканчивается через:</p>
                <div className="bg-primary-foreground/10 rounded-lg p-2 inline-block">
                  <CountdownTimer targetDate={new Date("2025-04-22T23:59:59")} />
                </div>
                <p className="text-sm mt-2 text-primary-foreground">Скидка 2000 MDL при полной оплате!</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/contacts">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Связаться с нами
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
