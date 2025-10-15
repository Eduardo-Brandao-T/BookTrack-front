import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import folhaImg from '@/assets/folha.png'
import type { RegisterFormData } from '@/types/registerForm'

export default function RegisterForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: '',
      gender: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data)
    // aqui você chamaria o endpoint de cadastro (ex: await registerUser(data))
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center text-center space-y-4 w-[70%] max-w-md bg-white rounded-2xl p-6 shadow-md"
      >
        {/* Título com logo */}
        <div className="flex items-center justify-center space-x-2">
          <img src={folhaImg} alt="Folha decorativa" className="w-8 sm:w-10 object-contain" />
          <h1 className="text-2xl sm:text-3xl font-semibold text-brown">
            Criar nova conta
          </h1>
        </div>

        {/* Nome e Sobrenome */}
        <div className="flex flex-wrap w-full gap-3">
          <input
            type="text"
            placeholder="Nome"
            {...register('firstName', { required: 'Informe seu nome' })}
            className="flex-1 min-w-0 p-2 bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-matcha"
          />
          <input
            type="text"
            placeholder="Sobrenome"
            {...register('lastName', { required: 'Informe seu sobrenome' })}
            className="flex-1 min-w-0 p-2 bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-matcha"
          />
        </div>
        {(errors.firstName || errors.lastName) && (
          <span className="text-red-500 text-sm w-full text-left">
            {errors.firstName?.message || errors.lastName?.message}
          </span>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="E-mail"
          {...register('email', { required: 'E-mail é obrigatório' })}
          className="p-2 bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-matcha w-full"
        />
        {errors.email && <span className="text-red-500 text-sm w-full text-left">{errors.email.message}</span>}

        {/* Senha */}
        <input
          type="password"
          placeholder="Senha"
          {...register('password', {
            required: 'Senha obrigatória',
            minLength: { value: 6, message: 'Mínimo de 6 caracteres' },
          })}
          className="p-2 bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-matcha w-full"
        />
        {errors.password && <span className="text-red-500 text-sm w-full text-left">{errors.password.message}</span>}

        {/* Data de nascimento */}
        <div className="flex flex-col w-full space-y-1 text-left">
          <label className="text-sm font-medium text-gray-700">Data de nascimento</label>
          <input
            type="date"
            {...register('birthDate', { required: 'Data obrigatória' })}
            className="p-2 bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-matcha w-full"
          />
          {errors.birthDate && <span className="text-red-500 text-sm">{errors.birthDate.message}</span>}
        </div>

        {/* Gênero */}
        <div className="flex flex-col w-full space-y-1 text-left">
          <label className="text-sm font-medium text-gray-700">Gênero</label>
          <select
            {...register('gender', { required: 'Selecione um gênero' })}
            className="p-2 bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-matcha w-full"
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
          {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
        </div>

        {/* Botões */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-dark-green text-white py-3 rounded-2xl font-semibold hover:bg-matcha transition cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-sm text-green-700 hover:underline cursor-pointer"
        >
          Já tem uma conta? Entrar
        </button>
      </form>
    </div>
  )
}
