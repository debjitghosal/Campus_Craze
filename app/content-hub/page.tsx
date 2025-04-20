"use client"

import { useState } from "react"
import {
  Search,
  FileText,
  Video,
  LinkIcon,
  Star,
  Clock,
  Download,
  Heart,
  Filter,
  ChevronDown,
  Eye,
  X,
} from "lucide-react"

export default function ContentHubPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("official")
  const [selectedResource, setSelectedResource] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    subject: "all",
    sortBy: "newest",
  })

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    })
  }

  const filteredResources = resources
    .filter(
      (resource) =>
        (activeTab === "official"
          ? resource.isOfficial
          : activeTab === "community"
            ? !resource.isOfficial
            : activeTab === "favorites"
              ? resource.isFavorite
              : true) &&
        (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filters.type === "all" || resource.type === filters.type) &&
        (filters.subject === "all" || resource.subject === filters.subject),
    )
    .sort((a, b) => {
      if (filters.sortBy === "newest") {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      } else if (filters.sortBy === "oldest") {
        return new Date(a.updatedAt) - new Date(b.updatedAt)
      } else if (filters.sortBy === "popular") {
        return b.views - a.views
      } else if (filters.sortBy === "rating") {
        return b.rating - a.rating
      }
      return 0
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Content Hub</h1>

      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Resource Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
                <option value="link">Link</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.subject}
                onChange={(e) => handleFilterChange("subject", e.target.value)}
              >
                <option value="all">All Subjects</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="language">Language Arts</option>
                <option value="programming">Programming</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Sort By</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "official" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("official")}
        >
          Official Resources
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "community" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("community")}
        >
          Community Uploads
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "favorites" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </button>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              onClick={() => setSelectedResource(resource)}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    {resource.type === "pdf" && <FileText className="w-5 h-5 text-red-500 mr-2" />}
                    {resource.type === "video" && <Video className="w-5 h-5 text-blue-500 mr-2" />}
                    {resource.type === "link" && <LinkIcon className="w-5 h-5 text-green-500 mr-2" />}
                    <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                  </div>
                  <button
                    className={`text-gray-400 hover:text-red-500 ${resource.isFavorite ? "text-red-500" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      // Toggle favorite status
                      console.log(`Toggle favorite for resource ${resource.id}`)
                    }}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>
                <div className="flex items-center text-gray-500 text-xs mb-3">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Updated {resource.updatedAt}</span>
                  <span className="mx-2">•</span>
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{resource.views} views</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm">{resource.rating}/5</span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      resource.isOfficial ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {resource.isOfficial ? "Official" : "Community"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12 text-gray-500">No resources found matching your criteria.</div>
        )}
      </div>

      {/* Resource Preview Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-semibold text-lg">{selectedResource.title}</h3>
              <button onClick={() => setSelectedResource(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(90vh - 130px)" }}>
              {selectedResource.type === "pdf" && (
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <FileText className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="mb-4">PDF Preview</p>
                  <iframe
                    src={selectedResource.url}
                    className="w-full h-[500px] border border-gray-300 rounded"
                    title={selectedResource.title}
                  />
                </div>
              )}

              {selectedResource.type === "video" && (
                <div className="bg-gray-100 rounded-lg p-4">
                  <video controls className="w-full rounded" src={selectedResource.url}>
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {selectedResource.type === "link" && (
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <LinkIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="mb-4">External Link</p>
                  <a
                    href={selectedResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Open Link in New Tab
                  </a>
                </div>
              )}

              <div className="mt-4">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{selectedResource.description}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                  {selectedResource.subject}
                </span>
                {selectedResource.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>Updated {selectedResource.updatedAt}</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center text-sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Sample data
const resources = [
  {
    id: 1,
    title: "Introduction to Algebra",
    description: "A comprehensive guide to basic algebraic concepts including equations, inequalities, and functions.",
    type: "pdf",
    url: "/placeholder.pdf",
    updatedAt: "2 days ago",
    views: 1245,
    rating: 4.8,
    isOfficial: true,
    isFavorite: true,
    subject: "math",
    tags: ["algebra", "equations", "beginner"],
  },
  {
    id: 2,
    title: "Cell Biology Video Lecture",
    description: "An in-depth video lecture covering cell structure, function, and division processes.",
    type: "video",
    url: "/placeholder.mp4",
    updatedAt: "1 week ago",
    views: 876,
    rating: 4.5,
    isOfficial: true,
    isFavorite: false,
    subject: "science",
    tags: ["biology", "cells", "mitosis"],
  },
  {
    id: 3,
    title: "History Timeline Interactive",
    description: "An interactive timeline of major historical events from ancient civilizations to modern times.",
    type: "link",
    url: "https://example.com/timeline",
    updatedAt: "3 days ago",
    views: 532,
    rating: 4.2,
    isOfficial: false,
    isFavorite: true,
    subject: "history",
    tags: ["timeline", "interactive", "world history"],
  },
  {
    id: 4,
    title: "Grammar Essentials",
    description: "A guide to essential grammar rules and common mistakes to avoid in writing.",
    type: "pdf",
    url: "/placeholder.pdf",
    updatedAt: "5 days ago",
    views: 789,
    rating: 4.0,
    isOfficial: false,
    isFavorite: false,
    subject: "language",
    tags: ["grammar", "writing", "english"],
  },
  {
    id: 5,
    title: "Introduction to Python Programming",
    description: "Learn the basics of Python programming with practical examples and exercises.",
    type: "pdf",
    url: "/placeholder.pdf",
    updatedAt: "1 day ago",
    views: 1567,
    rating: 4.9,
    isOfficial: true,
    isFavorite: true,
    subject: "programming",
    tags: ["python", "coding", "beginner"],
  },
  {
    id: 6,
    title: "Chemistry Lab Demonstrations",
    description: "Video demonstrations of common chemistry lab experiments with explanations.",
    type: "video",
    url: "/placeholder.mp4",
    updatedAt: "2 weeks ago",
    views: 623,
    rating: 4.3,
    isOfficial: true,
    isFavorite: false,
    subject: "science",
    tags: ["chemistry", "lab", "experiments"],
  },
]
