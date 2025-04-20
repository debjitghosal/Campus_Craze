"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Orbitron, Press_Start_2P } from "next/font/google";
import Link from "next/link";
import { 
  Calculator, 
  FlaskRoundIcon as Flask, 
  BookOpen, 
  Code, 
  Globe, 
  Brain,
  ChevronLeft 
} from "lucide-react";

import SpaceBackground from "@/components/space-bg";

// Fonts
const orbitron = Orbitron({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

// Star generation logic
const useStars = (count) => {
  useEffect(() => {
    const starContainer = document.querySelector(".stars");
    if (starContainer) {
      starContainer.innerHTML = ""; // Clear existing stars

      for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        // Randomize star position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.top = `${y}vh`;
        star.style.left = `${x}vw`;

        // Randomize star animation duration and delay
        star.style.animationDuration = `${5 + Math.random() * 10}s`;
        star.style.animationDelay = `${Math.random() * 10}s`;

        starContainer.appendChild(star);
      }
    }
  }, [count]);
};

export default function SubjectsPage() {
  // Generate 150 stars
  useStars(150);

  const subjects = [
    {
      name: "Introduction to Data Structure",
      icon: <Calculator className="w-12 h-12 text-blue-300" />,
      color: "from-blue-500/20 to-blue-900/40 border-blue-500/50",
      description: "Master numbers and problem-solving",
      path: "/student/subjects/math",
      progress: 75,
    },
    {
      name: "Probablity & statistics",
      icon: <Flask className="w-12 h-12 text-green-300" />,
      color: "from-green-500/20 to-green-900/40 border-green-500/50",
      description: "Discover the wonders of the universe",
      path: "/student/subjects/science",
      progress: 45,
    },
    {
      name: "Web Development Fundamentals",
      icon: <BookOpen className="w-12 h-12 text-purple-300" />,
      color: "from-purple-500/20 to-purple-900/40 border-purple-500/50",
      description: "Journey through stories and language",
      path: "/student/subjects/english",
      progress: 90,
    },
    {
      name: "Computer Science",
      icon: <Code className="w-12 h-12 text-cyan-300" />,
      color: "from-cyan-500/20 to-cyan-900/40 border-cyan-500/50",
      description: "Code your way to success",
      path: "/student/subjects/computer-science",
      progress: 70,
    },
    {
      name: "Geography",
      icon: <Globe className="w-12 h-12 text-red-300" />,
      color: "from-red-500/20 to-red-900/40 border-red-500/50",
      description: "Explore the world around you",
      path: "/student/subjects/geography",
      progress: 45,
    },
    {
      name: "Biology",
      icon: <Brain className="w-12 h-12 text-pink-300" />,
      color: "from-pink-500/20 to-pink-900/40 border-pink-500/50",
      description: "Understand life and living things",
      path: "/student/subjects/biology",
      progress: 55,
    },
  ];

  return (
    <div className={`min-h-screen bg-space-pattern overflow-hidden relative ${orbitron.className}`}>
      {/* Space Background */}
      <SpaceBackground />

      {/* Stars */}
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-lg py-4 px-8 flex justify-between items-center shadow-lg border-b border-yellow-300 z-50">
        <span className={`text-yellow-300 text-xl tracking-wide ${pressStart2P.className}`}>
          Hello, Alex
        </span>
      </nav>

      {/* Content */}
      <div className="relative z-10 pt-24 px-8 pb-16 container mx-auto">
        <Link href="/student/dashboard" className="inline-flex items-center text-blue-300 hover:text-blue-100 mb-6">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Dashboard
        </Link>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className={`text-5xl font-bold text-center text-yellow-400 tracking-wider mb-12 ${pressStart2P.className}`}
        >
          Your Subjects
        </motion.h1>

        <motion.div 
          className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-yellow-300/50 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-yellow-300">Subject Progress Overview</h2>
          <p className="text-blue-100 mb-4">
            Track your progress across all subjects. Complete lessons and quizzes to level up your knowledge!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <Link href={subject.path} key={subject.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  p-6 rounded-lg border
                  bg-gradient-to-br ${subject.color}
                  backdrop-blur-md
                  hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                  transition-all duration-300 cursor-pointer
                `}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-black/50">{subject.icon}</div>
                  <h2 className="text-xl font-semibold text-blue-100">{subject.name}</h2>
                </div>

                <p className="text-blue-200 mb-4">{subject.description}</p>

                <div className="relative h-2.5 bg-blue-900/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`absolute h-full rounded-full bg-gradient-to-r ${
                      subject.name === "Introduction to Data Structure" ? "from-blue-400 to-blue-500" :
                      subject.name === "Probablity & statistics" ? "from-green-400 to-green-500" :
                      subject.name === "Web Development Fundamentals" ? "from-purple-400 to-purple-500" :
                      subject.name === "Data Structures" ? "from-cyan-400 to-cyan-500" :
                      subject.name === "Opersting System" ? "from-red-400 to-red-500" :
                      "from-pink-400 to-pink-500"
                    }`}
                  />
                </div>
                <div className="mt-2 text-right text-sm text-blue-300">{subject.progress}% Complete</div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
