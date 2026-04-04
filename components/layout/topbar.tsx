"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SettingsToggles } from "./settings-toggles"
import { useLanguageStore } from "@/store/use-language-store" 
import { useCommandStore } from "@/store/use-command-store" 
import { dict } from "@/lib/dictionaries" 
import { ChevronDown, Search } from "lucide-react"

export function Topbar() {
  const pathname = usePathname()
  const { language } = useLanguageStore()
  const d = dict[language]
  
  // Fungsi untuk membuka Command Palette
  const setOpenCommand = useCommandStore((state) => state.setOpen)

  const mainNavItems = [
    { label: d.navHome, href: "/" },
    { label: d.navProjects, href: "/projects" },
    { label: d.navDashboard, href: "/dashboard" },
    { label: d.navGuestbook, href: "/guestbook" },
  ]

  const dropdownNavItems = [
    { label: d.navAbout, href: "/about" },
    { label: d.navAchievements, href: "/achievements" },
    { label: d.navUses, href: "/uses" },
    { label: d.navContact, href: "/contact" },
    { label: d.navLinks, href: "/links" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6 sm:px-10">

        {/* KIRI: Nama */}
        <div className="flex items-center gap-6">
          <h2 className="font-bold text-lg whitespace-nowrap text-zinc-900 dark:text-zinc-100">
            Rifky Pratama
          </h2>
        </div>

        {/* TENGAH: Menu Navigasi & Dropdown */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-[14px] font-medium rounded-md transition-all duration-300",
                  isActive
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                )}
              >
                {item.label}
              </Link>
            )
          })}

          <div className="relative group">
            <button className="flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
              Menus
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-180" />
            </button>
            
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="w-48 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl flex flex-col gap-1">
                {dropdownNavItems.map(item => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      className={cn(
                        "block px-4 py-2.5 text-[14px] font-medium rounded-lg transition-colors",
                        isActive 
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" 
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* KANAN: Toggles Pengaturan */}
        <div className="flex items-center gap-3">
          
          {/* Tombol Command Palette Ala Sidebar (Berdiri Sendiri) */}
          <button 
            onClick={() => setOpenCommand(true)}
            className="group hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Search className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
              {d.commandPalette}
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] font-mono font-bold text-zinc-500">
              ⌘ K
            </kbd>
          </button>

          {/* Tombol Search Kecil (Khusus Tampilan HP) */}
          <button 
            onClick={() => setOpenCommand(true)}
            className="sm:hidden p-2 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Search className="w-5 h-5" />
          </button>

          <SettingsToggles />
        </div>

      </div>
    </header>
  )
}