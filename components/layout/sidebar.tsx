"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types";
import { LogOut, User, FilePlus, FileText, Home } from "lucide-react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface SidebarProps {
  role: UserRole;
  userName: string;
}

export function Sidebar({ role, userName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-64 bg-slate-800 text-white p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Event Permissions</h1>
        <div className="flex items-center mt-4 space-x-2">
          <User size={20} />
          <span className="text-sm font-medium">{userName}</span>
        </div>
      </div>

      <nav className="space-y-2">
        {role === UserRole.STUDENT ? (
          <>
            <Link
              href="/student/dashboard"
              className={`flex items-center space-x-2 p-2 rounded ${
                isActive("/student/dashboard")
                  ? "bg-slate-700"
                  : "hover:bg-slate-700"
              }`}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/student/new-request"
              className={`flex items-center space-x-2 p-2 rounded ${
                isActive("/student/new-request")
                  ? "bg-slate-700"
                  : "hover:bg-slate-700"
              }`}
            >
              <FilePlus size={18} />
              <span>New Request</span>
            </Link>
            <Link
              href="/student/my-requests"
              className={`flex items-center space-x-2 p-2 rounded ${
                isActive("/student/my-requests")
                  ? "bg-slate-700"
                  : "hover:bg-slate-700"
              }`}
            >
              <FileText size={18} />
              <span>My Requests</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/faculty/dashboard"
              className={`flex items-center space-x-2 p-2 rounded ${
                isActive("/faculty/dashboard")
                  ? "bg-slate-700"
                  : "hover:bg-slate-700"
              }`}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/faculty/requests"
              className={`flex items-center space-x-2 p-2 rounded ${
                isActive("/faculty/requests")
                  ? "bg-slate-700"
                  : "hover:bg-slate-700"
              }`}
            >
              <FileText size={18} />
              <span>Pending Requests</span>
            </Link>
            <Link
              href="/faculty/history"
              className={`flex items-center space-x-2 p-2 rounded ${
                isActive("/faculty/history")
                  ? "bg-slate-700"
                  : "hover:bg-slate-700"
              }`}
            >
              <FileText size={18} />
              <span>Request History</span>
            </Link>
          </>
        )}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 rounded w-[13rem] hover:bg-slate-700"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
