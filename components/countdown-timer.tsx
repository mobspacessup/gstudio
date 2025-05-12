"use client"

import { useState, useEffect } from "react"

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return { days, hours, minutes, seconds }
    }

    // Инициализация
    setTimeLeft(calculateTimeLeft())

    // Обновление каждую секунду
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold leading-none">{timeLeft.days}</span>
        <span className="text-xs mt-1">дн</span>
      </div>
      <span className="text-lg font-bold text-primary/70">:</span>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold leading-none">{timeLeft.hours.toString().padStart(2, "0")}</span>
        <span className="text-xs mt-1">ч</span>
      </div>
      <span className="text-lg font-bold text-primary/70">:</span>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold leading-none">{timeLeft.minutes.toString().padStart(2, "0")}</span>
        <span className="text-xs mt-1">мин</span>
      </div>
      <span className="text-lg font-bold text-primary/70">:</span>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold leading-none">{timeLeft.seconds.toString().padStart(2, "0")}</span>
        <span className="text-xs mt-1">сек</span>
      </div>
    </div>
  )
}
