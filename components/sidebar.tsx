"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AnimatedStatus } from "./animated-status"
import { SettingsToggles } from "./settings-toggles"
import { 
  Home as HomeIcon, User, Trophy, Briefcase, LayoutDashboard, MessageSquare, Laptop, Mail, Link2, Search, ArrowRight 
} from "lucide-react"

const navLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "#", label: "About", icon: User },
  { href: "#", label: "Achievements", icon: Trophy },
  { href: "#", label: "Projects", icon: Briefcase },
  { href: "#", label: "Dashboard", icon: LayoutDashboard },
  { href: "/guestbook", label: "Guestbook", icon: MessageSquare },
  { href: "#", label: "Uses", icon: Laptop },
  { href: "#", label: "Contact", icon: Mail },
  { href: "#", label: "Links", icon: Link2 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    // Dibuat menjadi flex column biasa, menyatu dengan scroll utama
    <aside className="w-full md:w-60 flex flex-col gap-8 shrink-0 transition-colors duration-500 pb-8">
      
      {/* Profil */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-800/50 shadow-lg overflow-hidden transition-all duration-300 hover:scale-105">
        </div>
        
        <div className="flex items-center gap-1.5">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Daffa Pratama</h2>
          <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.608 1.488a1.5 1.5 0 0 1 1.571-.059l.135.083 2.144 1.428a2.5 2.5 0 0 0 1.25.35h.176l2.553.07a1.5 1.5 0 0 1 1.455 1.341l.015.15v2.554c0 .548.163 1.076.471 1.523l.114.152 1.503 2.155a1.5 1.5 0 0 1 .133 1.487l-.095.17-1.428 2.143a2.5 2.5 0 0 0-.349 1.25v.176l-.07 2.553a1.5 1.5 0 0 1-1.342 1.455l-.15.015h-2.553a2.5 2.5 0 0 0-1.523.471l-.152.114-2.155 1.503a1.5 1.5 0 0 1-1.487.133l-.17-.095-2.144-1.428a2.5 2.5 0 0 0-1.25-.349h-.175l-2.554-.07a1.5 1.5 0 0 1-1.455-1.342l-.015-.15v-2.553c0-.548-.163-1.076-.471-1.523l-.114-.152-1.503-2.155a1.5 1.5 0 0 1-.133-1.487l.095-.17 1.428-2.144a2.5 2.5 0 0 0 .349-1.25v-.175l.07-2.554a1.5 1.5 0 0 1 1.342-1.455l.15-.015h2.553c.548 0 1.076-.163 1.523-.471l.152-.114 2.155-1.503a1.5 1.5 0 0 1 1.317-.238zM10.74 15.68l6.3-6.9a1 1 0 1 0-1.48-1.35l-5.6 6.13-2.6-2.6a1 1 0 1 0-1.42 1.42l3.3 3.3a1 1 0 0 0 1.5-.01z"/>
          </svg>
        </div>

        <AnimatedStatus />
        <SettingsToggles />
      </div>

      {/* Navigasi Utama */}
      <nav className="flex-1 flex flex-col justify-between mt-2">
        <ul className="space-y-1.5 list-none m-0 p-0">
          {navLinks.map((link) => {
            const Icon = link.icon; 
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            
            return (
              <li key={link.label}>
                <Link 
                  href={link.href} 
                  className={cn(
                    "group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ease-out",
                    isActive 
                      ? "bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-sm" 
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4 transition-colors duration-300", isActive ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300")} />
                    {link.label}
                  </div>
                  {isActive && <ArrowRight className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />}
                </Link>
              </li>
            )
          })}

          <li className="pt-6 mt-4 border-t border-zinc-200 dark:border-zinc-800/50">
            <button
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true }))}
              className="w-full group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ease-out text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 transition-colors duration-300 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
                <span>Command Palette</span>
              </div>
              <div className="w-5 h-5 rounded flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-500 font-mono font-bold text-[10px]">
                K
              </div>
            </button>
          </li>
        </ul>

        <div className="pt-8 mt-auto text-[11px] text-zinc-500 dark:text-zinc-600 space-y-1 leading-normal font-medium tracking-tight text-center md:text-left">
          <p className="uppercase">COPYRIGHT © 2026</p>
          <p>Daffa Pratama. All rights reserved.</p>
        </div>
      </nav>

    </aside>
  )
}