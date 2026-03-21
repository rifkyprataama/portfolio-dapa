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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6 sm:px-10">
        
        {/* Kiri: Nama Saja */}
        <div className="flex items-center gap-6">
          <h2 className="font-bold text-lg whitespace-nowrap text-zinc-900 dark:text-zinc-100">Daffa Pratama</h2>
        </div>
        
        {/* Tengah: Menu Navigasi */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all duration-300",
                  isActive 
                    ? "bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Kanan: Toggles Pengaturan */}
        <div className="flex items-center">
           {/* PERBAIKAN: Menghapus className="flex-row" yang memicu error */}
           <SettingsToggles />
        </div>

      </div>
    </header>
  )
}