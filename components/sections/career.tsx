"use client"
import { useState, useEffect } from "react"
import { BriefcaseBusiness, Calendar, MapPin, ChevronDown, Loader2 } from "lucide-react"
import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

export function Career() {
  const { language } = useLanguageStore()
  const d = dict[language]
  const [expandedId, setExpandedId] = useState<number | null>(null)
  
  // State untuk data Supabase
  const [careerJobs, setCareerJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCareer() {
      setLoading(true)
      const { data, error } = await supabase
        .from('career_jobs')
        .select('*')
        .eq('language', language)
        .order('id', { ascending: true }) // Urutkan berdasarkan ID

      if (!error && data) {
        setCareerJobs(data)
      }
      setLoading(false)
    }
    fetchCareer()
  }, [language])

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-zinc-500" /></div>

  return (
    <div className="flex flex-col gap-4">
      {careerJobs.map((job) => {
        const isExpanded = expandedId === job.id

        return (
          <div key={job.id} className="flex flex-col border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl overflow-hidden transition-colors duration-300">
            <button onClick={() => setExpandedId(isExpanded ? null : job.id)} className="flex items-start gap-4 p-5 text-left w-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shrink-0 shadow-sm">
                <BriefcaseBusiness className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex flex-col flex-1 mt-1">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{job.role}</h3>
                <div className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium mt-1 flex items-center flex-wrap gap-x-2 gap-y-1">
                  <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{job.company}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                </div>
                <div className="text-[12px] text-zinc-400 dark:text-zinc-500 font-medium mt-1.5 flex items-center flex-wrap gap-x-2 gap-y-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {job.start_date} - {job.end_date}</span>
                  <span>•</span><span>{job.duration}</span><span>•</span><span>{job.type}</span><span>•</span><span>{job.mode}</span>
                </div>
              </div>
              <ChevronDown className={cn("w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 mt-2", isExpanded && "rotate-180")} />
            </button>

            <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0")}>
              <div className="p-5 pt-0 border-t border-zinc-200/50 dark:border-zinc-800/50 mx-5 mt-2 flex flex-col gap-5 text-sm">
                <div className="mt-4"><h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>{d.tasks}</h4><ul className="list-disc list-outside ml-5 text-zinc-600 dark:text-zinc-400 space-y-1">{job.tasks.map((task: string, i: number) => <li key={i}>{task}</li>)}</ul></div>
                <div><h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>{d.learnings}</h4><ul className="list-disc list-outside ml-5 text-zinc-600 dark:text-zinc-400 space-y-1">{job.learnings.map((learning: string, i: number) => <li key={i}>{learning}</li>)}</ul></div>
                <div><h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>{d.impacts}</h4><ul className="list-disc list-outside ml-5 text-zinc-600 dark:text-zinc-400 space-y-1">{job.impacts.map((impact: string, i: number) => <li key={i}>{impact}</li>)}</ul></div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}