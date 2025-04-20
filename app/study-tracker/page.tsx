"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Clock, Target, ChevronLeft, ChevronRight } from "lucide-react"
import SpaceBackground from "@/components/space-bg"

export default function StudyTrackerPage() {
  const [currentMonth, setCurrentMonth] = useState("February 2025")

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center mb-12 text-blue-400"
        >
          Study Tracker
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Studied Today */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-500/20 to-black"
          >
            <div className="flex items-center gap-4 mb-6">
              <Clock className="text-blue-400" size={24} />
              <h2 className="text-xl font-semibold">Time Studied Today</h2>
            </div>
            <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1 }}
                className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">4h 30m / 6h Goal</span>
              <span className="text-blue-400">75%</span>
            </div>
          </motion.div>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-500/20 to-black"
          >
            <div className="flex justify-between items-center mb-6">
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <ChevronLeft className="text-purple-400" />
              </button>
              <h2 className="text-xl font-semibold text-purple-400">{currentMonth}</h2>
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <ChevronRight className="text-purple-400" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-gray-400 font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                <motion.div
                  key={date}
                  whileHover={{ scale: 1.1 }}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg
                    ${date === 16 ? "bg-purple-500 text-white" : "hover:bg-gray-800"}
                    ${date < 16 ? "bg-gray-800/50" : ""}
                    cursor-pointer transition-colors
                  `}
                >
                  {date}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Weekly Target */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-6 rounded-lg border-2 border-green-500 bg-gradient-to-br from-green-500/20 to-black"
        >
          <div className="flex items-center gap-4 mb-6">
            <Target className="text-green-400" size={24} />
            <h2 className="text-xl font-semibold">Weekly Target</h2>
          </div>
          <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 1 }}
              className="absolute h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full"
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">25.5h / 30h Weekly Goal</span>
            <span className="text-green-400">85%</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
