"use client"
import { useState, useEffect } from "react"
import { ArrowUpRight, Mail, Instagram, Linkedin, Github, Loader2, CheckCircle2 } from "lucide-react"
import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store" 
import { dict } from "@/lib/dictionaries" 
import { Topbar } from "@/components/layout/topbar" 
import { Sidebar } from "@/components/layout/sidebar"
import { cn } from "@/lib/utils"

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.46-2.9 5.92-1.76 1.48-4.22 1.94-6.42 1.5-2.22-.44-4.2-1.84-5.32-3.8-1.11-1.93-1.28-4.32-.47-6.38.8-2.07 2.45-3.69 4.54-4.43 2.1-.74 4.49-.69 6.54.12v4.06c-1.04-.51-2.26-.64-3.37-.36-1.1.28-2.04 1.05-2.52 2.05-.49 1.01-.5 2.22-.03 3.23.47 1.02 1.41 1.76 2.5 2.06 1.09.29 2.27.16 3.25-.36 1-.52 1.73-1.48 2.02-2.58.07-.27.1-.55.1-.83V.02z"/>
  </svg>
)

export default function ContactPage() {
  const { layout } = useLayoutStore()
  const { language } = useLanguageStore()
  const d = dict[language]
  const [mounted, setMounted] = useState(false)

  // State untuk form
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // ACCESS KEY WEB3FORMS MILIKMU
  const WEB3FORMS_ACCESS_KEY = "c1a82515-4201-48e6-b16e-179f27ae799e"

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  // Garis pemisah standar
  const Divider = () => (
    <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-8"></div>
  )

  const SocialCard = ({ colSpan, gradient, title, desc, btnText, Icon, href }: any) => (
    <a href={href} target="_blank" rel="noreferrer" className={cn("relative flex flex-col p-6 rounded-2xl overflow-hidden group transition-transform hover:-translate-y-1 hover:shadow-lg", gradient, colSpan)}>
      <Icon className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500" />
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-sm font-medium text-white/80 mb-6 max-w-[200px] md:max-w-xs">{desc}</p>
        <div className="mt-auto inline-flex items-center gap-2 bg-white/90 hover:bg-white text-zinc-900 px-4 py-2 rounded-lg font-bold text-sm w-fit transition-colors">
          {btnText} <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget 
    const formData = new FormData(form)
    formData.append("access_key", WEB3FORMS_ACCESS_KEY)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      
      if (response.ok) {
        setIsSuccess(true)
        form.reset() 
        setTimeout(() => setIsSuccess(false), 5000) 
      }
    } catch (error) {
      console.error("Error sending email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-[#fafafa] dark:bg-zinc-950">
      {layout === 'topbar' && <Topbar />}

      <div className="max-w-6xl mx-auto pt-8 pb-16 px-6 sm:px-10 w-full flex-1 flex flex-col">
        <main className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-6 flex-1">
          {layout === 'sidebar' && <Sidebar />}

          <section className="flex-1 flex flex-col mt-2 max-w-4xl">
            
            {/* Header */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">{d.contactTitle}</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">{d.contactSubtitle}</p>
            </div>

            <Divider />

            {/* Social Media Cards */}
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{d.findMe}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. GANTI EMAIL DI SINI */}
                <SocialCard colSpan="md:col-span-2" gradient="bg-gradient-to-br from-red-600 to-red-800" title={d.stayInTouch} desc={d.stayInTouchDesc} btnText={d.btnGmail} Icon={Mail} href="mailto:rifkydaffap@gmail.com" />
                
                {/* 2. GANTI LINK INSTAGRAM DI SINI */}
                <SocialCard gradient="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500" title={d.followJourney} desc={d.followJourneyDesc} btnText={d.btnInstagram} Icon={Instagram} href="https://instagram.com/rifkyprataama" />
                
                {/* 3. GANTI LINK LINKEDIN DI SINI */}
                <SocialCard gradient="bg-gradient-to-br from-blue-600 to-cyan-600" title={d.letsConnect} desc={d.letsConnectDesc} btnText={d.btnLinkedIn} Icon={Linkedin} href="" />
                
                {/* 4. GANTI LINK TIKTOK DI SINI */}
                <SocialCard gradient="bg-gradient-to-br from-zinc-700 to-zinc-900" title={d.joinFun} desc={d.joinFunDesc} btnText={d.btnTiktok} Icon={TiktokIcon} href="" />
                
                {/* 5. GANTI LINK GITHUB DI SINI */}
                <SocialCard gradient="bg-gradient-to-br from-slate-800 to-black" title={d.exploreCode} desc={d.exploreCodeDesc} btnText={d.btnGithub} Icon={Github} href="https://github.com/RifkyPrataama" />
              
              </div>
            </div>

            <Divider />

            {/* Form Email */}
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{d.orSend}</h2>
              
              <form className="flex flex-col gap-4 relative" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="name" 
                    required
                    placeholder={d.lblName}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                  <input 
                    type="email" 
                    name="email" 
                    required
                    placeholder={d.lblEmail}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                </div>
                <textarea 
                  name="message" 
                  required
                  placeholder={d.lblMessage}
                  rows={5}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow resize-none disabled:opacity-50"
                  disabled={isSubmitting}
                ></textarea>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-2 bg-zinc-700 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : (
                    d.btnSendEmail
                  )}
                </button>

                {isSuccess && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-bold animate-in fade-in zoom-in">
                    <CheckCircle2 className="w-6 h-6" /> Message Sent Successfully!
                  </div>
                )}
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}