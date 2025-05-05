"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import supabase from "@/lib/supabase";
import { RequestStatus } from "@/types";

export default function NewRequest() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventLocation: "",
    reason: "",
    description: "",
    department: "",
    proofFile: null as File | null,
    letterFile: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setFormData((prev) => ({ ...prev, [name]: e.target.files?.[0] || null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to create a request");

      // Get student details
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("name, roll_number")
        .eq("id", user.id)
        .single();

      if (userError) throw userError;

      // Upload proof file
      let proofUrl = "";
      if (formData.proofFile) {
        const proofFilePath = `${user.id}/proofs/${Date.now()}-${
          formData.proofFile.name
        }`;
        const { error: proofUploadError, data: proofData } =
          await supabase.storage
            .from("documents")
            .upload(proofFilePath, formData.proofFile);

        if (proofUploadError) throw proofUploadError;

        // Get public URL
        const { data: proofUrlData } = supabase.storage
          .from("documents")
          .getPublicUrl(proofFilePath);

        proofUrl = proofUrlData.publicUrl;
      }

      // Upload letter file
      let letterUrl = "";
      if (formData.letterFile) {
        const letterFilePath = `${user.id}/letters/${Date.now()}-${
          formData.letterFile.name
        }`;
        const { error: letterUploadError, data: letterData } =
          await supabase.storage
            .from("documents")
            .upload(letterFilePath, formData.letterFile);

        if (letterUploadError) throw letterUploadError;

        // Get public URL
        const { data: letterUrlData } = supabase.storage
          .from("documents")
          .getPublicUrl(letterFilePath);

        letterUrl = letterUrlData.publicUrl;
      }

      // Create permission request
      const { error: insertError } = await supabase
        .from("permission_requests")
        .insert({
          student_id: user.id,
          student_name: userData.name,
          student_roll_number: userData.roll_number,
          event_name: formData.eventName,
          event_date: formData.eventDate,
          event_location: formData.eventLocation,
          reason: formData.reason,
          description: formData.description,
          proof_url: proofUrl,
          letter_url: letterUrl,
          status: RequestStatus.PENDING,
          department_id: formData.department,
        });

      if (insertError) throw insertError;

      // Redirect to my requests page
      router.push("/student/my-requests");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">New Permission Request</h1>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>
            Fill in the details about the event you need permission for
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                name="eventName"
                placeholder="Enter event name"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventLocation">Event Location</Label>
                <Input
                  id="eventLocation"
                  name="eventLocation"
                  placeholder="Enter event location"
                  value={formData.eventLocation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">
                Department to Request Permission From
              </Label>
              <Input
                id="department"
                name="department"
                placeholder="Enter department code"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Attending</Label>
              <Input
                id="reason"
                name="reason"
                placeholder="Brief reason for attending"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide a detailed description about the event and why you want to attend"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proofFile">
                Proof of Event (Invitation, etc.)
              </Label>
              <Input
                id="proofFile"
                name="proofFile"
                type="file"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="letterFile">Request Letter</Label>
              <Input
                id="letterFile"
                name="letterFile"
                type="file"
                onChange={handleFileChange}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
