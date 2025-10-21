import { useForm } from "react-hook-form";
import { useAuth } from "@/app/hooks/useAuth";
import Input from "@/components/atoms/Input";
import Title from "@/components/atoms/Title";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "@/types/loginFormType";
import LoginWithGoogle from "@/components/molecules/LoginWithGoogle";
import {
  EMAIL_NOT_FOUND,
  EMAIL_NOT_FOUND_MESSAGE,
  GENERIC_LOGIN_ERROR,
  INVALID_PASSWORD,
  INVALID_PASSWORD_MESSAGE,
  REGISTER_ROUTE,
} from "@/utils/constants";
import { LoadingButton } from "@mui/lab";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err: any) {
      if (err.message === EMAIL_NOT_FOUND) {
        setError("email", {
          type: "manual",
          message: EMAIL_NOT_FOUND_MESSAGE,
        });
      } else if (err.message === INVALID_PASSWORD) {
        setError("password", {
          type: "manual",
          message: INVALID_PASSWORD_MESSAGE,
        });
      } else {
        setError("password", {
          type: "manual",
          message: GENERIC_LOGIN_ERROR,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center text-center space-y-2 w-full"
    >
      <Title>Bem-vindo à sua estante</Title>

      <div className="w-full">
        <Input
          type="email"
          placeholder="E-mail"
          {...register("email", { required: "E-mail é obrigatório" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full">
        <Input
          type="password"
          placeholder="Senha"
          {...register("password", { required: "Senha é obrigatória" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <LoadingButton
        type="submit"
        loading={isSubmitting}
        fullWidth
        className="!bg-dark-green hover:!bg-matcha !text-white !rounded-2xl !py-3 !font-semibold transition"
      >
        Entrar
      </LoadingButton>

      <button
        type="button"
        className="text-sm text-green-700 hover:underline cursor-pointer"
      >
        Esqueci minha senha
      </button>

      <div className="text-sm">
        <span>Não tem conta? </span>
        <button
          type="button"
          onClick={() => navigate(REGISTER_ROUTE)}
          className="text-green-700 font-medium hover:underline cursor-pointer"
        >
          Cadastre-se
        </button>
      </div>

      <div className="flex items-center w-full">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">ou entre com</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <LoginWithGoogle />
    </form>
  );
}
