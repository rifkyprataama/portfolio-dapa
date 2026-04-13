import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CommandPalette } from "@/components/layout/command-palette";
import { FloatingButtons } from "@/components/layout/floating-buttons";
// 1. IMPORT KOMPONEN BARU DI SINI
import { LayoutInitializer } from "@/components/layout/layout-initializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rifky Pratama | Portfolio",
    template: "%s | Rifky Pratama",
  },
  description: "Personal portfolio showcasing digital solutions.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Rifky Pratama | Portfolio",
    description: "A Software Engineer dedicated to building impactful digital solutions.",
    url: "https://portfolio-rifkyprataama.vercel.app/",
    siteName: "Rifky Pratama Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 2. PANGGIL DI SINI: Deteksi layar otomatis sebelum merender UI utama */}
          <LayoutInitializer />
          
          {/* Mendaftarkan Command Palette ke Layout */}
          <CommandPalette />
          
          {children}
          
          {/* Mendaftarkan Floating Buttons ke Layout */}
          <FloatingButtons />
        </ThemeProvider>
      </body>
    </html>
  );
}