import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { RequestStatus } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";

// Create a component for the actual content
async function RequestsContent() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get user department
  const { data: userData } = await supabase
    .from("users")
    .select("department")
    .eq("id", session?.user.id)
    .single();

  const department = userData?.department || "";

  // Get all pending requests for the department
  const { data: pendingRequests, error } = await supabase
    .from("permission_requests")
    .select("*")
    .eq("department_id", department)
    .eq("status", RequestStatus.PENDING)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching requests:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pending Requests</h1>
        <p className="text-muted-foreground">
          Review and respond to student permission requests
        </p>
      </div>

      {pendingRequests?.length ? (
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="py-3 px-4 text-left font-medium">Student</th>
                  <th className="py-3 px-4 text-left font-medium">Event</th>
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">Reason</th>
                  <th className="py-3 px-4 text-left font-medium">
                    Requested On
                  </th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request) => (
                  <tr key={request.id} className="border-t hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">
                          {request.student_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {request.student_roll_number}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{request.event_name}</td>
                    <td className="py-3 px-4">
                      {new Date(request.event_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div
                        className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                        title={request.reason}
                      >
                        {request.reason}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(request.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/faculty/requests/${request.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border p-8 text-center">
          <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No pending requests</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            All caught up! There are no pending permission requests at the
            moment.
          </p>
          <Link href="/faculty/history" className="mt-4 inline-block">
            <Button variant="outline">View Request History</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function FacultyRequests() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      }
    >
      <RequestsContent />
    </Suspense>
  );
}
