"use client"
import { useState, useEffect } from "react"
import { Laptop, Code2, PenTool } from "lucide-react"
import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store" 
import { dict } from "@/lib/dictionaries" 
import { Topbar } from "@/components/layout/topbar" 
import { Sidebar } from "@/components/layout/sidebar"

export default function UsesPage() {
  const { layout } = useLayoutStore()
  const { language } = useLanguageStore()
  const d = dict[language]
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  // Helper component untuk merender kategori
  const CategorySection = ({ title, icon: Icon, data }: { title: string, icon: any, data: any[] }) => (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <div className="p-2 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg">
          <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-300 group"
          >
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
              {item.name}
            </h3>
            <p className="text-[14px] text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white dark:bg-zinc-950">
      {layout === 'topbar' && <Topbar />}

      <div className="max-w-6xl mx-auto pt-8 pb-16 px-6 sm:px-10 w-full flex-1 flex flex-col">
        <main className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-6 flex-1">
          
          {layout === 'sidebar' && <Sidebar />}

          <section className="flex-1 flex flex-col gap-12 mt-2">
            
            {/* Header */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                {d.usesTitle}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium max-w-2xl leading-relaxed">
                {d.usesSubtitle}
              </p>
            </div>

            {/* Konten Kategori */}
            <div className="flex flex-col gap-14 max-w-4xl">
              <CategorySection title={d.catHardware} icon={Laptop} data={d.usesHardwareData} />
              <CategorySection title={d.catCoding} icon={Code2} data={d.usesCodingData} />
              <CategorySection title={d.catProductivity} icon={PenTool} data={d.usesProductivityData} />
            </div>

          </section>
        </main>
      </div>
    </div>
  )
}