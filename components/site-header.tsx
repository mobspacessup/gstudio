"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, MessageSquare, Newspaper, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Главная",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/courses",
      label: "Курсы",
      icon: BookOpen,
      active: pathname === "/courses" || pathname.startsWith("/courses/"),
    },
    {
      href: "/blog",
      label: "Блог",
      icon: Newspaper,
      active: pathname === "/blog" || pathname.startsWith("/blog/"),
    },
    {
      href: "/faq",
      label: "FAQ",
      icon: MessageSquare,
      active: pathname === "/faq",
    },
    {
      href: "/contacts",
      label: "Контакты",
      icon: Phone,
      active: pathname === "/contacts",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <span className="sr-only">Открыть меню</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Logo />
              </div>
              <nav className="grid gap-2 text-lg font-medium mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg",
                      route.active ? "text-primary font-semibold" : "text-muted-foreground",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>
        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary font-semibold" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
