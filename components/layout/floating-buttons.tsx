"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowUp, MessageSquareText } from "lucide-react"
import { cn } from "@/lib/utils"

export function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowBackToTop(true)
      else setShowBackToTop(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-row-reverse items-center gap-3 transition-all duration-300">
      
      {/* 1. Tombol Guestbook (Gaya Monochrome) */}
      <Link
        href="/guestbook"
        className={cn(
          "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95",
          // PERBAIKAN: Hitam di Light Mode, Putih di Dark Mode
          "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200",
          "relative overflow-hidden group"
        )}
        title="Visit Guestbook"
      >
        <MessageSquareText className="w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:scale-110" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-500 dark:bg-zinc-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-zinc-600 dark:bg-zinc-500"></span>
        </span>
      </Link>

      {/* 2. Tombol Back to Top */}
      <button
        onClick={scrollToTop}
        className={cn(
          "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg transition-all duration-300 ease-out transform",
          "border border-zinc-200 dark:border-zinc-800/50 bg-background/95 backdrop-blur",
          "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:scale-105 active:scale-95",
          showBackToTop ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        )}
        title="Back to Top"
      >
        <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
      </button>

    </div>
  )
}