import { useAuth } from "@/app/hooks/useAuth";

export default function LoginWithGoogle() {
  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      // redireciona para home
      window.location.href = "/";
    } catch (err) {
      alert("Erro ao fazer login com Google");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        type="button"
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
      >
        Continuar com Google
      </button>
    </div>
  );
}
