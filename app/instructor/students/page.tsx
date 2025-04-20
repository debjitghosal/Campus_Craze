"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ChevronDown, BookOpen, Award, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import LayoutWithNavbar from "@/components/layout-with-navbar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for students
const mockStudents = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 3,
    completedCourses: 1,
    averageScore: 87,
    lastActive: "2 hours ago",
    status: "Active",
    progress: 65,
  },
  {
    id: 2,
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 4,
    completedCourses: 2,
    averageScore: 92,
    lastActive: "1 day ago",
    status: "Active",
    progress: 78,
  },
  {
    id: 3,
    name: "Taylor Wilson",
    email: "t.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 2,
    completedCourses: 0,
    averageScore: 65,
    lastActive: "3 days ago",
    status: "Inactive",
    progress: 32,
  },
  {
    id: 4,
    name: "Morgan Lee",
    email: "morgan.l@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 5,
    completedCourses: 3,
    averageScore: 95,
    lastActive: "5 hours ago",
    status: "Active",
    progress: 88,
  },
  {
    id: 5,
    name: "Casey Brown",
    email: "c.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 1,
    completedCourses: 0,
    averageScore: 70,
    lastActive: "1 week ago",
    status: "Inactive",
    progress: 15,
  },
  {
    id: 6,
    name: "Riley Garcia",
    email: "riley.g@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 3,
    completedCourses: 2,
    averageScore: 89,
    lastActive: "1 day ago",
    status: "Active",
    progress: 75,
  },
  {
    id: 7,
    name: "Jordan Martinez",
    email: "j.martinez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 4,
    completedCourses: 1,
    averageScore: 82,
    lastActive: "3 hours ago",
    status: "Active",
    progress: 60,
  },
  {
    id: 8,
    name: "Avery Thompson",
    email: "avery.t@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 2,
    completedCourses: 1,
    averageScore: 78,
    lastActive: "2 days ago",
    status: "Active",
    progress: 50,
  },
]

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter students based on search query and active tab
  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && student.status === "Active"
    if (activeTab === "inactive") return matchesSearch && student.status === "Inactive"

    return matchesSearch
  })

  return (
    <LayoutWithNavbar>
      <div className="container mx-auto p-6 text-gray-800">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Student Profiles</h1>
            <p className="text-gray-600">View and manage your students' progress and performance.</p>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2 text-gray-800 border-gray-300">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>High Progress</DropdownMenuItem>
                  <DropdownMenuItem>Low Progress</DropdownMenuItem>
                  <DropdownMenuItem>Recently Active</DropdownMenuItem>
                  <DropdownMenuItem>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Export Data</Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredStudents.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredStudents.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inactive" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredStudents.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </LayoutWithNavbar>
  )
}

function StudentCard({ student }) {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-900">{student.name}</h3>
            <p className="text-xs text-gray-500">{student.email}</p>
          </div>
          <Badge variant={student.status === "Active" ? "default" : "outline"} className="ml-auto">
            {student.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1 text-gray-700">
            <span>Overall Progress</span>
            <span>{student.progress}%</span>
          </div>
          <Progress value={student.progress} className="h-2" />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gray-500" />
            <span>{student.enrolledCourses} Courses</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-gray-500" />
            <span>{student.averageScore}% Avg</span>
          </div>
          <div className="flex items-center gap-2 col-span-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>Last active: {student.lastActive}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Profile</Button>
      </CardFooter>
    </Card>
  )
}
