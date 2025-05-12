import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, GraduationCap, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"

// Добавляем отображение даты старта курса в компонент CourseCard
// Добавляем startDate в интерфейс CourseCardProps
interface CourseCardProps {
  id: number
  title: string
  description: string
  price: string
  duration: string
  level: string
  image?: string
  featured?: boolean
  startDate?: string
}

// Добавляем startDate в параметры компонента
export function CourseCard({
  id,
  title,
  description,
  price,
  duration,
  level,
  image,
  featured = false,
  startDate,
}: CourseCardProps) {
  // Упрощаем логику изображения
  const imageUrl = `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(title)}`

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md h-full",
        featured && "border-primary/20 bg-primary/5",
      )}
    >
      <div className="aspect-video relative">
        <Image
          src={image || `https://source.unsplash.com/random/800x600/?student,education,${encodeURIComponent(title)}`}
          alt={`Курс ${title} - G-Studio`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured && (
          <Badge className={`absolute top-2 ${id === 1 ? "left-2" : "right-2"} bg-primary text-primary-foreground`}>
            Популярный курс
          </Badge>
        )}
      </div>
      <CardContent className="flex-1 p-5">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>

        {/* Добавляем отображение даты старта в CardContent после уровня */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <GraduationCap className="mr-1 h-4 w-4" />
            {level}
          </div>
          {startDate && (
            <div className="flex items-center text-sm font-medium text-primary">
              <Calendar className="mr-1 h-4 w-4" />
              Старт: {startDate}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-5 bg-muted/30 mt-auto">
        <div className="font-bold">{price}</div>
        <Link href={`/courses/${id}`}>
          <Button>
            Подробнее
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
