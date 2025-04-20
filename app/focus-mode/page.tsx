"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Volume2, VolumeX, Sun, Moon } from "lucide-react";
import SpaceBackground from "@/components/space-bg";

export default function FocusModePage() {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black" : "bg-gray-100"
      } text-white relative overflow-hidden font-press-start`}
    >
      {isDarkMode && <SpaceBackground />}

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-4xl font-bold text-center mb-12 ${
            isDarkMode ? "text-neon-yellow" : "text-blue-600"
          }`}
        >
          Focus Mode
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pomodoro Timer */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`game-card neon-border ${
              isDarkMode
                ? "border-purple-500"
                : "border-blue-500 bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">Pomodoro Timer</h2>
            <div className="text-center">
              <div className="text-6xl font-bold mb-4">{timerMinutes}:00</div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="neon-button mb-4"
              >
                {isTimerRunning ? "Pause" : "Start"}
              </button>
              <div className="flex justify-center space-x-4">
                {[15, 25, 45].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setTimerMinutes(mins)}
                    className={`neon-button px-4 py-2 ${
                      timerMinutes === mins ? "neon-active" : ""
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Focus Settings */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`game-card neon-border ${
              isDarkMode
                ? "border-green-500"
                : "border-green-500 bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">Focus Settings</h2>
            <div className="space-y-6">
              {/* Background Sounds */}
              <div className="flex items-center justify-between">
                <span>Background Sounds</span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="neon-icon-button"
                >
                  {isMuted ? <VolumeX /> : <Volume2 />}
                </button>
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="neon-icon-button"
                >
                  {isDarkMode ? <Sun /> : <Moon />}
                </button>
              </div>

              {/* Text-to-Speech */}
              <div className="flex items-center justify-between">
                <span>Text-to-Speech</span>
                <select
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "1px solid white",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    width: "60%",
                  }}
                >
                  <option style={{ backgroundColor: "black", color: "white" }}>
                    Disabled
                  </option>
                  <option style={{ backgroundColor: "black", color: "white" }}>
                    Enabled - Male Voice
                  </option>
                  <option style={{ backgroundColor: "black", color: "white" }}>
                    Enabled - Female Voice
                  </option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Focus Tips */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-8 game-card neon-border ${
            isDarkMode
              ? "border-yellow-500"
              : "border-yellow-500 bg-white text-black"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Focus Tips</h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-neon-yellow" />
              <span>Take regular breaks to maintain productivity</span>
            </li>
            <li className="flex items-center gap-4">
              <Volume2 className="w-6 h-6 text-neon-yellow" />
              <span>Use ambient sounds to mask distracting noises</span>
            </li>
            <li className="flex items-center gap-4">
              <Sun className="w-6 h-6 text-neon-yellow" />
              <span>Adjust lighting to reduce eye strain</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
