"use client"

import { useState } from "react"
import { Upload, X, Plus, GripVertical, Clock, FileText, Video, LinkIcon, Save, Send } from "lucide-react"
import Link from "next/link"

export default function CourseCreationPage() {
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [coverImage, setCoverImage] = useState(null)
  const [modules, setModules] = useState([
    { id: 1, title: "", description: "", timeEstimate: "", prerequisites: [], content: [] },
  ])

  const handleAddModule = () => {
    const newId = modules.length > 0 ? Math.max(...modules.map((m) => m.id)) + 1 : 1
    setModules([
      ...modules,
      {
        id: newId,
        title: "",
        description: "",
        timeEstimate: "",
        prerequisites: [],
        content: [],
      },
    ])
  }

  const handleRemoveModule = (id) => {
    setModules(modules.filter((module) => module.id !== id))
  }

  const handleModuleChange = (id, field, value) => {
    setModules(modules.map((module) => (module.id === id ? { ...module, [field]: value } : module)))
  }

  const handleAddContent = (moduleId) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            content: [
              ...module.content,
              {
                id: module.content.length + 1,
                type: "text",
                title: "",
                content: "",
              },
            ],
          }
        }
        return module
      }),
    )
  }

  const handleRemoveContent = (moduleId, contentId) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            content: module.content.filter((item) => item.id !== contentId),
          }
        }
        return module
      }),
    )
  }

  const handleContentChange = (moduleId, contentId, field, value) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            content: module.content.map((item) => (item.id === contentId ? { ...item, [field]: value } : item)),
          }
        }
        return module
      }),
    )
  }

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverImage(URL.createObjectURL(file))
    }
  }

  const handleSaveDraft = () => {
    console.log("Saving draft...", { courseTitle, courseDescription, coverImage, modules })
    // Here you would integrate with your backend
  }

  const handlePublish = () => {
    console.log("Publishing course...", { courseTitle, courseDescription, coverImage, modules })
    // Here you would integrate with your backend
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Create New Course</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleSaveDraft}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Publish
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Course Details</h2>

        {/* Course Title */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Course Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>

        {/* Course Description */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Course Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter course description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </div>

        {/* Cover Image */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Cover Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            {coverImage ? (
              <div className="relative w-full">
                <img
                  src={coverImage || "/placeholder.svg"}
                  alt="Cover preview"
                  className="mx-auto h-64 object-cover rounded-md"
                />
                <button
                  onClick={() => setCoverImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" accept=".pdf,.ppt,.pptx,.mp4" onChange= {handleCoverImageChange}/>

                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">Pdf,MP4,ppt,pptx up to 10MB</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Course Modules</h2>
          <button
            onClick={handleAddModule}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Module
          </button>
        </div>

        {modules.map((module, index) => (
          <div key={module.id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <GripVertical className="w-5 h-5 text-gray-400 mr-2 cursor-move" />
                <span className="font-medium">Module {index + 1}</span>
              </div>
              <button onClick={() => handleRemoveModule(module.id)} className="text-red-500 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Module Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter module title"
                  value={module.title}
                  onChange={(e) => handleModuleChange(module.id, "title", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Time Estimate</label>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 2 hours"
                    value={module.timeEstimate}
                    onChange={(e) => handleModuleChange(module.id, "timeEstimate", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Module Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="Enter module description"
                value={module.description}
                onChange={(e) => handleModuleChange(module.id, "description", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Prerequisites</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                multiple
                value={module.prerequisites}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, (option) => option.value)
                  handleModuleChange(module.id, "prerequisites", selected)
                }}
              >
                {modules
                  .filter((m) => m.id !== module.id)
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title || `Module ${modules.findIndex((mod) => mod.id === m.id) + 1}`}
                    </option>
                  ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple modules</p>
            </div>

            {/* Module Content */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-700">Module Content</h3>
                <button
                  onClick={() => handleAddContent(module.id)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded flex items-center text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Content
                </button>
              </div>

              {module.content.map((content, contentIndex) => (
                <div key={content.id} className="border border-gray-200 rounded p-3 mb-3 bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <GripVertical className="w-4 h-4 text-gray-400 mr-1 cursor-move" />
                      <span className="text-sm font-medium">Item {contentIndex + 1}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveContent(module.id, content.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-gray-700 text-xs font-medium mb-1">Content Type</label>
                      <select
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={content.type}
                        onChange={(e) => handleContentChange(module.id, content.id, "type", e.target.value)}
                      >
                        <option value="text">Text</option>
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                        <option value="link">External Link</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-xs font-medium mb-1">Content Title</label>
                      <input
                        type="text"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter title"
                        value={content.title}
                        onChange={(e) => handleContentChange(module.id, content.id, "title", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    {content.type === "text" && (
                      <textarea
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Enter text content"
                        value={content.content}
                        onChange={(e) => handleContentChange(module.id, content.id, "content", e.target.value)}
                      />
                    )}

                    {content.type === "video" && (
                      <div className="flex items-center border border-gray-300 rounded-md p-2">
                        <Video className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                          type="file"
                          accept="video/*"
                          className="text-sm"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              handleContentChange(module.id, content.id, "content", e.target.files[0].name)
                            }
                          }}
                        />
                      </div>
                    )}

                    {content.type === "pdf" && (
                      <div className="flex items-center border border-gray-300 rounded-md p-2">
                        <FileText className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                          type="file"
                          accept=".pdf"
                          className="text-sm"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              handleContentChange(module.id, content.id, "content", e.target.files[0].name)
                            }
                          }}
                        />
                      </div>
                    )}

                    {content.type === "link" && (
                      <div className="flex items-center">
                        <LinkIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                          type="url"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter URL"
                          value={content.content}
                          onChange={(e) => handleContentChange(module.id, content.id, "content", e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {module.content.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm border border-dashed border-gray-300 rounded-lg">
                  No content added yet. Click "Add Content" to get started.
                </div>
              )}
            </div>
          </div>
        ))}

        {modules.length === 0 && (
          <div className="text-center py-8 text-gray-500">No modules added yet. Click "Add Module" to get started.</div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <Link href="/instructor/dashboard" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
          Cancel
        </Link>
        <button
          onClick={handleSaveDraft}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </button>
        <button
          onClick={handlePublish}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Publish
        </button>
      </div>
    </div>
  )
}
