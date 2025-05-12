"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Предопределенные ответы на часто задаваемые вопросы
const predefinedAnswers: Record<string, string> = {
  курс: "У нас есть несколько курсов по проектированию мебели: START, START+, PRO и PRO+. Подробнее можно узнать на странице курсов.",
  цена: "Стоимость курсов варьируется от 20 000 до 33 500 MDL. Сейчас действует акция: скидка 2000 MDL при полной оплате!",
  расписание:
    "Занятия проходят в утреннее (9:00-12:00) или вечернее время (19:00-22:00), через день, 2-3 раза в неделю.",
  адрес: "Мы находимся по адресу: г. Кишинев, ш. Мунчешть 147/1",
  контакты: "Вы можете связаться с нами по телефону +37378932008 или по email: curs@g-studio.md",
  трудоустройство: "Да, мы гарантируем трудоустройство после завершения любого из наших курсов!",
  базис:
    "Базис Мебельщик - это профессиональная программа для проектирования мебели. На наших курсах вы научитесь работать с ней с нуля.",
  записаться:
    "Чтобы записаться на курс, перейдите на страницу курсов, выберите подходящий курс и нажмите кнопку 'Записаться на курс'.",
  оплата:
    "Оплату можно произвести банковским переводом или наличными через банк. После регистрации вы получите счет и реквизиты для оплаты.",
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; time: string }[]>([
    {
      text: "Здравствуйте! Я виртуальный помощник G-Studio. Чем могу помочь?",
      isUser: false,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Автоматическая прокрутка вниз при новых сообщениях
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Функция для отправки сообщения в Telegram, если бот не смог ответить
  const sendToTelegram = async (message: string) => {
    try {
      const TELEGRAM_BOT_TOKEN = "7587937962:AAGlFzrR-x2Fb4QEtIWB86mAPenZV7ffyEo"
      const TELEGRAM_CHAT_ID = "-1002592531264"

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

      const messageText = `
💬 *Новое сообщение из чат-бота на сайте*

📝 *Сообщение*: ${message}
ℹ️ *Примечание*: Бот не смог найти ответ на этот вопрос.

📅 *Дата*: ${new Date().toLocaleString("ru-RU")}
      `

      await fetch(telegramUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: "Markdown",
        }),
      })
    } catch (error) {
      console.error("Ошибка при отправке в Telegram:", error)
    }
  }

  // Функция для поиска ответа на вопрос пользователя
  const findAnswer = (question: string): string | null => {
    const lowerQuestion = question.toLowerCase()

    // Проверяем каждое ключевое слово
    for (const [keyword, answer] of Object.entries(predefinedAnswers)) {
      if (lowerQuestion.includes(keyword.toLowerCase())) {
        return answer
      }
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isSubmitting) return

    const userMessage = {
      text: inputValue,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsSubmitting(true)

    // Ищем ответ на вопрос
    const answer = findAnswer(userMessage.text)

    setTimeout(() => {
      let botResponse

      if (answer) {
        // Если нашли ответ в предопределенных вопросах
        botResponse = {
          text: answer,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      } else {
        // Если не нашли ответ
        botResponse = {
          text: "Извините, я не могу ответить на этот вопрос. Хотите, чтобы наш менеджер связался с вами?",
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        // Отправляем сообщение в Telegram, если бот не смог ответить
        sendToTelegram(userMessage.text)
      }

      setMessages((prev) => [...prev, botResponse])
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <>
      {/* Кнопка открытия чата */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90 transition-all"
          aria-label="Открыть чат"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Окно чата */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-background rounded-lg shadow-xl border overflow-hidden flex flex-col">
          {/* Заголовок */}
          <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
            <h3 className="font-semibold">Чат с G-Studio</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground"
              aria-label="Закрыть чат"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 p-3 overflow-y-auto max-h-96 bg-muted/30">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Форма ввода */}
          <form onSubmit={handleSubmit} className="p-3 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите сообщение..."
                disabled={isSubmitting}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isSubmitting}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
