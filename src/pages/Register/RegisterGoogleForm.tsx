import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthForm from "@/components/molecules/AuthForm";
import folhaImg from "@/assets/folha.png";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import type { RegisterGoogleFormData } from "@/types/registerGoogleForm";
import axios from "axios";

export default function RegisterGoogle() {
  const location = useLocation();
  const navigate = useNavigate();
  const fromGoogle = location.state?.fromGoogle;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterGoogleFormData>();

  useEffect(() => {
    if (!fromGoogle) {
      navigate("/login");
    }
  }, [fromGoogle, navigate]);

  const onSubmit = async (data: RegisterGoogleFormData) => {
    try {
      // 📨 monta o payload
      const updatePayload = {
        name: `${data.firstName} ${data.lastName}`,
        birthDate: data.birthDate,
        gender: data.gender,
        hasCompleteProfile: true, // se quiser marcar como perfil completo
      };

      // ⚙️ chama o backend
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${fromGoogle.email}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Cadastro Google completo! ✅");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao concluir cadastro");
    }
  };

  return (
    <AuthForm
      title="Finalizar cadastro"
      logo={folhaImg}
      onSubmit={handleSubmit(onSubmit)}
      submitText={isSubmitting ? "Concluindo..." : "Concluir"}
    >
      {/* Nome + Sobrenome */}
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
      <div className="w-full">
        <Select
          defaultValue=""
          {...register("gender", { required: "Selecione o gênero" })}
        >
          <option value="" disabled>
            Selecione o gênero
          </option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
        </Select>
        {errors.gender && (
          <p className="text-red-500 text-sm text-left mt-1">
            {errors.gender.message}
          </p>
        )}
      </div>
    </AuthForm>
  );
}
