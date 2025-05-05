"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserRole } from "@/types";
import type { Database } from "@/types/supabase";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import  LoaderWrapper  from "@/components/ui/LoaderWrapper";

interface AuthFormProps {
  type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [department, setDepartment] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (type === "register") {
        // Register with Supabase Auth first
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email,
            password,
          }
        );

        if (authError) throw authError;

        if (authData?.user) {
          // Then insert additional user data in users table
          const { error: profileError } = await supabase.from("users").insert({
            id: authData.user.id, // Use the ID from auth
            email,
            name,
            role,
            ...(role === UserRole.STUDENT
              ? { roll_number: rollNumber }
              : { department }),
          });

          if (profileError) throw profileError;
        }

        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // Login with Supabase Auth
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (signInError) throw signInError;

        if (!signInData.user) {
          throw new Error("Login successful but user data is missing");
        }

        // Fetch user role to redirect appropriately
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role")
          .eq("id", signInData.user.id)
          .single();

        if (userError) {
          throw new Error("Failed to fetch user role");
        }

        setSuccess("Login successful! Redirecting...");

        setTimeout(() => {
          router.refresh();
          if (userData?.role === UserRole.STUDENT) {
            router.push("/student/dashboard");
          } else {
            router.push("/faculty/dashboard");
          }
        }, 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-t-4 border-t-primary">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Fill in your details to create a new account"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert
              variant="destructive"
              className="text-sm animate-in fade-in-50"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200 text-sm animate-in fade-in-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {type === "register" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus-visible:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Role
                </Label>
                <Select
                  value={role}
                  onValueChange={(value) => setRole(value as UserRole)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.STUDENT}>Student</SelectItem>
                    <SelectItem value={UserRole.FACULTY}>Faculty</SelectItem>
                    <SelectItem value={UserRole.HOD}>HOD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {role === UserRole.STUDENT ? (
                <div className="space-y-2">
                  <Label htmlFor="rollNumber" className="text-sm font-medium">
                    Roll Number
                  </Label>
                  <Input
                    id="rollNumber"
                    placeholder="Enter your roll number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="focus-visible:ring-primary"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium">
                    Department
                  </Label>
                  <Input
                    id="department"
                    placeholder="Enter your department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="focus-visible:ring-primary"
                    required
                  />
                </div>
              )}
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-visible:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              {type === "login" && (
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-visible:ring-primary"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <Button
            type="submit"
            className="w-full transition-all"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {type === "login" ? "Logging in..." : "Creating account..."}
              </>
            ) : type === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            {type === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <a
              href={type === "login" ? "/register" : "/login"}
              className="text-primary font-medium hover:underline"
            >
              {type === "login" ? "Sign up" : "Sign in"}
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
