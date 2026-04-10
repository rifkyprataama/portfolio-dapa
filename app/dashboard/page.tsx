"use client"
import { useState, useEffect } from "react"
import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store" 
import { dict } from "@/lib/dictionaries" 
import { Topbar } from "@/components/layout/topbar" 
import { Sidebar } from "@/components/layout/sidebar"
import { GithubActivity } from "@/components/sections/github-activity"
import { WakatimeStats } from "@/components/sections/wakatime-stats" 
import { BlogPosts } from "@/components/sections/blog-posts"

export default function DashboardPage() {
  const { layout } = useLayoutStore()
  const { language } = useLanguageStore()
  const d = dict[language]
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Hook untuk mengubah judul Tab secara dinamis
  useEffect(() => {
    const pageTitle = language === "ID" ? "Dasbor" : "Dashboard";
    document.title = `${pageTitle} | Rifky Pratama`;
  }, [language]);

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-[#fafafa] dark:bg-zinc-950">
      {layout === 'topbar' && <Topbar />}

      <div className="max-w-6xl mx-auto pt-8 pb-16 px-6 sm:px-10 w-full flex-1">
        <main className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-6">
          
          {layout === 'sidebar' && <Sidebar />}

          <section className="flex-1 flex flex-col mt-2">
            
            {/* Header Dashboard */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-4">
                {d.dashboardTitle}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">
                {d.dashboardSubtitle}
              </p>
            </div>

            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-10"></div>

            {/* Kumpulan Widget Dashboard */}
            <div className="flex flex-col gap-8 w-full max-w-4xl">
               <GithubActivity />
               <WakatimeStats /> 
               <BlogPosts />
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}