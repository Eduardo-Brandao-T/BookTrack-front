import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginWithGoogle() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;

      // Envia o token JWT do Google para o backend
      const res = await axios.post("http://localhost:3000/auth/google", {
        token: credential,
      });

      // Exemplo: o backend devolve { access_token, hasCompleteProfile, user }
      localStorage.setItem("token", res.data.access_token);

      if (res.data.hasCompleteProfile) {
        navigate("/");
      } else {
        navigate("/register-google", {
          state: {
            fromGoogle: true,
            email: res.data.user.email,
            name: res.data.user.name,
          },
        });
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer login com Google");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Erro no login do Google")}
        text="continue_with"
        shape="pill"
        width="280"
      />
    </div>
  );
}
