export interface ContactType {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: string[];
}