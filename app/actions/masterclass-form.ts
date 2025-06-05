"use server"

import { z } from "zod"

// Form validation schema
const MasterclassFormSchema = z.object({
  city: z.string().min(2, { message: "Город должен содержать минимум 2 символа" }),
  fullName: z.string().min(2, { message: "Имя и фамилия должны содержать минимум 2 символа" }),
  phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
  organization: z.string().min(2, { message: "Название организации должно содержать минимум 2 символа" }),
  position: z.string().min(2, { message: "Должность должна содержать минимум 2 символа" }),
  basisExperience: z.string().min(1, { message: "Выберите один из вариантов" }),
  basisOther: z.string().optional(),
})

// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = "7587937962:AAGlFzrR-x2Fb4QEtIWB86mAPenZV7ffyEo"
const TELEGRAM_CHAT_ID = "-1002592531264"

export async function submitMasterclassEnrollment(formData: FormData) {
  console.log("Masterclass enrollment started")

  try {
    // Extract form data
    const data = {
      city: formData.get("city") as string,
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      organization: formData.get("organization") as string,
      position: formData.get("position") as string,
      basisExperience: formData.get("basisExperience") as string,
      basisOther: formData.get("basisOther") as string,
    }

    console.log("Masterclass enrollment data:", data)

    // Validate form data
    const validatedData = MasterclassFormSchema.safeParse(data)

    if (!validatedData.success) {
      console.error("Validation error:", validatedData.error.flatten())
      return {
        success: false,
        message: "Пожалуйста, проверьте правильность заполнения формы",
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    // Prepare basis experience text
    let basisExperienceText = data.basisExperience
    if (data.basisExperience === "other" && data.basisOther) {
      basisExperienceText = `Другое: ${data.basisOther}`
    }

    // Format message for Telegram
    const messageText = `
🎯 *Новая регистрация на мастер-класс G-STUDIO*

📅 *Дата мастер-класса*: 14 Июня, 2025 г., 16:00
📍 *Адрес*: ш. Мунчешть 147/1

👤 *Участник*:
• *Имя*: ${data.fullName}
• *Город*: ${data.city}
• *Телефон*: ${data.phone}
• *Организация*: ${data.organization}
• *Должность*: ${data.position}
• *Опыт с Базис Мебельщик*: ${basisExperienceText}

📅 *Дата регистрации*: ${new Date().toLocaleString("ru-RU")}
    `

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

    console.log("Masterclass enrollment successful")
    return {
      success: true,
      message: "Ваша регистрация успешно отправлена! Мы свяжемся с вами для подтверждения участия в мастер-классе.",
    }
  } catch (error) {
    console.error("Masterclass enrollment error:", error)
    return {
      success: false,
      message: `Произошла ошибка при отправке заявки: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
    }
  }
}
