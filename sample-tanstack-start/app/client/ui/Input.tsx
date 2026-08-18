import { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-mono font-bold uppercase mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full border-[3px] border-gray-900 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white ${className}`}
        {...props}
      />
    </div>
  )
}
