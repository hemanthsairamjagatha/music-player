"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Play, ShoppingCart } from "lucide-react"
import { mockSongs } from "@/lib/mock-data"
import { useMusicStore } from "@/lib/store"

export function RecommendationsSection() {
  const { user, addToWishlist, wishlist } = useMusicStore()
  const recommendations = mockSongs.slice(8, 12) // Get different songs for recommendations

  if (!user) return null

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Based on Your Taste</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((song) => (
            <Card
              key={song.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group"
            >
              <div className="p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-4 relative">
                  <img
                    src={song.coverArt || "/placeholder.svg"}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="icon" className="bg-purple-600 hover:bg-purple-700">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <h3 className="font-semibold text-white mb-1 truncate">{song.title}</h3>
                <p className="text-gray-400 text-sm mb-3 truncate">{song.artist}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-purple-400">${song.price}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => addToWishlist(song)}
                    className={`${wishlist.some((item) => item.id === song.id) ? "text-red-500" : "text-gray-400"} hover:text-red-500`}
                  >
                    <Heart
                      className={`h-4 w-4 ${wishlist.some((item) => item.id === song.id) ? "fill-current" : ""}`}
                    />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Buy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    Stream
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
