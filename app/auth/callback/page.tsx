import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthCallback({
  searchParams,
}: {
  searchParams: { code: string }
}) {
  const code = searchParams.code

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      redirect("/")
    }
  }

  // Return to home page if something went wrong
  redirect("/")
}
