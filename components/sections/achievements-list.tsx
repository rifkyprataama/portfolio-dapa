"use client"
import { useState, useEffect, useMemo } from "react"
import { Search, ChevronDown, Plus, Link as LinkIcon, X, ArrowRight, Loader2 } from "lucide-react"
import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase" // Import Supabase

export function AchievementsList() {
  const { language } = useLanguageStore()
  const d = dict[language]

  const [achievementsData, setAchievementsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [selectedItem, setSelectedItem] = useState<any>(null)

  // Mengambil data dari Supabase
  useEffect(() => {
    async function fetchAchievements() {
      setLoading(true)
      const { data, error } = await supabase
        .from('achievements_data')
        .select('*')
        .eq('language', language)
        .order('id', { ascending: true })

      if (error) {
        console.error("Error fetching achievements:", error)
      } else {
        setAchievementsData(data || [])
      }
      setLoading(false)
    }

    fetchAchievements()
  }, [language])

  const uniqueTypes = ["All", ...Array.from(new Set(achievementsData.map(item => item.type)))]
  const uniqueCategories = ["All", ...Array.from(new Set(achievementsData.map(item => item.category)))]

  const filteredData = useMemo(() => {
    return achievementsData.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.issuer.toLowerCase().includes(searchQuery.toLowerCase())
      const matchType = typeFilter === "All" || item.type === typeFilter
      const matchCat = categoryFilter === "All" || item.category === categoryFilter
      return matchSearch && matchType && matchCat
    })
  }, [achievementsData, searchQuery, typeFilter, categoryFilter])

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-zinc-500" /></div>
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder={d.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
          />
        </div>

        <div className="relative w-full md:w-48 shrink-0">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all cursor-pointer">
            {uniqueTypes.map(type => (<option key={type} value={type}>{type === "All" ? d.filterType : type}</option>))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>

        <div className="relative w-full md:w-48 shrink-0">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all cursor-pointer">
            {uniqueCategories.map(cat => (<option key={cat} value={cat}>{cat === "All" ? d.filterCategory : cat}</option>))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      <div className="text-sm font-medium text-zinc-500 mb-2">
        {d.totalStr} {filteredData.length}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <div key={item.id} className="flex flex-col border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
            
            <div onClick={() => setSelectedItem(item)} className="aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border-b border-zinc-200 dark:border-zinc-800 cursor-pointer">
               <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/40 transition-colors duration-300"></div>
            </div>

            <div className="flex flex-col flex-1 p-5">
               <p className="text-[10px] font-mono text-zinc-500 mb-2">{item.credential_id}</p>
               
               <h3 onClick={() => setSelectedItem(item)} className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2 mb-1 cursor-pointer hover:underline decoration-zinc-300 dark:decoration-zinc-600 underline-offset-4 transition-all">
                 {item.title}
               </h3>
               
               <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mb-4">{item.issuer}</p>

               <div className="flex flex-wrap gap-2 mt-auto mb-5">
                 <span className="px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-[11px] font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/50">{item.type}</span>
                 <span className="px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-[11px] font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/50">{item.category}</span>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{d.issuedOn}</span>
                   <span className="text-[12px] font-medium text-zinc-600 dark:text-zinc-300">{item.date.toUpperCase()}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <button onClick={() => setSelectedItem(item)} className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer" title="View Details">
                     <Plus className="w-4 h-4" />
                   </button>
                   <a href={item.credential_url} target="_blank" rel="noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer" title="View Credential">
                     <LinkIcon className="w-4 h-4" />
                   </a>
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedItem(null)}></div>
          <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors backdrop-blur-md cursor-pointer">
              <X className="w-4 h-4" />
            </button>
            <div className="w-full md:w-3/5 bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800/50 p-6 sm:p-8 flex items-center justify-center min-h-[250px] md:min-h-[400px]">
               <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug mb-2 pr-6">{selectedItem.title}</h2>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 pb-6 border-b border-zinc-100 dark:border-zinc-800">{selectedItem.issuer}</p>
              <div className="flex flex-col gap-5 py-6 flex-1">
                <div><p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{d.lblCredentialId}</p><p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{selectedItem.credential_id}</p></div>
                <div><p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{d.lblType}</p><p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{selectedItem.type}</p></div>
                <div><p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{d.lblCategory}</p><p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{selectedItem.category}</p></div>
                <div><p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{d.lblIssueDate}</p><p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{selectedItem.date}</p></div>
              </div>
              <a href={selectedItem.credential_url} target="_blank" rel="noreferrer" className="mt-auto w-full flex items-center justify-center gap-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-3 rounded-xl text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer">
                {d.btnCredentialUrl}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}