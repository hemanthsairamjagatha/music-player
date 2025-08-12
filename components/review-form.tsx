"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface ReviewFormProps {
  songId: string
  onClose: () => void
  onReviewSubmitted?: () => void
}

export function ReviewForm({ songId, onClose, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/songs/${songId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, comment }),
      })

      if (response.ok) {
        onReviewSubmitted?.()
        onClose()
      } else {
        const error = await response.json()
        alert(error.error || "Failed to submit review")
      }
    } catch (error) {
      console.error("Failed to submit review:", error)
      alert("Failed to submit review")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 p-3 bg-gray-700/50 rounded-lg space-y-3">
      <div>
        <label className="text-sm text-gray-300 mb-2 block">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1"
            >
              <Star
                className={`h-4 w-4 ${
                  star <= (hoveredRating || rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-300 mb-2 block">Comment</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this song..."
          className="bg-gray-800 border-gray-600 text-white text-sm"
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" size="sm" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
