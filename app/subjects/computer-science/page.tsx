"use client"

import { motion } from "framer-motion"
import { Code, Terminal, Star, Trophy } from "lucide-react"
import SpaceBackground from "@/components/space-bg"

export default function ComputerSciencePage() {
  const challenges = [
    {
      title: "Hello World",
      language: "Python",
      difficulty: "Easy",
      completed: true,
      code: 'print("Hello, World!")',
    },
    {
      title: "FizzBuzz",
      language: "JavaScript",
      difficulty: "Medium",
      completed: false,
      code: "// Write your solution here",
    },
    {
      title: "Binary Search",
      language: "Java",
      difficulty: "Hard",
      completed: false,
      code: "// Implement binary search",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-4xl font-[Press_Start_2P] text-cyan-400 mb-4">Code Lab</h1>
          <div className="flex justify-center items-center gap-4">
            <Star className="text-yellow-400" />
            <span className="text-xl">Level 8</span>
            <Trophy className="text-yellow-400" />
            <span className="text-xl">750 Points</span>
          </div>
        </motion.div>

        {/* Coding Challenge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-lg border-2 border-cyan-500 bg-gradient-to-br from-cyan-500/20 to-black"
          >
            <h2 className="text-2xl font-[Press_Start_2P] mb-6">Current Challenge</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Code className="w-8 h-8 text-cyan-400" />
                <div>
                  <h3 className="text-xl font-bold">FizzBuzz</h3>
                  <p className="text-gray-400">Write a program that prints numbers from 1 to 100...</p>
                </div>
              </div>
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                <pre className="text-cyan-400">
                  {`function fizzBuzz() {
  // Your code here
}`}
                </pre>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-cyan-500 rounded-lg font-[Press_Start_2P] text-sm"
              >
                Run Code
              </motion.button>
            </div>
          </motion.div>

          {/* Terminal Output */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-lg border-2 border-green-500 bg-gradient-to-br from-green-500/20 to-black"
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-[Press_Start_2P]">Output</h2>
            </div>
            <div className="bg-black/50 p-4 rounded-lg font-mono h-[200px] overflow-auto">
              <p className="text-green-400">$ Running tests...</p>
              <p className="text-gray-400">Test 1: Passed ✓</p>
              <p className="text-gray-400">Test 2: Running...</p>
            </div>
          </motion.div>
        </div>

        {/* Challenge List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 rounded-lg border-2 border-cyan-500 bg-gradient-to-br from-cyan-500/20 to-black"
        >
          <h2 className="text-2xl font-[Press_Start_2P] mb-6">Challenges</h2>
          <div className="grid gap-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg ${challenge.completed ? "bg-green-500/20" : "bg-black/50"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold">{challenge.title}</h3>
                    <p className="text-sm text-gray-400">Language: {challenge.language}</p>
                  </div>
                  <span
                    className={`
                    px-3 py-1 rounded-full text-sm
                    ${
                      challenge.difficulty === "Easy"
                        ? "bg-green-500/50"
                        : challenge.difficulty === "Medium"
                          ? "bg-yellow-500/50"
                          : "bg-red-500/50"
                    }
                  `}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
                <div className="font-mono text-sm bg-black/50 p-2 rounded mt-2">
                  <code className="text-cyan-400">{challenge.code}</code>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
