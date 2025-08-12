import { create } from "zustand"

export interface Song {
  id: string
  title: string
  artist: string
  coverArt: string
  price: number
  genre: string
  rating: number
  popularity: number
  reviews: Review[]
}

export interface Album {
  id: string
  title: string
  artist: string
  coverArt: string
  price: number
}

export interface Review {
  user: string
  rating: number
  comment: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface MusicStore {
  user: User | null
  wishlist: Song[]
  likedSongs: Song[]
  showDashboard: boolean
  login: (user: User) => void
  logout: () => void
  addToWishlist: (song: Song) => Promise<void>
  removeFromWishlist: (songId: string) => Promise<void>
  addToLikedSongs: (song: Song) => Promise<void>
  removeFromLikedSongs: (songId: string) => Promise<void>
  setShowDashboard: (show: boolean) => void
  loadUserData: () => Promise<void>
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  user: null,
  wishlist: [],
  likedSongs: [],
  showDashboard: false,
  login: (user) => set({ user }),
  logout: () => set({ user: null, showDashboard: false, wishlist: [], likedSongs: [] }),
  addToWishlist: async (song) => {
    try {
      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId: song.id }),
      })

      if (response.ok) {
        set((state) => ({
          wishlist: state.wishlist.some((item) => item.id === song.id) ? state.wishlist : [...state.wishlist, song],
        }))
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error)
    }
  },
  removeFromWishlist: async (songId) => {
    try {
      const response = await fetch(`/api/user/wishlist?songId=${songId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== songId),
        }))
      }
    } catch (error) {
      console.error("Failed to remove from wishlist:", error)
    }
  },
  addToLikedSongs: async (song) => {
    try {
      const response = await fetch("/api/user/liked", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId: song.id }),
      })

      if (response.ok) {
        set((state) => ({
          likedSongs: state.likedSongs.some((item) => item.id === song.id)
            ? state.likedSongs
            : [...state.likedSongs, song],
        }))
      }
    } catch (error) {
      console.error("Failed to add to liked songs:", error)
    }
  },
  removeFromLikedSongs: async (songId) => {
    try {
      const response = await fetch(`/api/user/liked?songId=${songId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        set((state) => ({
          likedSongs: state.likedSongs.filter((item) => item.id !== songId),
        }))
      }
    } catch (error) {
      console.error("Failed to remove from liked songs:", error)
    }
  },
  setShowDashboard: (show) => set({ showDashboard: show }),
  loadUserData: async () => {
    try {
      const [profileRes, wishlistRes, likedRes] = await Promise.all([
        fetch("/api/user/profile"),
        fetch("/api/user/wishlist"),
        fetch("/api/user/liked"),
      ])

      if (profileRes.ok) {
        const profile = await profileRes.json()
        set({ user: profile })
      }

      if (wishlistRes.ok) {
        const wishlist = await wishlistRes.json()
        set({ wishlist })
      }

      if (likedRes.ok) {
        const likedSongs = await likedRes.json()
        set({ likedSongs })
      }
    } catch (error) {
      console.error("Failed to load user data:", error)
    }
  },
}))
