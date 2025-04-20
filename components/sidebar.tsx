import type React from "react"
import { Home, Search, Library, PlusCircle, Heart, Download } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const Sidebar = () => {
  return (
    <div className="w-60 flex-shrink-0 bg-black p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <SidebarItem icon={<Home size={24} />} label="Home" />
          <SidebarItem icon={<Search size={24} />} label="Search" />
          <SidebarItem icon={<Library size={24} />} label="Your Library" />
        </div>
        <div className="space-y-2 pt-4">
          <SidebarItem icon={<PlusCircle size={24} />} label="Create Playlist" />
          <SidebarItem icon={<Heart size={24} />} label="Liked Songs" />
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-[#282828]">
        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {["My Playlist #1", "My Playlist #2", "My Playlist #3", "My Playlist #4", "My Playlist #5"].map(
              (playlist) => (
                <p key={playlist} className="text-sm text-gray-400 hover:text-white cursor-pointer">
                  {playlist}
                </p>
              ),
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="absolute bottom-6 left-6">
        <SidebarItem icon={<Download size={20} />} label="Install App" />
      </div>
    </div>
  )
}

const SidebarItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center space-x-4 text-gray-400 hover:text-white cursor-pointer">
    {icon}
    <span className="font-medium">{label}</span>
  </div>
)

export default Sidebar
