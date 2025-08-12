"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { mockAlbums } from "@/lib/mock-data"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const featuredAlbums = mockAlbums.slice(0, 3)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredAlbums.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredAlbums.length) % featuredAlbums.length)
  }

  return (
    <section className="relative bg-gradient-to-br from-purple-900/20 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Featured Music */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Discover Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}
                Next Favorite
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Stream millions of songs, discover new artists, and build your perfect playlist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                <Play className="h-5 w-5 mr-2" />
                Play Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Browse Catalog
              </Button>
            </div>
          </div>

          {/* Trending Albums Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredAlbums.map((album) => (
                  <div key={album.id} className="w-full flex-shrink-0">
                    <Card className="bg-gray-800/50 border-gray-700 p-6">
                      <div className="aspect-square rounded-lg overflow-hidden mb-4">
                        <img
                          src={album.coverArt || "/placeholder.svg"}
                          alt={album.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{album.title}</h3>
                      <p className="text-gray-400">{album.artist}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
