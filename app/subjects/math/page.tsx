"use client"

import { motion } from "framer-motion"
import { Calculator, Star, Trophy, Brain } from "lucide-react"
import SpaceBackground from "@/components/space-bg"

export default function MathPage() {
  const topics = [
    { name: "Algebra", progress: 80, locked: false },
    { name: "Geometry", progress: 65, locked: false },
    { name: "Trigonometry", progress: 40, locked: false },
    { name: "Calculus", progress: 0, locked: true },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-4xl font-[Press_Start_2P] text-blue-400 mb-4">Mathematics</h1>
          <div className="flex justify-center items-center gap-4">
            <Star className="text-yellow-400" />
            <span className="text-xl">Level 12</span>
            <Trophy className="text-yellow-400" />
            <span className="text-xl">1250 Points</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Topic */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-500/20 to-black"
          >
            <h2 className="text-2xl font-[Press_Start_2P] mb-6">Current Topic</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Calculator className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">Quadratic Equations</h3>
                  <p className="text-gray-400">Master the art of solving quadratic equations</p>
                </div>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1 }}
                  className="absolute h-full bg-blue-500 rounded-full"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-blue-500 rounded-lg font-[Press_Start_2P] text-sm"
              >
                Continue Learning
              </motion.button>
            </div>
          </motion.div>

          {/* Daily Challenge */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-lg border-2 border-yellow-500 bg-gradient-to-br from-yellow-500/20 to-black"
          >
            <h2 className="text-2xl font-[Press_Start_2P] mb-6">Daily Challenge</h2>
            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-lg mb-2">Solve for x:</p>
                <p className="text-2xl text-yellow-400 font-bold">x² + 5x + 6 = 0</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-blue-500 rounded-lg"
                >
                  x = -2, -3
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-blue-500 rounded-lg"
                >
                  x = -1, -4
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-blue-500 rounded-lg"
                >
                  x = 2, 3
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-blue-500 rounded-lg"
                >
                  x = 1, -6
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Topics Progress */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-500/20 to-black"
        >
          <h2 className="text-2xl font-[Press_Start_2P] mb-6">Topics Progress</h2>
          <div className="grid gap-4">
            {topics.map((topic, index) => (
              <div key={topic.name} className={`p-4 rounded-lg ${topic.locked ? "bg-gray-800/50" : "bg-black/50"}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {topic.locked ? <span className="text-xl">🔒</span> : <Brain className="text-blue-400" />}
                    <h3 className="font-bold">{topic.name}</h3>
                  </div>
                  <span className="text-sm text-gray-400">{topic.progress}%</span>
                </div>
                <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="absolute h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
