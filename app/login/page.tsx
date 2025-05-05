// import { AuthForm } from "@/components/auth/auth-form";
// import { Home } from "lucide-react";
// import Link from "next/link";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu"
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button"
 


// export default function LoginPage() {
//   return (
//     <>
//     <NavigationMenu>
//   <NavigationMenuList>
//     <NavigationMenuItem>
//       <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
//     </NavigationMenuItem>
//   </NavigationMenuList>
// </NavigationMenu>
//     <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <h1 className="mb-8 text-center text-3xl font-bold">
//           Event Permission System
//         </h1>
//         <AuthForm type="login" />
//         <Link href={"/"} className="mx-auto text-center block">
//         {/* <h1 className="flex items-center justify-center mt-5">Redirect to <Home/></h1> */}
//         <Button variant="outline" className="mt-5 text-center">Redirect to <Home className="ml-2"/></Button>
//         </Link>
//       </div>
//     </div>
//     </>
//   );
// }



import { AuthForm } from "@/components/auth/auth-form"
import { Home } from "lucide-react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-white p-1.5 rounded-md">
              <Home className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg">Event Permission System</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
            <p className="text-muted-foreground mt-2">Access your Event Permission System account</p>
          </div>

          <AuthForm type="login" />
{/* 
          <div className="mt-8 text-center">
            <Link href="/">
              <Button variant="outline" className="group">
                <span>Return to home</span>
                <Home className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div> */}
        </div>
      </main>

      <footer className="py-4 border-t text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          © {new Date().getFullYear()} Event Permission System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
