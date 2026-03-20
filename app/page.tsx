import { ArrowRight, Box } from "lucide-react" // Ikon menu
import { AnimatedStatus } from "@/components/animated-status"
import { SettingsToggles } from "@/components/settings-toggles"

// Daftar menu navigasi (Disesuaikan dengan Gambar 2)
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
  return (
    // Kontainer Berpusat (max-w-6xl)
    <div className="max-w-6xl mx-auto py-20 px-6 flex flex-col gap-20">
      
      {/* Header (Top Right Settings) */}
      <header className="flex justify-end">
        <SettingsToggles />
      </header>

      {/* Konten Utama (Main Row) */}
      <main className="flex flex-col md:flex-row gap-12">
        
        {/* Kolom Kiri: Bagian Profil & Navigasi (Aside) */}
        <aside className="w-full md:w-64 flex flex-col gap-8">
          
          {/* Bagian Profil */}
          <div className="flex flex-col gap-6 items-start">
            {/* Avatar Placeholder (Lingkaran Abu-abu) */}
            <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700"></div>
            {/* Status Animasi */}
            <AnimatedStatus />
          </div>

          {/* Navigasi (List) */}
          <nav>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${link.active ? 'bg-zinc-800/60 text-foreground' : 'text-muted-foreground hover:bg-zinc-900/40 hover:text-foreground'}`}>
                    <div className="flex items-center gap-3">
                      <Box className="w-4 h-4 text-zinc-600 group-hover:text-foreground" />
                      {link.label}
                    </div>
                    {/* Ikon panah muncul saat active atau hover */}
                    {(link.active || link.label === "Uses") && <ArrowRight className="w-3 h-3 text-zinc-600" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Kolom Kanan: Teks Perkenalan & Skills (Main Content Area) */}
        <section className="flex-1 flex flex-col gap-10">
          
          {/* Teks Perkenalan */}
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-extrabold tracking-tight">Hi, I'm Daffa Pratama</h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
              A Frontend Engineer and digital content creator dedicated to building impactful digital solutions. I specialize in developing scalable web platforms using a modern tech stack, primarily Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>

          {/* Area Skills (Untuk nanti kita isi tags-nya) */}
          <div className="border-t border-zinc-800 pt-10 mt-5 flex flex-col gap-4">
             <div className="flex items-center gap-2">
               <span className="text-lg font-bold">{'</>'} Skills</span>
             </div>
             <p className="text-zinc-400">My professional skills.</p>
             {/* Placeholder untuk badge tags (seperti di Gambar 2) */}
             <div className="h-20 bg-zinc-950/40 rounded-lg border border-zinc-900/50 flex items-center justify-center text-zinc-700 text-sm">
               [Skills Tags will be added here]
             </div>
          </div>

        </section>
      </main>
      
    </div>
  );
}