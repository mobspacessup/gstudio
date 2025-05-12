import ContactsPageClient from "./ContactsPageClient"

export const metadata = {
  title: "Контакты - G-Studio",
  description:
    "Свяжитесь с нами для получения информации о курсах по проектированию мебели в программе Базис Мебельщик в Кишиневе.",
  alternates: {
    canonical: "https://g-studio.md/contacts",
  },
}

export default function ContactsPage() {
  return <ContactsPageClient />
}
