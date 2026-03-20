import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette"; // Mengimpor CommandPalette
import { FloatingButtons } from "@/components/floating-buttons"; // Mengimpor FloatingButtons

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daffa Pratama | Frontend Engineer",
  description: "Personal portfolio showcasing digital solutions.",
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
          defaultTheme="system" // Kembali ke system theme
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