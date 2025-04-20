import {
  Heart,
  Repeat,
  Shuffle,
  SkipBack,
  Play,
  SkipForward,
  Mic2,
  ListMusic,
  MonitorSpeaker,
  Volume2,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"

const NowPlaying = () => {
  return (
    <div className="h-24 bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src="/placeholder.svg?height=56&width=56" alt="Album cover" className="w-14 h-14 rounded" />
        <div>
          <h4 className="text-sm font-medium">Song Name</h4>
          <p className="text-xs text-gray-400">Artist Name</p>
        </div>
        <Heart size={20} className="text-gray-400 hover:text-white cursor-pointer" />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-6">
          <Shuffle size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          <SkipBack size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          <button className="bg-white rounded-full p-2">
            <Play fill="black" size={20} />
          </button>
          <SkipForward size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          <Repeat size={20} className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-xs text-gray-400">0:00</span>
          <Slider className="w-[400px]" />
          <span className="text-xs text-gray-400">3:45</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Mic2 size={20} className="text-gray-400 hover:text-white cursor-pointer" />
        <ListMusic size={20} className="text-gray-400 hover:text-white cursor-pointer" />
        <MonitorSpeaker size={20} className="text-gray-400 hover:text-white cursor-pointer" />
        <div className="flex items-center space-x-2">
          <Volume2 size={20} className="text-gray-400" />
          <Slider className="w-[100px]" />
        </div>
      </div>
    </div>
  )
}

export default NowPlaying
