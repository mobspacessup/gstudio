import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Политика конфиденциальности / Politica de Confidențialitate
                </h1>
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
                    Настоящая политика конфиденциальности регулирует порядок обработки и защиты персональных данных,
                    предоставляемых пользователями сайта g-studio.md, принадлежащего компании G-STUDIO DPS SRL.
                  </p>
                  <p className="text-muted-foreground">
                    Această politică de confidențialitate reglementează modul de procesare și protecție a datelor cu
                    caracter personal furnizate de utilizatorii site-ului g-studio.md, deținut de compania G-STUDIO DPS
                    SRL.
                  </p>
                </div>
              </div>

              {/* Раздел 2 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">2. Сбор персональных данных / Colectarea datelor personale</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Мы собираем следующие данные: имя, номер телефона, адрес электронной почты и другую информацию,
                    предоставленную добровольно через формы регистрации или обратной связи.
                  </p>
                  <p className="text-muted-foreground">
                    Colectăm următoarele date: nume, număr de telefon, adresă de e-mail și alte informații oferite
                    voluntar prin formularele de înregistrare sau de contact.
                  </p>
                </div>
              </div>

              {/* Раздел 3 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">3. Цель обработки данных / Scopul prelucrării datelor</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Для предоставления доступа к обучающим программам</li>
                        <li>Для связи с пользователями по поводу обучения, оплаты, расписания</li>
                        <li>Для маркетинга и улучшения качества услуг</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Pentru oferirea accesului la programele educaționale</li>
                        <li>Pentru a contacta utilizatorii privind instruirea, plățile, orarul</li>
                        <li>Pentru marketing și îmbunătățirea serviciilor</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Раздел 4 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">4. Защита данных / Protecția datelor</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Все персональные данные хранятся на защищенных серверах и не передаются третьим лицам без согласия
                    пользователя, за исключением случаев, предусмотренных законодательством.
                  </p>
                  <p className="text-muted-foreground">
                    Toate datele personale sunt stocate pe servere securizate și nu sunt transmise terților fără
                    consimțământul utilizatorului, cu excepția cazurilor prevăzute de lege.
                  </p>
                </div>
              </div>

              {/* Раздел 5 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">5. Права пользователя / Drepturile utilizatorului</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-2">Пользователь имеет право:</p>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Запрашивать информацию о своих данных</li>
                        <li>Требовать их изменения или удаления</li>
                        <li>Отозвать согласие на обработку данных</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">Utilizatorul are dreptul:</p>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Să solicite informații despre datele sale</li>
                        <li>Să ceară modificarea sau ștergerea acestora</li>
                        <li>Să își retragă consimțământul pentru prelucrare</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Раздел 6 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">6. Использование файлов cookie / Utilizarea cookie-urilor</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Сайт может использовать cookies для анализа посещаемости и улучшения пользовательского опыта.
                  </p>
                  <p className="text-muted-foreground">
                    Site-ul poate utiliza cookie-uri pentru analizarea traficului și îmbunătățirea experienței
                    utilizatorului.
                  </p>
                </div>
              </div>

              {/* Раздел 7 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">7. Изменения политики / Modificarea politicii</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Компания G-STUDIO DPS SRL оставляет за собой право вносить изменения в настоящую политику.
                    Актуальная версия всегда доступна на сайте g-studio.md.
                  </p>
                  <p className="text-muted-foreground">
                    Compania G-STUDIO DPS SRL își rezervă dreptul de a modifica această politică. Versiunea actualizată
                    va fi întotdeauna disponibilă pe site-ul g-studio.md.
                  </p>
                </div>
              </div>

              {/* Контакты */}
              <div className="space-y-4 border-t pt-8">
                <h2 className="text-2xl font-bold">Контакты / Contacte</h2>
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
