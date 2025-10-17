import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import folhaImg from "@/assets/folha.png";
import AuthForm from "@/components/molecules/AuthForm";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import type { RegisterFormData } from "@/types/registerForm";
import axios from "axios";
import { Gender } from "@/types/gender";

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const fullName = `${data.firstName} ${data.lastName}`.trim();

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: fullName,
        email: data.email,
        password: data.password,
        gender: data.gender,
        birthDate: data.birthDate,
        hasCompleteProfile: true,
      });

      alert("Conta criada com sucesso! ✅");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao criar conta. Verifique os dados e tente novamente.");
    }
  };

  return (
    <AuthForm
      title="Criar nova conta"
      logo={folhaImg}
      onSubmit={handleSubmit(onSubmit)}
      submitText={isSubmitting ? "Cadastrando..." : "Cadastrar"}
    >
      {/* Nome e Sobrenome */}
      <div className="flex flex-wrap w-full gap-3">
        <div className="flex-1 min-w-0">
          <Input
            placeholder="Nome"
            {...register("firstName", { required: "Informe seu nome" })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm text-left mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <Input
            placeholder="Sobrenome"
            {...register("lastName", { required: "Informe seu sobrenome" })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm text-left mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <Input
        type="email"
        placeholder="E-mail"
        {...register("email", { required: "E-mail é obrigatório" })}
      />
      {errors.email && (
        <p className="text-red-500 text-sm text-left">{errors.email.message}</p>
      )}

      {/* Senha */}
      <Input
        type="password"
        placeholder="Senha"
        {...register("password", {
          required: "Senha obrigatória",
          minLength: { value: 6, message: "Mínimo de 6 caracteres" },
        })}
      />
      {errors.password && (
        <p className="text-red-500 text-sm text-left">
          {errors.password.message}
        </p>
      )}

      {/* Data de nascimento */}
      <div className="flex flex-col w-full text-left">
        <label className="text-sm font-medium text-gray-700">
          Data de nascimento
        </label>
        <Input
          type="date"
          {...register("birthDate", { required: "Data obrigatória" })}
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
        )}
      </div>

      {/* Gênero */}
      <div className="flex flex-col w-full text-left">
        <label className="text-sm font-medium text-gray-700">Gênero</label>
        <Select
          defaultValue=""
          {...register("gender", { required: "Selecione um gênero" })}
        >
          <option value="" disabled>
            Selecione
          </option>
          {Object.values(Gender).map((g) => (
            <option key={g} value={g}>
              {g === Gender.MALE
                ? "Masculino"
                : g === Gender.FEMALE
                ? "Feminino"
                : "Outro"}
            </option>
          ))}
        </Select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>

      {/* Botão extra */}
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="text-sm text-green-700 hover:underline cursor-pointer"
      >
        Já tem uma conta? Entrar
      </button>
    </AuthForm>
  );
}
