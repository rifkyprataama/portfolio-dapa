import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CommandPalette } from "@/components/layout/command-palette";
import { FloatingButtons } from "@/components/layout/floating-buttons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// DI SINI LETAK PERUBAHANNYA
export const metadata: Metadata = {
  title: {
    default: "Rifky Pratama | Portfolio", // Muncul di halaman utama (Home)
    template: "%s | Rifky Pratama",       // Template otomatis untuk halaman lain
  },
  description: "Personal portfolio showcasing digital solutions.",
  icons: {
    // Trik menggunakan emoji laptop sebagai favicon sementara
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💻</text></svg>',
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