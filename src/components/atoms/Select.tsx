import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select(props: SelectProps) {
  return (
    <select
      {...props}
      className={`p-2 w-full bg-white rounded-xl border border-gray-300 shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-matcha ${props.className ?? ''}`}
    />
  )
}
