"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, FileQuestion, BarChart } from "lucide-react"
import { Input } from "@/components/ui/input"
// Updated import to use default export
import LayoutWithNavbar from "@/components/layout-with-navbar"

// Mock data for quizzes
const mockQuizzes = [
  {
    id: 1,
    title: "Computer Science Fundamentals",
    questions: 15,
    timeLimit: 30,
    lastUpdated: "2023-05-12",
    attempts: 87,
    avgScore: 78,
    status: "Active",
  },
  {
    id: 2,
    title: "Advanced Calculus Quiz",
    questions: 20,
    timeLimit: 45,
    lastUpdated: "2023-06-18",
    attempts: 64,
    avgScore: 72,
    status: "Active",
  },
  {
    id: 3,
    title: "Physics Midterm Exam",
    questions: 25,
    timeLimit: 60,
    lastUpdated: "2023-07-22",
    attempts: 53,
    avgScore: 68,
    status: "Draft",
  },
  {
    id: 4,
    title: "Creative Writing Assessment",
    questions: 10,
    timeLimit: 40,
    lastUpdated: "2023-08-05",
    attempts: 38,
    avgScore: 85,
    status: "Active",
  },
  {
    id: 5,
    title: "Data Science Concepts",
    questions: 18,
    timeLimit: 35,
    lastUpdated: "2023-09-14",
    attempts: 72,
    avgScore: 76,
    status: "Draft",
  },
  {
    id: 6,
    title: "Web Development Basics",
    questions: 22,
    timeLimit: 50,
    lastUpdated: "2023-10-02",
    attempts: 95,
    avgScore: 82,
    status: "Active",
  },
]

export default function QuizzesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter quizzes based on search query and active tab
  const filteredQuizzes = mockQuizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && quiz.status === "Active"
    if (activeTab === "drafts") return matchesSearch && quiz.status === "Draft"

    return matchesSearch
  })

  return (
    <LayoutWithNavbar>
      <div className="container mx-auto p-6 text-gray-800">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Quizzes</h1>
            <p className="text-gray-600">Create, manage, and analyze quizzes for your courses.</p>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search quizzes..."
                className="w-full pl-8 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create New Quiz</Button>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="all">All Quizzes</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="drafts" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </LayoutWithNavbar>
  )
}

function QuizCard({ quiz }) {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-gray-900">{quiz.title}</CardTitle>
          <Badge variant={quiz.status === "Active" ? "default" : "outline"}>{quiz.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FileQuestion className="h-4 w-4 text-gray-500" />
            <span>{quiz.questions} Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{quiz.timeLimit} Minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-gray-500" />
            <span>Avg: {quiz.avgScore}%</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span>Attempts: {quiz.attempts}</span>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">Last updated: {quiz.lastUpdated}</div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-2">
        <Button variant="outline" className="flex-1 text-gray-800 border-gray-300">
          Edit
        </Button>
        <Button variant="outline" className="flex-1 text-gray-800 border-gray-300">
          Preview
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Results</Button>
      </CardFooter>
    </Card>
  )
}
