import { type InputHTMLAttributes } from 'react'
import { Text } from './Text'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && (
        <Text variant="subheader" as="label" htmlFor={id} className="block mb-1">
          {label}
        </Text>
      )}
      <input
        id={id}
        className={`w-full border-[3px] border-gray-900 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white ${className}`}
        {...props}
      />
    </div>
  )
}
