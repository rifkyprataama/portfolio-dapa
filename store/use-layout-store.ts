import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LayoutType = 'sidebar' | 'topbar'

interface LayoutState {
  layout: LayoutType
  toggleLayout: () => void
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layout: 'sidebar', // Default awal adalah sidebar
      toggleLayout: () => set((state) => ({ 
        layout: state.layout === 'sidebar' ? 'topbar' : 'sidebar' 
      })),
    }),
    {
      name: 'layout-storage', // Nama key yang akan disimpan di localStorage browser
    }
  )
)