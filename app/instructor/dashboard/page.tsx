"use client"

import { useState } from "react"
import { BookOpen, FileQuestion, Users, BarChart2, Plus, Search, ChevronRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function InstructorDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content - increased top padding to account for the larger navbar */}
      <div className="w-full pt-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Instructor Dashboard</h1>
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              <Link
                href="/instructor/courses/create"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Link>
              <Link
                href="/instructor/quizzes/create"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Quiz
              </Link>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Students"
              value="1,248"
              icon={<Users className="w-8 h-8 text-blue-500" />}
              change="+12% from last month"
              positive={true}
            />
            <StatsCard
              title="Active Courses"
              value="16"
              icon={<BookOpen className="w-8 h-8 text-green-500" />}
              change="2 published this month"
              positive={true}
            />
            <StatsCard
              title="Quiz Engagement"
              value="78%"
              icon={<BarChart2 className="w-8 h-8 text-purple-500" />}
              change="+5% from last month"
              positive={true}
            />
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search courses and quizzes..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Courses Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Courses</h2>
              <Link href="/instructor/courses" className="text-blue-600 hover:text-blue-800 flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Quizzes Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Quizzes</h2>
              <Link href="/instructor/quizzes" className="text-blue-600 hover:text-blue-800 flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, icon, change, positive }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-1 text-gray-800">{value}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <p className={`text-sm mt-4 ${positive ? "text-green-600" : "text-red-600"}`}>{change}</p>
    </div>
  )
}

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden bg-gray-200">
        <img src={course.coverImage || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{course.title}</h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              course.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {course.status}
          </span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Users className="w-4 h-4 mr-1" />
          <span>{course.students} students</span>
          <span className="mx-2">•</span>
          <Calendar className="w-4 h-4 mr-1" />
          <span>{course.lastUpdated}</span>
        </div>
        <div className="flex justify-between mt-4">
          <Link
            href={`/instructor/courses/edit/${course.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit Course
          </Link>
          <Link
            href={`/instructor/courses/${course.id}`}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

function QuizCard({ quiz }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-800">{quiz.title}</h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              quiz.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {quiz.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <FileQuestion className="w-4 h-4 mr-1" />
          <span>{quiz.questions} questions</span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4 mr-1" />
          <span>{quiz.timeLimit}</span>
        </div>
        <div className="flex justify-between mt-4">
          <Link
            href={`/instructor/quizzes/edit/${quiz.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit Quiz
          </Link>
          <Link
            href={`/instructor/quizzes/${quiz.id}/results`}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            View Results
          </Link>
        </div>
      </div>
    </div>
  )
}

// Sample data
const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    coverImage: "/placeholder.svg?height=200&width=400",
    status: "Published",
    students: 342,
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    coverImage: "/placeholder.svg?height=200&width=400",
    status: "Published",
    students: 189,
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    title: "UX Design Fundamentals",
    coverImage: "/placeholder.svg?height=200&width=400",
    status: "Draft",
    students: 0,
    lastUpdated: "Just now",
  },
]

const quizzes = [
  {
    id: 1,
    title: "HTML & CSS Basics",
    description: "Test your knowledge of HTML and CSS fundamentals",
    status: "Active",
    questions: 15,
    timeLimit: "20 min",
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Core concepts of JavaScript programming",
    status: "Active",
    questions: 20,
    timeLimit: "30 min",
  },
  {
    id: 3,
    title: "React Component Patterns",
    description: "Advanced patterns for React components",
    status: "Inactive",
    questions: 10,
    timeLimit: "15 min",
  },
]
