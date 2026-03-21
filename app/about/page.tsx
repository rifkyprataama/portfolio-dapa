"use client"
import { useState, useEffect } from "react"
import { Briefcase, GraduationCap } from "lucide-react" // Menambahkan ikon GraduationCap

import { useLayoutStore } from "@/store/use-layout-store"
import { Topbar } from "@/components/topbar" 
import { Sidebar } from "@/components/sidebar"
import { Career } from "@/components/career" 
import { Education } from "@/components/education" // Mengimpor komponen Education

export default function About() {
  const { layout } = useLayoutStore()
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
            
            {/* Bagian Header About */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                About
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">
                A brief introduction to who I am.
              </p>
              
              <div className="w-full border-t border-dashed border-zinc-300 dark:border-zinc-700/70 mt-2 mb-2"></div>

              <div className="flex flex-col gap-5 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
                <p>
                  I'm Daffa Pratama, a Bandung-based Software Engineer dedicated to building impactful digital solutions. I specialize in developing web platforms and applications using a modern tech stack, including Next.js, TypeScript, and exploring mobile development with Flutter.
                </p>
                <p>
                  My primary focus is crafting software architecture that doesn't just work but is well-structured, maintainable, and scalable to meet business needs. I believe that high-quality code must go hand-in-hand with system efficiency and logical clarity.
                </p>
                <p>
                  I blend technical expertise with proactive communication, critical thinking, and effective problem-solving. Whether I am experimenting with Docker containers, developing full-stack environments, or exploring Machine Learning concepts, I thrive in collaborative environments and leverage my skills to ensure every project delivers optimal results.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">Best regards,</p>
                <span className="font-serif italic text-4xl text-yellow-500 dark:text-yellow-400 mt-2">
                  Daffa Pratama
                </span>
              </div>
            </div>

            {/* Bagian Career */}
            <div className="border-t border-zinc-200 dark:border-zinc-800/50 pt-10 mt-6 flex flex-col gap-6">
               <div className="flex flex-col gap-1.5">
                 <div className="flex items-center gap-2">
                   <Briefcase className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
                   <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Career</span>
                 </div>
                 <p className="text-zinc-500 dark:text-zinc-400 text-base">My professional journey.</p>
               </div>
               
               <Career />
               
            </div>

            {/* Bagian Education (BARU) */}
            <div className="pt-4 flex flex-col gap-6">
               <div className="flex flex-col gap-1.5">
                 <div className="flex items-center gap-2">
                   <GraduationCap className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
                   <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Education</span>
                 </div>
                 <p className="text-zinc-500 dark:text-zinc-400 text-base">My educational journey.</p>
               </div>
               
               {/* Memanggil komponen riwayat pendidikan */}
               <Education />
               
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}