import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Users, Award, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CourseCard } from "@/components/course-card"
import CountdownTimer from "@/components/countdown-timer"

export default function Home() {
  const featuredCourses = [
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
      id: 3,
      title: "Проектировщик мебели PRO",
      description: "Для тех, кто уже работает с мебелью и хочет научиться проектировать в программе Базис Мебельщик.",
      price: "20 000 MDL",
      startDate: "26 мая 2025",
      duration: "2 месяца",
      level: "Продвинутый",
      featured: true,
      image: "/images/furniture-pro-course.png",
    },
  ]

  // Дата окончания акции - 22 апреля 2025
  const promoEndDate = new Date("2025-04-22T23:59:59")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Promo Banner with Marquee Effect and Countdown - Entire Banner Clickable */}
        <Link href="/courses" className="block">
          <div className="bg-primary text-primary-foreground py-3 overflow-hidden relative cursor-pointer hover:bg-primary/90 transition-colors">
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {/* Duplicate content for seamless loop */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center mx-4">
                  <div className="flex items-center gap-2 font-bold">
                    <Clock className="h-5 w-5 animate-pulse" />
                    <span>АКЦИЯ!</span>
                  </div>
                  <p className="font-semibold mx-4">
                    Скидка 2000 MDL при полной оплате! Только до 22 апреля — успей записаться на курс
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-foreground/20 rounded-lg px-3 py-1">
                      <CountdownTimer targetDate={promoEndDate} />
                    </div>
                    <span className="inline-flex items-center justify-center px-4 py-1.5 bg-primary-foreground text-primary rounded-md font-medium text-sm whitespace-nowrap">
                      Выбрать курс
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
        </Link>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-muted py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <span className="text-primary">G-Studio</span>
                  <span className="mx-1 text-muted-foreground">•</span>
                  <span className="text-muted-foreground">Курсы по проектированию мебели</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl uppercase">
                  iPHONE ИЛИ НОВАЯ ПРОФЕССИЯ?
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Освой профессию проектировщика мебели за цену смартфона и выходи на доход от 1500 € в месяц!
                  Практическое обучение в Базис Мебельщик — инвестиция в карьеру на всю жизнь.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/courses">
                    <Button size="lg" className="w-full sm:w-auto">
                      Записаться
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contacts">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Связаться с нами
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Стационарное обучение</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Гибкий график</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>Гарантия трудоустройства</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary to-primary/50 opacity-30 blur-xl"></div>
                <div className="relative rounded-xl overflow-hidden border shadow-xl">
                  <Image
                    src="/images/home-hero.png"
                    alt="Проектирование мебели в Базис Мебельщик"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Почему выбирают наши курсы
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Мы предлагаем комплексный подход к обучению проектированию мебели
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
              {[
                {
                  icon: <CheckCircle className="h-12 w-12" />,
                  title: "Мини-группы до 7 человек",
                  description: "Обучение в небольших группах позволяет преподавателю уделить внимание каждому студенту",
                },
                {
                  icon: <CheckCircle className="h-12 w-12" />,
                  title: "Гарантия трудоустройства",
                  description:
                    "После окончания любого из наших курсов мы гарантируем трудоустройство в мебельные компании",
                },
                {
                  icon: <CheckCircle className="h-12 w-12" />,
                  title: "Поддержка после курса",
                  description:
                    "Мы продолжаем поддерживать наших выпускников, помогая с разбором проектов и консультациями",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border bg-gradient-to-b from-background to-background/80 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20"></div>
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Популярные курсы</h2>
                <p className="text-muted-foreground md:text-xl">Выберите курс, который подходит именно вам</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 mt-12">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Link href="/courses">
                <Button variant="outline" size="lg">
                  Все курсы
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Готовы начать обучение?</h2>
                <p className="md:text-xl">
                  Присоединяйтесь к нашим курсам и станьте профессионалом в проектировании мебели
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/courses">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Выбрать курс
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contacts">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    Задать вопрос
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
