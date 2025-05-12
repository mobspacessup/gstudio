"use server"

import { z } from "zod"

// Form validation schema
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
  email: z.string().email({ message: "Введите корректный email адрес" }),
  phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
  message: z.string().min(5, { message: "Сообщение должно содержать минимум 5 символов" }),
  course: z.string().optional(),
  timePreference: z.string().optional(),
})

type ContactFormData = z.infer<typeof ContactFormSchema>

// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = "7587937962:AAGlFzrR-x2Fb4QEtIWB86mAPenZV7ffyEo"
// Обновленный ID супергруппы
const TELEGRAM_CHAT_ID = "-1002592531264"

export async function submitContactForm(formData: FormData) {
  console.log("Form submission started")

  try {
    // Extract form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      course: formData.get("course") as string,
      timePreference: formData.get("timePreference") as string,
    }

    console.log("Form data:", data)

    // Validate form data
    const validatedData = ContactFormSchema.safeParse(data)

    if (!validatedData.success) {
      console.error("Validation error:", validatedData.error.flatten())
      return {
        success: false,
        message: "Пожалуйста, проверьте правильность заполнения формы",
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    // Format message for Telegram
    let messageText = `
🔔 *Новая заявка с сайта G-Studio*

👤 *Имя*: ${data.name}
📧 *Email*: ${data.email}
📱 *Телефон*: ${data.phone}
💬 *Сообщение*: ${data.message}
`

    // Add course and time preference if provided
    if (data.course && data.course !== "none") {
      messageText += `📚 *Интересующий курс*: ${data.course}\n`
    }

    if (data.timePreference && data.timePreference !== "none") {
      messageText += `🕒 *Предпочтительное время*: ${data.timePreference}\n`
    }

    messageText += `\n📅 *Дата*: ${new Date().toLocaleString("ru-RU")}`

    console.log("Sending to Telegram:", { chatId: TELEGRAM_CHAT_ID, messageLength: messageText.length })

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    console.log("Telegram API URL:", telegramUrl)

    const telegramResponse = await fetch(telegramUrl, {
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

    console.log("Telegram API response status:", telegramResponse.status)

    const telegramData = await telegramResponse.json()
    console.log("Telegram API response data:", telegramData)

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", telegramData)
      return {
        success: false,
        message: `Ошибка при отправке сообщения: ${telegramResponse.status} ${telegramData.description || ""}`,
      }
    }

    console.log("Form submission successful")
    return {
      success: true,
      message: "Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return {
      success: false,
      message: `Произошла ошибка при отправке формы: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
    }
  }
}
