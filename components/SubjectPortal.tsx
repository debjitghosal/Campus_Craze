import type React from "react"
import { motion } from "framer-motion"

interface SubjectPortalProps {
  subject: string
  bgColor: string
  icon: string
}

const SubjectPortal: React.FC<SubjectPortalProps> = ({ subject, bgColor, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`${bgColor} rounded-lg p-6 shadow-lg transform rotate-3 cursor-pointer`}
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold text-black">{subject}</h2>
      <motion.div
        className="mt-4 h-2 bg-gray-300 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "70%" }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="h-full bg-green-500 rounded-full"></div>
      </motion.div>
    </motion.div>
  )
}

export default SubjectPortal
