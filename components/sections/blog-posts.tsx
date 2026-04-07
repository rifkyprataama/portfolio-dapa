"use client"
import React, { useState, useEffect } from "react"
import { BookOpen, ExternalLink, MessageSquare, Heart, Loader2 } from "lucide-react"
import { useLanguageStore } from "@/store/use-language-store"

export function BlogPosts() {
  const { language } = useLanguageStore()
  
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Nanti jika kamu buat akun dev.to, samakan username-nya dengan ini ya!
  const DEVTO_USERNAME = "rifkyprataama" 

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=4`)
        if (res.ok) {
          const data = await res.json()
          setPosts(data)
        }
      } catch (error) {
        console.error("Gagal mengambil artikel:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            {language === 'ID' ? 'Artikel Terbaru' : 'Latest Articles'}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {language === 'ID' ? 'Tulisan saya seputar programming dan teknologi.' : 'My thoughts on programming and technology.'}
          </p>
        </div>
        <a href={`https://dev.to/${DEVTO_USERNAME}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors hidden sm:block">
          dev.to/{DEVTO_USERNAME}
        </a>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-zinc-500" /></div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <a key={post.id} href={post.url} target="_blank" rel="noreferrer" className="p-5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 rounded-2xl flex flex-col gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all group">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-auto">
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500 mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                <span className="flex items-center gap-1 hover:text-red-500 transition-colors"><Heart className="w-3.5 h-3.5" /> {post.public_reactions_count}</span>
                <span className="flex items-center gap-1 hover:text-blue-500 transition-colors"><MessageSquare className="w-3.5 h-3.5" /> {post.comments_count}</span>
                <span className="ml-auto text-[10px] uppercase tracking-wider">{post.readable_publish_date}</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        /* JIKA ARTIKEL KOSONG, TAMPILKAN INI */
        <div className="p-8 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl flex flex-col items-center justify-center text-center gap-3 bg-zinc-50/50 dark:bg-zinc-900/20">
          <BookOpen className="w-8 h-8 text-zinc-400" />
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'ID' ? 'Belum ada artikel' : 'No articles yet'}
          </h3>
          <p className="text-sm text-zinc-500 max-w-sm">
            {language === 'ID' ? 'Saya sedang meracik tulisan pertama saya. Pantau terus ya!' : 'I am currently brewing my first article. Stay tuned!'}
          </p>
        </div>
      )}
    </div>
  )
}