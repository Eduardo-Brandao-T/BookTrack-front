import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`p-2 bg-white rounded-2xl border border-gray-200 shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-matcha w-full ${props.className ?? ''}`}
    />
  )
}
