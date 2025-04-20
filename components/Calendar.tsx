import type React from "react"
import { motion } from "framer-motion"
import { X, CheckCircle } from "lucide-react"

interface CalendarProps {
  onClose: () => void
}

const Calendar: React.FC<CalendarProps> = ({ onClose }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const currentDate = new Date()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Calendar</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
            <motion.div
              key={date}
              className={`text-center p-2 rounded-lg ${date === currentDate.getDate() ? "bg-blue-500 text-white" : "bg-gray-100"}`}
              whileHover={{ scale: 1.1 }}
            >
              {date}
              {date % 3 === 0 && <CheckCircle className="mx-auto mt-1 text-green-500" size={16} />}
            </motion.div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span>Current Date</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={16} />
            <span>Completed Tasks</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Calendar
