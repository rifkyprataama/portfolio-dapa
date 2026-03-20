"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const statuses = ["Lets Collaborate", "Open to work", "Hire me"]

export function AnimatedStatus() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % statuses.length)
    }, 3000) // Berganti setiap 3 detik
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-zinc-400 text-sm font-medium border border-emerald-900/50 bg-emerald-950/20 px-3 py-1 rounded-full flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block"></span>
      {/* Teks berganti dengan transisi fade-in (Tailwind animate-fade-in) */}
      <span className="animate-fade-in">{statuses[index]}</span>
    </div>
  )
}