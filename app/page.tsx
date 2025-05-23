import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, ArrowRight, Sparkles, Clock, Shield } from "lucide-react"
import Link from "next/link"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  // Check if user is already authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    // Get user role to redirect appropriately
    const { data: userData } = await supabase.from("users").select("role").eq("id", session.user.id).single()

    if (userData?.role === "student") {
      redirect("/student/dashboard")
    } else {
      redirect("/faculty/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Modern Header with Gradient Border */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-blue-100">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2" href="/">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Event Approval System
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link 
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600" 
              href="/login"
            >
              Login
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all hover:shadow-blue-300">
                Register
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Modern Design */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <div className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium">
                    Simplified Event Management
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Effortless Event Approvals, Simplified
                  </h1>
                  <p className="max-w-[600px] text-lg text-gray-600 md:text-xl">
                    Smart, efficient event approval for a vibrant campus life. Empowering seamless event planning for students and faculty.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button 
                      size="lg" 
                      className="px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all hover:shadow-blue-300 hover:translate-y-[-1px]"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Feature Cards with Modern Design */}
              <div className="grid gap-6 lg:gap-8">
                <div className="group relative rounded-2xl border border-blue-100 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Quick Approvals</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Get your events approved faster with our streamlined digital process
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative rounded-2xl border border-blue-100 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Secure & Reliable</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Track your event permissions with complete transparency
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative rounded-2xl border border-blue-100 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Event Management</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Organize and manage all your events in one central platform
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 px-4 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-gray-500">
                © 2024 Smart Event Approval System. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-sm text-gray-500 hover:text-blue-600 transition-colors" href="/">
                Privacy Policy
              </Link>
              <Link className="text-sm text-gray-500 hover:text-blue-600 transition-colors" href="/">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
