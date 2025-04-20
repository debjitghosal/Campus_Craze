import type React from "react"
import type { Metadata } from "next"
import { Inter, Press_Start_2P, VT323 } from "next/font/google"
import "./globals.css"
import LayoutWithNavbar from "@/components/layout-with-navbar"

// Configure the Inter font
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

// Configure the Press Start 2P font
const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
  display: 'swap',
})

// Configure the VT323 font
const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "EduQuest - Learning Management System",
  description: "A gamified learning platform for students and instructors",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart2P.variable} ${vt323.variable}`}>
        <LayoutWithNavbar>{children}</LayoutWithNavbar>
      </body>
    </html>
  )
}
