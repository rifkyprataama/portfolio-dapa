"use client"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Sun, Moon, LayoutTemplate } from "lucide-react"
import { useLayoutStore } from "@/store/use-layout-store"

// Kita tambahkan prop className agar orientasinya bisa disesuaikan (mendatar di topbar, menurun di sidebar)
export function SettingsToggles({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [lang, setLang] = useState('US')
  const [mounted, setMounted] = useState(false)
  const { toggleLayout } = useLayoutStore()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null 

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className || ''}`}>
      
      {/* 1. Toggle Bahasa (Wadah Sendiri) */}
      <div className="flex items-center bg-zinc-900/50 rounded-full p-1 border border-zinc-800/50">
        <button 
          onClick={() => setLang('US')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'US' ? 'bg-yellow-400 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          US
        </button>
        <button 
          onClick={() => setLang('ID')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ID' ? 'bg-yellow-400 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          ID
        </button>
      </div>

      {/* 2. Toggle Tema (Wadah Sendiri, Ikon Layar Dihapus) */}
      <div className="flex items-center gap-1 bg-zinc-900/50 rounded-full p-1 border border-zinc-800/50">
        <button 
          onClick={() => setTheme('light')}
          className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-zinc-800 text-yellow-400' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Sun className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Toggle Layout (Wadah Sendiri) */}
      <div className="flex items-center bg-zinc-900/50 rounded-full p-1 border border-zinc-800/50">
        <button 
          onClick={toggleLayout} 
          className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
          title="Switch Layout"
        >
          <LayoutTemplate className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}