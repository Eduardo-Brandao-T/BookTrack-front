export interface User {
  id: string;
  name: string;
  email: string;
  hasCompleteProfile: boolean;
}

export interface LoginResponse {
  user: User;
  access_token: string;
}
