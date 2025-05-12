"use server"

import { z } from "zod"

// Form validation schema
const CourseFormSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
  email: z.string().email({ message: "Введите корректный email адрес" }),
  phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
  courseId: z.string(),
  courseTitle: z.string(),
  timePreference: z.string().optional(),
  paymentMethod: z.string().optional(), // Добавляем поле для способа оплаты
})

// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = "7587937962:AAGlFzrR-x2Fb4QEtIWB86mAPenZV7ffyEo"
// Обновленный ID супергруппы
const TELEGRAM_CHAT_ID = "-1002592531264"

export async function submitCourseEnrollment(formData: FormData) {
  console.log("Course enrollment started")

  try {
    // Extract form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      courseId: formData.get("courseId") as string,
      courseTitle: formData.get("courseTitle") as string,
      timePreference: formData.get("timePreference") as string,
      paymentMethod: formData.get("paymentMethod") as string, // Получаем способ оплаты
    }

    console.log("Course enrollment data:", data)

    // Validate form data
    const validatedData = CourseFormSchema.safeParse(data)

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
🎓 *Новая заявка на курс*

👤 *Имя*: ${data.name}
📧 *Email*: ${data.email}
📱 *Телефон*: ${data.phone}
📚 *Курс*: ${data.courseTitle} (ID: ${data.courseId})
`

    // Add time preference if provided
    if (data.timePreference && data.timePreference !== "none") {
      messageText += `🕒 *Предпочтительное время*: ${data.timePreference}\n`
    }

    // Add payment method if provided
    if (data.paymentMethod) {
      messageText += `💰 *Способ оплаты*: ${data.paymentMethod}\n`
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
        message: `Ошибка при отправке заявки: ${telegramResponse.status} ${telegramData.description || ""}`,
      }
    }

    console.log("Course enrollment successful")
    return {
      success: true,
      message: "Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
    }
  } catch (error) {
    console.error("Course enrollment error:", error)
    return {
      success: false,
      message: `Произошла ошибка при отправке заявки: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
    }
  }
}
