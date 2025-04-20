"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Coins, Lock } from "lucide-react"
import SpaceBackground from "@/components/space-bg"

const avatars = [
  { id: "space-invader", name: "Space Invader", price: 1000, unlocked: true },
  { id: "sunfeast", name: "SunFeast", price: 2000, unlocked: true },
  { id: "pixel-cat", name: "Pixel Cat", price: 3000, unlocked: false },
  { id: "pink-ghost", name: "Pink Ghost", price: 2500, unlocked: true },
  { id: "purple-ghost", name: "Purple Ghost", price: 2500, unlocked: false },
]

export default function AvatarShopPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center mb-12 pixel-font text-yellow-300"
        >
          CHOOSE YOUR AVATAR!
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 game-card border-purple-500"
          >
            <h2 className="text-2xl font-bold mb-6 pixel-font">Avatar Selection</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {avatars.map((avatar) => (
                <motion.button
                  key={avatar.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`
                    p-4 rounded-lg text-center
                    ${
                      selectedAvatar.id === avatar.id
                        ? "border-2 border-yellow-500 bg-yellow-500/20"
                        : "border border-gray-700 bg-gray-800/50"
                    }
                    ${!avatar.unlocked && "opacity-50 cursor-not-allowed"}
                  `}
                >
                  <div className="aspect-square w-full mb-4 relative">
                  <img
  src="https://files.oaiusercontent.com/file-MVtfQW4wkSpNvekXQUmk76?se=2025-02-16T06%3A33%3A32Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dspace_invader.webp&sig=your_signature_here"
  alt="Space Invader"
  className="w-full h-full object-contain pixelated"
/>
                    {!avatar.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                        <Lock className="w-8 h-8 text-yellow-500" />
                      </div>
                    )}
                  </div>
                  <h3 className="pixel-font text-sm mb-2">{avatar.name}</h3>
                  {!avatar.unlocked ? (
                    <div className="flex items-center justify-center gap-2 text-yellow-500">
                      <Coins className="w-4 h-4" />
                      <span>{avatar.price}</span>
                    </div>
                  ) : (
                    <span className="text-green-400">Unlocked! ✨</span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="game-card border-green-500"
          >
            <h2 className="text-2xl font-bold mb-6 pixel-font">Selected Avatar</h2>
            <div className="aspect-square w-full mb-4">
              <img
                src={`https://v0.blob.com/avatars/${selectedAvatar.id}.png`}
                alt={selectedAvatar.name}
                className="w-full h-full object-contain pixelated"
              />
            </div>
            <h3 className="text-2xl font-bold pixel-font mb-4">{selectedAvatar.name}</h3>
            <button className="game-button w-full">
              {selectedAvatar.unlocked ? "Equip Avatar" : `Buy for ${selectedAvatar.price} coins`}
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 game-card border-yellow-500 text-center"
        >
          <h2 className="pixel-font text-2xl mb-4">
            <span className="text-yellow-300">💎</span> ACHIEVEMENTS UNLOCKED!{" "}
            <span className="text-yellow-300">💎</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Avatar Collector", "Style Master", "Rare Find", "Customization King"].map((achievement) => (
              <div key={achievement} className="p-4 rounded-lg bg-black/50 border border-yellow-500/30">
                <span className="block text-2xl mb-2">🏆</span>
                <span className="text-sm font-medium pixel-font">{achievement}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
