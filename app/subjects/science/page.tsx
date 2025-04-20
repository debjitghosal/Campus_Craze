"use client"

import { motion } from "framer-motion"
import { FlaskRoundIcon as Flask, Star, Trophy } from "lucide-react"
import SpaceBackground from "@/components/space-bg"

export default function SciencePage() {
  const experiments = [
    {
      title: "Chemical Reactions",
      description: "Mix virtual chemicals and observe reactions",
      progress: 75,
      icon: "🧪",
    },
    {
      title: "Electric Circuits",
      description: "Build and test virtual circuits",
      progress: 60,
      icon: "⚡",
    },
    {
      title: "Sound Waves",
      description: "Explore the physics of sound",
      progress: 45,
      icon: "🔊",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-4xl font-[Press_Start_2P] text-green-400 mb-4">Science Lab</h1>
          <div className="flex justify-center items-center gap-4">
            <Star className="text-yellow-400" />
            <span className="text-xl">Level 9</span>
            <Trophy className="text-yellow-400" />
            <span className="text-xl">850 Points</span>
          </div>
        </motion.div>

        {/* Virtual Lab */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 rounded-lg border-2 border-green-500 bg-gradient-to-br from-green-500/20 to-black"
            >
              <div className="text-4xl mb-4">{experiment.icon}</div>
              <h3 className="text-xl font-[Press_Start_2P] mb-2">{experiment.title}</h3>
              <p className="text-gray-400 mb-4">{experiment.description}</p>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${experiment.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="absolute h-full bg-green-500 rounded-full"
                />
              </div>
              <div className="mt-2 text-right text-sm">{experiment.progress}% Complete</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Current Experiment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-lg border-2 border-green-500 bg-gradient-to-br from-green-500/20 to-black mb-8"
        >
          <h2 className="text-2xl font-[Press_Start_2P] mb-6">Current Experiment</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Flask className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-xl font-bold">Chemical Reactions</h3>
                  <p className="text-gray-400">Mix virtual chemicals and observe reactions</p>
                </div>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1 }}
                  className="absolute h-full bg-green-500 rounded-full"
                />
              </div>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <h4 className="font-[Press_Start_2P] mb-4">Lab Notes</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Mix sodium with water</li>
                <li>• Observe the reaction</li>
                <li>• Record observations</li>
                <li>• Complete safety checklist</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Achievement Unlocked */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center p-6 rounded-lg border-2 border-yellow-500 bg-gradient-to-br from-yellow-500/20 to-black"
        >
          <h2 className="text-2xl font-[Press_Start_2P] mb-4">
            <span className="text-yellow-400">🏆</span> Achievement Unlocked!
          </h2>
          <p className="text-xl">Mad Scientist</p>
          <p className="text-gray-400">Complete 5 experiments with perfect scores</p>
        </motion.div>
      </div>
    </div>
  )
}
