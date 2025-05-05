import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "./types/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  // If not logged in and trying to access protected routes, redirect to login
  if (
    !session &&
    (pathname.startsWith("/student") || pathname.startsWith("/faculty"))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in but trying to access auth pages, redirect to dashboard
  if (session && (pathname === "/login" || pathname === "/register")) {
    try {
      // Get user role to redirect appropriately
      const { data: userData, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        // If there's an error, redirect to login as a fallback
        return NextResponse.redirect(new URL("/login", req.url));
      }

      if (userData?.role === "student") {
        return NextResponse.redirect(new URL("/student/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/faculty/dashboard", req.url));
      }
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If logged in as student but trying to access faculty routes
  if (session && pathname.startsWith("/faculty")) {
    try {
      const { data: userData, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || userData?.role === "student") {
        return NextResponse.redirect(new URL("/student/dashboard", req.url));
      }
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If logged in as faculty but trying to access student routes
  if (session && pathname.startsWith("/student")) {
    try {
      const { data: userData, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || userData?.role !== "student") {
        return NextResponse.redirect(new URL("/faculty/dashboard", req.url));
      }
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/login", "/register", "/student/:path*", "/faculty/:path*"],
};
