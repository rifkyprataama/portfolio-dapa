"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Command } from "cmdk"
import { 
  Home, User, Trophy, Briefcase, LayoutDashboard, MessageSquare, 
  Laptop, Mail, Link2, Sun, Moon, LayoutTemplate, Search, Zap, Globe
} from "lucide-react"
import { useLayoutStore } from "@/store/use-layout-store"

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const { layout, toggleLayout } = useLayoutStore()
  const [lang, setLang] = React.useState('US') // State untuk bahasa

  // Mendengarkan tombol Cmd+K, Ctrl+K, dan Escape
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  // Jika tidak open, jangan render apa-apa
  if (!open) return null

  return (
    // Background Overlay (Klik di luar kotak akan menutup palette)
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4"
      onClick={() => setOpen(false)}
    >
      {/* Kotak Utama Command Palette */}
      <div 
        className="w-full max-w-[640px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-2xl overflow-hidden font-sans transform transition-all"
        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam kotak menutup palette
      >
        <Command label="Command Palette" className="w-full bg-transparent">
          
          <div className="flex items-center gap-3 px-3 py-2 border-b border-zinc-200 dark:border-zinc-800">
            <Search className="w-5 h-5 text-zinc-500" />
            <Command.Input
              autoFocus
              placeholder="Search commands (or type 'Home', 'Theme'...)"
              className="flex-1 text-base bg-transparent outline-none text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
            <div className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
              <kbd>ESC</kbd>
            </div>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto pt-2 space-y-1">
            <Command.Empty className="py-6 text-center text-sm text-zinc-500">No results found.</Command.Empty>

            {/* 1. Kelompok Navigasi */}
            <Command.Group heading="NAVIGATION" className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-4 pt-3 pb-2">
              {navItems.map((item) => (
                <CommandItem key={item.label} label={item.label} icon={item.icon} onSelect={() => runCommand(() => router.push(item.href))} />
              ))}
            </Command.Group>
            
            <div className="h-px bg-zinc-100 dark:bg-zinc-800/50 my-2 mx-2"></div>

            {/* 2. Kelompok Settings (Disesuaikan persis dengan menu) */}
            <Command.Group heading="SETTINGS" className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-4 pt-3 pb-2">
              
              {/* Theme: Hanya Light & Dark */}
              <CommandItem 
                label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`} 
                icon={theme === 'dark' ? Sun : Moon} 
                onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'))} 
              />

              {/* Layout: Sidebar <-> Topbar */}
              <CommandItem 
                label={`Switch to ${layout === 'sidebar' ? 'Topbar' : 'Sidebar'} Layout`} 
                icon={LayoutTemplate} 
                onSelect={() => runCommand(() => toggleLayout())} 
              />

              {/* Language: US <-> ID */}
              <CommandItem 
                label={`Switch Language to ${lang === 'US' ? 'ID' : 'US'}`} 
                icon={Globe} 
                onSelect={() => runCommand(() => setLang(lang === 'US' ? 'ID' : 'US'))} 
              />
              
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}

function CommandItem({ label, icon: Icon, onSelect }: { label: string; icon: React.ElementType; onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3.5 px-4 py-2.5 mx-1 rounded-xl text-zinc-600 dark:text-zinc-400 cursor-pointer transition-colors duration-150 aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-900/80 aria-selected:text-zinc-900 dark:aria-selected:text-zinc-50"
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium flex-1">{label}</span>
      <div className="w-5 h-5 rounded flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
         <Zap className="w-3 h-3"/>
      </div>
    </Command.Item>
  )
}

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "#", label: "Achievements", icon: Trophy },
  { href: "#", label: "Projects", icon: Briefcase },
  { href: "#", label: "Dashboard", icon: LayoutDashboard },
  { href: "/guestbook", label: "Guestbook", icon: MessageSquare },
  { href: "#", label: "Uses", icon: Laptop },
  { href: "#", label: "Contact", icon: Mail },
  { href: "#", label: "Links", icon: Link2 },
]