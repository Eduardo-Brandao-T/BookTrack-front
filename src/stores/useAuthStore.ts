import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "@config/axios";
import { AUTH_ROUTE, GOOGLE_AUTH_ROUTE, LOGIN_ROUTE } from "@/utils/constants";
import type { User } from "@/types/auth";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true });
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}${AUTH_ROUTE}${LOGIN_ROUTE}`,
          { email, password },
          { withCredentials: true }
        );
        set({ user: data.user, loading: false });
      },

      loginWithGoogle: async (): Promise<User | null> => {
        set({ loading: true });
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}${AUTH_ROUTE}${GOOGLE_AUTH_ROUTE}`,
          { idToken },
          { withCredentials: true }
        );
        set({ user: data.user, loading: false });
        return data.user;
      },

      logout: async () => {
        await signOut(auth);
        await axios.post(
          `${import.meta.env.VITE_API_URL}${AUTH_ROUTE}/logout`,
          {},
          { withCredentials: true }
        );
        set({ user: null });
      },

      checkAuth: async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}${AUTH_ROUTE}/me`,
            { withCredentials: true }
          );
          set({ user: data.user });
        } catch {
          set({ user: null });
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
