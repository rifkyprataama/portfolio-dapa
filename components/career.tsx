"use client"
import { useState } from "react"
import { Building2, ChevronRight, ChevronDown, ListChecks, Lightbulb, Rocket, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguageStore } from "@/store/use-language-store" // Import Store Bahasa
import { dict } from "@/lib/dictionaries" // Import Kamus

export function Career() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  
  // Mengambil bahasa yang aktif dan kamusnya
  const { language } = useLanguageStore()
  const d = dict[language]

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* SEKARANG MENGGUNAKAN d.careerJobs DARI KAMUS */}
      {d.careerJobs.map((job) => {
        const isExpanded = expandedId === job.id

        return (
          <div 
            key={job.id} 
            className="flex gap-4 border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl p-5 transition-colors duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shrink-0 shadow-sm">
               <Building2 className="w-6 h-6 text-zinc-400" />
            </div>

            <div className="flex flex-col flex-1">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{job.role}</h3>
              
              <div className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                {job.company} <span className="mx-1.5">•</span> {job.location}
              </div>
              
              <div className="text-[12px] text-zinc-400 dark:text-zinc-500 font-medium mt-1.5 flex items-center flex-wrap gap-1.5 pb-2 border-b border-zinc-200 dark:border-zinc-800/50">
                <span>{job.startDate} - {job.endDate}</span>
                <span className="mx-0.5">•</span>
                <span>{job.duration}</span>
                <span className="mx-0.5">•</span>
                <span>{job.type}</span>
                <span className="mx-0.5">•</span>
                <span>{job.mode}</span>
              </div>

              {/* Teks Tombol */}
              <button 
                onClick={() => toggleExpand(job.id)}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 mt-4 transition-colors w-fit"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                {isExpanded ? d.hideDetails : d.showDetails}
              </button>

              <div className={cn(
                "grid transition-all duration-300 ease-in-out",
                isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
              )}>
                <div className="overflow-hidden space-y-5">
                  
                  {/* Bagian TUGAS */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ListChecks className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">{d.tasks}</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {job.tasks.map((task, index) => (
                        <li key={index} className="flex gap-2.5 items-start">
                          <Check className="w-4 h-4 text-zinc-900 dark:text-zinc-100 mt-0.5 shrink-0" />
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{task}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-px bg-zinc-200 dark:bg-zinc-800/50"></div>

                  {/* Bagian APA YANG SAYA PELAJARI */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">{d.learnings}</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {job.learnings.map((learning, index) => (
                        <li key={index} className="flex gap-2.5 items-start">
                          <Check className="w-4 h-4 text-zinc-900 dark:text-zinc-100 mt-0.5 shrink-0" />
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{learning}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-px bg-zinc-200 dark:bg-zinc-800/50"></div>

                  {/* Bagian DAMPAK */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">{d.impacts}</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {job.impacts.map((impact, index) => (
                        <li key={index} className="flex gap-2.5 items-start">
                          <Check className="w-4 h-4 text-zinc-900 dark:text-zinc-100 mt-0.5 shrink-0" />
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{impact}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}