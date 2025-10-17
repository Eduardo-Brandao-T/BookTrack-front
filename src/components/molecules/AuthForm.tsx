import type { ReactNode } from 'react'

interface AuthFormProps {
  title: string
  logo?: string
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
  submitText: string
}

export default function AuthForm({
  title,
  logo,
  children,
  onSubmit,
  submitText
}: AuthFormProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cream">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center text-center space-y-4 w-[70%] max-w-md bg-white rounded-2xl p-6 shadow-md"
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-center space-x-2">
          {logo && <img src={logo} alt="Logo" className="w-8 sm:w-10 object-contain" />}
          <h1 className="text-2xl sm:text-3xl font-semibold text-brown">{title}</h1>
        </div>

        {/* Campos dinâmicos */}
        {children}

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-dark-green text-white py-3 rounded-2xl font-semibold hover:bg-matcha transition cursor-pointer"
        >
          {submitText}
        </button>
      </form>
    </div>
  )
}
