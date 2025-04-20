"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orbitron, Press_Start_2P } from "next/font/google";
import Link from "next/link";
import {
  BookOpen,
  FileQuestion,
  Calendar as CalendarIcon,
  Clock,
  Award,
  Zap,
  TrendingUp,
  ChevronRight,
  Star,
  BookMarked,
  BarChart2,
} from "lucide-react";

import SpaceBackground from "@/components/space-bg";
import GameHeader from "@/components/GameHeader";
import NavigationPortal from "@/components/NavigationPortal";
import FocusBuddy from "@/components/FocusBuddy";
import LevelMap from "@/components/LevelMap";
import MiniGame from "@/components/MiniGame";
import CalendarModal from "@/components/Calendar"; // Renamed import to avoid conflict
import "../../global.css";

// Fonts
const orbitron = Orbitron({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

// Star generation logic
const useStars = (count: number) => {
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

export default function StudentDashboard() {
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [activeStreak, setActiveStreak] = useState(5); // Days active

  // Generate 150 stars
  useStars(150);

  return (
    <div
      className={`student-dashboard min-h-screen bg-space-pattern overflow-hidden relative ${orbitron.className}`}
    >
      {/* Space Background */}
      <SpaceBackground />

      {/* Stars */}
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>

      {/* Content */}
      <div className="relative z-10 pt-24 px-8 pb-16">
        <GameHeader />
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className={`text-6xl font-bold text-center text-yellow-400 tracking-wider mb-12 ${pressStart2P.className}`}
        >
          Welcome Back!
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width on large screens */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Welcome Message */}
            <motion.div 
              className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-yellow-300/50 p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-2 text-yellow-300">Welcome back, Alex!</h2>
              <p className="text-blue-100">You have 3 upcoming quizzes and 2 assignments due this week.</p>
              <div className="mt-4 flex items-center">
                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-medium text-yellow-300">{activeStreak} day streak!</span>
                <span className="ml-2 text-sm text-blue-100">Keep it up to earn bonus points</span>
              </div>
            </motion.div>

            {/* Upcoming Quizzes */}
            <motion.div 
              className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-yellow-300/50 p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-yellow-300">Upcoming Quizzes</h2>
                <Link href="/student/quizzes" className="text-blue-300 hover:text-blue-100 flex items-center text-sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingQuizzes.map((quiz) => (
                  <motion.div 
                    key={quiz.id} 
                    className="flex items-center justify-between p-3 bg-blue-900/40 rounded-lg border border-blue-500/30"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-900/70 rounded-lg mr-3">
                        <FileQuestion className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-100">{quiz.title}</h3>
                        <p className="text-sm text-blue-300">{quiz.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-blue-200">
                        <CalendarIcon className="w-4 h-4 text-blue-300 mr-1" />
                        <span>{quiz.date}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1 text-blue-200">
                        <Clock className="w-4 h-4 text-blue-300 mr-1" />
                        <span>{quiz.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {upcomingQuizzes.length === 0 && (
                  <div className="text-center py-4 text-blue-200">No upcoming quizzes at the moment.</div>
                )}
              </div>
            </motion.div>

            {/* Study Suggestions */}
            <motion.div 
              className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-yellow-300/50 p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-yellow-300">Personalized Study Suggestions</h2>
                <motion.button 
                  className="text-blue-300 hover:text-blue-100 text-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Refresh
                </motion.button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studySuggestions.map((suggestion) => (
                  <motion.div 
                    key={suggestion.id} 
                    className="border border-blue-500/30 rounded-lg p-4 hover:bg-blue-900/40"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg mr-3 ${
                        suggestion.type === "course" ? "bg-blue-900/70" : 
                        suggestion.type === "quiz" ? "bg-purple-900/70" : "bg-green-900/70"
                      }`}>
                        {suggestion.type === "course" && <BookOpen className="w-5 h-5 text-blue-300" />}
                        {suggestion.type === "quiz" && <FileQuestion className="w-5 h-5 text-purple-300" />}
                        {suggestion.type === "resource" && <BookMarked className="w-5 h-5 text-green-300" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-100">{suggestion.title}</h3>
                        <p className="text-sm text-blue-300">{suggestion.category}</p>
                      </div>
                    </div>
                    <p className="text-sm text-blue-200 mb-3">{suggestion.reason}</p>
                    <Link href={suggestion.link} className="text-yellow-300 hover:text-yellow-100 text-sm font-medium">
                      Start Learning
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Progress Overview */}
            <motion.div 
            className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-yellow-300/50 p-6"
              whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
              >
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-yellow-300">Your Progress</h2>
            <Link href="/subjects" className="text-blue-300 hover:text-blue-100 flex items-center text-sm">
            View Full <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            </div>
            <div className="space-y-4">
              {courseProgress.map((course) => (
            <div key={course.id} className="space-y-2">
            <div className="flex justify-between items-center">
            <h3 className="font-medium text-blue-100">{course.title}</h3>
            <span className="text-sm text-blue-300">{course.progress}% Complete</span>
          </div>
          <div className="w-full bg-blue-900/50 rounded-full h-2.5">
            <div className="bg-blue-400 h-2.5 rounded-full" style={{ width:`${course.progress}%` }}></div>
            </div>
          </div>
          ))}
          </div>
          </motion.div>
          </motion.div>

          {/* Sidebar - 1/3 width on large screens */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Streak Tracker */}
            <motion.div 
              className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-yellow-300/50 p-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-yellow-300">Streak Tracker</h2>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-1" />
                  <span className="font-medium text-yellow-300">{activeStreak} days</span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center ${
                      i < activeStreak ? "bg-yellow-500/30 border-2 border-yellow-400" : "bg-blue-900/30 border border-blue-800"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {i < activeStreak && <Zap className="w-4 h-4 text-yellow-500" />}
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-blue-300">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
              <div className="mt-4 text-sm text-blue-200">
                <p>Study every day to maintain your streak and earn bonus points!</p>
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div 
              className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-yellow-300/50 p-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-yellow-300">Leaderboard</h2>
                <Link href="/student/leaderboard" className="text-blue-300 hover:text-blue-100 flex items-center text-sm">
                  View Full <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.id}
                    className={`flex items-center p-2 rounded-lg ${
                      user.isCurrentUser ? "bg-blue-600/30 border border-blue-500" : ""
                    }`}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                            ? "bg-gray-300"
                            : index === 2
                              ? "bg-amber-600"
                              : "bg-blue-800"
                      }`}
                    >
                      <span className="text-xs font-bold text-black">{index + 1}</span>
                    </div>
                    <div className="flex-shrink-0 h-8 w-8 mr-3">
                      <img className="h-8 w-8 rounded-full" src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-blue-100">{user.name}</h3>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium text-yellow-300">{user.points}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-yellow-300/50 p-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-yellow-300">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <motion.div 
                    key={activity.id} 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <div
                      className={`p-2 rounded-lg mr-3 ${
                        activity.type === "course"
                          ? "bg-blue-900/70"
                          : activity.type === "quiz"
                            ? "bg-purple-900/70"
                            : activity.type === "achievement"
                              ? "bg-yellow-900/70"
                              : "bg-green-900/70"
                      }`}
                    >
                      {activity.type === "course" && <BookOpen className="w-4 h-4 text-blue-300" />}
                      {activity.type === "quiz" && <FileQuestion className="w-4 h-4 text-purple-300" />}
                      {activity.type === "achievement" && <Award className="w-4 h-4 text-yellow-300" />}
                      {activity.type === "progress" && <TrendingUp className="w-4 h-4 text-green-300" />}
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">{activity.description}</p>
                      <p className="text-xs text-blue-300">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Performance Stats */}
            <motion.div 
              className="bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-yellow-300/50 p-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-yellow-300">Performance</h2>
                <BarChart2 className="w-5 h-5 text-blue-300" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-blue-100">Quiz Average</span>
                    <span className="text-sm font-medium text-blue-100">85%</span>
                  </div>
                  <div className="w-full bg-blue-900/50 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-blue-100">Course Completion</span>
                    <span className="text-sm font-medium text-blue-100">62%</span>
                  </div>
                  <div className="w-full bg-blue-900/50 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: "62%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-blue-100">Engagement</span>
                    <span className="text-sm font-medium text-blue-100">78%</span>
                  </div>
                  <div className="w-full bg-blue-900/50 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="mt-12 flex justify-center space-x-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 text-black font-bold py-3 px-6 rounded-full shadow-xl hover:bg-green-400 transition"
            onClick={() => setShowMiniGame(true)}
          >
            Play Mini-Game
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 text-black font-bold py-3 px-6 rounded-full shadow-xl hover:bg-blue-400 transition"
            onClick={() => setShowCalendarModal(true)}
          >
            View Calendar
          </motion.button>
        </motion.div>

        {/* Level Map and FocusBuddy */}
        <div className="mt-16">
          <LevelMap />
        </div>
        <div className="mt-12">
          <FocusBuddy />
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showMiniGame && <MiniGame onClose={() => setShowMiniGame(false)} />}
          {showCalendarModal && <CalendarModal onClose={() => setShowCalendarModal(false)} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Sample data
const upcomingQuizzes = [
  {
    id: 1,
    title: "Midterm Assessment",
    course: "Introduction to Data Structures",
    date: "Tomorrow",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Chapter 5 Quiz",
    course: "Advanced Mathematics",
    date: "May 15, 2023",
    time: "2:30 PM",
  },
  {
    id: 3,
    title: "Final Project Presentation",
    course: "Web Development Fundamentals",
    date: "May 20, 2023",
    time: "11:15 AM",
  },
];

const studySuggestions = [
  {
    id: 1,
    type: "course",
    title: "Algebra Fundamentals",
    category: "Mathematics",
    reason: "Based on your recent quiz performance, reviewing these concepts could help improve your scores.",
    link: "/courses/algebra-fundamentals",
  },
  {
    id: 2,
    type: "quiz",
    title: "DBMS Practice Quiz",
    category: "Core Computers",
    reason: "Your upcoming quiz is in 2 days. This practice quiz covers similar material.",
    link: "/quizzes/biology-practice",
  },
  {
    id: 3,
    type: "resource",
    title: "Report Writing Guide",
    category: "Language Arts",
    reason: "This resource aligns with your current coursework and has helped many students improve their writing.",
    link: "/resources/report-writing-guide",
  },
  {
    id: 4,
    type: "course",
    title: "Graph Traversal Techniques",
    category: "DAA",
    reason: "You've shown interest in similar topics. This course has high ratings from students like you.",
    link: "/courses/Graph-Traversal-techniques",
  },
];

const courseProgress = [
  {
    id: 1,
    title: "Introduction to Data Structure",
    progress: 75,
  },
  {
    id: 2,
    title: "Probablity & statistics",
    progress: 45,
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    progress: 90,
  },
  
];

const leaderboard = [
  {
    id: 1,
    name: "Sarah Johnson",
    points: 1250,
    avatar: "/placeholder.svg?height=32&width=32",
    isCurrentUser: false,
  },
  {
    id: 2,
    name: "David Chen",
    points: 1180,
    avatar: "/placeholder.svg?height=32&width=32",
    isCurrentUser: false,
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    points: 1050,
    avatar: "/placeholder.svg?height=32&width=32",
    isCurrentUser: false,
  },
  {
    id: 4,
    name: "Alex Taylor",
    points: 980,
    avatar: "/placeholder.svg?height=32&width=32",
    isCurrentUser: true,
  },
  {
    id: 5,
    name: "James Wilson",
    points: 920,
    avatar: "/placeholder.svg?height=32&width=32",
    isCurrentUser: false,
  },
];

const recentActivity = [
  {
    id: 1,
    type: "quiz",
    description: "Completed 'Chapter 4 Quiz' with score 85%",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "course",
    description: "Started 'Advanced JavaScript Concepts' course",
    time: "Yesterday",
  },
  {
    id: 3,
    type: "achievement",
    description: "Earned 'Quick Learner' badge",
    time: "2 days ago",
  },
  {
    id: 4,
    type: "progress",
    description: "Completed Module 3 in 'Web Development'",
    time: "3 days ago",
  },
];
