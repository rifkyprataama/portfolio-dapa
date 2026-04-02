"use client"
import { useState, useEffect } from "react"
import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store" 
import { dict } from "@/lib/dictionaries" 
import { Topbar } from "@/components/layout/topbar" 
import { Sidebar } from "@/components/layout/sidebar"

import { UmamiAnalytics } from "@/components/sections/umami-analytics"
import { GithubActivity } from "@/components/sections/github-activity"
import { WakatimeStats } from "@/components/sections/wakatime-stats" // IMPORT BARU
import { MonkeytypeStats } from "@/components/sections/monkeytype-stats" // IMPORT BARU

export default function DashboardPage() {
  const { layout } = useLayoutStore()
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
            
            {/* Header Dashboard */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-4">
                {d.dashboardTitle}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">
                {d.dashboardSubtitle}
              </p>
              
              <div className="w-full border-t border-dashed border-zinc-300 dark:border-zinc-700/70 mt-2 mb-2"></div>
            </div>

            {/* Kumpulan Widget Dashboard */}
            <div className="flex flex-col gap-8 max-w-4xl">
               <UmamiAnalytics />
               <GithubActivity />
               <WakatimeStats />     {/* TAMBAHKAN DI SINI */}
               <MonkeytypeStats />   {/* TAMBAHKAN DI SINI */}
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}