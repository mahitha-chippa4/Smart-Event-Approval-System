import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { RequestStatus } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";

// Create a component for the actual content
async function MyRequestsContent() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get all permission requests for the student
  const { data: requests, error } = await supabase
    .from("permission_requests")
    .select("*")
    .eq("student_id", session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching requests:", error);
  }

  // Helper function to get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case RequestStatus.APPROVED:
        return "bg-green-100 text-green-800";
      case RequestStatus.REJECTED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Permission Requests</h1>
        <Link href="/student/new-request">
          <Button>New Request</Button>
        </Link>
      </div>

      {requests && requests.length > 0 ? (
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="py-3 px-4 text-left font-medium">Event</th>
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">
                    Department
                  </th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Documents</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-t hover:bg-muted/50">
                    <td className="py-3 px-4">{request.event_name}</td>
                    <td className="py-3 px-4">
                      {new Date(request.event_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{request.department_id}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                      {request.response_message && (
                        <p className="text-xs text-gray-500 mt-1">
                          {request.response_message}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {request.proof_url && (
                          <a
                            href={request.proof_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <FileText size={16} className="mr-1" />
                            <span className="text-xs">Proof</span>
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                        )}
                        {request.letter_url && (
                          <a
                            href={request.letter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <FileText size={16} className="mr-1" />
                            <span className="text-xs">Letter</span>
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No requests found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            You haven't created any permission requests yet.
          </p>
          <Link href="/student/new-request" className="mt-4 inline-block">
            <Button>Create Request</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function MyRequests() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      }
    >
      <MyRequestsContent />
    </Suspense>
  );
}
