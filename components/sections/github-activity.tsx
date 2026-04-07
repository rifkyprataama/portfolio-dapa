"use client"
import React, { useState, useEffect } from "react"
import { Github, Star, GitFork, Loader2 } from "lucide-react"
import { GitHubCalendar } from 'react-github-calendar' 
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import { useLanguageStore } from "@/store/use-language-store"
import { dict } from "@/lib/dictionaries"

interface GithubProfile { followers: number; following: number; public_repos: number; }
interface GithubRepo { id: string; name: string; description: string; html_url: string; stargazers_count: number; forks_count: number; language: string; }

const getLanguageColor = (lang: string) => {
  switch (lang?.toLowerCase()) {
    case "typescript": return "bg-blue-500"
    case "javascript": return "bg-yellow-400"
    case "scss": case "css": return "bg-pink-500"
    case "html": return "bg-orange-500"
    case "python": return "bg-blue-400"
    case "java": return "bg-red-500"
    case "php": return "bg-indigo-500"
    case "dart": return "bg-sky-400"
    case "kotlin": return "bg-purple-500"
    default: return "bg-zinc-400"
  }
}

export function GithubActivity() {
  const { language } = useLanguageStore()
  const d = dict[language]
  const [mounted, setMounted] = useState(false)
  
  const [profileData, setProfileData] = useState<GithubProfile | null>(null)
  const [githubApiData, setGithubApiData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  const GITHUB_USERNAME = "RifkyPrataama" 

  const customTheme = {
    light: ['#f4f4f5', '#fef08a', '#fde047', '#eab308', '#ca8a04'],
    dark: ['#27272a', '#713f12', '#a16207', '#ca8a04', '#eab308']
  }

  useEffect(() => {
    setMounted(true)
    
    async function fetchGithubData() {
      try {
        // 1. Profil Dasar (Untuk Angka Follower/Repo)
        const profileRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        if (profileRes.ok) setProfileData(await profileRes.json())

        // 2. Data Kontribusi & Pinned Repos Asli dari API Rahasia Kita
        const apiRes = await fetch(`/api/github`)
        if (apiRes.ok) setGithubApiData(await apiRes.json())
          
      } catch (error) {
        console.error("Gagal mengambil data GitHub:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGithubData()
  }, [])

  return (
    <div className="flex flex-col gap-8 w-full mt-4">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Github className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            {d.githubTitle}
          </h2>
          <div className="flex items-center justify-between mt-1">
             <p className="text-sm text-zinc-500 dark:text-zinc-400">{d.githubSubtitle}</p>
             <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors hidden sm:block">
               @{GITHUB_USERNAME}
             </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
          <span className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{d.lblFollowers}</span>
          {loading ? <Loader2 className="w-5 h-5 animate-spin mt-1 text-zinc-400"/> : <span className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mt-1">{profileData?.followers || 0}</span>}
        </div>
        <div className="flex flex-col items-center justify-center p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
          <span className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{d.lblFollowing}</span>
          {loading ? <Loader2 className="w-5 h-5 animate-spin mt-1 text-zinc-400"/> : <span className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mt-1">{profileData?.following || 0}</span>}
        </div>
        <div className="flex flex-col items-center justify-center p-5 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
          <span className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{d.lblRepos}</span>
          {loading ? <Loader2 className="w-5 h-5 animate-spin mt-1 text-zinc-400"/> : <span className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mt-1">{profileData?.public_repos || 0}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
          <span className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{d.lblContributions}</span>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mt-1 text-zinc-400"/> : <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mt-1">{githubApiData?.totalContributions || 0}</span>}
        </div>
        <div className="flex flex-col items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
          <span className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{d.lblThisWeek}</span>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mt-1 text-zinc-400"/> : <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mt-1">{githubApiData?.thisWeek || 0}</span>}
        </div>
        <div className="flex flex-col items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
          <span className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{d.lblBestDay}</span>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mt-1 text-zinc-400"/> : <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mt-1">{githubApiData?.bestDay?.count || 0}</span>}
        </div>
        <div className="flex flex-col items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl">
          <span className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{d.lblDailyAvg}</span>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mt-1 text-zinc-400"/> : <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mt-1 flex items-end gap-1">{githubApiData?.dailyAvg || 0} <span className="text-xs text-zinc-500 mb-1">/ day</span></span>}
        </div>
      </div>

      <div className="w-full overflow-hidden border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 rounded-2xl p-6">
        <div className="w-full overflow-x-auto custom-scrollbar pb-2">
          <div className="min-w-[750px] min-h-[120px] flex items-center justify-center">
            {!mounted ? (
              <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
            ) : (
              <>
                <GitHubCalendar 
                  username={GITHUB_USERNAME} 
                  theme={customTheme}
                  colorScheme="light" 
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  renderBlock={(block, activity) => 
                    React.cloneElement(block as React.ReactElement, {
                      'data-tooltip-id': 'github-tooltip',
                      'data-tooltip-content': `${activity.count} contributions on ${activity.date}`
                    } as any)
                  }
                />
                <ReactTooltip 
                  id="github-tooltip" 
                  className="!bg-zinc-900 !text-white !text-xs !font-bold !rounded-md !px-2.5 !py-1.5" 
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <h3 className="text-lg font-bold text-zinc-600 dark:text-zinc-400">{d.lblPinnedRepos}</h3>
        {loading ? (
           <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-zinc-500" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* RENDER PINNED REPOS DARI API */}
            {githubApiData?.pinnedRepos?.map((repo: GithubRepo) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="p-5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 rounded-2xl flex flex-col gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all group">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                  <Github className="w-4 h-4 text-zinc-400" />
                  {repo.name}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 h-10">
                  {repo.description || "No description provided for this repository."}
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500 mt-auto pt-2">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`}></div> 
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Star className="w-3.5 h-3.5" /> {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><GitFork className="w-3.5 h-3.5" /> {repo.forks_count}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}