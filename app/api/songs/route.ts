import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get("genre")
  const sortBy = searchParams.get("sortBy") || "popularity"
  const search = searchParams.get("search")

  const supabase = createClient()

  try {
    let query = supabase.from("songs").select(`
        *,
        reviews (
          id,
          rating,
          comment,
          created_at,
          users (
            name
          )
        )
      `)

    // Apply filters
    if (genre && genre !== "all") {
      query = query.eq("genre", genre)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,artist.ilike.%${search}%`)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        query = query.order("price", { ascending: true })
        break
      case "price-high":
        query = query.order("price", { ascending: false })
        break
      case "rating":
        query = query.order("rating", { ascending: false })
        break
      case "newest":
        query = query.order("created_at", { ascending: false })
        break
      default:
        query = query.order("popularity", { ascending: false })
    }

    const { data: songs, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform the data to match frontend expectations
    const transformedSongs = songs?.map((song) => ({
      ...song,
      reviews:
        song.reviews?.map((review: any) => ({
          user: review.users?.name || "Anonymous",
          rating: review.rating,
          comment: review.comment,
        })) || [],
    }))

    return NextResponse.json(transformedSongs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch songs" }, { status: 500 })
  }
}
