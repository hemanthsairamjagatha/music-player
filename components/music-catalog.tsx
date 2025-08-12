"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Heart, Play, ShoppingCart, Star, Search } from "lucide-react"
import { useMusicStore } from "@/lib/store"
import { ReviewForm } from "@/components/review-form"
import type { Song } from "@/lib/store"

export function MusicCatalog() {
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [searchQuery, setSearchQuery] = useState("")
  const [showReviewForm, setShowReviewForm] = useState<string | null>(null)
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const { user, addToWishlist, wishlist } = useMusicStore()

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const params = new URLSearchParams()
        if (selectedGenre !== "all") params.append("genre", selectedGenre)
        if (sortBy) params.append("sortBy", sortBy)
        if (searchQuery) params.append("search", searchQuery)

        const response = await fetch(`/api/songs?${params}`)
        if (response.ok) {
          const data = await response.json()
          setSongs(data)
        }
      } catch (error) {
        console.error("Failed to fetch songs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSongs()
  }, [selectedGenre, sortBy, searchQuery])

  const genres = ["all", ...Array.from(new Set(songs.map((song) => song.genre)))]

  if (loading) {
    return (
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading songs...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 lg:mb-0">Music Catalog</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search songs or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by Genre" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                    {genre === "all" ? "All Genres" : genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="popularity" className="text-white hover:bg-gray-700">
                  Popularity
                </SelectItem>
                <SelectItem value="rating" className="text-white hover:bg-gray-700">
                  Rating
                </SelectItem>
                <SelectItem value="price-low" className="text-white hover:bg-gray-700">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high" className="text-white hover:bg-gray-700">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="newest" className="text-white hover:bg-gray-700">
                  Newest
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {songs.map((song) => (
            <Card
              key={song.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group"
            >
              <div className="p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-4 relative">
                  <img
                    src={song.cover_art || song.coverArt || "/placeholder.svg"}
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
                <p className="text-gray-400 text-sm mb-2 truncate">{song.artist}</p>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(song.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-400 ml-1">({song.reviews.length})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
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

                <div className="flex gap-2 mb-4">
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

                {/* Reviews Section */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="space-y-2 mb-3">
                    {song.reviews.slice(0, 2).map((review, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                            />
                          ))}
                          <span className="text-gray-400 text-xs ml-1">{review.user}</span>
                        </div>
                        <p className="text-gray-300 text-xs">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  {user && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowReviewForm(showReviewForm === song.id ? null : song.id)}
                      className="text-purple-400 hover:text-purple-300 text-xs"
                    >
                      Write a Review
                    </Button>
                  )}

                  {showReviewForm === song.id && (
                    <ReviewForm
                      songId={song.id}
                      onClose={() => setShowReviewForm(null)}
                      onReviewSubmitted={() => {
                        const fetchSongs = async () => {
                          try {
                            const params = new URLSearchParams()
                            if (selectedGenre !== "all") params.append("genre", selectedGenre)
                            if (sortBy) params.append("sortBy", sortBy)
                            if (searchQuery) params.append("search", searchQuery)

                            const response = await fetch(`/api/songs?${params}`)
                            if (response.ok) {
                              const data = await response.json()
                              setSongs(data)
                            }
                          } catch (error) {
                            console.error("Failed to refresh songs:", error)
                          }
                        }
                        fetchSongs()
                      }}
                    />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
