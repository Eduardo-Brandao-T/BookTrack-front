import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/auth";
import { authService } from "@/services/authService";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
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
    localStorage.setItem("access_token", access_token);
    setUser(user);
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  const value: AuthContextType = { user, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
