"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, Users, Play } from "lucide-react"
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
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
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

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)
    return match ? match[1] : null
  }

  const videoId = "eWWBOkiGOq8" // Your video ID
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="w-[95vw] max-w-[600px] max-h-[95vh] p-0 overflow-hidden overflow-y-auto"
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
            className="absolute right-2 top-2 sm:right-4 sm:top-4 rounded-full bg-background/80 p-1.5 sm:p-1 text-muted-foreground hover:bg-background hover:text-foreground z-20 touch-manipulation"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {!showEnrollmentForm ? (
            // Основное содержимое с видео
            <div className="flex flex-col">
              {/* Заголовок */}
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 sm:p-6 text-center">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 leading-tight">
                  Долгожданный мастер класс от
                  <br />
                  G-STUDIO
                </h2>
                <p className="text-sm sm:text-base md:text-lg opacity-90">Не пропусти! Количество мест ограничено!</p>
                <p className="text-sm sm:text-base md:text-lg font-medium mt-2">14 июня в 16:00</p>
              </div>

              {/* Видео секция */}
              <div className="relative bg-black">
                <div className="aspect-[9/16] relative overflow-hidden w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] mx-auto">
                  {videoError ? (
                    // Fallback если видео не загружается
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                      <Play className="h-12 w-12 mb-4 opacity-70" />
                      <p className="text-sm text-center mb-4">Видео временно недоступно</p>
                      <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline text-sm"
                      >
                        Смотреть на YouTube
                      </a>
                    </div>
                  ) : (
                    <>
                      {/* Thumbnail пока видео загружается */}
                      {!videoLoaded && (
                        <div className="absolute inset-0 z-10">
                          <img
                            src={thumbnailUrl || "/placeholder.svg"}
                            alt="Превью видео мастер-класса"
                            className="w-full h-full object-cover"
                            onError={() => setVideoError(true)}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                          </div>
                        </div>
                      )}

                      {/* YouTube iframe */}
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&disablekb=0&autoplay=0&mute=0&start=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
                        title="G Studio мастер класс проектирования мебели"
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        onLoad={() => {
                          setVideoLoaded(true)
                          console.log("Video iframe loaded successfully")
                        }}
                        onError={() => {
                          setVideoError(true)
                          console.error("Video iframe failed to load")
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Альтернативная ссылка */}
                <div className="text-center py-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary underline"
                  >
                    Открыть видео в YouTube
                  </a>
                </div>
              </div>

              {/* Информация о мастер-классе */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                    <span>14 июня</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                    <span>16:00</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                    <span>15 мест</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
                  <h3 className="font-bold mb-2 text-sm sm:text-base">Что вы узнаете:</h3>
                  <ul className="text-xs sm:text-sm space-y-1 text-muted-foreground">
                    <li>• Как войти в мебельную индустрию без опыта</li>
                    <li>• Секреты работы в программе Базис Мебельщик</li>
                    <li>• Реальные кейсы наших выпускников</li>
                    <li>• Как найти первых клиентов</li>
                  </ul>
                </div>

                {/* Кнопки */}
                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    className="w-full h-11 sm:h-10 text-sm sm:text-base touch-manipulation"
                    onClick={handleEnrollClick}
                  >
                    Записаться на мастер-класс
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-11 sm:h-10 text-sm sm:text-base touch-manipulation"
                    onClick={handleClose}
                  >
                    Закрыть
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Форма записи (остается без изменений)
            <div className="flex flex-col max-h-[95vh] overflow-y-auto">
              {/* Заголовок формы */}
              <div className="bg-primary/10 p-4 sm:p-6 border-b flex-shrink-0">
                <button
                  onClick={handleBackToVideo}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground mb-3 sm:mb-4 flex items-center gap-1 touch-manipulation"
                >
                  ← Назад к видео
                </button>
                <div className="text-center space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-primary leading-tight">
                    Регистрация на Бесплатный Мастер Класс от
                    <br />
                    G-STUDIO
                  </h3>
                  <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
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
              <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
                {formResponse && (
                  <Alert
                    className={`mb-4 ${formResponse.success ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
                  >
                    <AlertTitle className="text-sm">{formResponse.success ? "Успешно!" : "Ошибка!"}</AlertTitle>
                    <AlertDescription className="text-xs sm:text-sm">{formResponse.message}</AlertDescription>
                  </Alert>
                )}

                <form id="masterclassForm" action={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city" className="text-sm">
                      Город проживания <span className="text-red-500">*</span>
                    </Label>
                    <Input id="city" name="city" required className="h-11 sm:h-10 text-sm touch-manipulation" />
                    {formResponse?.errors?.city && (
                      <p className="text-xs text-red-500">{formResponse.errors.city[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="fullName" className="text-sm">
                      Имя Фамилия <span className="text-red-500">*</span>
                    </Label>
                    <Input id="fullName" name="fullName" required className="h-11 sm:h-10 text-sm touch-manipulation" />
                    {formResponse?.errors?.fullName && (
                      <p className="text-xs text-red-500">{formResponse.errors.fullName[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-sm">
                      Номер телефона <span className="text-red-500">*</span>
                    </Label>
                    <Input id="phone" name="phone" required className="h-11 sm:h-10 text-sm touch-manipulation" />
                    {formResponse?.errors?.phone && (
                      <p className="text-xs text-red-500">{formResponse.errors.phone[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="organization" className="text-sm">
                      Организация <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="organization"
                      name="organization"
                      required
                      className="h-11 sm:h-10 text-sm touch-manipulation"
                    />
                    {formResponse?.errors?.organization && (
                      <p className="text-xs text-red-500">{formResponse.errors.organization[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="position" className="text-sm">
                      Какая у вас сейчас должность? <span className="text-red-500">*</span>
                    </Label>
                    <Input id="position" name="position" required className="h-11 sm:h-10 text-sm touch-manipulation" />
                    {formResponse?.errors?.position && (
                      <p className="text-xs text-red-500">{formResponse.errors.position[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="basisExperience" className="text-sm">
                      Работали ли вы ранее в программе Базис Мебельщик? <span className="text-red-500">*</span>
                    </Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="basis-expert"
                          name="basisExperience"
                          value="Да! Уверенный пользователь"
                          className="h-4 w-4 mt-0.5 border-gray-300 text-primary focus:ring-primary touch-manipulation flex-shrink-0"
                          required
                        />
                        <Label htmlFor="basis-expert" className="font-normal text-sm leading-relaxed">
                          Да! Уверенный пользователь
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="basis-tried"
                          name="basisExperience"
                          value="Пробовал, но хочу научится"
                          className="h-4 w-4 mt-0.5 border-gray-300 text-primary focus:ring-primary touch-manipulation flex-shrink-0"
                        />
                        <Label htmlFor="basis-tried" className="font-normal text-sm leading-relaxed">
                          Пробовал, но хочу научится
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="basis-no"
                          name="basisExperience"
                          value="Нет"
                          className="h-4 w-4 mt-0.5 border-gray-300 text-primary focus:ring-primary touch-manipulation flex-shrink-0"
                        />
                        <Label htmlFor="basis-no" className="font-normal text-sm leading-relaxed">
                          Нет
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="basis-other"
                          name="basisExperience"
                          value="other"
                          className="h-4 w-4 mt-0.5 border-gray-300 text-primary focus:ring-primary touch-manipulation flex-shrink-0"
                        />
                        <Label htmlFor="basis-other" className="font-normal text-sm leading-relaxed">
                          Другое:
                        </Label>
                      </div>
                      <div className="ml-7">
                        <Input
                          id="basisOther"
                          name="basisOther"
                          placeholder="Укажите ваш вариант"
                          className="text-sm h-11 sm:h-10 touch-manipulation"
                        />
                      </div>
                    </div>
                    {formResponse?.errors?.basisExperience && (
                      <p className="text-xs text-red-500">{formResponse.errors.basisExperience[0]}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-10 text-sm sm:text-base touch-manipulation"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Зарегистрироваться на мастер-класс"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
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
