"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  BookOpen,
  FileText,
  Users,
  Bell,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Search,
  HelpCircle,
  BarChart2,
} from "lucide-react"

export default function InstructorNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(2)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-lg py-2" 
          : "bg-gradient-to-r from-blue-600 to-indigo-700 py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link href="/instructor/dashboard" className="flex items-center group">
            <motion.div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${
                isScrolled 
                  ? "bg-gradient-to-br from-blue-600 to-indigo-700" 
                  : "bg-white"
              }`}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <BookOpen className={`w-6 h-6 ${isScrolled ? "text-white" : "text-blue-600"}`} />
            </motion.div>
            <span className={`text-xl font-bold ${isScrolled ? "text-gray-800" : "text-white"}`}>
              EduQuest <span className={isScrolled ? "text-blue-600" : "text-blue-200"}>Instructor</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              href="/instructor/dashboard" 
              icon={<Home className="w-4 h-4 mr-2" />} 
              text="Dashboard" 
              isScrolled={isScrolled} 
            />
            <NavLink 
              href="/instructor/courses" 
              icon={<BookOpen className="w-4 h-4 mr-2" />} 
              text="Courses" 
              isScrolled={isScrolled} 
            />
            <NavLink 
              href="/instructor/quizzes" 
              icon={<FileText className="w-4 h-4 mr-2" />} 
              text="Quizzes" 
              isScrolled={isScrolled} 
            />
            <NavLink 
              href="/instructor/students" 
              icon={<Users className="w-4 h-4 mr-2" />} 
              text="Students" 
              isScrolled={isScrolled} 
            />
            <NavLink 
              href="/instructor/analytics" 
              icon={<BarChart2 className="w-4 h-4 mr-2" />} 
              text="Analytics" 
              isScrolled={isScrolled} 
            />

            {/* Search Bar */}
            <div className="relative mx-4">
              <input
                type="text"
                placeholder="Search..."
                className={`border rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 w-40 transition-all duration-300 focus:w-60 ${
                  isScrolled 
                    ? "bg-gray-100 border-gray-200 text-gray-700 focus:ring-blue-500" 
                    : "bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30 focus:ring-white/50"
                }`}
              />
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isScrolled ? "text-gray-400" : "text-white/70"
              }`} />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Help */}
            <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? "text-gray-600 hover:bg-gray-100" 
                  : "text-white hover:bg-white/10"
              }`}>
                <HelpCircle className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Notifications */}
            <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? "text-gray-600 hover:bg-gray-100" 
                  : "text-white hover:bg-white/10"
              }`}>
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
            </motion.div>

            {/* Profile */}
            <motion.div className="relative group" whileHover={{ scale: 1.05 }}>
              <button className={`flex items-center space-x-2 p-1 rounded-full transition-colors ${
                isScrolled 
                  ? "hover:bg-gray-100" 
                  : "hover:bg-white/10"
              }`}>
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500 bg-white flex-shrink-0">
                  <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className={`text-sm pr-2 ${isScrolled ? "text-gray-700" : "text-white"}`}>Dr. Smith</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden transform origin-top scale-0 group-hover:scale-100 transition-transform duration-200 z-50 border border-gray-100">
                <div className="py-3 px-4 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Dr. Jane Smith</p>
                  <p className="text-xs text-gray-500">jane.smith@eduquest.com</p>
                </div>
                <div className="py-2">
                  <Link
                    href="/instructor/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/instructor/settings"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link 
                    href="/logout" 
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? "hover:bg-gray-100 text-gray-700" 
                  : "hover:bg-white/10 text-white"
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-2">
                <MobileNavLink href="/instructor/dashboard" icon={<Home className="w-5 h-5 mr-3" />} text="Dashboard" />
                <MobileNavLink href="/instructor/courses" icon={<BookOpen className="w-5 h-5 mr-3" />} text="Courses" />
                <MobileNavLink href="/instructor/quizzes" icon={<FileText className="w-5 h-5 mr-3" />} text="Quizzes" />
                <MobileNavLink href="/instructor/students" icon={<Users className="w-5 h-5 mr-3" />} text="Students" />
                <MobileNavLink
                  href="/instructor/analytics"
                  icon={<BarChart2 className="w-5 h-5 mr-3" />}
                  text="Analytics"
                />
              </div>

              {/* Mobile Search */}
              <div className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* User Section */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center p-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                    <img src="/placeholder.svg?height=48&width=48" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Dr. Jane Smith</p>
                    <p className="text-xs text-gray-500">jane.smith@eduquest.com</p>
                  </div>
                </div>
                
                {/* User Actions */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/instructor/profile"
                    className="flex items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100"
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/instructor/settings"
                    className="flex items-center justify-center p-2 bg-gray-50 text-gray-600 rounded-lg border border-gray-100"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                </div>
                
                {/* Mobile Logout */}
                <div className="mt-3">
                  <Link
                    href="/logout"
                    className="flex items-center justify-center w-full p-3 bg-red-50 text-red-600 rounded-lg border border-red-100"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    <span>Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Desktop Navigation Link Component
function NavLink({ href, icon, text, isScrolled }) {
  return (
    <Link href={href}>
      <motion.div
        className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
          isScrolled 
            ? "text-gray-700 hover:text-blue-600 hover:bg-gray-100" 
            : "text-white hover:text-white hover:bg-white/10"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
        <span>{text}</span>
      </motion.div>
    </Link>
  )
}

// Mobile Navigation Link Component
function MobileNavLink({ href, icon, text }) {
  return (
    <Link href={href}>
      <motion.div
        className="flex items-center px-4 py-3 text-gray-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {icon}
        <span className="font-medium">{text}</span>
      </motion.div>
    </Link>
  )
}
