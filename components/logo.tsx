import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <div className="relative h-10 w-auto">
        <Image src="/logo.png" alt="G-Studio Logo" width={180} height={60} className="h-10 w-auto" priority />
      </div>
    </Link>
  )
}
