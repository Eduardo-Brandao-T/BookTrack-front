import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/auth";
import { authService } from "@/services/authService";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
import { AUTH_ROUTE, GOOGLE_AUTH_ROUTE } from "@/utils/constants";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<User | null>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const { user, access_token } = await authService.login(email, password);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", access_token);
    setUser(user);
  }

  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}${AUTH_ROUTE}${GOOGLE_AUTH_ROUTE}`,
        { idToken }
      );

      // salva no localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.access_token);

      // atualiza o estado
      setUser(res.data.user);

      return res.data.user;
    } catch (err: any) {
      console.error("Erro login Google:", err);
      throw new Error(err?.message || "Erro no login com Google");
    }
  }

  function logout() {
    signOut(auth);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
