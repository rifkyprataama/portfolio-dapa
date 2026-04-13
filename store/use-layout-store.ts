import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LayoutType = 'sidebar' | 'topbar'

interface LayoutState {
  layout: LayoutType
  toggleLayout: () => void
  // 1. Tambahkan definisi fungsi setLayout di interface
  setLayout: (newLayout: LayoutType) => void 
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layout: 'sidebar', 
      toggleLayout: () => set((state) => ({ 
        layout: state.layout === 'sidebar' ? 'topbar' : 'sidebar' 
      })),
      
      // 2. Implementasikan fungsi setLayout di sini
      setLayout: (newLayout) => set({ layout: newLayout }),
    }),
    {
      name: 'layout-storage', 
    }
  )
)