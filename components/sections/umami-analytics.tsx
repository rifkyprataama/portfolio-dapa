"use client"
import { useState, useEffect } from "react"
import { PieChart, ChevronDown, BarChart2, LineChart as LineIcon } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"

export function UmamiAnalytics() {
  const { language } = useLanguageStore()
  const d = dict[language]

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [chartType, setChartType] = useState<"bar" | "line">("bar")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedSite, setSelectedSite] = useState("All")
  const sites = ["All", "daffapratama.my.id", "daffapratama.site"]

  const stats = [
    { label: d.lblPageViews, value: "23.342" },
    { label: d.lblVisitors, value: "3.722" },
    { label: d.lblVisits, value: "5.465" },
    { label: d.lblCountries, value: "75" },
    { label: d.lblEvents, value: "2.105" },
  ]

  const chartData = [
    { name: "Oct", sessions: 4200, pageViews: 12000 },
    { name: "Nov", sessions: 3100, pageViews: 6300 },
    { name: "Dec", sessions: 4800, pageViews: 8700 },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950 dark:bg-white text-zinc-100 dark:text-zinc-900 p-3 rounded-lg shadow-xl border border-zinc-800 dark:border-zinc-200 text-sm">
          <p className="font-bold mb-2">{label} 2025</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <span className="font-medium">Page Views: <span className="font-bold">{payload[1].value.toLocaleString()}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-200 dark:bg-yellow-800"></div>
              <span className="font-medium">Sessions: <span className="font-bold">{payload[0].value.toLocaleString()}</span></span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4 relative">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            {d.umamiTitle}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{d.umamiSubtitle}</p>
        </div>
        
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center justify-between gap-8 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors w-full sm:w-64">
            {selectedSite} <ChevronDown className="w-4 h-4 text-zinc-400" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-full sm:w-64 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              {sites.map((site) => (
                <button key={site} onClick={() => { setSelectedSite(site); setIsDropdownOpen(false) }} className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center justify-between">
                  {site} {selectedSite === site && <span className="text-zinc-900 dark:text-white font-bold">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-sm">
            <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">{stat.label}</span>
            <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-4">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Traffic Trends</span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-yellow-200 dark:bg-yellow-800"></div> Sessions</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Page Views</div>
            </div>
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <button onClick={() => setChartType("bar")} className={cn("p-1.5 rounded-md transition-all", chartType === "bar" ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300")}><BarChart2 className="w-4 h-4" /></button>
              <button onClick={() => setChartType("line")} className={cn("p-1.5 rounded-md transition-all", chartType === "line" ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300")}><LineIcon className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* RECHARTS COMPONENT - FIXED */}
        <div style={{ width: '100%', height: '300px' }}>
          {mounted && (
            <ResponsiveContainer width="100%" height={300}>
              {chartType === "bar" ? (
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#52525b" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} tickFormatter={(value) => `${value.toLocaleString()}`} />
                  {/* PERBAIKAN: cursor={false} agar tooltip tidak bocor kemana-mana */}
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Bar dataKey="sessions" fill="#fef08a" radius={[2, 2, 0, 0]} className="dark:fill-yellow-900/60" />
                  <Bar dataKey="pageViews" fill="#eab308" radius={[2, 2, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#52525b" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} tickFormatter={(value) => `${value.toLocaleString()}`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#52525b', strokeWidth: 1, strokeDasharray: '5 5', opacity: 0.5 }} />
                  <Line type="monotone" dataKey="pageViews" stroke="#eab308" strokeWidth={3} dot={{ r: 4, fill: '#eab308', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="sessions" stroke="#fef08a" strokeWidth={3} className="dark:stroke-yellow-800" dot={{ r: 4, fill: '#fef08a', strokeWidth: 2 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}