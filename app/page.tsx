"use client"
import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"

import { useLayoutStore } from "@/store/use-layout-store"
import { Topbar } from "@/components/topbar" 
import { Sidebar } from "@/components/sidebar" // Mengimpor komponen Sidebar yang sudah rapi

export default function Home() {
  const { layout } = useLayoutStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500">
      {/* Jika layout = topbar, tampilkan Topbar di atas */}
      {layout === 'topbar' && <Topbar />}

      {/* Mengubah jarak atas menjadi lebih sempit (pt-6) */}
      <div className="max-w-6xl mx-auto pt-6 pb-12 px-6 sm:px-10 w-full flex-1">
        
        {/* Mengurangi jarak gap dan margin atas */}
        <main className="flex flex-col md:flex-row gap-12 lg:gap-20 mt-4 md:mt-6">
          
          {/* Memanggil komponen Sidebar dari file terpisah */}
          {layout === 'sidebar' && <Sidebar />}

          {/* Kolom Kanan: Konten Utama */}
          <section className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Hi, I'm Daffa Pratama
              </h1>
              
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium mt-1 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Based in Bandung, Indonesia <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 ml-0.5">ID</span></span>
              </div>

              <div className="flex flex-col gap-4 text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-3xl">
                <p>
                  A Software Engineer dedicated to building impactful digital solutions. I specialize in developing scalable web platforms and applications using a modern tech stack, primarily focusing on frontend architecture, Next.js, TypeScript, and seamless user experiences.
                </p>
                <p>
                  My approach combines technical expertise with a strong emphasis on clean, maintainable code. I thrive in crafting software that is well-structured and aligned with business goals, ensuring every project delivers logical clarity and a meaningful real-world impact.
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800/50 pt-8 mt-4 flex flex-col gap-4">
               <div className="flex items-center gap-2">
                 <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{'</>'} Skills</span>
               </div>
               <p className="text-zinc-500 dark:text-zinc-400 text-sm">My professional skills.</p>
               
               {/* AREA SKILLS TAGS */}
               <div className="min-h-[5rem] bg-zinc-100 dark:bg-zinc-900/30 rounded-lg border border-zinc-200 dark:border-zinc-800/50 flex py-4 px-6">
                 <p className="text-zinc-500 text-sm m-auto">[Skills Tags will be added here]</p>
               </div>
               
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}