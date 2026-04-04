"use client"
import { useState, useEffect } from "react"
import { Globe, FileText, Github, Linkedin, Gift, Mail, ArrowUpRight, Send, MapPin, QrCode, Sun, Moon, Zap, Heart, Copy, Instagram } from "lucide-react"
import { useLanguageStore } from "@/store/use-language-store" 
import { dict } from "@/lib/dictionaries" 
import { cn } from "@/lib/utils"

// Ikon TikTok Kustom
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.46-2.9 5.92-1.76 1.48-4.22 1.94-6.42 1.5-2.22-.44-4.2-1.84-5.32-3.8-1.11-1.93-1.28-4.32-.47-6.38.8-2.07 2.45-3.69 4.54-4.43 2.1-.74 4.49-.69 6.54.12v4.06c-1.04-.51-2.26-.64-3.37-.36-1.1.28-2.04 1.05-2.52 2.05-.49 1.01-.5 2.22-.03 3.23.47 1.02 1.41 1.76 2.5 2.06 1.09.29 2.27.16 3.25-.36 1-.52 1.73-1.48 2.02-2.58.07-.27.1-.55.1-.83V.02z"/>
  </svg>
)

// Ikon Threads/AtSign Kustom
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c2.4 0 4.67-.85 6.47-2.35l-1.3-1.6c-1.4 1.1-3.2 1.8-5.17 1.8-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8c0 2.28-1.24 4.14-3.1 4.75-.48-1.1-1.58-1.9-2.9-1.9-1.66 0-3 1.34-3 3s1.34 3 3 3c1.5 0 2.75-1.1 2.97-2.55C19.78 17.65 22 15.08 22 12c0-5.523-4.477-10-10-10zm0 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
)

