"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Home, BookOpen, Award, User, Bell, Menu, X, Zap, Star, Settings, LogOut, Search } from "lucide-react"

export default function StudentNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [points, setPoints] = useState(1250)
  const [level, setLevel] = useState(5)
  const [streak, setStreak] = useState(3)
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
          ? "bg-black/80 backdrop-blur-lg py-2 shadow-lg border-b border-yellow-300/50"
          : "bg-black/30 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link href="/student/dashboard" className="flex items-center">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mr-3"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Star className="w-6 h-6 text-yellow-300" />
            </motion.div>
            <span className="text-yellow-300 text-xl tracking-wide hidden md:block font-press-start-2p">EduQuest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/student/dashboard" icon={<Home className="w-4 h-4 mr-2" />} text="Home" />
            <NavLink href="/subjects" icon={<BookOpen className="w-4 h-4 mr-2" />} text="Subjects" />
            <NavLink href="/achievements" icon={<Award className="w-4 h-4 mr-2" />} text="Achievements" />

            {/* Search Bar */}
            <div className="relative mx-4">
              <input
                type="text"
                placeholder="Search..."
                className="bg-blue-900/30 border border-blue-500/30 rounded-full py-1 pl-9 pr-4 text-sm text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 transition-all duration-300 focus:w-60"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
            </div>
          </div>

          {/* User Stats and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Points */}
            <motion.div
              className="flex items-center bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 text-yellow-300 mr-1" />
              <span className="text-yellow-300 text-sm font-bold">{points} pts</span>
            </motion.div>

            {/* Level */}
            <motion.div
              className="flex items-center bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-4 h-4 text-purple-300 mr-1" />
              <span className="text-purple-300 text-sm font-bold">Level {level}</span>
            </motion.div>

            {/* Streak */}
            <motion.div
              className="flex items-center bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4 text-blue-300 mr-1" />
              <span className="text-blue-300 text-sm font-bold">{streak} Day Streak</span>
            </motion.div>

            {/* Notifications */}
            <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-800/50 transition-colors">
                <Bell className="w-5 h-5 text-blue-300" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
            </motion.div>

            {/* Profile */}
            <motion.div className="relative group" whileHover={{ scale: 1.05 }}>
              <button className="flex items-center space-x-2 p-1 rounded-full bg-blue-900/30 hover:bg-blue-800/50 transition-colors">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500">
                  <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-blue-100 text-sm pr-2">Alex</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-lg border border-blue-500/30 rounded-lg shadow-lg overflow-hidden transform origin-top scale-0 group-hover:scale-100 transition-transform duration-200 z-50">
                <div className="py-2">
                  <Link
                    href="/student/profile"
                    className="flex items-center px-4 py-2 text-blue-100 hover:bg-blue-900/50"
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/student/settings"
                    className="flex items-center px-4 py-2 text-blue-100 hover:bg-blue-900/50"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-blue-800/50 my-1"></div>
                  <Link href="/logout" className="flex items-center px-4 py-2 text-red-400 hover:bg-blue-900/50">
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
              className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-800/50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6 text-blue-300" /> : <Menu className="w-6 h-6 text-blue-300" />}
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
            className="md:hidden bg-black/90 backdrop-blur-lg border-t border-blue-800/50 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-2">
                <MobileNavLink href="/student/dashboard" icon={<Home className="w-5 h-5 mr-3" />} text="Home" />
                <MobileNavLink href="/subjects" icon={<BookOpen className="w-5 h-5 mr-3" />} text="Subjects" />
                <MobileNavLink href="/achievements" icon={<Award className="w-5 h-5 mr-3" />} text="Achievements" />
                <MobileNavLink href="/student/profile" icon={<User className="w-5 h-5 mr-3" />} text="Profile" />
                <MobileNavLink href="/student/settings" icon={<Settings className="w-5 h-5 mr-3" />} text="Settings" />
              </div>

              {/* Mobile Search */}
              <div className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-blue-900/30 border border-blue-500/30 rounded-lg py-2 pl-10 pr-4 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              </div>

              {/* Mobile User Stats */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="flex items-center justify-center bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/30">
                  <Star className="w-4 h-4 text-yellow-300 mr-1" />
                  <span className="text-yellow-300 text-sm font-bold">{points}</span>
                </div>
                <div className="flex items-center justify-center bg-purple-500/20 p-2 rounded-lg border border-purple-500/30">
                  <Award className="w-4 h-4 text-purple-300 mr-1" />
                  <span className="text-purple-300 text-sm font-bold">Lvl {level}</span>
                </div>
                <div className="flex items-center justify-center bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
                  <Zap className="w-4 h-4 text-blue-300 mr-1" />
                  <span className="text-blue-300 text-sm font-bold">{streak} Days</span>
                </div>
              </div>

              {/* Mobile Logout */}
              <div className="mt-4 pt-4 border-t border-blue-800/50">
                <Link
                  href="/logout"
                  className="flex items-center justify-center w-full p-3 bg-red-900/20 text-red-400 rounded-lg border border-red-500/30"
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
        className="flex items-center px-3 py-2 text-blue-100 hover:text-yellow-300 rounded-lg hover:bg-blue-900/30 transition-colors"
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
        className="flex items-center px-4 py-3 text-blue-100 bg-blue-900/30 rounded-lg border border-blue-800/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {icon}
        <span>{text}</span>
      </motion.div>
    </Link>
  )
}
