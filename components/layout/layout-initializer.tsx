"use client"
import { useEffect } from "react"
import { useLayoutStore } from "@/store/use-layout-store"

export function LayoutInitializer() {
  const { setLayout } = useLayoutStore()

  useEffect(() => {
    // Fungsi untuk mendeteksi lebar layar
    const checkScreenSize = () => {
      // 1024px adalah batas standar untuk ukuran Laptop/Desktop (lg di Tailwind)
      if (window.innerWidth < 1024) {
        setLayout("topbar") // Jika dibuka di HP atau Tablet
      } else {
        setLayout("sidebar") // Jika dibuka di Laptop atau PC
      }
    }

    // 1. Eksekusi fungsi saat website pertama kali dibuka
    checkScreenSize()

    // 2. (Opsional) Ubah layout secara otomatis jika ukuran browser ditarik/diubah
    window.addEventListener("resize", checkScreenSize)
    
    // Bersihkan event listener saat komponen dilepas
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [setLayout])

  // Komponen ini tidak merender UI apa pun (tak kasat mata)
  return null 
}