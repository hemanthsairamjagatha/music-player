"use client"
import { Button } from "@/components/ui/button"
import { Heart, Home, Music, Star, User } from "lucide-react"
import { useMusicStore } from "@/lib/store"

interface NavigationProps {
  onAuthClick: () => void
}

export function Navigation({ onAuthClick }: NavigationProps) {
  const { user, setShowDashboard, showDashboard } = useMusicStore()

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold text-white">MusicHub</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setShowDashboard(false)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  !showDashboard ? "text-purple-400 bg-purple-500/10" : "text-gray-300 hover:text-white"
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Browse
              </button>
              <button className="flex items-center space-x-1 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <Star className="h-4 w-4" />
                <span>Recommendations</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <Heart className="h-4 w-4" />
                <span>Wishlist</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <Button
                variant="ghost"
                onClick={() => setShowDashboard(!showDashboard)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user.name}</span>
              </Button>
            ) : (
              <Button onClick={onAuthClick} className="bg-purple-600 hover:bg-purple-700 text-white">
                Login / Signup
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
