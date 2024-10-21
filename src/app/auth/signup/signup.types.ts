export interface SignupFormData {
  email: string;
  password: string;
  name: string;
  phone_number: string;
  role: "customer" | "designer" | "manager";
  company: string ;
}

export interface SignupFormError {
  email: string;
  password: string;
  name: string;
  phone_number: string;
  role: string;
  company?: string | null;
}
