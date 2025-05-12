"use client"

import { useEffect } from "react"

export default function TawkChat() {
  useEffect(() => {
    // Скрипт для интеграции Tawk.to
    const script = document.createElement("script")
    script.async = true
    script.src = "https://embed.tawk.to/YOUR_TAWK_ID/default" // Замените YOUR_TAWK_ID на ваш ID из Tawk.to
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")
    document.head.appendChild(script)

    return () => {
      // Удаляем скрипт при размонтировании компонента
      document.head.removeChild(script)
    }
  }, [])

  return null // Компонент не рендерит никакой UI, только добавляет скрипт
}
