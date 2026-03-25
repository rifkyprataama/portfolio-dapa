"use client"
import { Trophy, Medal, Award, CheckCircle } from "lucide-react"
import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"

// Fungsi kecil untuk memilih ikon secara dinamis
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "trophy": return <Trophy className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
    case "medal": return <Medal className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
    case "award": return <Award className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
    default: return <CheckCircle className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
  }
}

export function AchievementsList() {
  const { language } = useLanguageStore()
  const d = dict[language]

  return (
    <div className="flex flex-col gap-4">
      {d.achievementsData.map((achievement) => (
        <div 
          key={achievement.id} 
          className="flex gap-5 border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700/80 group"
        >
          {/* Ikon Pencapaian */}
          <div className="flex items-center justify-center w-14 h-14 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
             {getIcon(achievement.icon)}
          </div>

          {/* Detail Pencapaian */}
          <div className="flex flex-col flex-1 justify-center">
            <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
              {achievement.title}
            </h3>
            
            <div className="text-[13px] md:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1 flex items-center flex-wrap gap-1.5">
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{achievement.issuer}</span>
              <span className="mx-1 text-zinc-300 dark:text-zinc-700">•</span>
              <span>{achievement.date}</span>
            </div>
            
            <p className="text-[14px] text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
              {achievement.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}