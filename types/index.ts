export enum UserRole {
  STUDENT = "student",
  FACULTY = "faculty",
  HOD = "hod",
}

export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  rollNumber?: string; // For students
  department?: string; // For faculty/HOD
}

export interface PermissionRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentRollNumber: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  reason: string;
  description: string;
  proofUrl: string;
  letterUrl: string;
  status: RequestStatus;
  createdAt: string;
  departmentId: string;
  responseMessage?: string;
  respondedAt?: string;
  respondedBy?: string;
}
