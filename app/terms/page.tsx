import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Условия использования</h1>
                <p className="text-muted-foreground md:text-xl">Termeni de utilizare a site-ului g-studio.md</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-10">
              {/* Раздел 1 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">1. Общие положения / Dispoziții generale</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Настоящие условия регулируют порядок использования сайта https://g-studio.md, принадлежащего SRL
                    "G-STUDIO DPS". Посещая сайт, вы соглашаетесь с этими условиями.
                  </p>
                  <p className="text-muted-foreground">
                    Acești termeni reglementează modul de utilizare a site-ului https://g-studio.md, deținut de SRL
                    "G-STUDIO DPS". Prin accesarea site-ului, sunteți de acord cu acești termeni.
                  </p>
                </div>
              </div>

              {/* Раздел 2 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">2. Авторские права / Drepturi de autor</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Все материалы, размещённые на сайте (тексты, изображения, видео), принадлежат SRL "G-STUDIO DPS" и
                    защищены законодательством. Их копирование, распространение и использование без разрешения
                    запрещено.
                  </p>
                  <p className="text-muted-foreground">
                    Toate materialele de pe site (texte, imagini, video) aparțin SRL "G-STUDIO DPS" și sunt protejate de
                    lege. Copierea și distribuirea fără permisiune sunt interzise.
                  </p>
                </div>
              </div>

              {/* Раздел 3 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">3. Обязательства пользователя / Obligațiile utilizatorului</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-2">Пользователь обязуется:</p>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>не нарушать работу сайта</li>
                        <li>не использовать сайт в незаконных целях</li>
                        <li>предоставлять достоверную информацию при регистрации</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">Utilizatorul se obligă:</p>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>să nu perturbe funcționarea site-ului</li>
                        <li>să nu folosească site-ul în scopuri ilegale</li>
                        <li>să furnizeze informații reale la înregistrare</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Раздел 4 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">4. Отказ от ответственности / Limitarea răspunderii</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    SRL "G-STUDIO DPS" не несёт ответственности за возможные сбои в работе сайта, потери данных или
                    вред, причинённый в результате использования сайта.
                  </p>
                  <p className="text-muted-foreground">
                    SRL "G-STUDIO DPS" nu este responsabil pentru eventuale erori de funcționare, pierderi de date sau
                    daune rezultate din utilizarea site-ului.
                  </p>
                </div>
              </div>

              {/* Раздел 5 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">5. Изменения условий / Modificarea termenilor</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Администрация сайта оставляет за собой право изменять условия без предварительного уведомления.
                    Изменения вступают в силу с момента публикации.
                  </p>
                  <p className="text-muted-foreground">
                    Administratorul site-ului își rezervă dreptul de a modifica termenii fără notificare prealabilă.
                    Modificările intră în vigoare din momentul publicării.
                  </p>
                </div>
              </div>

              {/* Контакты */}
              <div className="space-y-4 border-t pt-8">
                <h2 className="text-2xl font-bold">6. Контакты / Contacte</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>SRL "G-STUDIO DPS"</strong>
                  </p>
                  <p>MD-7427, r-l Taraclia, s. Valea Perjei, str. Lenin 108</p>
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
