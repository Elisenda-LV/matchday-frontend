export interface User {
  id_user: string;
  name: string;
  email: string;
  password: string;
  role: string;
  create_at: Date;
  accessToken?: string
}
