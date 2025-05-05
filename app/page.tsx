// import { Button } from "@/components/ui/button";
// import { CheckCircle } from "lucide-react";
// import Link from "next/link";
// import { cookies } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { redirect } from "next/navigation";

// export default async function Home() {
//   const cookieStore = cookies();
//   const supabase = createServerComponentClient({ cookies: () => cookieStore });

//   // Check if user is already authenticated
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (session) {
//     // Get user role to redirect appropriately
//     const { data: userData } = await supabase
//       .from("users")
//       .select("role")
//       .eq("id", session.user.id)
//       .single();

//     if (userData?.role === "student") {
//       redirect("/student/dashboard");
//     } else {
//       redirect("/faculty/dashboard");
//     }
//   }

//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="px-4 lg:px-6 h-14 flex items-center shadow-xl">
//         <Link className="flex items-center justify-center" href="/">
//           <span className="text-xl font-bold tracking-tighter">Event Permission System</span>
//         </Link>
//         <nav className="ml-auto flex gap-4 sm:gap-6">
//           <Link
//             className="text-sm font-medium hover:underline underline-offset-4"
//             href="/login"
//           >
//             Login
//           </Link>
//           <Link
//             className="text-sm font-medium hover:underline underline-offset-4"
//             href="/register"
//           >
//             Register
//           </Link>
//         </nav>
//       </header>

//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
//                     Streamline Event Permissions
//                   </h1>
//                   <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
//                     A digital solution to the cumbersome process of obtaining
//                     permissions for college events and external competitions.
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   <Link href="/register">
//                     <Button size="lg" className="px-8">
//                       Get Started
//                     </Button>
//                   </Link>
//                   <Link href="/login">
//                     <Button size="lg" variant="outline" className="px-8">
//                       Login
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="grid gap-4">
//                   <div className="flex items-start gap-4">
//                     <CheckCircle className="h-6 w-6 text-green-600" />
//                     <div className="space-y-1">
//                       <h3 className="font-bold">Digital Permissions</h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Submit requests online without printing papers or
//                         physically tracking down faculty.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <CheckCircle className="h-6 w-6 text-green-600" />
//                     <div className="space-y-1">
//                       <h3 className="font-bold">Transparent Process</h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Track the status of your requests in real-time and
//                         receive notifications.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <CheckCircle className="h-6 w-6 text-green-600" />
//                     <div className="space-y-1">
//                       <h3 className="font-bold">Save Time</h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         No more waiting in lines or missing lectures to get
//                         permissions.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <CheckCircle className="h-6 w-6 text-green-600" />
//                     <div className="space-y-1">
//                       <h3 className="font-bold">Eco-Friendly</h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Reduce paper waste by submitting and storing documents
//                         digitally.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
//         <p className="text-xs text-gray-500 dark:text-gray-400">
//           © 2024 Event Permission System. All rights reserved.
//         </p>
//         <nav className="sm:ml-auto flex gap-4 sm:gap-6">
//           <Link className="text-xs hover:underline underline-offset-4" href="/">
//             Privacy Policy
//           </Link>
//           <Link className="text-xs hover:underline underline-offset-4" href="/">
//             Terms of Service
//           </Link>
//         </nav>
//       </footer>
//     </div>
//   );
// }




import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, School } from "lucide-react"
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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-xl">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2" href="/">
            <Calendar className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold tracking-tight">Event Permission System</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600" href="/login">
              Login
            </Link>
            <Link href="/register">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Register</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                    For Students & Faculty
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl/none">
                    Streamline Event <span className="text-emerald-600">Permissions</span>
                  </h1>
                  <p className="max-w-[600px] text-lg text-gray-600 md:text-xl">
                    A digital solution to the cumbersome process of obtaining permissions for college events and
                    external competitions.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="px-8 bg-emerald-600 hover:bg-emerald-700">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-emerald-100 opacity-70 blur-3xl"></div>
                <div className="relative rounded-xl border bg-white p-6 shadow-lg">
                  <div className="flex items-center gap-4 border-b pb-4 mb-4">
                    <div className="rounded-full bg-emerald-100 p-2">
                      <School className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">College Tech Fest</h3>
                      <p className="text-sm text-gray-500">Permission Request</p>
                    </div>
                    <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      Approved
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium">May 15-16, 2024</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">Main Auditorium</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Faculty:</span>
                      <span className="font-medium">Prof. Johnson</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-10 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Why Choose Our Platform?</h2>
              <p className="mt-4 text-lg text-gray-500">
                Designed to make the permission process simple, transparent, and efficient.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Digital Permissions</h3>
                <p className="text-gray-500">
                  Submit requests online without printing papers or physically tracking down faculty.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Transparent Process</h3>
                <p className="text-gray-500">
                  Track the status of your requests in real-time and receive notifications.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Save Time</h3>
                <p className="text-gray-500">No more waiting in lines or missing lectures to get permissions.</p>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Eco-Friendly</h3>
                <p className="text-gray-500">Reduce paper waste by submitting and storing documents digitally.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Ready to simplify your event permissions?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Join hundreds of students and faculty members who are already using our platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="px-8 bg-emerald-600 hover:bg-emerald-700">
                    Create an Account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-white py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-center text-sm text-gray-500 md:text-left">
            © 2024 Event Permission System. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm text-gray-500 hover:text-emerald-600 underline-offset-4 hover:underline" href="/">
              Privacy Policy
            </Link>
            <Link className="text-sm text-gray-500 hover:text-emerald-600 underline-offset-4 hover:underline" href="/">
              Terms of Service
            </Link>
            <Link className="text-sm text-gray-500 hover:text-emerald-600 underline-offset-4 hover:underline" href="/">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
