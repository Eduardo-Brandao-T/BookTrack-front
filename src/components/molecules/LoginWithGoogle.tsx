import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginWithGoogle() {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const userData = await loginWithGoogle();

      if (userData?.hasCompleteProfile) {
        navigate("/");
      } else {
        navigate("/register-google", {
          state: {
            fromGoogle: true,
            email: user?.email,
            name: user?.name,
            id: user?.id,
          },
        });
      }
    } catch (err: any) {
      const code = err?.code || err?.message;
      if (code.includes("auth/popup-closed-by-user")) {
        console.log("O usuário fechou o popup sem completar o login.");
        setLoading(false);
        return;
      }

      alert("Erro ao fazer login com Google");
      console.error("Erro login Google:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className={`cursor-pointer flex items-center justify-center gap-3 w-full max-w-[280px] py-2 border border-gray-300 rounded-full shadow-sm transition-all duration-200 hover:shadow-md hover:bg-gray-50 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        <FcGoogle size={22} />
        <span className="font-medium text-gray-700">
          {loading ? "Entrando..." : "Continuar com Google"}
        </span>
      </button>
    </div>
  );
}
