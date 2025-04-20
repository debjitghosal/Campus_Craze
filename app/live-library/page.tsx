"use client"

import { useState, useEffect } from "react"
import { Book, Search, BookOpen, Star, BookMarked, Clock, Award } from "lucide-react"

const books = [
  { id: 1, title: "The Quantum Quest", author: "Dr. Quark", category: "Science", rating: 4.5 },
  { id: 2, title: "Algorithmic Adventures", author: "Ada Lovelace", category: "Computer Science", rating: 4.8 },
  { id: 3, title: "Linguistic Labyrinths", author: "Noam Chomsky", category: "Language", rating: 4.2 },
  { id: 4, title: "Historical Horizons", author: "Time Traveler", category: "History", rating: 4.6 },
  { id: 5, title: "Mathematical Mysteries", author: "Pythagoras", category: "Math", rating: 4.7 },
]

// Book Opening Animation Component
function BookOpeningAnimation({ isLoading }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-amber-950 transition-opacity duration-1000 ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="relative w-64 h-80">
        {/* Book cover */}
        <div
          className={`absolute inset-0 bg-amber-800 rounded-r-md rounded-l-sm shadow-xl transition-all duration-1500 origin-left ${isLoading ? "rotate-0" : "rotate-90"}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 border-4 border-amber-700 rounded-r-md rounded-l-sm p-4 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-serif font-bold text-amber-100">Live Library</h2>
              <div className="mt-4 w-16 h-1 bg-amber-100 mx-auto"></div>
            </div>
          </div>
          {/* Book spine */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-amber-900 rounded-l-sm transform -translate-x-2"></div>
        </div>
        {/* Book pages */}
        <div className="absolute inset-0 bg-amber-50 rounded-r-md rounded-l-sm -z-10 flex items-center justify-center">
          <p className="text-amber-800 font-serif italic">Welcome to your literary journey...</p>
        </div>
      </div>
    </div>
  )
}

// Library Background Component
function LibraryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-amber-950 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/50 to-amber-900/30"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-950 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-950 to-transparent"></div>
    </div>
  )
}

export default function LiveLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBook, setSelectedBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Animation states
  const [titleVisible, setTitleVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [booksVisible, setBooksVisible] = useState(false)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  // Simulate book opening and staggered animations on load
  useEffect(() => {
    // Book opening animation
    setTimeout(() => setIsLoading(false), 2000)

    // Staggered content animations
    setTimeout(() => setTitleVisible(true), 2300)
    setTimeout(() => setSearchVisible(true), 2600)
    setTimeout(() => setBooksVisible(true), 2900)
    setTimeout(() => setDetailsVisible(true), 3200)
    setTimeout(() => setStatsVisible(true), 3500)
  }, [])

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-amber-950 text-amber-100 relative overflow-hidden font-serif">
      <BookOpeningAnimation isLoading={isLoading} />
      <LibraryBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1
          className={`text-5xl font-bold text-center mb-12 text-amber-200 transition-all duration-700 transform
            ${titleVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}`}
        >
          <span className="inline-block mr-3 text-amber-300">
            <BookMarked className="inline-block" />
          </span>
          Live Library
        </h1>

        <div
          className={`mb-8 transition-all duration-700 transform max-w-2xl mx-auto
            ${searchVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search books by title, author or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 rounded-full bg-amber-900/70 text-amber-100 pl-12 border-2 border-amber-700 focus:border-amber-500 outline-none transition-all duration-300 placeholder:text-amber-300/50"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`bg-gradient-to-br from-amber-900 to-amber-800 p-6 rounded-xl border-2 border-amber-700 shadow-lg shadow-amber-900/50 transition-all duration-700 transform
              ${booksVisible ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-0"}`}
          >
            <h2 className="text-2xl font-bold mb-6 text-amber-200 flex items-center">
              <Book className="w-6 h-6 mr-2 text-amber-300" />
              Available Books
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-amber-900/30">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className={`flex items-center gap-4 p-4 bg-amber-800/50 rounded-lg cursor-pointer hover:bg-amber-700/70 transition-all duration-300 transform hover:scale-102 hover:shadow-md hover:shadow-amber-700/30 border-l-4 ${selectedBook?.id === book.id ? "border-amber-300" : "border-amber-700"}`}
                >
                  <div className="min-w-[40px] h-[50px] bg-gradient-to-r from-amber-700 to-amber-600 rounded-sm flex items-center justify-center shadow-md">
                    <BookOpen className="w-6 h-6 text-amber-200" />
                  </div>
                  <div>
                    <h3 className="font-bold">{book.title}</h3>
                    <p className="text-sm text-amber-300/70">{book.author}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-amber-300" />
                      <span className="text-xs ml-1 text-amber-300/80">{book.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredBooks.length === 0 && (
                <div className="text-center py-8 text-amber-300/70">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  No books found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>

          <div
            className={`bg-gradient-to-br from-amber-900 to-amber-800 p-6 rounded-xl border-2 border-amber-700 shadow-lg shadow-amber-900/50 transition-all duration-700 transform
              ${detailsVisible ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"}`}
          >
            <h2 className="text-2xl font-bold mb-6 text-amber-200 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-amber-300" />
              Book Details
            </h2>
            {selectedBook ? (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="aspect-[2/3] bg-gradient-to-b from-amber-700 to-amber-600 rounded-md shadow-lg flex items-center justify-center p-4 border border-amber-600">
                      <h3 className="text-lg font-bold text-center text-amber-100">{selectedBook.title}</h3>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-2xl font-bold mb-2 text-amber-100">{selectedBook.title}</h3>
                    <p className="text-amber-300/80 mb-4">by {selectedBook.author}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(selectedBook.rating) ? "text-amber-300" : "text-amber-700"}`}
                            fill={i < Math.floor(selectedBook.rating) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="text-amber-300/80">{selectedBook.rating}</span>
                    </div>
                    <p className="mb-4 flex items-center">
                      <span className="inline-block w-24 text-amber-300/70">Category:</span>
                      <span className="px-2 py-1 bg-amber-800 rounded-md text-sm">{selectedBook.category}</span>
                    </p>
                    <p className="mb-6 text-amber-200/70">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo vel metus commodo
                      rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
                    </p>
                    <button className="bg-amber-700 hover:bg-amber-600 text-amber-100 py-2 px-6 rounded-lg flex items-center transition-all duration-300 transform hover:scale-105 shadow-md">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Start Reading
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-amber-300/50">
                <div className="w-24 h-32 bg-gradient-to-b from-amber-800 to-amber-700 rounded-md shadow-md flex items-center justify-center mb-4 border border-amber-700">
                  <BookOpen className="w-10 h-10 opacity-50" />
                </div>
                <p>Select a book to view details</p>
              </div>
            )}
          </div>
        </div>

        <div
          className={`mt-8 bg-gradient-to-br from-amber-900 to-amber-800 p-6 rounded-xl border-2 border-amber-700 shadow-lg shadow-amber-900/50 transition-all duration-700 transform
            ${statsVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}`}
        >
          <h2 className="text-2xl font-bold mb-6 text-amber-200 flex items-center">
            <Award className="w-6 h-6 mr-2 text-amber-300" />
            Reading Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-6 bg-amber-800/50 rounded-lg transform transition-all duration-300 hover:scale-105 border border-amber-700/50 hover:border-amber-600">
              <BookMarked className="w-8 h-8 mx-auto mb-2 text-amber-300" />
              <p className="text-4xl font-bold text-amber-200">12</p>
              <p className="text-amber-300/70">Books Read</p>
            </div>
            <div className="text-center p-6 bg-amber-800/50 rounded-lg transform transition-all duration-300 hover:scale-105 border border-amber-700/50 hover:border-amber-600">
              <Clock className="w-8 h-8 mx-auto mb-2 text-amber-300" />
              <p className="text-4xl font-bold text-amber-200">48h</p>
              <p className="text-amber-300/70">Total Reading Time</p>
            </div>
            <div className="text-center p-6 bg-amber-800/50 rounded-lg transform transition-all duration-300 hover:scale-105 border border-amber-700/50 hover:border-amber-600">
              <Star className="w-8 h-8 mx-auto mb-2 text-amber-300" />
              <p className="text-4xl font-bold text-amber-200">4.6</p>
              <p className="text-amber-300/70">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        /* Custom scrollbar styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-amber-700::-webkit-scrollbar-thumb {
          background-color: rgb(180, 83, 9);
          border-radius: 3px;
        }
        
        .scrollbar-track-amber-900\/30::-webkit-scrollbar-track {
          background-color: rgba(120, 53, 15, 0.3);
        }
      `}</style>
    </div>
  )
}
