"use client"
import { useTheme } from "next-themes"
import { useState } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SettingsToggles() {
  const { theme, setTheme } = useTheme()
  const [lang, setLang] = useState('US')

  return (
    <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 p-1 rounded-full">
      {/* Toggle Bahasa US/ID (Pill Style) */}
      <div className="flex items-center gap-1 bg-background p-0.5 rounded-full text-xs font-mono font-medium">
        <button 
          onClick={() => setLang('US')}
          className={`px-3 py-1 rounded-full transition-colors ${lang === 'US' ? 'bg-yellow-400 text-zinc-950' : 'text-muted-foreground'}`}>
          US
        </button>
        <button 
          onClick={() => setLang('ID')}
          className={`px-3 py-1 rounded-full transition-colors ${lang === 'ID' ? 'bg-yellow-400 text-zinc-950' : 'text-muted-foreground'}`}>
          ID
        </button>
      </div>

      {/* Toggle Tema (Ghost Button) */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="rounded-full text-muted-foreground hover:text-foreground hover:bg-zinc-800"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}