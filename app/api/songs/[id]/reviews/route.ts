import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { rating, comment } = await request.json()

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // Insert review
    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        song_id: params.id,
        user_id: user.id,
        rating,
        comment,
      })
      .select(`
        *,
        users (
          name
        )
      `)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Update song rating
    const { data: reviews } = await supabase.from("reviews").select("rating").eq("song_id", params.id)

    if (reviews) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      await supabase
        .from("songs")
        .update({ rating: Math.round(avgRating * 10) / 10 })
        .eq("id", params.id)
    }

    return NextResponse.json({
      user: review.users?.name || "Anonymous",
      rating: review.rating,
      comment: review.comment,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
