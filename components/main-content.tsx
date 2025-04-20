import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import SpaceBackground from "@/components/space-bg"

const MainContent = () => {
  return (
    <ScrollArea className="flex-1 bg-gradient-to-b from-[#1e1e1e] to-[#121212]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button className="bg-black rounded-full p-1">
              <ChevronLeft size={24} />
            </button>
            <button className="bg-black rounded-full p-1">
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium hover:text-white">Sign up</button>
            <button className="bg-white text-black rounded-full px-8 py-3 font-medium">Log in</button>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Recently played</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[...Array(6)].map((_, i) => (
            <AlbumCard key={i} />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

const AlbumCard = () => (
  <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all group cursor-pointer">
    <div className="relative mb-4">
      <img
        src="/placeholder.svg?height=150&width=150"
        alt="Album cover"
        className="w-full aspect-square object-cover rounded-md shadow-lg"
      />
      <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Play fill="black" size={20} />
      </button>
    </div>
    <h3 className="font-semibold truncate">Album Name</h3>
    <p className="text-sm text-gray-400 truncate">Artist Name</p>
  </div>
)

export default MainContent
