"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const statuses = ["Lets Collaborate", "Open to work", "Hire me"]

// PERBAIKAN: Menambahkan { className } agar bisa menerima styling dari luar
export function AnimatedStatus({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % statuses.length)
    }, 3000) // Berganti setiap 3 detik
    return () => clearInterval(timer)
  }, [])

  return (
    // Memasukkan className dari luar menggunakan fungsi cn() bawaan Shadcn
    <div className={cn("text-zinc-600 dark:text-zinc-400 text-xs font-medium border border-emerald-500/30 dark:border-emerald-900/50 bg-emerald-500/10 dark:bg-emerald-950/20 px-3 py-1.5 rounded-full flex items-center gap-2 w-fit", className)}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
      </span>
      <span className="animate-fade-in whitespace-nowrap">{statuses[index]}</span>
    </div>
  )
}