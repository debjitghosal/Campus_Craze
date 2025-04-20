import { motion } from "framer-motion"
import { Star, Award, BarChart2, Zap } from "lucide-react"

const GameHeader = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center mb-8 bg-black bg-opacity-50 p-4 rounded-lg"
    >
      <div className="flex items-center space-x-4">
        <motion.div whileHover={{ scale: 1.2 }} className="bg-yellow-400 rounded-full p-2">
          <Star className="text-black" />
        </motion.div>
        <span className="text-white font-bold">1250 pts</span>
      </div>
      <div className="flex items-center space-x-4">
        <motion.div whileHover={{ scale: 1.2 }} className="bg-purple-400 rounded-full p-2">
          <Award className="text-black" />
        </motion.div>
        <span className="text-white font-bold">Level 5</span>
      </div>
      <motion.div whileHover={{ scale: 1.2 }} className="bg-blue-400 rounded-full p-2">
        <BarChart2 className="text-black" />
      </motion.div>
      <div className="flex items-center space-x-2">
        <Zap className="text-yellow-400" />
        <span className="text-white font-bold">3 Day Streak!</span>
      </div>
    </motion.div>
  )
}

export default GameHeader
