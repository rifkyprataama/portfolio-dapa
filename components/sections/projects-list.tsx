"use client"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, Code2, Loader2 } from "lucide-react"
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiGo, 
  SiPostgresql, SiDocker, SiReact, SiNodedotjs, 
  SiFirebase, SiSupabase, SiLaravel, SiJavascript
} from "react-icons/si"
import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase" // IMPORT SUPABASE KITA

const getTechIcon = (tech: string) => {
  const iconProps = { className: "w-4 h-4" }
  switch (tech.toLowerCase()) {
    case "next.js": return <SiNextdotjs {...iconProps} />
    case "typescript": return <SiTypescript {...iconProps} className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    case "tailwindcss": return <SiTailwindcss {...iconProps} className="w-4 h-4 text-sky-500" />
    case "golang": return <SiGo {...iconProps} className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
    case "postgresql": return <SiPostgresql {...iconProps} className="w-4 h-4 text-blue-500" />
    case "docker": return <SiDocker {...iconProps} className="w-4 h-4 text-blue-600" />
    case "react": return <SiReact {...iconProps} className="w-4 h-4 text-sky-400" />
    case "node.js": return <SiNodedotjs {...iconProps} className="w-4 h-4 text-green-600" />
    case "firebase": return <SiFirebase {...iconProps} className="w-4 h-4 text-yellow-500" />
    case "supabase": return <SiSupabase {...iconProps} className="w-4 h-4 text-emerald-500" />
    case "laravel": return <SiLaravel {...iconProps} className="w-4 h-4 text-red-600" />
    case "javascript": return <SiJavascript {...iconProps} className="w-4 h-4 text-yellow-400" />
    default: return <Code2 {...iconProps} className="w-4 h-4 text-zinc-500" />
  }
}

export function ProjectsList() {
  const { language } = useLanguageStore()
  const d = dict[language]

  // State untuk menampung data dari Supabase
  const [projectsData, setProjectsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [typeFilter, setTypeFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")

  // --- LOGIKA MENGAMBIL DATA DARI SUPABASE ---
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true)
      // Tarik data dari tabel projects_data yang kolom language-nya sesuai (US/ID)
      const { data, error } = await supabase
        .from('projects_data')
        .select('*')
        .eq('language', language)
        .order('id', { ascending: true }) 

      if (error) {
        console.error("Error fetching projects:", error)
      } else {
        setProjectsData(data || [])
      }
      setLoading(false)
    }

    fetchProjects()
  }, [language]) // Akan ditarik ulang secara otomatis jika bahasa berubah!

  const uniqueTypes = ["All", ...Array.from(new Set(projectsData.map(p => p.type)))]
  const uniqueCategories = ["All", ...Array.from(new Set(projectsData.map(p => p.category)))]

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchType = typeFilter === "All" || project.type === typeFilter
      const matchCat = categoryFilter === "All" || project.category === categoryFilter
      return matchType && matchCat
    })
  }, [projectsData, typeFilter, categoryFilter])

  // Tampilkan loading spinner saat data sedang ditarik
  if (loading) {
    return <div className="flex justify-center items-center py-20"><Loader2 className="w-8 h-8 animate-spin text-zinc-500" /></div>
  }

  // SISA KODE UI DI BAWAH INI SAMA PERSIS SEPERTI SEBELUMNYA! TIDAK ADA YANG DIBUANG.
  return (
    <div className="flex flex-col gap-8">
      
      <div className="flex flex-col gap-5 border-b border-zinc-200 dark:border-zinc-800/50 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest w-24 shrink-0">Type</span>
          <div className="flex flex-wrap gap-2">
            {uniqueTypes.map(type => (
              <button key={type} onClick={() => setTypeFilter(type)} className={cn("px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 border", typeFilter === type ? "bg-zinc-950 dark:bg-white border-zinc-950 dark:border-white text-white dark:text-zinc-950 shadow-md" : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800")}>
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest w-24 shrink-0">Category</span>
          <div className="flex flex-wrap gap-2">
            {uniqueCategories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)} className={cn("px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 border", categoryFilter === cat ? "bg-zinc-950 dark:bg-white border-zinc-950 dark:border-white text-white dark:text-zinc-950 shadow-md" : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800")}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="flex flex-col border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <Link href={`/projects/${project.id}`} className="aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border-b border-zinc-200 dark:border-zinc-800 block">
               <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-full font-bold text-sm backdrop-blur-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {d.btnViewDetail} <ArrowRight className="w-4 h-4" />
                  </div>
               </div>
            </Link>
            <div className="flex flex-col flex-1 p-6">
               <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug mb-2">
                 <Link href={`/projects/${project.id}`} className="hover:underline decoration-zinc-300 dark:decoration-zinc-600 underline-offset-4">{project.title}</Link>
               </h3>
               <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3 leading-relaxed flex-1">{project.short_desc}</p>
               <div className="flex items-center flex-wrap gap-3 mb-6">
                 {project.tech_stack.map((tech: string) => (
                   <div key={tech} className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm" title={tech}>
                     {getTechIcon(tech)}
                   </div>
                 ))}
               </div>
               <div className="flex items-center justify-between pt-5 border-t border-zinc-100 dark:border-zinc-800/50 mt-auto">
                 <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wide">{project.type}</span>
                 </div>
                 <Link href={`/projects/${project.id}`} className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 hover:gap-2.5 transition-all">
                   {d.btnViewDetail} <ArrowRight className="w-4 h-4" />
                 </Link>
               </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}