export default function LinksPage() {
  const { language, setLanguage } = useLanguageStore() 
  const d = dict[language]
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  const EMAIL_ADDRESS = "rifkydaffapratama@gmail.com"

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Komponen Tombol Sosmed Bulat
  const SocialCircle = ({ icon: Icon, href }: any) => (
    <a href={href} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:border-zinc-700 transition-all bg-white dark:bg-zinc-950/50">
      <Icon className="w-[22px] h-[22px]" />
    </a>
  )

  // Komponen Tautan Gaya Referensi (Bersih & Putih)
  const LinkCard = ({ title, desc, icon: Icon, href }: any) => (
    <a 
      href={href}
      target="_blank"
      rel="noreferrer"
      className="relative flex items-center w-full p-4 rounded-[20px] transition-all duration-300 group bg-white dark:bg-[#1c1c1f] border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-md"
    >
      <div className="p-2.5 rounded-[14px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center mr-4">
        <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-[15px] text-zinc-900 dark:text-zinc-100">{title}</span>
        <span className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium">{desc}</span>
      </div>
      <ArrowUpRight className="absolute right-5 top-5 w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
    </a>
  )

  return (
    // Kita hapus semua div bawaan Topbar & Sidebar, fokus pada penempatan ke tengah layar
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-4 font-sans transition-colors duration-500 bg-[#fafafa] dark:bg-zinc-950/80">
      
      <main className="w-full max-w-[420px] flex flex-col">
        
        {/* TOP BAR (Toggles & Barcode) */}
        <div className="flex items-center justify-between w-full mb-8">
          {/* Fake Theme Toggle */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 gap-1 border border-zinc-200 dark:border-zinc-800">
            <button className="p-1.5 bg-white dark:bg-zinc-800 rounded-full shadow-sm text-zinc-700 dark:text-zinc-300"><Sun className="w-4 h-4" /></button>
            <button className="p-1.5 text-zinc-400 hover:text-zinc-600"><Moon className="w-4 h-4" /></button>
            <button className="p-1.5 text-zinc-400 hover:text-zinc-600"><Zap className="w-4 h-4" /></button>
            <button className="p-1.5 text-zinc-400 hover:text-zinc-600"><Moon className="w-4 h-4" /></button>
            <button className="p-1.5 text-zinc-400 hover:text-zinc-600"><Heart className="w-4 h-4" /></button>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full p-1 border border-zinc-200 dark:border-zinc-800">
            <button 
              onClick={() => setLanguage("US")}
              className={cn("px-4 py-1.5 rounded-full text-xs font-bold transition-all", language === "US" ? "bg-yellow-400 text-black shadow-sm" : "text-zinc-400 hover:text-zinc-600")}
            >
              US
            </button>
            <button 
              onClick={() => setLanguage("ID")}
              className={cn("px-4 py-1.5 rounded-full text-xs font-bold transition-all", language === "ID" ? "bg-yellow-400 text-black shadow-sm" : "text-zinc-400 hover:text-zinc-600")}
            >
              ID
            </button>
          </div>

          {/* Barcode/QR Button */}
          <button className="p-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 transition-colors">
            <QrCode className="w-5 h-5" />
          </button>
        </div>

        {/* HEADER PROFIL */}
        <div className="flex flex-col items-center text-center gap-2 mb-6">
          <div className="w-[104px] h-[104px] rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 mb-2 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop" alt="Rifky Daffa" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-[22px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Rifky Daffa Pratama
          </h1>
          <span className="text-yellow-500 dark:text-yellow-400 font-semibold text-sm mt-0.5">{d.lblProfileRole}</span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-zinc-500 mt-1">
            <MapPin className="w-3.5 h-3.5" /> {d.lblLocation}
          </span>
        </div>

        {/* SOSMED BULAT */}
        <div className="flex items-center justify-center gap-3.5 mb-10">
          <SocialCircle icon={Github} href="https://github.com/SatriaBahari" />
          <SocialCircle icon={Linkedin} href="#" />
          <SocialCircle icon={Instagram} href="#" />
          <SocialCircle icon={TiktokIcon} href="#" />
          <SocialCircle icon={ThreadsIcon} href="#" />
        </div>

        {/* CONTAINER TAUTAN UTAMA */}
        <div className="flex flex-col gap-4 w-full mb-8">
          <LinkCard title={d.btnPersonalWebsite} desc={d.descPersonalWebsite} icon={Globe} href="/" />
          <LinkCard title={d.btnReadCV} desc={d.descResume} icon={FileText} href="#" />
          <LinkCard title={d.btnGithubProfile} desc={d.descGithub} icon={Github} href="https://github.com/SatriaBahari" />
          <LinkCard title={d.btnLinkedInProfile} desc={d.descLinkedin} icon={Linkedin} href="#" />
          <LinkCard title={d.btnSaweria} desc={d.descSaweria} icon={Gift} href="#" />
        </div>

        <div className="w-full border-t border-zinc-200 dark:border-zinc-800 mb-8"></div>

        {/* GET IN TOUCH SECTION (Email Box Bawah) */}
        <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[24px] p-6 flex flex-col shadow-sm">
          <div className="w-[46px] h-[46px] bg-[#fff8e6] dark:bg-yellow-500/10 rounded-xl flex items-center justify-center mb-5 border border-yellow-100 dark:border-yellow-900/30">
            <Mail className="w-5 h-5 text-yellow-500" />
          </div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">{d.getInTouch}</h2>
          <p className="text-[13px] text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed pr-4">
            {d.getInTouchDesc}
          </p>
          
          <a href="/contact" className="w-fit flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl font-bold text-[14px] transition-all mb-6">
            <Send className="w-4 h-4" />
            {d.btnLinksSendEmail}
          </a>

          <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl flex items-center justify-between text-[13px] font-medium text-zinc-600 dark:text-zinc-400 transition-colors">
            <span className="truncate">{EMAIL_ADDRESS}</span>
            <button onClick={handleCopyEmail} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Copy Email">
              {copied ? <span className="text-green-500 font-bold text-xs">Copied!</span> : <Copy className="w-4 h-4 text-zinc-400" />}
            </button>
          </div>
        </div>

      </main>
    </div>
  )
}