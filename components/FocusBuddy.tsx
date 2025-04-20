"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const FocusBuddy = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isIdle, setIsIdle] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
      })
    }, 10000)

    const idleTimer = setTimeout(() => {
      setIsIdle(true)
      setMessage("Hey Chris! Need any help?")
    }, 30000)

    return () => {
      clearInterval(interval)
      clearTimeout(idleTimer)
    }
  }, [])

  const handleClick = () => {
    setIsIdle(false)
    setMessage("Great job, Chris! Keep it up!")
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <motion.div
      animate={position}
      transition={{ type: "spring", stiffness: 50 }}
      className="fixed z-50"
      style={{ bottom: "20px", right: "20px" }}
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={handleClick}
      >
        <img src="/avatar-buddy.png" alt="Focus Buddy" className="w-16 h-16" />
      </motion.div>
      <AnimatePresence>
        {(isIdle || message) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white p-3 rounded-lg mt-2 text-sm max-w-[200px] shadow-lg"
          >
            {message || "Hey Chris! Need any help?"}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default FocusBuddy
