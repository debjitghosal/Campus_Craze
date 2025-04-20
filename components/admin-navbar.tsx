"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Settings,
  Shield,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Search,
  HelpCircle,
  BarChart2,
  FileText,
  Database,
} from "lucide-react"

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(5)
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
        isScrolled ? "bg-gray-900 shadow-md py-2" : "bg-gray-900/95 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link href="/admin/panel" className="flex items-center">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center mr-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-white text-xl font-bold">
              EduQuest <span className="text-indigo-400">Admin</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/admin/panel" icon={<LayoutDashboard className="w-4 h-4 mr-2" />} text="Dashboard" />
            <NavLink href="/admin/users" icon={<Users className="w-4 h-4 mr-2" />} text="Users" />
            <NavLink href="/admin/content" icon={<FileText className="w-4 h-4 mr-2" />} text="Content" />
            <NavLink href="/admin/analytics" icon={<BarChart2 className="w-4 h-4 mr-2" />} text="Analytics" />
            <NavLink href="/admin/system" icon={<Database className="w-4 h-4 mr-2" />} text="System" />

            {/* Search Bar */}
            <div className="relative mx-4">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 border border-gray-700 rounded-full py-1 pl-9 pr-4 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-40 transition-all duration-300 focus:w-60"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Help */}
            <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-800 transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Notifications */}
            <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-800 transition-colors">
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
              <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-800 transition-colors">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-500">
                  <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-gray-300 text-sm pr-2">Admin</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden transform origin-top scale-0 group-hover:scale-100 transition-transform duration-200 z-50 border border-gray-700">
                <div className="py-2">
                  <Link href="/admin/profile" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                  <Link href="/admin/settings" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <Link href="/logout" className="flex items-center px-4 py-2 text-red-400 hover:bg-gray-700">
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
              className="p-2 rounded-full text-gray-400 hover:bg-gray-800 transition-colors"
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
            className="md:hidden bg-gray-800 border-t border-gray-700 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-2">
                <MobileNavLink
                  href="/admin/panel"
                  icon={<LayoutDashboard className="w-5 h-5 mr-3" />}
                  text="Dashboard"
                />
                <MobileNavLink href="/admin/users" icon={<Users className="w-5 h-5 mr-3" />} text="Users" />
                <MobileNavLink href="/admin/content" icon={<FileText className="w-5 h-5 mr-3" />} text="Content" />
                <MobileNavLink href="/admin/analytics" icon={<BarChart2 className="w-5 h-5 mr-3" />} text="Analytics" />
                <MobileNavLink href="/admin/system" icon={<Database className="w-5 h-5 mr-3" />} text="System" />
                <MobileNavLink href="/admin/profile" icon={<User className="w-5 h-5 mr-3" />} text="Profile" />
                <MobileNavLink href="/admin/settings" icon={<Settings className="w-5 h-5 mr-3" />} text="Settings" />
              </div>

              {/* Mobile Search */}
              <div className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>

              {/* Mobile Logout */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <Link
                  href="/logout"
                  className="flex items-center justify-center w-full p-3 bg-red-900/20 text-red-400 rounded-lg border border-red-900/30"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Desktop Navigation Link Component
function NavLink({ href, icon, text }) {
  return (
    <Link href={href}>
      <motion.div
        className="flex items-center px-3 py-2 text-gray-300 hover:text-indigo-400 rounded-lg hover:bg-gray-800 transition-colors"
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
        className="flex items-center px-4 py-3 text-gray-300 bg-gray-700 rounded-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {icon}
        <span>{text}</span>
      </motion.div>
    </Link>
  )
}
