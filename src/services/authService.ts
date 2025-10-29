import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import axios from "@config/axios";
import { AUTH_ROUTE, LOGIN_ROUTE, GOOGLE_AUTH_ROUTE } from "@/utils/constants";
import type { User, LoginResponse } from "@/types/auth";

export const authService = {
  api_url: import.meta.env.VITE_API_URL,

  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await axios.post(`${this.api_url}${AUTH_ROUTE}${LOGIN_ROUTE}`, {
      email,
      password,
    });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("access_token", res.data.access_token);
    return { user: res.data.user as User, access_token: res.data.access_token };
  },

  async googleLogin(): Promise<LoginResponse> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await axios.post(
        `${this.api_url}${AUTH_ROUTE}${GOOGLE_AUTH_ROUTE}`,
        { idToken }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("access_token", res.data.access_token);

      return {
        user: res.data.user as User,
        access_token: res.data.access_token,
      };
    } catch (err: any) {
      console.error("Erro no login com Google:", err);
      throw new Error(err?.message || "Erro no login com Google");
    }
  },

  logout() {
    signOut(auth);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  },

  getStoredUser(): User | null {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  },
};
