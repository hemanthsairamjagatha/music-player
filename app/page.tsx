"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { MusicCatalog } from "@/components/music-catalog"
import { RecommendationsSection } from "@/components/recommendations-section"
import { UserDashboard } from "@/components/user-dashboard"
import { AuthModal } from "@/components/auth-modal"
import { useMusicStore } from "@/lib/store"
import { supabase } from "@/lib/supabase/client"

export default function HomePage() {
  const { user, showDashboard, login, loadUserData } = useMusicStore()
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user && !user) {
        try {
          const response = await fetch("/api/user/profile")
          if (response.ok) {
            const profile = await response.json()
            login(profile)
            await loadUserData()
          }
        } catch (error) {
          console.error("Failed to load user profile:", error)
        }
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user && !user) {
        try {
          const response = await fetch("/api/user/profile")
          if (response.ok) {
            const profile = await response.json()
            login(profile)
            await loadUserData()
          }
        } catch (error) {
          console.error("Failed to load user profile:", error)
        }
      } else if (event === "SIGNED_OUT") {
        // Handle sign out is managed by the store logout function
      }
    })

    return () => subscription.unsubscribe()
  }, [user, login, loadUserData])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation onAuthClick={() => setShowAuthModal(true)} />

      {showDashboard && user ? (
        <UserDashboard />
      ) : (
        <>
          <HeroSection />
          <MusicCatalog />
          <RecommendationsSection />
        </>
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
