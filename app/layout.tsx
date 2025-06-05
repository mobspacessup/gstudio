import type React from "react"
import "@/app/globals.css"
import { Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SchemaOrg } from "@/components/schema-org"
import Script from "next/script"
// Импортируйте один из компонентов чата (временно закомментировано)
// import ChatWidget from "@/components/chat-widget" // или Chatbot, или TawkChat
// Заменяем импорт PromoPopup на MasterclassPopup
import MasterclassPopup from "@/components/masterclass-popup"

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata = {
  metadataBase: new URL("https://g-studio.md"),
  title: {
    default: "G-Studio - Курсы по проектированию мебели в Базис Мебельщик",
    template: "%s | G-Studio",
  },
  description:
    "Профессиональные курсы по проектированию мебели в программе Базис Мебельщик. Обучение с гарантией трудоустройства в Кишиневе.",
  keywords: [
    "курсы проектирования мебели",
    "Базис Мебельщик",
    "обучение проектированию мебели",
    "курсы мебельщика",
    "Кишинев",
    "Молдова",
  ],
  authors: [{ name: "G-Studio" }],
  creator: "G-Studio",
  publisher: "G-Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "G-Studio - Курсы по проектированию мебели",
    description: "Освойте профессию проектировщика мебели и выходите на доход от 1500 € в месяц!",
    url: "https://g-studio.md",
    siteName: "G-Studio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "G-Studio - Курсы по проектированию мебели",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "G-Studio - Курсы по проектированию мебели",
    description: "Освойте профессию проектировщика мебели и выходите на доход от 1500 € в месяц!",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "https://g-studio.md",
  },
  verification: {
    google: "zSv8KJbmJeT59bPkNYRat44iFe1y75frk9bnHJmpq4A",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          {/* Добавляем компонент мастер-класса */}
          <MasterclassPopup />
          {/* Временно отключаем компонент чата */}
          {/* <ChatWidget /> */}
        </ThemeProvider>
        <SchemaOrg />

        {/* Яндекс Метрика */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.webvisor.org/metrika/tag_ww.js", "ym");

            ym(100874020, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                trackHash:true,
                ecommerce:"dataLayer"
            });
          `}
        </Script>

        {/* Для пользователей с отключенным JavaScript */}
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/100874020" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  )
}
