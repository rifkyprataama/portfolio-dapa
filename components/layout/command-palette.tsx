"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Command } from "cmdk"
import { 
  Home, User, Trophy, LayoutDashboard, MessageSquare, 
  Monitor, Mail, Link as LinkIcon, Sun, Moon, LayoutTemplate, Search, Zap, Globe
} from "lucide-react"
import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store"
import { useCommandStore } from "@/store/use-command-store"
import { dict } from "@/lib/dictionaries"

export function CommandPalette() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { layout, toggleLayout } = useLayoutStore()
  
  const { language, setLanguage } = useLanguageStore() 
  const d = dict[language]
  
  const { isOpen, setOpen, toggle } = useCommandStore()

  // Mendengarkan tombol Cmd+K, Ctrl+K, dan Escape
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
      // Mengembalikan fungsi ESC untuk menutup palette
      if (e.key === "Escape") {
        e.preventDefault()
        setOpen(false)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [toggle, setOpen])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [setOpen])

  if (!isOpen) return null

  // Daftar Navigasi Dinamis
  const navItems = [
    { href: "/", label: d.navHome, icon: Home },
    { href: "/about", label: d.navAbout, icon: User },
    { href: "/achievements", label: d.navAchievements, icon: Trophy },
    { href: "/projects", label: d.navProjects, icon: LayoutDashboard },
    { href: "/dashboard", label: d.navDashboard, icon: Monitor },
    { href: "/guestbook", label: d.navGuestbook, icon: MessageSquare },
    { href: "/uses", label: d.navUses, icon: Monitor },
    { href: "/contact", label: d.navContact, icon: Mail },
    { href: "/links", label: d.navLinks, icon: LinkIcon },
  ]

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4"
      onClick={() => setOpen(false)}
    >
      <div 
        className="w-full max-w-[640px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-2xl overflow-hidden font-sans transform transition-all"
        onClick={(e) => e.stopPropagation()} 
      >
        <Command label="Command Palette" className="w-full bg-transparent">
          
          <div className="flex items-center gap-3 px-3 py-2 border-b border-zinc-200 dark:border-zinc-800">
            <Search className="w-5 h-5 text-zinc-500" />
            <Command.Input
              autoFocus
              placeholder={d.commandPalette + "..."}
              className="flex-1 text-base bg-transparent outline-none text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
            {/* Tombol ESC yang sekarang bisa diklik */}
            <button 
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono font-bold rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <kbd>ESC</kbd>
            </button>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto pt-2 space-y-1">
            <Command.Empty className="py-6 text-center text-sm text-zinc-500">No results found.</Command.Empty>

            {/* 1. Kelompok Navigasi Dinamis */}
            <Command.Group heading={d.cmdGroupNav} className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-4 pt-3 pb-2">
              {navItems.map((item) => (
                <CommandItem key={item.label} label={item.label} icon={item.icon} onSelect={() => runCommand(() => router.push(item.href))} />
              ))}
            </Command.Group>
            
            <div className="h-px bg-zinc-100 dark:bg-zinc-800/50 my-2 mx-2"></div>

            {/* 2. Kelompok Settings Dinamis */}
            <Command.Group heading={d.cmdGroupSettings} className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-4 pt-3 pb-2">
              
              <CommandItem 
                label={theme === 'dark' ? d.cmdThemeLight : d.cmdThemeDark} 
                icon={theme === 'dark' ? Sun : Moon} 
                onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'))} 
              />

              <CommandItem 
                label={layout === 'sidebar' ? d.cmdLayoutTopbar : d.cmdLayoutSidebar} 
                icon={LayoutTemplate} 
                onSelect={() => runCommand(() => toggleLayout())} 
              />

              <CommandItem 
                label={language === 'US' ? d.cmdLangID : d.cmdLangUS} 
                icon={Globe} 
                onSelect={() => runCommand(() => setLanguage(language === 'US' ? 'ID' : 'US'))} 
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