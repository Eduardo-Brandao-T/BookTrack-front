import { useAuthStore } from "@/stores/useAuthStore";

export function useAuth() {
  const { user, loading, login, loginWithGoogle, logout, checkAuth } =
    useAuthStore();

  return { user, loading, login, loginWithGoogle, logout, checkAuth };
}
