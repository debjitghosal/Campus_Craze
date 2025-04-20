import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface NavigationPortalProps {
  title: string
  icon: string
  color: string
  link: string
}

const NavigationPortal: React.FC<NavigationPortalProps> = ({ title, icon, color, link }) => {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className={`${color} rounded-lg p-6 shadow-lg transform rotate-3 cursor-pointer text-center`}
      >
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </motion.div>
    </Link>
  )
}

export default NavigationPortal
