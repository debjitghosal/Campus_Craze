"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Trash2, Clock, Tag, Users, Save, Send, X } from "lucide-react"
import Link from "next/link"

export default function QuizCreationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [timeLimit, setTimeLimit] = useState(15)
  const [isMultiplayer, setIsMultiplayer] = useState(false)
  const [difficulty, setDifficulty] = useState("medium")
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState("")
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      type: "multiple-choice",
      options: [
        { id: 1, text: "", isCorrect: false },
        { id: 2, text: "", isCorrect: false },
        { id: 3, text: "", isCorrect: false },
        { id: 4, text: "", isCorrect: false },
      ],
      points: 1,
    },
  ])

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleAddQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1
    setQuestions([
      ...questions,
      {
        id: newId,
        text: "",
        type: "multiple-choice",
        options: [
          { id: 1, text: "", isCorrect: false },
          { id: 2, text: "", isCorrect: false },
          { id: 3, text: "", isCorrect: false },
          { id: 4, text: "", isCorrect: false },
        ],
        points: 1,
      },
    ])
  }

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id))
  }

  const handleQuestionChange = (id, field, value) => {
    setQuestions(questions.map((question) => (question.id === id ? { ...question, [field]: value } : question)))
  }

  const handleOptionChange = (questionId, optionId, field, value) => {
    setQuestions(
      questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            options: question.options.map((option) =>
              option.id === optionId ? { ...option, [field]: value } : option,
            ),
          }
        }
        return question
      }),
    )
  }

  const handleAddOption = (questionId) => {
    setQuestions(
      questions.map((question) => {
        if (question.id === questionId) {
          const newOptionId = question.options.length > 0 ? Math.max(...question.options.map((o) => o.id)) + 1 : 1
          return {
            ...question,
            options: [...question.options, { id: newOptionId, text: "", isCorrect: false }],
          }
        }
        return question
      }),
    )
  }

  const handleRemoveOption = (questionId, optionId) => {
    setQuestions(
      questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            options: question.options.filter((option) => option.id !== optionId),
          }
        }
        return question
      }),
    )
  }

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSaveDraft = () => {
    console.log("Saving draft...", {
      quizTitle,
      quizDescription,
      timeLimit,
      isMultiplayer,
      difficulty,
      tags,
      questions,
    })
    // Here you would integrate with your backend
  }

  const handlePublish = () => {
    console.log("Publishing quiz...", {
      quizTitle,
      quizDescription,
      timeLimit,
      isMultiplayer,
      difficulty,
      tags,
      questions,
    })
    // Here you would integrate with your backend
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Create New Quiz</h1>
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

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div className={`flex-1 h-1 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <div className={`flex-1 h-1 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Quiz Details</span>
            <span>Questions</span>
            <span>Preview</span>
          </div>
        </div>
      </div>

      {/* Step 1: Quiz Details */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Quiz Details</h2>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Quiz Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quiz title"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Quiz Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter quiz description"
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Time Limit (minutes)</label>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="number"
                  min="1"
                  max="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Difficulty Level</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Tags</label>
            <div className="flex items-center">
              <Tag className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <button
                onClick={handleAddTag}
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-blue-800 hover:text-blue-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={isMultiplayer}
                onChange={(e) => setIsMultiplayer(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">Enable Multiplayer/Live Quiz</span>
            </label>
            {isMultiplayer && (
              <div className="mt-2 pl-6 text-sm text-gray-600 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>Students can compete in real-time with this quiz</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Questions */}
      {currentStep === 2 && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Quiz Questions</h2>
            <button
              onClick={handleAddQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Question
            </button>
          </div>

          {questions.map((question, index) => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Question {index + 1}</h3>
                <button
                  onClick={() => handleRemoveQuestion(question.id)}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Question Text</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Enter your question"
                  value={question.text}
                  onChange={(e) => handleQuestionChange(question.id, "text", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Question Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={question.type}
                    onChange={(e) => handleQuestionChange(question.id, "type", e.target.value)}
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="short-answer">Short Answer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Points</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={question.points}
                    onChange={(e) => handleQuestionChange(question.id, "points", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              {/* Options for Multiple Choice */}
              {question.type === "multiple-choice" && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 text-sm font-medium">Answer Options</label>
                    <button
                      onClick={() => handleAddOption(question.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Option
                    </button>
                  </div>

                  {question.options.map((option, optionIndex) => (
                    <div key={option.id} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name={`question-${question.id}-correct`}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        checked={option.isCorrect}
                        onChange={() => {
                          // Set all options to false, then set this one to true
                          question.options.forEach((opt) => {
                            handleOptionChange(question.id, opt.id, "isCorrect", opt.id === option.id)
                          })
                        }}
                      />
                      <input
                        type="text"
                        className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option.text}
                        onChange={(e) => handleOptionChange(question.id, option.id, "text", e.target.value)}
                      />
                      {question.options.length > 2 && (
                        <button
                          onClick={() => handleRemoveOption(question.id, option.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Options for True/False */}
              {question.type === "true-false" && (
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Correct Answer</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${question.id}-tf`}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        checked={question.options[0]?.isCorrect}
                        onChange={() => {
                          handleQuestionChange(question.id, "options", [
                            { id: 1, text: "True", isCorrect: true },
                            { id: 2, text: "False", isCorrect: false },
                          ])
                        }}
                      />
                      <span className="ml-2">True</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${question.id}-tf`}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        checked={question.options[1]?.isCorrect}
                        onChange={() => {
                          handleQuestionChange(question.id, "options", [
                            { id: 1, text: "True", isCorrect: false },
                            { id: 2, text: "False", isCorrect: true },
                          ])
                        }}
                      />
                      <span className="ml-2">False</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Options for Short Answer */}
              {question.type === "short-answer" && (
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Correct Answer(s)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter correct answer (separate multiple answers with commas)"
                    value={question.options[0]?.text || ""}
                    onChange={(e) => {
                      handleQuestionChange(question.id, "options", [{ id: 1, text: e.target.value, isCorrect: true }])
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For multiple acceptable answers, separate with commas (e.g., "Paris, France, City of Light")
                  </p>
                </div>
              )}
            </div>
          ))}

          {questions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No questions added yet. Click "Add Question" to get started.
            </div>
          )}
        </div>
      )}

      {/* Step 3: Preview */}
      {currentStep === 3 && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Quiz Preview</h2>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800">{quizTitle}</h3>
            <p className="text-gray-600 mt-1">{quizDescription}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {timeLimit} minutes
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs flex items-center ${
                  difficulty === "easy"
                    ? "bg-green-100 text-green-800"
                    : difficulty === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
              {isMultiplayer && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Multiplayer
                </span>
              )}
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium mb-4">Questions ({questions.length})</h3>

            {questions.map((question, index) => (
              <div key={question.id} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">
                    Question {index + 1} ({question.points} pt{question.points > 1 ? "s" : ""})
                  </h4>
                  <span className="text-xs text-gray-500">
                    {question.type === "multiple-choice"
                      ? "Multiple Choice"
                      : question.type === "true-false"
                        ? "True/False"
                        : "Short Answer"}
                  </span>
                </div>
                <p className="mb-3">{question.text || "[Question text will appear here]"}</p>

                {question.type === "multiple-choice" && (
                  <div className="pl-4">
                    {question.options.map((option, optionIndex) => (
                      <div key={option.id} className="flex items-center mb-2">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            option.isCorrect ? "bg-green-500 text-white" : "border border-gray-300"
                          }`}
                        >
                          {String.fromCharCode(65 + optionIndex)}
                        </div>
                        <span>{option.text || `[Option ${optionIndex + 1}]`}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === "true-false" && (
                  <div className="pl-4">
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                          question.options[0]?.isCorrect ? "bg-green-500 text-white" : "border border-gray-300"
                        }`}
                      >
                        T
                      </div>
                      <span>True</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                          question.options[1]?.isCorrect ? "bg-green-500 text-white" : "border border-gray-300"
                        }`}
                      >
                        F
                      </div>
                      <span>False</span>
                    </div>
                  </div>
                )}

                {question.type === "short-answer" && (
                  <div className="pl-4">
                    <p className="text-sm text-gray-600">
                      Correct answer(s): {question.options[0]?.text || "[Answer will appear here]"}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        {currentStep > 1 ? (
          <button
            onClick={handlePrevStep}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
        ) : (
          <Link
            href="/instructor/dashboard"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        )}

        {currentStep < 3 ? (
          <button
            onClick={handleNextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
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
              Publish Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
