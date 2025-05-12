"use client"

import { useEffect } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"

export default function YandexMetrika({ yandexMetrikaId }: { yandexMetrikaId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Отслеживание изменения страницы для SPA
  useEffect(() => {
    if (window.ym && yandexMetrikaId) {
      window.ym(Number.parseInt(yandexMetrikaId, 10), "hit", window.location.href)
    }
  }, [pathname, searchParams, yandexMetrikaId])

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${yandexMetrikaId}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${yandexMetrikaId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}

// Добавляем глобальное объявление типа для window.ym
declare global {
  interface Window {
    ym: (counterId: number, action: string, url: string, options?: any) => void
  }
}
