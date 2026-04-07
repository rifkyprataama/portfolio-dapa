"use client"
import React, { useState, useEffect } from "react"
import { Clock, Loader2 } from "lucide-react"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"

export function WakatimeStats() {
  const { language } = useLanguageStore()
  const d = dict[language]

  const [mounted, setMounted] = useState(false)
  const [wakaData, setWakaData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const WAKATIME_USERNAME = "rifkypratama"

  useEffect(() => {
    setMounted(true)
    
    async function fetchWakaTime() {
      try {
        // PERBAIKAN: Mengambil data dari API lokal kita sendiri
        const res = await fetch(`/api/wakatime`)
        if (res.ok) {
          const json = await res.json()
          setWakaData(json.data) // WakaTime membungkus datanya dalam object "data"
        }
      } catch (error) {
        console.error("Gagal mengambil data WakaTime:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWakaTime()
  }, [])

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
        <a href={`https://wakatime.com/@${WAKATIME_USERNAME}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          @{WAKATIME_USERNAME}
        </a>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-zinc-500" /></div>
      ) : wakaData ? (
        <>
          {/* Grid Statistik Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-default">
              <span className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">{d.lblAvgDaily}</span>
              <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">{wakaData.human_readable_daily_average || "0 mins"}</span>
            </div>
            <div className="flex flex-col justify-center p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-default">
              <span className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">{d.lblTotalWeek}</span>
              <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">{wakaData.human_readable_total || "0 mins"}</span>
            </div>
          </div>

          {/* Grid Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Languages */}
            <div className="flex flex-col p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
              <h3 className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 mb-4">{d.lblTopLanguages}</h3>
              <div className="flex flex-col gap-4">
                {wakaData.languages?.slice(0, 4).map((lang: any, i: number) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-3 text-sm cursor-help group"
                    data-tooltip-id="wakatime-tooltip"
                    data-tooltip-content={`${lang.name}: ${lang.text}`}
                  >
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 w-24 shrink-0 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors truncate">{lang.name}</span>
                    <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 dark:bg-yellow-500 rounded-full transition-all duration-500 group-hover:opacity-80" style={{ width: `${lang.percent}%` }}></div>
                    </div>
                    <span className="text-zinc-500 font-medium w-8 text-right">{Math.round(lang.percent)}%</span>
                  </div>
                ))}
                {(!wakaData.languages || wakaData.languages.length === 0) && (
                  <span className="text-sm text-zinc-500 italic">No language data this week.</span>
                )}
              </div>
            </div>

            {/* Top Editors */}
            <div className="flex flex-col p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
              <h3 className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 mb-4">{d.lblEditors}</h3>
              <div className="flex flex-col gap-4">
                {wakaData.editors?.slice(0, 4).map((editor: any, i: number) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-3 text-sm cursor-help group"
                    data-tooltip-id="wakatime-tooltip"
                    data-tooltip-content={`${editor.name}: ${editor.text}`}
                  >
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 w-24 shrink-0 truncate group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{editor.name}</span>
                    <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 dark:bg-yellow-500 rounded-full transition-all duration-500 group-hover:opacity-80" style={{ width: `${editor.percent}%` }}></div>
                    </div>
                    <span className="text-zinc-500 font-medium w-8 text-right">{Math.round(editor.percent)}%</span>
                  </div>
                ))}
                {(!wakaData.editors || wakaData.editors.length === 0) && (
                  <span className="text-sm text-zinc-500 italic">No editor data this week.</span>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-5 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-xl text-sm font-medium">
          Data WakaTime tidak ditemukan atau profil belum diset ke publik di pengaturan WakaTime-mu.
        </div>
      )}

      {mounted && (
        <ReactTooltip 
          id="wakatime-tooltip" 
          className="!bg-zinc-900 !text-white !text-xs !font-bold !rounded-md !px-2.5 !py-1.5 z-50" 
        />
      )}
    </div>
  )
}