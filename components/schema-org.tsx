export function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "G-Studio",
          url: "https://g-studio.md",
          logo: "https://g-studio.md/logo.png",
          description: "Профессиональные курсы по проектированию мебели в программе Базис Мебельщик",
          address: {
            "@type": "PostalAddress",
            streetAddress: "ш. Мунчешть 147/1",
            addressLocality: "Кишинев",
            addressCountry: "Молдова",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+37378932008",
            contactType: "customer service",
            email: "curs@g-studio.md",
          },
          sameAs: ["https://www.facebook.com/gstudio", "https://www.instagram.com/gstudio"],
        }),
      }}
    />
  )
}
