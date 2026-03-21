import { create } from 'zustand'

type LanguageState = {
  language: 'US' | 'ID'
  setLanguage: (lang: 'US' | 'ID') => void
}

export function useLanguageStore() {
  return useLanguageStoreBase()
}

const useLanguageStoreBase = create<LanguageState>((set) => ({
  language: 'US', // Default bahasa Inggris
  setLanguage: (lang) => set({ language: lang }),
}))