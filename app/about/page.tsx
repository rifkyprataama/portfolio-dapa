"use client"
import { useState, useEffect } from "react"
import { Briefcase, GraduationCap } from "lucide-react" 
import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store" // Import Store Bahasa
import { dict } from "@/lib/dictionaries" // Import Kamus
import { Topbar } from "@/components/topbar" 
import { Sidebar } from "@/components/sidebar"
import { Career } from "@/components/career" 
import { Education } from "@/components/education" 

export default function About() {
  const { layout } = useLayoutStore()
  
  // Ambil bahasa yang aktif
  const { language } = useLanguageStore()
  const d = dict[language]

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
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                {d.aboutTitle}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">
                {d.aboutSubtitle}
              </p>
              
              <div className="w-full border-t border-dashed border-zinc-300 dark:border-zinc-700/70 mt-2 mb-2"></div>

              <div className="flex flex-col gap-5 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
                <p>{d.aboutP1}</p>
                <p>{d.aboutP2}</p>
                <p>{d.aboutP3}</p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">{d.regards}</p>
                <span className="font-serif italic text-4xl text-zinc-900 dark:text-zinc-100 mt-2">
                  Daffa Pratama
                </span>
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800/50 pt-10 mt-6 flex flex-col gap-6">
               <div className="flex flex-col gap-1.5">
                 <div className="flex items-center gap-2">
                   <Briefcase className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
                   <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{d.careerTitle}</span>
                 </div>
                 <p className="text-zinc-500 dark:text-zinc-400 text-base">{d.careerSubtitle}</p>
               </div>
               
               <Career />
            </div>

            <div className="pt-4 flex flex-col gap-6">
               <div className="flex flex-col gap-1.5">
                 <div className="flex items-center gap-2">
                   <GraduationCap className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
                   <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{d.eduTitle}</span>
                 </div>
                 <p className="text-zinc-500 dark:text-zinc-400 text-base">{d.eduSubtitle}</p>
               </div>
               
               <Education />
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}