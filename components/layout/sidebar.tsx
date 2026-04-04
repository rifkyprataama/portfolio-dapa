"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AnimatedStatus } from "../ui/animated-status"
import { SettingsToggles } from "./settings-toggles"
import { useLanguageStore } from "@/store/use-language-store" 
import { useCommandStore } from "@/store/use-command-store" 
import { dict } from "@/lib/dictionaries" 
import {
  Home as HomeIcon, User, Trophy, Briefcase, LayoutDashboard, MessageSquare, Laptop, Mail, Link2, Search, ArrowRight
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const { language } = useLanguageStore()
  const setOpenCommand = useCommandStore((state) => state.setOpen) 
  const d = dict[language]

  const navLinks = [
    { href: "/", label: d.navHome, icon: HomeIcon },
    { href: "/about", label: d.navAbout, icon: User },
    { href: "/achievements", label: d.navAchievements, icon: Trophy },
    { href: "/projects", label: d.navProjects, icon: Briefcase },
    { href: "/dashboard", label: d.navDashboard, icon: LayoutDashboard },
    { href: "/guestbook", label: d.navGuestbook, icon: MessageSquare },
    { href: "/uses", label: d.navUses, icon: Laptop },
    { href: "/contact", label: d.navContact, icon: Mail },
    { href: "/links", label: d.navLinks, icon: Link2 },
  ]

  // Komponen Pemisah Standar (Bisa dipakai berulang-ulang dengan jarak yang konsisten)
  const Divider = () => (
    <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-5"></div>
  )

  return (
    <aside className="w-full md:w-64 flex flex-col shrink-0 transition-colors duration-500 pb-8 md:sticky md:top-10 self-start z-10">

      {/* --- BAGIAN 1: PROFIL --- */}
      <div className="flex flex-col items-center text-center gap-4 pt-2">
        <div className="w-28 h-28 rounded-full bg-zinc-200 dark:bg-zinc-800 border-4 border-zinc-200 dark:border-zinc-800/50 shadow-lg overflow-hidden transition-all duration-300 hover:scale-105">
          <img 
            src="foto-profilku.jpg" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="flex items-center gap-1.5 mt-1">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Rifky Pratama</h2>
        </div>
        
        <AnimatedStatus />
        <SettingsToggles />
      </div>

      {/* Garis Pemisah antara Profil dan Navigasi */}
      <Divider />

      {/* --- BAGIAN 2: NAVIGASI UTAMA --- */}
      <nav className="flex-1 flex flex-col">
        <ul className="space-y-1 list-none m-0 p-0">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <li key={link.label}>
                <Link href={link.href} className={cn("group flex items-center justify-between px-4 py-2.5 rounded-xl text-[15px] font-medium transition-all duration-300 ease-out", isActive ? "bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200")}>
                  <div className="flex items-center gap-3.5">
                    <Icon className={cn("w-5 h-5 transition-colors duration-300", isActive ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300")} />
                    {link.label}
                  </div>
                  {isActive && <ArrowRight className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Garis Pemisah antara Navigasi dan Command Palette */}
        <Divider />

        {/* --- BAGIAN 3: COMMAND PALETTE --- */}
        <button 
          onClick={() => setOpenCommand(true)} 
          className="w-full group flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all duration-300 shadow-sm hover:shadow"
        >
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
            <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">{d.commandPalette}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono font-bold text-zinc-500 border border-zinc-200 dark:border-zinc-700">
            ⌘ K
          </div>
        </button>

        {/* Garis Pemisah antara Command Palette dan Copyright */}
        <Divider />

        {/* --- BAGIAN 4: COPYRIGHT --- */}
        <div className="text-xs text-zinc-500 dark:text-zinc-500 space-y-1.5 leading-normal font-medium tracking-tight flex flex-col items-center text-center">
          <p className="uppercase">{d.copyright}</p>
          <p>{d.rights}</p>
        </div>
      </nav>
      
    </aside>
  )
}