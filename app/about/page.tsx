"use client"
import { useState, useEffect } from "react"
import { Briefcase, GraduationCap } from "lucide-react"
import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"
import { Topbar } from "@/components/layout/topbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Career } from "@/components/sections/career"
import { Education } from "@/components/sections/education"

export default function About() {
  const { layout } = useLayoutStore()
  const { language } = useLanguageStore()
  const d = dict[language]
  const [mounted, setMounted] = useState(false)

  // 1. Hook untuk mencegah hydration mismatch
  useEffect(() => setMounted(true), [])

  // 2. Hook BARU untuk mengubah judul Tab secara dinamis berdasarkan bahasa
  useEffect(() => {
    const pageTitle = language === "ID" ? "Tentang" : "About";
    document.title = `${pageTitle} | Rifky Pratama`;
  }, [language]); // Akan dipanggil ulang setiap kali 'language' berubah

  if (!mounted) return null

  // Garis pemisah standar (Sama dengan Home & Sidebar)
  const Divider = () => (
    <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-10"></div>
  )

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-[#fafafa] dark:bg-zinc-950">
      {layout === 'topbar' && <Topbar />}

      <div className="max-w-6xl mx-auto pt-8 pb-16 px-6 sm:px-10 w-full flex-1">
        <main className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-6">

          {layout === 'sidebar' && <Sidebar />}

          <section className="flex-1 flex flex-col mt-2">

            {/* --- BAGIAN 1: TEKS ABOUT --- */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                {d.aboutTitle}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium mb-2">
                {d.aboutSubtitle}
              </p>

              <div className="flex flex-col gap-5 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
                <p>{d.aboutP1}</p>
                <p>{d.aboutP2}</p>
                <p>{d.aboutP3}</p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">{d.regards}</p>
                <span className="font-serif italic text-4xl text-zinc-900 dark:text-zinc-100 mt-2">
                  Rifky Daffa Pratama
                </span>
              </div>
            </div>

            <Divider />

            {/* --- BAGIAN 2: CAREER --- */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-yellow-500" />
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{d.careerTitle}</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-base">{d.careerSubtitle}</p>
              </div>
              <Career />
            </div>

            <Divider />

            {/* --- BAGIAN 3: EDUCATION --- */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-yellow-500" />
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{d.eduTitle}</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-base">{d.eduSubtitle}</p>
              </div>
              <Education />
            </div>

          </section>
        </main>
      </div>
    </div>
  )
}