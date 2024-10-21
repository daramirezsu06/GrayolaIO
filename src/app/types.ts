export interface Profile {
  company: string | null;
  created_at: string;
  id: string;
  name: string;
  phone_number: string;
  role: Role;
  status: string;
  updated_at: string | null;
  user_id: string;
  email: string;
}

export interface Project {
  id: string;
  title: string;
  description: string ;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  assigned_to: string | null;
  creator_profile: Profile;
  assignee_profile: Profile | null;
}

export type Role = "admin" | "manager" | "designer" | "customer";