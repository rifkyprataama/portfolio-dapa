"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AnimatedStatus } from "./animated-status"

// Kita gunakan menu yang sama, tapi tanpa ikon agar rapi secara horizontal
const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Guestbook", href: "/guestbook" },
]

export function Topbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Bagian Kiri: Profil & Animasi Status yang baru kita buat */}
        <div className="flex items-center gap-6">
          <h2 className="font-bold text-lg whitespace-nowrap">Daffa Pratama</h2>
          <AnimatedStatus className="hidden md:flex w-32" />
        </div>
        
        {/* Bagian Tengah: Menu Navigasi Horizontal */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === item.href 
                  ? "bg-secondary text-secondary-foreground" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bagian Kanan: Tempat Toggle Bahasa, Tema & Layout (Akan kita isi nanti) */}
        <div className="flex items-center gap-4">
           <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Settings</p>
           {/* Placeholder untuk tombol-tombol toggle */}
           <div className="h-8 w-24 bg-zinc-900/50 rounded animate-pulse" />
        </div>

      </div>
    </header>
  )
}