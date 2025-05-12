import { Button } from "@/components/ui/button"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "Часто задаваемые вопросы - G-Studio",
  description: "Ответы на часто задаваемые вопросы о курсах по проектированию мебели в программе Базис Мебельщик.",
  alternates: {
    canonical: "https://g-studio.md/faq",
  },
}

export default function FAQPage() {
  const faqs = [
    {
      question: "Какие требования к компьютеру для работы с программой Базис Мебельщик?",
      answer:
        "Для комфортной работы с программой Базис Мебельщик рекомендуется компьютер со следующими характеристиками: процессор Intel Core i5 или аналогичный AMD, 16 ГБ оперативной памяти, видеокарта с поддержкой OpenGL 4.0 и 4 ГБ видеопамяти, 10 ГБ свободного места на жестком диске SSD, операционная система Windows 10 X64 (предпочтительно RU версия).",
    },
    {
      question: "Нужен ли опыт работы с программами для проектирования мебели?",
      answer:
        "Для курса опыт работы с программами для проектирования мебели не требуется. Мы начинаем обучение с самых основ и постепенно переходим к более сложным темам.",
    },
    {
      question: "Как проходит обучение?",
      answer:
        "Обучение проходит очно в Кишинёве по адресу str. Muncesti 147/1. Группы по 7 человек, занятия проводятся через день — в утреннее (9:00–12:00) или вечернее время (19:00–22:00).",
    },
    {
      question: "Получу ли я сертификат?",
      answer: "Да, все выпускники, успешно завершившие обучение, получают фирменный сертификат G-Studio DPS SRL.",
    },
    {
      question: "Можно ли получить доступ к материалам курса после его окончания?",
      answer: "Да, доступ к материалам курса сохраняется после его окончания.",
    },
    {
      question: "Какие способы оплаты доступны?",
      answer: (
        <>
          <p className="mb-4">1. Банковский перевод</p>
          <p className="mb-4">
            После регистрации вы получите счёт и реквизиты для оплаты. Вы можете произвести оплату через мобильное
            приложение банка, онлайн-банкинг или в отделении.
          </p>
          <p className="mb-4">2. Оплата наличными через банк</p>
          <p>
            Мы предоставим вам счёт на оплату, с которым вы можете обратиться в любой банк и внести оплату наличными.
            После этого необходимо отправить подтверждение платежа.
          </p>
        </>
      ),
    },
    {
      question: "Что если мне не подойдёт курс?",
      answer: "Вы можете вернуть деньги в течение 7 дней после начала курса.",
    },
    {
      question: "Как часто обновляются материалы курсов?",
      answer:
        "Материалы курсов обновляются при выходе новых версий программы Базис Мебельщик, а также на основе обратной связи от студентов. Мы стараемся поддерживать актуальность наших курсов и добавлять новую информацию по мере необходимости.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Часто задаваемые вопросы
                </h1>
                <p className="text-muted-foreground md:text-xl">Ответы на самые популярные вопросы о наших курсах</p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-12">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left font-medium py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter">Не нашли ответ на свой вопрос?</h2>
                <p className="text-muted-foreground md:text-xl">
                  Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы
                </p>
              </div>
              <div className="mt-6">
                <Link href="/contacts">
                  <Button size="lg">Связаться с нами</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
