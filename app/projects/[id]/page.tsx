"use client"
import { useState, useEffect, use } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, ExternalLink, Github, Code2, CheckCircle2, UserCircle2, ShieldAlert, Loader2 } from "lucide-react"
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiGo, 
  SiPostgresql, SiDocker, SiReact, SiNodedotjs, 
  SiFirebase, SiSupabase, SiLaravel, SiJavascript
} from "react-icons/si"

import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store" 
import { dict } from "@/lib/dictionaries" 
import { Topbar } from "@/components/layout/topbar" 
import { Sidebar } from "@/components/layout/sidebar"
import { supabase } from "@/lib/supabase" // Import Supabase

const getTechIcon = (tech: string) => {
  const iconProps = { className: "w-5 h-5" }
  switch (tech.toLowerCase()) {
    case "next.js": return <SiNextdotjs {...iconProps} />
    case "typescript": return <SiTypescript {...iconProps} className="text-blue-600 dark:text-blue-400" />
    case "tailwindcss": return <SiTailwindcss {...iconProps} className="text-sky-500" />
    case "golang": return <SiGo {...iconProps} className="text-cyan-600 dark:text-cyan-400" />
    case "postgresql": return <SiPostgresql {...iconProps} className="text-blue-500" />
    case "docker": return <SiDocker {...iconProps} className="text-blue-600" />
    case "react": return <SiReact {...iconProps} className="text-sky-400" />
    case "node.js": return <SiNodedotjs {...iconProps} className="text-green-600" />
    case "firebase": return <SiFirebase {...iconProps} className="text-yellow-500" />
    case "supabase": return <SiSupabase {...iconProps} className="text-emerald-500" />
    case "laravel": return <SiLaravel {...iconProps} className="text-red-600" />
    case "javascript": return <SiJavascript {...iconProps} className="text-yellow-400" />
    default: return <Code2 {...iconProps} className="text-zinc-500" />
  }
}

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const projectId = resolvedParams.id

  const { layout } = useLayoutStore()
  const { language } = useLanguageStore()
  const d = dict[language]
  
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [viewsCount, setViewsCount] = useState<number>(0)

  // Mengambil data spesifik proyek dari Supabase
  useEffect(() => {
    async function fetchProjectDetail() {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects_data')
        .select('*')
        .eq('id', projectId)
        .eq('language', language)
        .single() // Mengambil hanya 1 data

      if (error) {
        console.error("Error fetching project:", error)
      } else {
        setProject(data)
      }
      setLoading(false)
    }

    fetchProjectDetail()
  }, [projectId, language])

  // Auto-Increment Views
  useEffect(() => {
    const storageKey = `project_views_${projectId}`
    const currentViews = parseInt(localStorage.getItem(storageKey) || "0", 10)
    const newViews = currentViews + 1
    localStorage.setItem(storageKey, newViews.toString())
    setViewsCount(newViews)
  }, [projectId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">404</h1>
          <p className="text-zinc-500">Project not found.</p>
          <Link href="/projects" className="mt-4 px-6 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium">Go Back</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500">
      {layout === 'topbar' && <Topbar />}

      <div className="max-w-6xl mx-auto pt-8 pb-20 px-6 sm:px-10 w-full flex-1">
        <main className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-6">
          
          {layout === 'sidebar' && <Sidebar />}

          <section className="flex-1 flex flex-col w-full max-w-3xl mt-2">
            
            <Link href="/projects" className="flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors w-fit mb-8">
              <ArrowLeft className="w-4 h-4" />
              {d.btnBack}
            </Link>

            <div className="flex flex-col gap-4">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                {project.title}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed">
                {project.short_desc}
              </p>
            </div>

            <div className="w-full border-t border-dashed border-zinc-300 dark:border-zinc-700/70 my-6"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                <Eye className="w-4 h-4" />
                <span>{viewsCount} views</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                  <span className="hidden sm:inline">Tech Stack :</span>
                  <div className="flex items-center gap-2.5">
                    {project.tech_stack.map((tech: string) => (
                      <div key={tech} title={tech} className="hover:scale-110 transition-transform cursor-help">
                        {getTechIcon(tech)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
                  {project.github_url !== "#" && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" title={d.btnVisitRepo}>
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.demo_url !== "#" && (
                    <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" title={d.btnLiveDemo}>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/80 shadow-sm mb-12">
               <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <article className="flex flex-col gap-10">
              
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{d.lblOverview}</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.overview}</p>
              </div>

              {project.role && (
                <div className="flex flex-col gap-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/60 p-6 rounded-2xl">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <UserCircle2 className="w-5 h-5 text-zinc-500" />
                    {d.lblRole}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.role}</p>
                </div>
              )}

              <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/60"></div>

              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{d.lblTechStack}</h2>
                <ul className="flex flex-col gap-3 mt-1">
                  {project.tech_stack.map((tech: string) => (
                    <li key={tech} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
                        {getTechIcon(tech)}
                      </div>
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/60"></div>

              {project.features && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{d.lblFeatures}</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {project.features.map((feature: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <CheckCircle2 className="w-6 h-6 text-zinc-900 dark:text-zinc-100 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">{feature.name}</h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.challenges && (
                <div className="flex flex-col gap-6 mt-4">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
                    {d.lblChallenges}
                  </h2>
                  <div className="grid grid-cols-1 gap-6 bg-zinc-950 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 p-6 md:p-8 rounded-2xl shadow-lg">
                    {project.challenges.map((challenge: any, idx: number) => (
                      <div key={idx} className="flex flex-col gap-2 pb-6 border-b border-zinc-800 dark:border-zinc-300 last:border-0 last:pb-0">
                        <h3 className="text-base font-bold">{challenge.name}</h3>
                        <p className="text-sm text-zinc-400 dark:text-zinc-600 leading-relaxed">{challenge.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </article>

          </section>
        </main>
      </div>
    </div>
  )
}