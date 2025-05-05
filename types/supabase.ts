import { RequestStatus, UserRole } from ".";

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: UserRole;
          name: string;
          roll_number?: string;
          department?: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role: UserRole;
          name: string;
          roll_number?: string;
          department?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: UserRole;
          name?: string;
          roll_number?: string;
          department?: string;
          created_at?: string;
        };
      };
      permission_requests: {
        Row: {
          id: string;
          student_id: string;
          student_name: string;
          student_roll_number: string;
          event_name: string;
          event_date: string;
          event_location: string;
          reason: string;
          description: string;
          proof_url: string;
          letter_url: string;
          status: RequestStatus;
          created_at: string;
          department_id: string;
          response_message?: string;
          responded_at?: string;
          responded_by?: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          student_name: string;
          student_roll_number: string;
          event_name: string;
          event_date: string;
          event_location: string;
          reason: string;
          description: string;
          proof_url: string;
          letter_url: string;
          status?: RequestStatus;
          created_at?: string;
          department_id: string;
          response_message?: string;
          responded_at?: string;
          responded_by?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          student_name?: string;
          student_roll_number?: string;
          event_name?: string;
          event_date?: string;
          event_location?: string;
          reason?: string;
          description?: string;
          proof_url?: string;
          letter_url?: string;
          status?: RequestStatus;
          created_at?: string;
          department_id?: string;
          response_message?: string;
          responded_at?: string;
          responded_by?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
