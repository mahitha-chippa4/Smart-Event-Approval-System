import { Sidebar } from "@/components/layout/sidebar";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { UserRole } from "@/types";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // Get user info
  const { data: user, error } = await supabase
    .from("users")
    .select("name, role")
    .eq("id", session.user.id)
    .single();

  if (error || !user || user.role !== UserRole.STUDENT) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar role={UserRole.STUDENT} userName={user.name} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
