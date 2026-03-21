"use client"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Sun, Moon, LayoutTemplate } from "lucide-react"
import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store" // Import store bahasa
import { cn } from "@/lib/utils"

export function SettingsToggles() {
  const { theme, setTheme } = useTheme()
  const { layout, toggleLayout } = useLayoutStore()
  const { language, setLanguage } = useLanguageStore() // Menggunakan global state
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="flex items-center gap-2">
      {/* 1. Language Toggle */}
      <div className="flex items-center p-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 border border-zinc-300/50 dark:border-zinc-700/50 shadow-inner">
        <button
          onClick={() => setLanguage("US")} // Mengubah ke US
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ease-out",
            language === "US" 
              ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md transform scale-105" 
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          )}
        >
          US
        </button>
        <button
          onClick={() => setLanguage("ID")} // Mengubah ke ID
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ease-out",
            language === "ID" 
              ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md transform scale-105" 
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          )}
        >
          ID
        </button>
      </div>

      {/* 2. Theme Toggle (Sama seperti sebelumnya) */}
      <div className="flex items-center p-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 border border-zinc-300/50 dark:border-zinc-700/50 shadow-inner">
        <button onClick={() => setTheme("light")} className={cn("p-1.5 rounded-full transition-all duration-300 ease-out", theme === "light" ? "bg-white text-zinc-900 shadow-md transform scale-105" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200")}><Sun className="w-4 h-4" /></button>
        <button onClick={() => setTheme("dark")} className={cn("p-1.5 rounded-full transition-all duration-300 ease-out", theme === "dark" ? "bg-zinc-700 text-zinc-100 shadow-md transform scale-105" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200")}><Moon className="w-4 h-4" /></button>
      </div>

      {/* 3. Layout Toggle (Sama seperti sebelumnya) */}
      <button onClick={toggleLayout} className="p-2 rounded-full bg-zinc-200/60 dark:bg-zinc-800 border border-zinc-300/50 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors shadow-inner"><LayoutTemplate className="w-4 h-4" /></button>
    </div>
  )
}