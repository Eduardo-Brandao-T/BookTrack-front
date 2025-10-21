import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import RegisterFormCard from "@/components/molecules/RegisterFormCard";
import folhaImg from "@/assets/folha.png";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import type { RegisterGoogleFormData } from "@/types/registerGoogleFormType";
import axios from "axios";
import { Gender } from "@/types/gender";
import {
  GOOGLE_REGISTER_ERROR,
  LOGIN_ROUTE,
  REGISTER_COMPLETE,
  USERS_ROUTE,
} from "@/utils/constants";

export default function RegisterGoogle() {
  const location = useLocation();
  const navigate = useNavigate();
  const googleState = location.state;
  const fromGoogle = googleState?.fromGoogle;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterGoogleFormData>();

  useEffect(() => {
    if (!fromGoogle) {
      navigate(LOGIN_ROUTE);
    }
  }, [fromGoogle, navigate]);

  const onSubmit = async (data: RegisterGoogleFormData) => {
    try {
      const updatePayload = {
        name: `${data.firstName} ${data.lastName}`,
        birthDate: data.birthDate,
        gender: data.gender,
        hasCompleteProfile: true,
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}${USERS_ROUTE}${googleState.email}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(REGISTER_COMPLETE);
      navigate("/");
    } catch (error: any) {
      console.error(error);
      alert(GOOGLE_REGISTER_ERROR);
    }
  };

  return (
    <RegisterFormCard
      title="Finalizar cadastro"
      logo={folhaImg}
      onSubmit={handleSubmit(onSubmit)}
      submitText={"Concluir"}
      isSubmitting={isSubmitting}
    >
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

      <div className="w-full">
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
          <p className="text-red-500 text-sm text-left mt-1">
            {errors.gender.message}
          </p>
        )}
      </div>
    </RegisterFormCard>
  );
}
