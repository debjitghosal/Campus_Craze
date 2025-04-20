"use client"

import { usePathname } from "next/navigation"
import StudentNavbar from "./student-navbar"
import InstructorNavbar from "./instructor-navbar"
import AdminNavbar from "./admin-navbar"
import type { ReactNode } from "react"

interface LayoutWithNavbarProps {
  children: ReactNode
}

export default function LayoutWithNavbar({ children }: LayoutWithNavbarProps) {
  const pathname = usePathname()
  
  // Determine which navbar to show based on the current path
  const renderNavbar = () => {
    if (pathname?.startsWith("/student")) {
      return <StudentNavbar />
    } else if (pathname?.startsWith("/instructor")) {
      return <InstructorNavbar />
    } else if (pathname?.startsWith("/admin")) {
      return <AdminNavbar />
    }
    
    // No navbar for landing page and other public pages
    return null
  }
  
  // Determine the content class based on the path
  const getContentClass = () => {
    if (pathname?.startsWith("/student")) {
      return "pt-20 "
    } else if (pathname?.startsWith("/admin")) {
      return "pt-24 bg-gray-100 text-gray-800" // Add more top padding for the admin navbar
    } else if (pathname?.startsWith("/instructor")) {
      return "pt-16 bg-gray-100"
    }
    
    return "" // No padding for pages without navbar
  }
  
  return (
    <>
      {renderNavbar()}
      <main className={getContentClass()}>{children}</main>
    </>
  )
}
