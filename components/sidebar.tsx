"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AnimatedStatus } from "./animated-status"

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Guestbook", href: "/guestbook" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r min-h-screen py-10 pr-6 mr-8">
      {/* Bagian Profil & Animasi Status */}
      <div className="px-4 mb-8">
        <h2 className="font-bold text-lg whitespace-nowrap">Daffa Pratama</h2>
        <AnimatedStatus className="mt-2" />
      </div>

      {/* Menu Navigasi Vertikal */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              pathname === item.href 
                ? "bg-secondary text-secondary-foreground" 
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Tempat Toggle Bahasa, Tema & Layout */}
      <div className="pt-6 border-t px-4 space-y-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Settings</p>
        <div className="h-8 w-full bg-zinc-900/50 rounded animate-pulse" />
      </div>
    </aside>
  )
}