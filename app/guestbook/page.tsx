"use client"
import { useState, useEffect } from "react"
import { Send, Github, Loader2, MessageSquare, LogOut, Reply, X } from "lucide-react" // Tambah ikon Reply & X
import { useLayoutStore } from "@/store/use-layout-store"
import { useLanguageStore } from "@/store/use-language-store" 
import { dict } from "@/lib/dictionaries" 
import { Topbar } from "@/components/layout/topbar" 
import { Sidebar } from "@/components/layout/sidebar"
import { supabase } from "@/lib/supabase"

export default function GuestbookPage() {
  const { layout } = useLayoutStore()
  const { language } = useLanguageStore()
  const d = dict[language]
  
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [session, setSession] = useState<any>(null)
  
  // STATE BARU UNTUK FITUR REPLY
  const [replyingTo, setReplyingTo] = useState<any | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric', 
      hour: 'numeric', minute: '2-digit', hour12: true 
    }).format(date)
  }

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: true })

    if (!error && data) setMessages(data)
  }

  useEffect(() => {
    setMounted(true)
    fetchMessages()
    setLoading(false)

    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/guestbook` }
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !session) return

    setIsSending(true)
    const userMeta = session.user.user_metadata

    const { error } = await supabase.from('guestbook').insert([{
      user_email: session.user.email,
      user_name: userMeta.full_name || userMeta.user_name || 'Anonymous',
      user_avatar: userMeta.avatar_url,
      message: newMessage,
      parent_id: replyingTo ? replyingTo.id : null // Simpan ID pesan yang dibalas
    }])

    if (!error) {
      setNewMessage("") 
      setReplyingTo(null) // Reset state reply setelah terkirim
      fetchMessages()   
    }
    
    setIsSending(false)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white dark:bg-[#313338]">
      {layout === 'topbar' && <Topbar />}

      <div className="max-w-6xl mx-auto pt-8 pb-8 px-6 sm:px-10 w-full flex-1 flex flex-col">
        <main className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-6 flex-1 overflow-hidden">
          
          {layout === 'sidebar' && <Sidebar />}

          <section className="flex-1 flex flex-col h-[80vh] bg-zinc-50 dark:bg-[#313338] rounded-2xl border border-zinc-200 dark:border-zinc-800/50 overflow-hidden relative shadow-sm">
            
            <div className="flex flex-col border-b border-zinc-200 dark:border-zinc-800/60 p-5 bg-white dark:bg-[#313338] shrink-0 shadow-sm z-10">
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-zinc-400" />
                {d.guestbookTitle}
              </h1>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1 ml-9">
                {d.guestbookSubtitle}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar flex flex-col gap-1">
              <div className="p-4 mt-8 mb-4 ml-4">
                <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-zinc-500" />
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Welcome to #guestbook!</h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">This is the start of the #guestbook channel.</p>
              </div>

              {loading ? (
                <div className="flex justify-center p-10"><Loader2 className="w-6 h-6 animate-spin text-zinc-500" /></div>
              ) : (
                messages.map((msg) => {
                  // Cari data pesan asli (parent) jika ini adalah sebuah balasan
                  const parentMsg = msg.parent_id ? messages.find(m => m.id === msg.parent_id) : null;

                  return (
                    <div key={msg.id} className="relative flex flex-col px-4 py-2 hover:bg-zinc-100 dark:hover:bg-[#2b2d31] transition-colors group">
                      
                      {/* Tombol Reply Melayang (Muncul saat di-hover) */}
                      {session && (
                        <div className="absolute right-4 -top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-[#313338] border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm z-10 flex">
                          <button 
                            onClick={() => setReplyingTo(msg)}
                            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-[#404249] rounded-md transition-colors"
                            title="Reply"
                          >
                            <Reply className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Tampilan Konteks Balasan (Discord Style Reply Line) */}
                      {parentMsg && (
                        <div className="flex items-center gap-2 text-[13px] text-zinc-500 mb-1 ml-11 relative select-none">
                          {/* Garis Melengkung ala Discord */}
                          <div className="absolute -left-8 top-1/2 w-6 h-[18px] border-l-2 border-t-2 border-zinc-300 dark:border-[#4e5058] rounded-tl-lg -translate-y-[100%]"></div>
                          
                          <img src={parentMsg.user_avatar} alt={parentMsg.user_name} className="w-4 h-4 rounded-full" />
                          <span className="font-semibold text-zinc-600 dark:text-zinc-400 hover:underline cursor-pointer">@{parentMsg.user_name}</span>
                          <span className="truncate max-w-[200px] sm:max-w-xs">{parentMsg.message}</span>
                        </div>
                      )}

                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0 mt-0.5 overflow-hidden cursor-pointer">
                          <img src={msg.user_avatar} alt={msg.user_name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="flex items-baseline gap-2">
                            <span className="font-semibold text-base text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer">{msg.user_name}</span>
                            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{formatDate(msg.created_at)}</span>
                          </div>
                          <p className="text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed mt-0.5 whitespace-pre-wrap break-words">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Area Kotak Input */}
            <div className="p-4 bg-white dark:bg-[#313338] shrink-0 pb-6 relative">
              
              {/* Indikator Sedang Membalas (Muncul di atas kotak input) */}
              {replyingTo && (
                <div className="absolute bottom-full left-4 right-4 bg-zinc-100 dark:bg-[#2b2d31] border border-b-0 border-zinc-200 dark:border-zinc-700/50 rounded-t-lg px-4 py-2 flex items-center justify-between mb-0 translate-y-4 pb-5 z-0">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <Reply className="w-3.5 h-3.5" />
                    Replying to <span className="font-bold text-zinc-900 dark:text-zinc-100">@{replyingTo.user_name}</span>
                  </div>
                  <button onClick={() => setReplyingTo(null)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {session ? (
                <form onSubmit={handleSendMessage} className="flex flex-col gap-2 relative z-10">
                  {!replyingTo && (
                    <div className="flex items-center justify-between px-2 pb-1">
                      <span className="text-xs font-medium text-zinc-500">
                        Posting as <strong className="text-zinc-900 dark:text-zinc-300">{session.user.user_metadata.full_name || session.user.user_metadata.user_name}</strong>
                      </span>
                      <button type="button" onClick={handleLogout} className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors">
                        <LogOut className="w-3 h-3" /> Logout
                      </button>
                    </div>
                  )}
                  
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={replyingTo ? `Replying to @${replyingTo.user_name}` : d.lblMessagePlaceholder}
                      className="w-full bg-zinc-100 dark:bg-[#383a40] text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 rounded-lg pl-4 pr-12 py-3.5 focus:outline-none focus:ring-0 text-[15px] shadow-sm"
                      disabled={isSending}
                    />
                    <button 
                      type="submit" 
                      disabled={isSending || !newMessage.trim()}
                      className="absolute right-3 p-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-md hover:opacity-80 disabled:opacity-50 transition-opacity"
                    >
                      {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="w-full bg-zinc-100 dark:bg-[#383a40] rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-4 border border-zinc-200 dark:border-zinc-700/50">
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 ml-2">
                    {d.lblLoginToPost}
                  </span>
                  <button 
                    onClick={handleLogin}
                    className="flex items-center gap-2 bg-[#24292e] text-white px-6 py-2.5 rounded-md text-sm font-bold hover:bg-[#2f363d] transition-all w-full sm:w-auto justify-center shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    Login GitHub
                  </button>
                </div>
              )}
            </div>

          </section>
        </main>
      </div>
    </div>
  )
}