import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { RequestStatus } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { History, CheckCircle, XCircle } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { Suspense } from "react";

// Create a component for the actual content
async function HistoryContent() {
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

  // Get all processed requests for the department
  const { data: processedRequests, error } = await supabase
    .from("permission_requests")
    .select("*")
    .eq("department_id", department)
    .not("status", "eq", RequestStatus.PENDING)
    .order("responded_at", { ascending: false });

  if (error) {
    console.error("Error fetching requests:", error);
  }

  // Helper function to get status badge class
  const getStatusBadgeClass = (status: string) => {
    return status === RequestStatus.APPROVED
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    return status === RequestStatus.APPROVED ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <>
      {processedRequests?.length ? (
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="py-3 px-4 text-left font-medium">Student</th>
                  <th className="py-3 px-4 text-left font-medium">Event</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">
                    Responded On
                  </th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {processedRequests.map((request) => (
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
                    <td className="py-3 px-4">
                      <div>
                        <div>{request.event_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(request.event_date).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {request.responded_at
                        ? new Date(request.responded_at).toLocaleDateString()
                        : "N/A"}
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
          <History className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No request history</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            There are no processed permission requests in the history.
          </p>
          <Link href="/faculty/requests" className="mt-4 inline-block">
            <Button variant="outline">View Pending Requests</Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default async function RequestHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Request History</h1>
        <p className="text-muted-foreground">
          View previously processed student permission requests
        </p>
      </div>

      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      }>
        <HistoryContent />
      </Suspense>
    </div>
  );
}
