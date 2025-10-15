import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  loading?: boolean
}

export default function Button({
  variant = 'primary',
  loading = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'py-3 rounded-2xl font-semibold transition cursor-pointer w-full'
  const variants = {
    primary: 'bg-dark-green text-white hover:bg-matcha',
    outline: 'bg-white border border-gray-300 hover:border-dark-green',
  }

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${base} ${variants[variant]} ${className} disabled:opacity-50`}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}
