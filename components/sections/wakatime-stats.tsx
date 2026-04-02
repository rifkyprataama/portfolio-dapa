"use client"
import React, { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"

export function WakatimeStats() {
  const { language } = useLanguageStore()
  const d = dict[language]

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Data Dummy WakaTime (Ditambah detail waktu untuk tooltip)
  const topLanguages = [
    { name: "TypeScript", percent: 65, time: "5 hrs 45 mins" },
    { name: "Markdown", percent: 15, time: "1 hr 20 mins" },
    { name: "XML", percent: 5, time: "25 mins" },
    { name: "JSON", percent: 5, time: "25 mins" },
  ]

  const topEditors = [
    { name: "VS Code", percent: 76, time: "6 hrs 30 mins" },
    { name: "Unknown Editor", percent: 15, time: "1 hr 15 mins" },
    { name: "Android Studio", percent: 9, time: "45 mins" },
  ]

  return (
    <div className="flex flex-col gap-6 w-full mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Clock className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            {d.wakatimeTitle}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {d.wakatimeSubtitle}
          </p>
        </div>
        <span className="text-xs font-medium text-zinc-500">Last Update: 18 hours ago</span>
      </div>

      {/* Grid Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: d.lblStartDate, value: "March 26, 2026" },
          { label: d.lblEndDate, value: "April 01, 2026" },
          { label: d.lblAvgDaily, value: "1 hr 14 mins" },
          { label: d.lblTotalWeek, value: "8 hrs 44 mins" },
          { label: d.lblBestDay, value: "April 01, 2026 (2 hrs 34 mins)" },
          { label: d.lblAllTime, value: "1,086 hrs 32 mins" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col justify-center p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-default">
            <span className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">{stat.label}</span>
            <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Grid Progress Bars (Interaktif) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Languages */}
        <div className="flex flex-col p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
          <h3 className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 mb-4">{d.lblTopLanguages}</h3>
          <div className="flex flex-col gap-4">
            {topLanguages.map((lang, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 text-sm cursor-help group"
                data-tooltip-id="wakatime-tooltip"
                data-tooltip-content={`${lang.name}: ${lang.time}`}
              >
                <span className="font-bold text-zinc-900 dark:text-zinc-100 w-24 shrink-0 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{lang.name}</span>
                <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 dark:bg-yellow-500 rounded-full transition-all duration-500 group-hover:opacity-80" style={{ width: `${lang.percent}%` }}></div>
                </div>
                <span className="text-zinc-500 font-medium w-8 text-right">{lang.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Editors */}
        <div className="flex flex-col p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
          <h3 className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 mb-4">{d.lblEditors}</h3>
          <div className="flex flex-col gap-4">
            {topEditors.map((editor, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 text-sm cursor-help group"
                data-tooltip-id="wakatime-tooltip"
                data-tooltip-content={`${editor.name}: ${editor.time}`}
              >
                <span className="font-bold text-zinc-900 dark:text-zinc-100 w-24 shrink-0 truncate group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{editor.name}</span>
                <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 dark:bg-yellow-500 rounded-full transition-all duration-500 group-hover:opacity-80" style={{ width: `${editor.percent}%` }}></div>
                </div>
                <span className="text-zinc-500 font-medium w-8 text-right">{editor.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {mounted && (
        <ReactTooltip 
          id="wakatime-tooltip" 
          className="!bg-zinc-900 !text-white !text-xs !font-bold !rounded-md !px-2.5 !py-1.5 z-50" 
        />
      )}
    </div>
  )
}