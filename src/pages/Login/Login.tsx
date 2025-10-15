import folhaImg from '@/assets/folha.png'
import livrosImg from '@/assets/livros.png'
import LoginForm from '@/pages/Login/LoginForm'

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full py-2">
      <div className="flex flex-col items-center justify-center w-full max-w-xs space-y-4">
        <img src={folhaImg} alt="Folha decorativa" className="w-8 sm:w-12 object-contain" />
        <LoginForm />
        <img src={livrosImg} alt="Livros decorativos" className="w-32 sm:w-40 object-contain" />
      </div>
    </div>
  )
}
