import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export const metadata = {
  title: "Блог о проектировании мебели - G-Studio",
  description: "Полезные статьи о проектировании мебели и работе в программе Базис Мебельщик от экспертов G-Studio.",
  alternates: {
    canonical: "https://g-studio.md/blog",
  },
}

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Тренды в дизайне мебели 2024",
      excerpt:
        "Обзор актуальных тенденций в дизайне мебели в 2024 году. Какие материалы, цвета и формы будут популярны в этом сезоне.",
      date: "15 апреля 2024",
      author: "Анна Смирнова",
      category: "Дизайн",
      image: "/placeholder.svg?height=400&width=600&text=Тренды+в+дизайне+мебели",
    },
    {
      id: 2,
      title: "Как выбрать материалы для мебели",
      excerpt:
        "Руководство по выбору качественных материалов для изготовления мебели. На что обращать внимание при выборе ЛДСП, МДФ и других материалов.",
      date: "10 апреля 2024",
      author: "Иван Петров",
      category: "Материалы",
      image: "/placeholder.svg?height=400&width=600&text=Материалы+для+мебели",
    },
    {
      id: 3,
      title: "Новые функции в Базис Мебельщик 11",
      excerpt:
        "Обзор новых возможностей и улучшений в последней версии программы Базис Мебельщик. Что нового появилось и как это использовать.",
      date: "5 апреля 2024",
      author: "Дмитрий Иванов",
      category: "Программы",
      image: "/placeholder.svg?height=400&width=600&text=Базис+Мебельщик+11",
    },
    {
      id: 4,
      title: "Эргономика в проектировании кухонь",
      excerpt:
        "Принципы эргономики, которые необходимо учитывать при проектировании кухонных гарнитуров. Как создать функциональное и удобное пространство.",
      date: "1 апреля 2024",
      author: "Елена Козлова",
      category: "Проектирование",
      image: "/placeholder.svg?height=400&width=600&text=Эргономика+кухонь",
    },
    {
      id: 5,
      title: "Оптимизация раскроя материалов",
      excerpt:
        "Советы по оптимизации раскроя материалов для снижения отходов и экономии средств. Как правильно планировать раскрой и использовать программные инструменты.",
      date: "25 марта 2024",
      author: "Сергей Николаев",
      category: "Производство",
      image: "/placeholder.svg?height=400&width=600&text=Оптимизация+раскроя",
    },
    {
      id: 6,
      title: "Визуализация мебельных проектов",
      excerpt:
        "Техники создания реалистичных визуализаций мебельных проектов. Как настроить освещение, материалы и камеру для получения качественных рендеров.",
      date: "20 марта 2024",
      author: "Ольга Соколова",
      category: "Визуализация",
      image: "/placeholder.svg?height=400&width=600&text=Визуализация+проектов",
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Блог G-Studio</h1>
                <p className="text-muted-foreground md:text-xl">
                  Полезные статьи о проектировании мебели и работе в программе Базис Мебельщик
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="flex flex-col overflow-hidden">
                  <div className="aspect-video relative">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link href={`/blog/${post.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Читать статью
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-2xl font-bold">Подпишитесь на нашу рассылку</h2>
                <p className="text-muted-foreground">Получайте новые статьи и полезные материалы на свою почту</p>
              </div>
              <div className="flex w-full max-w-md flex-col sm:flex-row gap-2 mt-4">
                <Input placeholder="Ваш email" type="email" className="flex-1" />
                <Button>Подписаться</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
