import { authService } from "@/services/authService";
import { GOOGLE_LOGIN_ERROR } from "@/utils/constants";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function LoginWithGoogle() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;
      const res = await authService.googleLogin(credential);

      if (res.user.hasCompleteProfile) {
        navigate("/");
      } else {
        navigate("/register-google", {
          state: {
            fromGoogle: true,
            email: res.user.email,
            name: res.user.name,
          },
        });
      }
    } catch (err) {
      console.error(err);
      alert(GOOGLE_LOGIN_ERROR);
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
