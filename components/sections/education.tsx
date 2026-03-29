"use client"
import { useState, useEffect } from "react"
import { GraduationCap, Loader2 } from "lucide-react"
import { useLanguageStore } from "@/store/use-language-store"
import { supabase } from "@/lib/supabase"

export function Education() {
  const { language } = useLanguageStore()
  
  // State untuk data Supabase
  const [educationData, setEducationData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEducation() {
      setLoading(true)
      const { data, error } = await supabase
        .from('education_data')
        .select('*')
        .eq('language', language)
        .order('id', { ascending: true })

      if (!error && data) {
        setEducationData(data)
      }
      setLoading(false)
    }
    fetchEducation()
  }, [language])

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-zinc-500" /></div>

  return (
    <div className="flex flex-col gap-4">
      {educationData.map((edu) => (
        <div key={edu.id} className="flex gap-4 border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl p-5 transition-colors duration-300">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shrink-0 shadow-sm">
             <GraduationCap className="w-6 h-6 text-zinc-400" />
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{edu.school}</h3>
            <div className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 flex items-center flex-wrap gap-1.5">
              <span>{edu.degree}</span><span className="mx-0.5">•</span><span>{edu.major}</span>
              {edu.gpa && (<><span className="mx-0.5">•</span><span>GPA: {edu.gpa}</span></>)}
            </div>
            <div className="text-[12px] text-zinc-400 dark:text-zinc-500 font-medium mt-1.5 flex items-center flex-wrap gap-1.5">
              <span>{edu.start_date} - {edu.end_date}</span><span className="mx-0.5">•</span><span>{edu.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}