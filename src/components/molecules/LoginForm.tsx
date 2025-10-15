import { useState } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'

export default function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      alert('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center text-center space-y-2 w-full">
      <Title>Bem-vindo à sua estante</Title>

      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <Button type="submit" loading={loading}>
        Entrar
      </Button>

      <button type="button" className="text-sm text-green-700 hover:underline cursor-pointer">
        Esqueci minha senha
      </button>

      <div className="text-sm">
        <span>Não tem conta? </span>
        <button type="button" className="text-green-700 font-medium hover:underline cursor-pointer">
          Cadastre-se
        </button>
      </div>

      <div className="flex items-center w-full">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">ou entre com</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <Button type="button" variant="outline" className="flex items-center justify-center space-x-2">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span>Entrar com Google</span>
      </Button>
    </form>
  )
}
