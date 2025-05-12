"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Проверяем, показывали ли мы уже поп-ап в этой сессии
    const hasSeenPopup = localStorage.getItem("hasSeenPromoPopup")

    // Если не показывали, то показываем
    if (!hasSeenPopup) {
      // Небольшая задержка для лучшего UX
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Сохраняем в localStorage, что пользователь уже видел поп-ап
    localStorage.setItem("hasSeenPromoPopup", "true")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-[500px] p-0 overflow-hidden"
        hideCloseButton
        aria-describedby="promo-popup-description"
      >
        <div className="relative">
          <div id="promo-popup-description" className="sr-only">
            Информация о рассрочке 0% на обучение в G-Studio
          </div>
          {/* Кнопка закрытия */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full bg-background/80 p-1 text-muted-foreground hover:bg-background hover:text-foreground z-10"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Верхняя часть с логотипом */}
          <div className="bg-primary/10 p-6 flex justify-center border-b">
            <div className="relative h-12 w-auto">
              <Image src="/logo.png" alt="G-Studio Logo" width={180} height={60} className="h-12 w-auto" priority />
            </div>
          </div>

          {/* Содержимое */}
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-center">Обучение в рассрочку 0%</h3>

            <div className="space-y-3 text-muted-foreground">
              <p>
                Теперь вы можете пройти обучение и начать зарабатывать, не откладывая на потом. Доступна рассрочка под
                0% — оплачивайте в кредит без переплат, без лишней бюрократии.
              </p>
              <p>Выбирайте удобный путь к новой профессии прямо сейчас. Оформление — онлайн, быстро и прозрачно.</p>
            </div>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/courses" className="flex-1">
                <Button className="w-full" onClick={handleClose}>
                  Выбрать курс
                </Button>
              </Link>
              <Button variant="outline" className="flex-1" onClick={handleClose}>
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
