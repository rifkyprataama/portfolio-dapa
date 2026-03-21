"use client"
import { GraduationCap } from "lucide-react"

// Data dummy pendidikan (Silakan sesuaikan dengan data aslimu nanti)
const educationData = [
  {
    id: 1,
    school: "Universitas Islam Negeri Sunan Gunung Djati", // Disesuaikan dengan tebakan dari proyek tugas kuliahmu
    degree: "Bachelor's degree",
    major: "Informatics Engineering",
    gpa: "3.80/4.00",
    startDate: "2023",
    endDate: "2027",
    location: "Bandung, Indonesia ID"
  },
  {
    id: 2,
    school: "SMA Negeri 1 Bandung", // Placeholder
    degree: "Senior High School",
    major: "Science",
    gpa: null, // Kosongkan jika tidak ingin menampilkan nilai
    startDate: "2020",
    endDate: "2023",
    location: "Bandung, Indonesia ID"
  }
]

export function Education() {
  return (
    <div className="flex flex-col gap-4">
      {educationData.map((edu) => (
        <div 
          key={edu.id} 
          className="flex gap-4 border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl p-5 transition-colors duration-300"
        >
          {/* Logo Sekolah/Kampus (Placeholder) */}
          <div className="flex items-center justify-center w-12 h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shrink-0 shadow-sm">
             <GraduationCap className="w-6 h-6 text-zinc-400" />
          </div>

          {/* Detail Pendidikan */}
          <div className="flex flex-col flex-1 justify-center">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{edu.school}</h3>
            
            <div className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 flex items-center flex-wrap gap-1.5">
              <span>{edu.degree}</span>
              <span className="mx-0.5">•</span>
              <span>{edu.major}</span>
              {/* Render GPA hanya jika datanya ada */}
              {edu.gpa && (
                <>
                  <span className="mx-0.5">•</span>
                  <span>GPA: {edu.gpa}</span>
                </>
              )}
            </div>
            
            <div className="text-[12px] text-zinc-400 dark:text-zinc-500 font-medium mt-1.5 flex items-center flex-wrap gap-1.5">
              <span>{edu.startDate} - {edu.endDate}</span>
              <span className="mx-0.5">•</span>
              <span>{edu.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}