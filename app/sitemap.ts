import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://g-studio.md"

  // Основные страницы сайта
  const routes = ["", "/courses", "/blog", "/faq", "/contacts", "/privacy", "/terms", "/delivery"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Добавляем страницы курсов
  const courseIds = [1, 2, 3, 4]
  const courseRoutes = courseIds.map((id) => ({
    url: `${baseUrl}/courses/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  return [...routes, ...courseRoutes]
}
