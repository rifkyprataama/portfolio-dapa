"use client"
import { useState, useEffect } from "react"
import { ArrowRight, Box } from "lucide-react"
import { AnimatedStatus } from "@/components/animated-status"
import { SettingsToggles } from "@/components/settings-toggles"
import { useLayoutStore } from "@/store/use-layout-store"
import { Topbar } from "@/components/topbar" // Pastikan Topbar di-import

const navLinks = [
  { href: "#", label: "Home", active: true },
  { href: "#", label: "About" },
  { href: "#", label: "Creations" },
  { href: "#", label: "Achievements" },
  { href: "#", label: "Projects" },
  { href: "#", label: "Dashboard" },
  { href: "#", label: "Guestbook" },
  { href: "#", label: "Uses" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Links" },
]

export default function Home() {
  const { layout } = useLayoutStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Tampilkan Topbar jika state layout adalah 'topbar' */}
      {layout === 'topbar' && <Topbar />}

      {/* Perkecil max-w-6xl menjadi max-w-5xl agar jarak tidak terlalu lebar */}
      <div className="max-w-5xl mx-auto py-12 px-6 w-full flex-1">
        
        <main className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-8">
          
          {/* Tampilkan Sidebar hanya jika state layout adalah 'sidebar' */}
          {layout === 'sidebar' && (
            <aside className="w-full md:w-56 flex flex-col gap-8 shrink-0">
              <div className="flex flex-col items-center text-center gap-4">
                {/* Ukuran foto diperkecil dari w-32 menjadi w-24 */}
                <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-800/50 shadow-lg overflow-hidden">
                </div>
                
                <div className="flex items-center gap-1.5">
                  {/* Ukuran nama diperkecil dari text-xl menjadi text-lg */}
                  <h2 className="text-lg font-bold tracking-tight">Daffa Pratama</h2>
                  <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.608 1.488a1.5 1.5 0 0 1 1.571-.059l.135.083 2.144 1.428a2.5 2.5 0 0 0 1.25.35h.176l2.553.07a1.5 1.5 0 0 1 1.455 1.341l.015.15v2.554c0 .548.163 1.076.471 1.523l.114.152 1.503 2.155a1.5 1.5 0 0 1 .133 1.487l-.095.17-1.428 2.143a2.5 2.5 0 0 0-.349 1.25v.176l-.07 2.553a1.5 1.5 0 0 1-1.342 1.455l-.15.015h-2.553a2.5 2.5 0 0 0-1.523.471l-.152.114-2.155 1.503a1.5 1.5 0 0 1-1.487.133l-.17-.095-2.144-1.428a2.5 2.5 0 0 0-1.25-.349h-.175l-2.554-.07a1.5 1.5 0 0 1-1.455-1.342l-.015-.15v-2.553c0-.548-.163-1.076-.471-1.523l-.114-.152-1.503-2.155a1.5 1.5 0 0 1-.133-1.487l.095-.17 1.428-2.144a2.5 2.5 0 0 0 .349-1.25v-.175l.07-2.554a1.5 1.5 0 0 1 1.342-1.455l.15-.015h2.553c.548 0 1.076-.163 1.523-.471l.152-.114 2.155-1.503a1.5 1.5 0 0 1 1.317-.238zM10.74 15.68l6.3-6.9a1 1 0 1 0-1.48-1.35l-5.6 6.13-2.6-2.6a1 1 0 1 0-1.42 1.42l3.3 3.3a1 1 0 0 0 1.5-.01z"/>
                  </svg>
                </div>

                <AnimatedStatus />
                <SettingsToggles />
              </div>

              <nav>
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${link.active ? 'bg-zinc-800/80 text-foreground' : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-foreground'}`}>
                        <div className="flex items-center gap-3">
                          <Box className={`w-4 h-4 ${link.active ? 'text-zinc-400' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                          {link.label}
                        </div>
                        {(link.active || link.label === "Uses") && <ArrowRight className="w-3 h-3 text-zinc-500" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          {/* Kolom Kanan: Konten Utama */}
          <section className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {/* Teks Header diperkecil dari text-5xl ke text-4xl */}
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Hi, I'm Daffa Pratama</h1>
              {/* Teks deskripsi diperkecil sedikit */}
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
                A Frontend Engineer and digital content creator dedicated to building impactful digital solutions. I specialize in developing scalable web platforms using a modern tech stack, primarily Next.js, TypeScript, and Tailwind CSS.
              </p>
            </div>

            <div className="border-t border-zinc-800/50 pt-8 mt-2 flex flex-col gap-4">
               <div className="flex items-center gap-2">
                 <span className="text-lg font-bold">{'</>'} Skills</span>
               </div>
               <p className="text-zinc-400 text-sm">My professional skills.</p>
               <div className="h-20 bg-zinc-900/30 rounded-lg border border-zinc-800/50 flex items-center justify-center text-zinc-600 text-sm">
                 [Skills Tags will be added here]
               </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}