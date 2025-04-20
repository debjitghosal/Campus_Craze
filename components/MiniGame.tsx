"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface MiniGameProps {
  onClose: () => void
}

const MiniGame: React.FC<MiniGameProps> = ({ onClose }) => {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setGameOver(true)
    }
  }, [timeLeft])

  const handleClick = () => {
    if (!gameOver) {
      setScore(score + 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Focus Clicker</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <p className="mb-4">Click the button as many times as you can in 30 seconds!</p>
        <div className="text-center mb-4">
          <p className="text-xl font-bold">Score: {score}</p>
          <p className="text-xl font-bold">Time Left: {timeLeft}s</p>
        </div>
        {!gameOver ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 text-white w-full py-4 rounded-lg text-xl font-bold"
            onClick={handleClick}
          >
            Click Me!
          </motion.button>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">Game Over!</p>
            <p className="text-xl">Final Score: {score}</p>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setScore(0)
                setTimeLeft(30)
                setGameOver(false)
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default MiniGame
