"use client"
import React, { useState, useEffect } from "react"
import { Keyboard, Medal } from "lucide-react"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"

export function MonkeytypeStats() {
  const { language } = useLanguageStore()
  const d = dict[language]

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Data Dummy Leaderboard sesuai video referensi
  const leaderboards = [
    { mode: "15 time", wpm: 132.5, acc: "98%", date: "12 Oct 2025" },
    { mode: "30 time", wpm: 120.2, acc: "97%", date: "05 Nov 2025" },
    { mode: "60 time", wpm: 110.1, acc: "96%", date: "20 Dec 2025" },
    { mode: "10 words", wpm: 145.0, acc: "100%", date: "01 Jan 2026" },
  ]

  return (
    <div className="flex flex-col gap-6 w-full mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Keyboard className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            {d.monkeytypeTitle}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {d.monkeytypeSubtitle}
          </p>
        </div>
        <a href="https://monkeytype.com/profile/SatriaAxel" target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          SatriaAxel
        </a>
      </div>

      {/* Card Utama */}
      <div className="flex flex-col md:flex-row border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
        
        {/* Kolom 1: Profil */}
        <div className="flex flex-col p-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800/80 md:w-1/3 justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden border border-zinc-300 dark:border-zinc-700">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-yellow-500 dark:text-yellow-400">SatriaAxel</h3>
              <p className="text-xs font-medium text-zinc-500">Joined 05 Apr 2022</p>
              <p className="text-xs font-medium text-zinc-500 mt-0.5">Current Streak 2 days</p>
            </div>
          </div>
          {/* Level Bar */}
          <div className="flex items-center gap-3 text-xs font-bold text-yellow-500 cursor-help" data-tooltip-id="mt-tooltip" data-tooltip-content="Level 94">
            <span>94</span>
            <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
               <div className="h-full bg-yellow-500 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <span className="text-zinc-500 font-medium text-[10px]">2397/4706</span>
          </div>
        </div>

        {/* Kolom 2: Stats Angka */}
        <div className="flex flex-col justify-center p-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800/80 md:w-1/3 gap-5">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">{d.lblTestsStarted}</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">2,570</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">{d.lblTestsCompleted}</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">996</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">{d.lblTotalTime}</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">10:10:06</span>
          </div>
        </div>

        {/* Kolom 3: Info */}
        <div className="flex flex-col justify-center p-6 md:w-1/3 gap-6">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">{d.lblBio}</span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Typing fast, coding faster.</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">{d.lblKeyboard}</span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Rexus Mono Series 75%</span>
          </div>
        </div>
      </div>

      {/* All-Time Leaderboard (Fitur Baru dari Video) */}
      <div className="flex flex-col gap-4 mt-2">
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">All-Time English Leaderboard</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {leaderboards.map((board, i) => (
            <div key={i} className="flex flex-col p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{board.mode}</span>
                <Medal 
                  className="w-4 h-4 text-yellow-500 cursor-help transition-transform hover:scale-110" 
                  data-tooltip-id="mt-tooltip"
                  data-tooltip-content={`Achieved on ${board.date}`}
                />
              </div>
              <div className="flex items-end gap-1.5 mt-1">
                <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-none">{board.wpm}</span>
                <span className="text-xs font-bold text-zinc-400 mb-0.5">WPM</span>
              </div>
              <div className="text-xs font-semibold text-yellow-600 dark:text-yellow-500 mt-2">
                {board.acc} acc
              </div>
            </div>
          ))}
        </div>
      </div>

      {mounted && (
        <ReactTooltip 
          id="mt-tooltip" 
          className="!bg-zinc-900 !text-white !text-xs !font-bold !rounded-md !px-2.5 !py-1.5 z-50" 
        />
      )}
    </div>
  )
}