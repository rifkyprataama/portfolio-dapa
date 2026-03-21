"use client"
import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"

import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store" // Import store bahasa
import { dict } from "@/lib/dictionaries" // Import kamus
import { Topbar } from "@/components/topbar" 
import { Sidebar } from "@/components/sidebar"
import { Skills } from "@/components/skills"

export default function Home() {
  const { layout } = useLayoutStore()
  const { language } = useLanguageStore() // Mengambil bahasa saat ini (US/ID)
  const d = dict[language] // Memilih kamus sesuai bahasa
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500">
      {layout === 'topbar' && <Topbar />}

      <div className="max-w-6xl mx-auto pt-8 pb-16 px-6 sm:px-10 w-full flex-1">
        <main className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-6">
          {layout === 'sidebar' && <Sidebar />}

          <section className="flex-1 flex flex-col gap-10 mt-2">
            <div className="flex flex-col gap-4">
              {/* Teks diambil dari kamus */}
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                {d.greeting}
              </h1>
              
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium mt-1 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{d.basedIn} <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 ml-0.5">ID</span></span>
              </div>

              <div className="flex flex-col gap-5 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
                <p>{d.desc1}</p>
                <p>{d.desc2}</p>
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800/50 pt-10 mt-2 flex flex-col gap-2">
               <div className="flex items-center gap-2">
                 <span className="text-xl font-bold text-zinc-800 dark:text-zinc-100">{'</>'} {d.skillsTitle}</span>
               </div>
               <p className="text-zinc-500 dark:text-zinc-400 text-base mb-2">{d.skillsSubtitle}</p>
               
               <Skills />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}