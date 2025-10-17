import RegisterForm from './RegisterForm'

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full py-2">
      <div className="flex flex-col items-center justify-center w-full max-w-sm space-y-6">
        <RegisterForm />
      </div>
    </div>
  )
}
