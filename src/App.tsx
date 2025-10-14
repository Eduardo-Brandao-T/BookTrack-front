import './App.css'
import folhaImg from './assets/folha.png'
import livrosImg from './assets/livros.png'

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full x-4">
      {/* Container central ocupando toda a tela */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-xs space-y-4">
        {/* Imagem do topo */}
        <img
          src={folhaImg}
          alt="Folha decorativa"
          className="w-8 sm:w-12 object-contain mt-1"
        />

        {/* Formulário */}
        <div className="flex flex-col items-center text-center space-y-3 w-full">
          <h1 className="text-2xl sm:text-3xl font-semibold text-brown">
            Bem-vindo à sua estante
          </h1>

          <input
            type="email"
            placeholder="E-mail"
            className="p-2 bg-white rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-matcha w-full"
          />
          <input
            type="password"
            placeholder="Senha"
            className="p-2 bg-white rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-matcha w-full"
          />

          <button className="w-full bg-dark-green text-white py-3 rounded-2xl font-semibold hover:bg-matcha transition cursor-pointer">
            Entrar
          </button>

          <button className="text-sm text-green-700 hover:underline cursor-pointer">
            Esqueci minha senha
          </button>

          <div className="text-sm">
            <span>Não tem conta? </span>
            <button className="text-green-700 font-medium hover:underline cursor-pointer">
              Cadastre-se
            </button>
          </div>

          <div className="flex items-center w-full">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">ou entre com</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button className="bg-white border border-gray-300 rounded-2xl py-2 px-4 w-full flex items-center justify-center space-x-2 hover:border-dark-green transition cursor-pointer">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Entrar com Google</span>
          </button>
        </div>

        {/* Imagem inferior */}
        <img
          src={livrosImg}
          alt="Livros decorativos"
          className="w-32 sm:w-40 object-contain mb-1"
        />
      </div>
    </div>
  )
}

export default App
