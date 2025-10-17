import { useForm } from "react-hook-form";
import { useAuth } from "@/app/hooks/useAuth";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "@/types/loginForm";
import { authService } from "@/services/authService";
import LoginWithGoogle from "@/components/molecules/LoginWithGoogle";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      alert("Erro ao fazer login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center text-center space-y-2 w-full"
    >
      <Title>Bem-vindo à sua estante</Title>

      <Input
        type="email"
        placeholder="E-mail"
        {...register("email", { required: true })}
      />

      <Input
        type="password"
        placeholder="Senha"
        {...register("password", { required: true })}
      />

      <Button type="submit" loading={isSubmitting}>
        Entrar
      </Button>

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
          onClick={() => navigate("/register")}
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
