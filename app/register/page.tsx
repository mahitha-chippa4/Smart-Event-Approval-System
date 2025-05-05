import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
      <Link href={"/"} className="mx-auto text-center block">
        {/* <h1 className="flex items-center justify-center mt-5">Redirect to <Home/></h1> */}
        <Button variant="outline" className="mt-5 text-center">Redirect to <Home className="ml-2"/></Button>
        </Link>
        <h1 className="mb-8 text-center text-3xl font-bold">
          Event Permission System
        </h1>
        <AuthForm type="register" />
        
      </div>
    </div>
  );
}
