import { motion } from "framer-motion"

const LevelMap = () => {
  const levels = [
    { name: "Novice", completed: true },
    { name: "Apprentice", completed: true },
    { name: "Adept", completed: true },
    { name: "Expert", completed: false },
    { name: "Master", completed: false },
  ]

  return (
    <div className="mt-8 bg-black bg-opacity-50 p-4 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Your Learning Journey</h2>
      <div className="flex justify-between">
        {levels.map((level, index) => (
          <motion.div
            key={level.name}
            className={`flex flex-col items-center ${level.completed ? "text-green-400" : "text-gray-400"}`}
            whileHover={{ scale: 1.1 }}
          >
            <div
              className={`w-10 h-10 rounded-full ${
                level.completed ? "bg-green-400" : "bg-gray-400"
              } flex items-center justify-center text-black font-bold`}
            >
              {index + 1}
            </div>
            <div className="mt-2 text-sm">{level.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LevelMap
