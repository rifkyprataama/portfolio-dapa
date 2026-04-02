"use client"
import React, { useState, useEffect } from "react"
import { Github, Star, GitFork, Loader2 } from "lucide-react"
import { GitHubCalendar } from 'react-github-calendar' 
import { Tooltip as ReactTooltip } from 'react-tooltip' // Import Tooltip
import 'react-tooltip/dist/react-tooltip.css' // Import CSS Tooltip

import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"

export function GithubActivity() {
  const { language } = useLanguageStore()
  const d = dict[language]

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  
  const GITHUB_USERNAME = "rifkyprataama" 

  const customTheme = {
    light: ['#f4f4f5', '#fef08a', '#fde047', '#eab308', '#ca8a04'],
    dark: ['#27272a', '#713f12', '#a16207', '#ca8a04', '#eab308']
  }

  return (
    <div className="flex flex-col gap-6 w-full mt-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Github className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            {d.githubTitle}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{d.githubSubtitle}</p>
        </div>
        <a href={`https://github.com/rifkyprataama`} target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          @rifkyprataama
        </a>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl cursor-default">
          <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-400">{d.lblFollowers}</span>
          <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mt-1">109</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl cursor-default">
          <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-400">{d.lblFollowing}</span>
          <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mt-1">18</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl cursor-default">
          <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-400">{d.lblRepos}</span>
          <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mt-1">19</span>
        </div>
      </div>

      {/* HEATMAP CALENDAR */}
      <div className="w-full overflow-hidden border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 rounded-2xl p-6 transition-colors">
        <div className="w-full overflow-x-auto custom-scrollbar pb-2">
          <div className="min-w-[750px] min-h-[120px] flex items-center justify-center">
            
            {!mounted ? (
              <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
            ) : (
              <>
                <GitHubCalendar 
                  username={GITHUB_USERNAME} 
                  theme={customTheme}
                  colorScheme="light" // Ganti 'dark' jika default tema portofoliomu gelap
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  renderBlock={(block, activity) => 
                    React.cloneElement(block as React.ReactElement, {
                      'data-tooltip-id': 'github-tooltip',
                      'data-tooltip-content': `${activity.count} contributions on ${activity.date}`
                    } as any) // <--- TAMBAHKAN "as any" DI SINI
                  }
                />
                {/* Komponen Tooltip Melayang */}
                <ReactTooltip 
                  id="github-tooltip" 
                  className="!bg-zinc-900 !text-white !text-xs !font-bold !rounded-md !px-2.5 !py-1.5" 
                />
              </>
            )}
            
          </div>
        </div>
      </div>

      {/* PINNED REPOS */}
      <div className="flex flex-col gap-4 mt-2">
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{d.lblPinnedRepos}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="p-5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 rounded-2xl flex flex-col gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all group">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">daffapratama.id</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">⚡ Personal website & portfolio, built from scratch using Next.js, TypeScript, and Tailwind CSS.</p>
            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500 mt-auto pt-2">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> TypeScript</span>
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> 89</span>
              <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> 27</span>
            </div>
          </a>
        </div>
      </div>

    </div>
  )
}