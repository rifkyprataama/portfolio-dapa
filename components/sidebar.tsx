"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AnimatedStatus } from "./animated-status"
import { SettingsToggles } from "./settings-toggles"
import { useLanguageStore } from "@/store/use-language-store" // Import Store Bahasa
import { dict } from "@/lib/dictionaries" // Import Kamus
import { 
  Home as HomeIcon, User, Trophy, Briefcase, LayoutDashboard, MessageSquare, Laptop, Mail, Link2, Search, ArrowRight 
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  
  // Mengambil bahasa yang aktif dan kamusnya
  const { language } = useLanguageStore()
  const d = dict[language]

  // Data NavLink dipindahkan ke dalam komponen agar bisa membaca `d`
  const navLinks = [
    { href: "/", label: d.navHome, icon: HomeIcon },
    { href: "/about", label: d.navAbout, icon: User },
    { href: "#", label: d.navAchievements, icon: Trophy },
    { href: "#", label: d.navProjects, icon: Briefcase },
    { href: "#", label: d.navDashboard, icon: LayoutDashboard },
    { href: "/guestbook", label: d.navGuestbook, icon: MessageSquare },
    { href: "#", label: d.navUses, icon: Laptop },
    { href: "#", label: d.navContact, icon: Mail },
    { href: "#", label: d.navLinks, icon: Link2 },
  ]

  return (
    <aside className="w-full md:w-64 flex flex-col gap-8 shrink-0 transition-colors duration-500 pb-8 md:sticky md:top-10 self-start z-10">
      
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-28 h-28 rounded-full bg-zinc-200 dark:bg-zinc-800 border-4 border-zinc-200 dark:border-zinc-800/50 shadow-lg overflow-hidden transition-all duration-300 hover:scale-105"></div>
        <div className="flex items-center gap-1.5 mt-1">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Daffa Pratama</h2>
          <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M11.608 1.488a1.5 1.5 0 0 1 1.571-.059l.135.083 2.144 1.428a2.5 2.5 0 0 0 1.25.35h.176l2.553.07a1.5 1.5 0 0 1 1.455 1.341l.015.15v2.554c0 .548.163 1.076.471 1.523l.114.152 1.503 2.155a1.5 1.5 0 0 1 .133 1.487l-.095.17-1.428 2.143a2.5 2.5 0 0 0-.349 1.25v.176l-.07 2.553a1.5 1.5 0 0 1-1.342 1.455l-.15.015h-2.553a2.5 2.5 0 0 0-1.523.471l-.152.114-2.155 1.503a1.5 1.5 0 0 1-1.487.133l-.17-.095-2.144-1.428a2.5 2.5 0 0 0-1.25-.349h-.175l-2.554-.07a1.5 1.5 0 0 1-1.455-1.342l-.015-.15v-2.553c0-.548-.163-1.076-.471-1.523l-.114-.152-1.503-2.155a1.5 1.5 0 0 1-.133-1.487l.095-.17 1.428-2.144a2.5 2.5 0 0 0 .349-1.25v-.175l.07-2.554a1.5 1.5 0 0 1 1.342-1.455l.15-.015h2.553c.548 0 1.076-.163 1.523-.471l.152-.114 2.155-1.503a1.5 1.5 0 0 1 1.317-.238zM10.74 15.68l6.3-6.9a1 1 0 1 0-1.48-1.35l-5.6 6.13-2.6-2.6a1 1 0 1 0-1.42 1.42l3.3 3.3a1 1 0 0 0 1.5-.01z"/></svg>
        </div>
        <AnimatedStatus />
        <SettingsToggles />
      </div>

      <nav className="flex-1 flex flex-col justify-between mt-2">
        <ul className="space-y-1.5 list-none m-0 p-0">
          {navLinks.map((link) => {
            const Icon = link.icon; 
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <li key={link.label}>
                <Link href={link.href} className={cn("group flex items-center justify-between px-4 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-300 ease-out", isActive ? "bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200")}>
                  <div className="flex items-center gap-3.5">
                    <Icon className={cn("w-5 h-5 transition-colors duration-300", isActive ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300")} />
                    {link.label}
                  </div>
                  {isActive && <ArrowRight className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />}
                </Link>
              </li>
            )
          })}

          <li className="pt-5 mt-4 border-t border-zinc-200 dark:border-zinc-800/50">
            <button onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true }))} className="w-full group flex items-center justify-between px-4 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-300 ease-out text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200">
              <div className="flex items-center gap-3.5">
                <Search className="w-5 h-5 transition-colors duration-300 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
                <span>{d.commandPalette}</span> {/* Dinamis */}
              </div>
              <div className="w-5 h-5 rounded flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-500 font-mono font-bold text-xs">K</div>
            </button>
          </li>
        </ul>

        <div className="pt-8 mt-6 text-xs text-zinc-500 dark:text-zinc-500 space-y-1.5 leading-normal font-medium tracking-tight flex flex-col items-center text-center">
          <p className="uppercase">{d.copyright}</p> {/* Dinamis */}
          <p>{d.rights}</p> {/* Dinamis */}
        </div>
      </nav>
    </aside>
  )
}