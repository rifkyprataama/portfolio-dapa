"use client"
import { Keyboard } from "lucide-react"
import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"

export function MonkeytypeStats() {
  const { language } = useLanguageStore()
  const d = dict[language]

  return (
    <div className="flex flex-col gap-6 w-full mt-8">
      {/* Header Monkeytype */}
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
        <span className="text-sm font-medium text-zinc-500">SatriaAxel</span>
      </div>

      {/* Card Utama Monkeytype */}
      <div className="flex flex-col md:flex-row border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl overflow-hidden">
        
        {/* Kolom 1: Profil */}
        <div className="flex flex-col p-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800/80 md:w-1/3">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden border border-zinc-300 dark:border-zinc-700">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-yellow-500 dark:text-yellow-400">SatriaAxel</h3>
              <p className="text-xs text-zinc-500">Joined 05 Apr 2022</p>
              <p className="text-xs text-zinc-500">Current Streak 2 days</p>
            </div>
          </div>
          {/* Level Bar */}
          <div className="flex items-center gap-3 text-xs font-bold text-yellow-500">
            <span>94</span>
            <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
               <div className="h-full bg-yellow-500 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <span className="text-zinc-500 font-medium text-[10px]">2397/4706</span>
          </div>
        </div>

        {/* Kolom 2: Stats Angka */}
        <div className="flex flex-col justify-center p-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800/80 md:w-1/3 gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">{d.lblTestsStarted}</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">2570</span>
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
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">{d.lblBio}</span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Typing fast, coding faster.</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">{d.lblKeyboard}</span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Rexus Mono Series 75%</span>
          </div>
        </div>

      </div>
    </div>
  )
}