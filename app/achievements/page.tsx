"use client"

import { motion } from "framer-motion"
import { Star, Award, Zap, Brain, Book, Cpu } from "lucide-react"
import SpaceBackground from "@/components/space-bg"

const skills = [
  { id: 1, name: "Basic Math", icon: <Star className="w-6 h-6" />, level: 5, maxLevel: 5, x: 50, y: 20 },
  { id: 2, name: "Algebra", icon: <Zap className="w-6 h-6" />, level: 3, maxLevel: 5, x: 30, y: 40 },
  { id: 3, name: "Geometry", icon: <Award className="w-6 h-6" />, level: 2, maxLevel: 5, x: 70, y: 40 },
  { id: 4, name: "Physics", icon: <Brain className="w-6 h-6" />, level: 1, maxLevel: 5, x: 20, y: 60 },
  { id: 5, name: "Chemistry", icon: <Book className="w-6 h-6" />, level: 0, maxLevel: 5, x: 50, y: 60 },
  { id: 6, name: "Computer Science", icon: <Cpu className="w-6 h-6" />, level: 0, maxLevel: 5, x: 80, y: 60 },
]

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center mb-12 pixel-font text-yellow-300"
        >
          Achievements & Skill Tree
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="game-card border-yellow-500"
          >
            <h2 className="text-2xl font-bold mb-6 pixel-font">Recent Achievements</h2>
            <div className="space-y-4">
              {[
                { name: "Math Wizard", description: "Solved 100 math problems", icon: "🧙‍♂️" },
                { name: "Science Explorer", description: "Completed all basic science courses", icon: "🔬" },
                { name: "Coding Ninja", description: "Written first 1000 lines of code", icon: "🥷" },
              ].map((achievement) => (
                <div key={achievement.name} className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-bold">{achievement.name}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="game-card border-blue-500"
          >
            <h2 className="text-2xl font-bold mb-6 pixel-font">Skill Tree</h2>
            <div className="relative h-[400px]">
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  className="absolute"
                  style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      skill.level > 0 ? "bg-blue-500" : "bg-gray-700"
                    }`}
                  >
                    {skill.icon}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="font-bold">{skill.name}</p>
                    <p className="text-sm">
                      {skill.level}/{skill.maxLevel}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 game-card border-green-500"
        >
          <h2 className="text-2xl font-bold mb-6 pixel-font">Progress Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-400">42</p>
              <p className="text-gray-400">Achievements Unlocked</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-400">18</p>
              <p className="text-gray-400">Skills Mastered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-400">75%</p>
              <p className="text-gray-400">Overall Progress</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
