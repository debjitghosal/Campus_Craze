"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
// Updated imports to match the new implementation
import LayoutWithNavbar from "@/components/layout-with-navbar"

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    description: "A comprehensive introduction to computer science principles and programming fundamentals.",
    students: 128,
    lastUpdated: "2023-04-15",
    status: "Published",
    progress: 100,
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    description: "Explore advanced mathematical concepts including calculus, linear algebra, and statistics.",
    students: 85,
    lastUpdated: "2023-05-22",
    status: "Published",
    progress: 100,
  },
  {
    id: 3,
    title: "Physics Fundamentals",
    description: "Learn the basic principles of physics including mechanics, thermodynamics, and electromagnetism.",
    students: 64,
    lastUpdated: "2023-06-10",
    status: "Draft",
    progress: 75,
  },
  {
    id: 4,
    title: "Creative Writing Workshop",
    description: "Develop your creative writing skills through guided exercises and peer feedback.",
    students: 42,
    lastUpdated: "2023-07-05",
    status: "Draft",
    progress: 50,
  },
  {
    id: 5,
    title: "Data Science Essentials",
    description:
      "Master the fundamentals of data science, including data analysis, visualization, and machine learning.",
    students: 96,
    lastUpdated: "2023-08-18",
    status: "Published",
    progress: 100,
  },
  {
    id: 6,
    title: "Web Development Bootcamp",
    description: "A hands-on course covering HTML, CSS, JavaScript, and modern web frameworks.",
    students: 112,
    lastUpdated: "2023-09-30",
    status: "Published",
    progress: 100,
  },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter courses based on search query and active tab
  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "published") return matchesSearch && course.status === "Published"
    if (activeTab === "drafts") return matchesSearch && course.status === "Draft"

    return matchesSearch
  })

  return (
    <LayoutWithNavbar>
      {/* Adding text-gray-800 class to ensure text is visible */}
      <div className="container mx-auto p-6 text-gray-800">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Courses</h1>
            <p className="text-gray-600">
              Manage your courses, track student progress, and create new content.
            </p>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-full pl-8 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create New Course</Button>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="published" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="drafts" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </LayoutWithNavbar>
  )
}

function CourseCard({ course }) {
  return (
    <Card className="overflow-hidden bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-gray-900">{course.title}</CardTitle>
          <Badge variant={course.status === "Published" ? "default" : "outline"}>{course.status}</Badge>
        </div>
        <CardDescription className="line-clamp-2 h-10 text-gray-600">{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{course.students} Students</span>
          <span>Updated {course.lastUpdated}</span>
        </div>
        {course.status === "Draft" && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-2">
        <Button variant="outline" className="flex-1 text-gray-800 border-gray-300">
          View
        </Button>
        <Button variant="outline" className="flex-1 text-gray-800 border-gray-300">
          Edit
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Manage</Button>
      </CardFooter>
    </Card>
  )
}
