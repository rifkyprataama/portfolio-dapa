"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SettingsToggles } from "./settings-toggles" // Mengimpor tombol toggle yang baru

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
        
        {/* Kiri: Nama Saja (Teks animasi dihapus agar tidak merusak layout menu) */}
        <div className="flex items-center gap-6">
          <h2 className="font-bold text-lg whitespace-nowrap">Daffa Pratama</h2>
        </div>
        
        {/* Tengah: Menu Navigasi */}
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

        {/* Kanan: Toggles Pengaturan yang baru kita perbarui */}
        <div className="flex items-center">
           <SettingsToggles className="flex-row" />
        </div>

      </div>
    </header>
  )
}