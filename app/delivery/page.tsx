import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function DeliveryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Условия оплаты</h1>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-10">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Способы оплаты</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">1. Банковский перевод</h3>
                    <p className="text-muted-foreground">
                      После регистрации на курс вы получите счёт и реквизиты для оплаты. Вы можете произвести оплату
                      через мобильное приложение банка, онлайн-банкинг или в отделении банка.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">2. Оплата наличными через банк</h3>
                    <p className="text-muted-foreground">
                      Мы предоставим вам счёт на оплату, с которым вы можете обратиться в любой банк и внести оплату
                      наличными. После этого необходимо отправить подтверждение платежа на нашу электронную почту.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Условия возврата</h2>
                <p className="text-muted-foreground">
                  Вы можете вернуть деньги в течение 7 дней после начала курса, если курс вам не подходит. Для этого
                  необходимо связаться с нами по электронной почте curs@g-studio.md и указать причину возврата.
                </p>
              </div>

              <div className="space-y-4 border-t pt-8">
                <h2 className="text-2xl font-bold">Контакты</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>G-STUDIO DPS SRL</strong>
                  </p>
                  <p>Адрес: MD-7427, r-l Taraclia, s. Valea Perjei, str. Lenin 108</p>
                  <p>C.F.: 1025600015639</p>
                  <p>Email: curs@g-studio.md</p>
                  <p>Website: www.g-studio.md</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
