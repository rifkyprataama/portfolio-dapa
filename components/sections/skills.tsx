"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
// PERBAIKAN: Mengganti SiCss3 menjadi SiCss
import { 
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, 
  SiBootstrap, SiNodedotjs, SiExpress, SiLaravel, SiPhp, SiPython, SiKotlin, 
  SiFlutter, SiPostgresql, SiMysql, SiPrisma, SiFirebase, SiSupabase, SiDocker, 
  SiNpm, SiYarn, SiGithub 
} from "react-icons/si"
import { FaJava } from "react-icons/fa6"
import { Layers, Zap, Network } from "lucide-react"

const skillsData = [
  { name: "HTML", icon: SiHtml5, categories: ["Frontend", "Main"], color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  // PERBAIKAN: Menggunakan SiCss di sini
  { name: "CSS", icon: SiCss, categories: ["Frontend"], color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { name: "JavaScript", icon: SiJavascript, categories: ["Frontend", "Main"], color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
  { name: "TypeScript", icon: SiTypescript, categories: ["Frontend", "Backend", "Main"], color: "bg-blue-600/10 text-blue-700 dark:text-blue-500 border-blue-600/20" },
  { name: "React.js", icon: SiReact, categories: ["Frontend", "Main"], color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  { name: "Next.js", icon: SiNextdotjs, categories: ["Frontend", "Backend", "Main"], color: "bg-zinc-500/10 text-zinc-900 dark:text-zinc-100 border-zinc-500/20" },
  { name: "TailwindCSS", icon: SiTailwindcss, categories: ["Frontend"], color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
  { name: "Bootstrap", icon: SiBootstrap, categories: ["Frontend"], color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  { name: "Vite", icon: Zap, categories: ["Frontend", "Tools"], color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  { name: "Shadcn UI", icon: Layers, categories: ["Frontend"], color: "bg-zinc-500/10 text-zinc-900 dark:text-zinc-100 border-zinc-500/20" },
  { name: "Node.js", icon: SiNodedotjs, categories: ["Backend", "Main"], color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  { name: "Express.js", icon: SiExpress, categories: ["Backend"], color: "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20" },
  { name: "Laravel", icon: SiLaravel, categories: ["Backend"], color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  { name: "PHP", icon: SiPhp, categories: ["Backend"], color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
  { name: "Java", icon: FaJava, categories: ["Backend"], color: "bg-red-600/10 text-red-700 dark:text-red-500 border-red-600/20" },
  { name: "Python", icon: SiPython, categories: ["Backend"], color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { name: "Flutter", icon: SiFlutter, categories: ["Mobile", "Main"], color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
  { name: "Kotlin", icon: SiKotlin, categories: ["Mobile"], color: "bg-purple-600/10 text-purple-700 dark:text-purple-500 border-purple-600/20" },
  { name: "PostgreSQL", icon: SiPostgresql, categories: ["Database"], color: "bg-blue-600/10 text-blue-700 dark:text-blue-500 border-blue-600/20" },
  { name: "MySQL", icon: SiMysql, categories: ["Database"], color: "bg-sky-600/10 text-sky-700 dark:text-sky-500 border-sky-600/20" },
  { name: "Prisma", icon: SiPrisma, categories: ["Database", "Tools"], color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20" },
  { name: "Firebase", icon: SiFirebase, categories: ["Database", "Backend"], color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
  { name: "Supabase", icon: SiSupabase, categories: ["Database", "Backend"], color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { name: "Docker", icon: SiDocker, categories: ["Tools", "Main"], color: "bg-blue-600/10 text-blue-700 dark:text-blue-500 border-blue-600/20" },
  { name: "NPM", icon: SiNpm, categories: ["Tools"], color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  { name: "Yarn", icon: SiYarn, categories: ["Tools"], color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
  { name: "GitHub", icon: SiGithub, categories: ["Tools"], color: "bg-zinc-500/10 text-zinc-900 dark:text-zinc-100 border-zinc-500/20" },
  { name: "Axios", icon: Network, categories: ["Tools"], color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" },
]

const categories = ["All", "Main", "Frontend", "Backend", "Mobile", "Database", "Tools"]

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredSkills = skillsData.filter((skill) => 
    activeCategory === "All" || skill.categories.includes(activeCategory)
  )

  return (
    <div className="flex flex-col gap-6 w-full mt-2">
      {/* Baris Tombol Filter */}
      <div className="flex flex-wrap items-center gap-2.5">
        {categories.map((category) => {
          const count = category === "All" ? skillsData.length : skillsData.filter(s => s.categories.includes(category)).length
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border",
                isActive 
                  // PERBAIKAN: Hitam pekat di Light, Putih bersih di Dark
                  ? "bg-zinc-950 dark:bg-white border-zinc-950 dark:border-white text-white dark:text-zinc-950 shadow-md" 
                  : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              {category}
              <span className={cn(
                "flex items-center justify-center text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[24px]",
                isActive 
                  // Latar angka pada tombol aktif disesuaikan
                  ? "bg-zinc-800 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-900" 
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
              )}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid Skills (Pills) */}
      <div className="flex flex-wrap gap-3">
        {filteredSkills.map((skill) => {
          const Icon = skill.icon
          return (
            <div key={skill.name} className={cn("flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-[15px] font-bold transition-all duration-300 hover:scale-105 cursor-default shadow-sm", skill.color)}>
              <Icon className="w-[18px] h-[18px]" />
              {skill.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}