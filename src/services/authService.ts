import type { User, LoginResponse } from "@/types/auth";
import { AUTH_ROUTE, GOOGLE_AUTH_ROUTE, LOGIN_ROUTE } from "@/utils/constants";
import axios from "axios";

export const authService = {
  api_url: import.meta.env.VITE_API_URL,

  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await axios.post(`${this.api_url}${AUTH_ROUTE}${LOGIN_ROUTE}`, {
      email,
      password,
    });

    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("id", res.data.user.id);

    return {
      user: res.data.user as User,
      access_token: res.data.access_token,
    };
  },

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  getStoredUser(): User | null {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  },

  async googleLogin(credential: string): Promise<{
    access_token: string;
    user: User;
  }> {
    const res = await axios.post(
      `${this.api_url}${AUTH_ROUTE}${GOOGLE_AUTH_ROUTE}`,
      {
        idToken: credential,
      }
    );

    localStorage.setItem("id", res.data.user.id);
    localStorage.setItem("token", res.data.user.access_token);

    return {
      user: res.data.user as User,
      access_token: res.data.access_token,
    };
  },
};
