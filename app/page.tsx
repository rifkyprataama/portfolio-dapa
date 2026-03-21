"use client"
import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"

import { useLayoutStore } from "@/store/use-layout-store"
import { Topbar } from "@/components/topbar" 
import { Sidebar } from "@/components/sidebar"
import { Skills } from "@/components/skills"

export default function Home() {
  const { layout } = useLayoutStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500">
      {layout === 'topbar' && <Topbar />}

      {/* Melebarkan area konten utama menjadi max-w-6xl */}
      <div className="max-w-6xl mx-auto pt-8 pb-16 px-6 sm:px-10 w-full flex-1">
        
        {/* Jarak antar kolom dibesarkan ke gap-16 */}
        <main className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-6">
          
          {layout === 'sidebar' && <Sidebar />}

          <section className="flex-1 flex flex-col gap-10 mt-2">
            <div className="flex flex-col gap-4">
              {/* Judul dikembalikan ke text-5xl agar terasa berdampak (Impactful) */}
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Hi, I'm Daffa Pratama
              </h1>
              
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium mt-1 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Based in Bandung, Indonesia <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 ml-0.5">ID</span></span>
              </div>

              {/* Teks paragraf dikembalikan ke text-lg (18px) agar sangat nyaman dibaca */}
              <div className="flex flex-col gap-5 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
                <p>
                  A Software Engineer dedicated to building impactful digital solutions. I specialize in developing scalable web platforms and applications using a modern tech stack, primarily focusing on frontend architecture, Next.js, TypeScript, and seamless user experiences.
                </p>
                <p>
                  My approach combines technical expertise with a strong emphasis on clean, maintainable code. I thrive in crafting software that is well-structured and aligned with business goals, ensuring every project delivers logical clarity and a meaningful real-world impact.
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800/50 pt-10 mt-2 flex flex-col gap-2">
               <div className="flex items-center gap-2">
                 <span className="text-xl font-bold text-zinc-800 dark:text-zinc-100">{'</>'} Skills</span>
               </div>
               <p className="text-zinc-500 dark:text-zinc-400 text-base mb-2">My professional skills.</p>
               
               <Skills />
               
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}