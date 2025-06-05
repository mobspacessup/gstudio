"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, Users } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitMasterclassEnrollment } from "@/app/actions/masterclass-form"

export default function MasterclassPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formResponse, setFormResponse] = useState<{
    success?: boolean
    message?: string
    errors?: Record<string, string[]>
  } | null>(null)

  useEffect(() => {
    // Проверяем, показывали ли мы уже мастер-класс в этой сессии
    const hasSeenMasterclass = localStorage.getItem("hasSeenMasterclassPopup")

    // Если не показывали, то показываем
    if (!hasSeenMasterclass) {
      // Небольшая задержка для лучшего UX
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setShowEnrollmentForm(false)
    setFormResponse(null)
    // Сохраняем в localStorage, что пользователь уже видел мастер-класс
    localStorage.setItem("hasSeenMasterclassPopup", "true")
  }

  const handleEnrollClick = () => {
    setShowEnrollmentForm(true)
  }

  const handleBackToVideo = () => {
    setShowEnrollmentForm(false)
    setFormResponse(null)
  }

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormResponse(null)

    try {
      console.log("Masterclass enrollment form submission started")
      const response = await submitMasterclassEnrollment(formData)
      console.log("Masterclass enrollment form submission response:", response)
      setFormResponse(response)

      // Close modal if successful after a delay
      if (response.success) {
        const form = document.getElementById("masterclassForm") as HTMLFormElement
        form?.reset()

        setTimeout(() => {
          handleClose()
        }, 3000)
      }
    } catch (error) {
      console.error("Masterclass enrollment client-side error:", error)
      setFormResponse({
        success: false,
        message: `Произошла ошибка при отправке заявки: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-[600px] p-0 overflow-hidden"
        hideCloseButton
        aria-describedby="masterclass-popup-description"
      >
        <div className="relative">
          <div id="masterclass-popup-description" className="sr-only">
            Приглашение на бесплатный мастер-класс по проектированию мебели
          </div>

          {/* Кнопка закрытия */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full bg-background/80 p-1 text-muted-foreground hover:bg-background hover:text-foreground z-20"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>

          {!showEnrollmentForm ? (
            // Основное содержимое с видео
            <div>
              {/* Заголовок */}
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">
                  Долгожданный мастер класс от
                  <br />
                  G-STUDIO
                </h2>
                <p className="text-lg opacity-90">Не пропусти! Количество мест ограничено!</p>
                <p className="text-lg font-medium mt-2">14 июня в 16:00</p>
              </div>

              {/* Видео секция */}
              <div className="relative bg-black">
                <div className="aspect-video relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%" /* 16:9 Aspect Ratio */,
                      height: 0,
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/V9COANyh91Y?rel=0&modestbranding=1&controls=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1"
                      title="Мастер класс проектирования мебели"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                        pointerEvents: "none",
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Информация о мастер-классе */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>14 июня</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>16:00</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    <span>15 мест</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Что вы узнаете:</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Как войти в мебельную индустрию без опыта</li>
                    <li>• Секреты работы в программе Базис Мебельщик</li>
                    <li>• Реальные кейсы наших выпускников</li>
                    <li>• Как найти первых клиентов</li>
                  </ul>
                </div>

                {/* Кнопки */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button className="flex-1" onClick={handleEnrollClick}>
                    Записаться на мастер-класс
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleClose}>
                    Закрыть
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Форма записи
            <div>
              {/* Заголовок формы */}
              <div className="bg-primary/10 p-6 border-b">
                <button
                  onClick={handleBackToVideo}
                  className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
                >
                  ← Назад к видео
                </button>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-primary">
                    Регистрация на Бесплатный Мастер Класс от
                    <br />
                    G-STUDIO
                  </h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      <strong>Дата:</strong> 14 Июня, 2025 г.
                    </p>
                    <p>
                      <strong>Время:</strong> 16:00
                    </p>
                    <p>
                      <strong>Адрес:</strong> ш. Мунчешть 147/1
                    </p>
                    <p>
                      <strong>Контакты:</strong> +373 78 932 008
                    </p>
                  </div>
                </div>
              </div>

              {/* Форма */}
              <div className="p-6">
                {formResponse && (
                  <Alert
                    className={`mb-4 ${formResponse.success ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
                  >
                    <AlertTitle>{formResponse.success ? "Успешно!" : "Ошибка!"}</AlertTitle>
                    <AlertDescription>{formResponse.message}</AlertDescription>
                  </Alert>
                )}

                <form id="masterclassForm" action={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">
                      Город проживания <span className="text-red-500">*</span>
                    </Label>
                    <Input id="city" name="city" required />
                    {formResponse?.errors?.city && (
                      <p className="text-sm text-red-500">{formResponse.errors.city[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="fullName">
                      Имя Фамилия <span className="text-red-500">*</span>
                    </Label>
                    <Input id="fullName" name="fullName" required />
                    {formResponse?.errors?.fullName && (
                      <p className="text-sm text-red-500">{formResponse.errors.fullName[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">
                      Номер телефона <span className="text-red-500">*</span>
                    </Label>
                    <Input id="phone" name="phone" required />
                    {formResponse?.errors?.phone && (
                      <p className="text-sm text-red-500">{formResponse.errors.phone[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="organization">
                      Организация <span className="text-red-500">*</span>
                    </Label>
                    <Input id="organization" name="organization" required />
                    {formResponse?.errors?.organization && (
                      <p className="text-sm text-red-500">{formResponse.errors.organization[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="position">
                      Какая у вас сейчас должность? <span className="text-red-500">*</span>
                    </Label>
                    <Input id="position" name="position" required />
                    {formResponse?.errors?.position && (
                      <p className="text-sm text-red-500">{formResponse.errors.position[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="basisExperience">
                      Работали ли вы ранее в программе Базис Мебельщик? <span className="text-red-500">*</span>
                    </Label>
                    <div className="space-y-2 mt-1">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="basis-expert"
                          name="basisExperience"
                          value="Да! Уверенный пользователь"
                          className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                          required
                        />
                        <Label htmlFor="basis-expert" className="font-normal">
                          Да! Уверенный пользователь
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="basis-tried"
                          name="basisExperience"
                          value="Пробовал, но хочу научится"
                          className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="basis-tried" className="font-normal">
                          Пробовал, но хочу научится
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="basis-no"
                          name="basisExperience"
                          value="Нет"
                          className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="basis-no" className="font-normal">
                          Нет
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="basis-other"
                          name="basisExperience"
                          value="other"
                          className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="basis-other" className="font-normal">
                          Другое:
                        </Label>
                      </div>
                      <div className="ml-6">
                        <Input
                          id="basisOther"
                          name="basisOther"
                          placeholder="Укажите ваш вариант"
                          className="text-sm"
                        />
                      </div>
                    </div>
                    {formResponse?.errors?.basisExperience && (
                      <p className="text-sm text-red-500">{formResponse.errors.basisExperience[0]}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Зарегистрироваться на мастер-класс"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="/privacy" className="underline hover:no-underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
