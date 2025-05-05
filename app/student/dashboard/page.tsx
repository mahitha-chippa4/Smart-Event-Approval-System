import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { RequestStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock, CheckCircle, XCircle } from "lucide-react";
import { Database } from "@/types/supabase";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";

// Create a component for the actual content
async function DashboardContent() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <div>Loading... Please wait.</div>;
  }

  // Count permission requests by status
  const { data: pendingCount, error: pendingError } = await supabase
    .from("permission_requests")
    .select("id", { count: "exact", head: true })
    .eq("student_id", session.user.id)
    .eq("status", RequestStatus.PENDING);

  const { data: approvedCount, error: approvedError } = await supabase
    .from("permission_requests")
    .select("id", { count: "exact", head: true })
    .eq("student_id", session.user.id)
    .eq("status", RequestStatus.APPROVED);

  const { data: rejectedCount, error: rejectedError } = await supabase
    .from("permission_requests")
    .select("id", { count: "exact", head: true })
    .eq("student_id", session.user.id)
    .eq("status", RequestStatus.REJECTED);

  // Get recent requests
  const { data: recentRequests, error: recentError } = await supabase
    .from("permission_requests")
    .select("*")
    .eq("student_id", session.user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (pendingError || approvedError || rejectedError || recentError) {
    console.error("Error fetching dashboard data:", {
      pendingError,
      approvedError,
      rejectedError,
      recentError,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your event permission requests
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount?.count || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Requests
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {approvedCount?.count || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected Requests
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rejectedCount?.count || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Requests</h2>
          <Link href="/student/new-request">
            <Button>New Request</Button>
          </Link>
        </div>

        {recentRequests?.length ? (
          <div className="rounded-md border">
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left font-medium">Event</th>
                    <th className="py-2 text-left font-medium">Date</th>
                    <th className="py-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((request) => (
                    <tr key={request.id} className="border-b last:border-0">
                      <td className="py-2">{request.event_name}</td>
                      <td className="py-2">
                        {new Date(request.event_date).toLocaleDateString()}
                      </td>
                      <td className="py-2">
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium
                          ${
                            request.status === RequestStatus.APPROVED
                              ? "bg-green-100 text-green-800"
                              : request.status === RequestStatus.REJECTED
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        `}
                        >
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-md border p-8 text-center">
            <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No requests yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first permission request to get started.
            </p>
            <Link href="/student/new-request" className="mt-4 inline-block">
              <Button>Create Request</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
