import type React from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface DailyChallengeProps {
  onClose: () => void
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Daily Challenge</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <p className="mb-4">Solve this puzzle to earn extra points!</p>
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
          <p className="font-bold">Question:</p>
          <p>What is the capital of France?</p>
        </div>
        <div className="space-y-2">
          <button className="bg-purple-500 text-white w-full py-2 rounded-lg hover:bg-purple-600">London</button>
          <button className="bg-purple-500 text-white w-full py-2 rounded-lg hover:bg-purple-600">Berlin</button>
          <button className="bg-purple-500 text-white w-full py-2 rounded-lg hover:bg-purple-600">Paris</button>
          <button className="bg-purple-500 text-white w-full py-2 rounded-lg hover:bg-purple-600">Rome</button>
        </div>
      </div>
    </motion.div>
  )
}

export default DailyChallenge
