import { type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'default' | 'primary' | 'menu'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  active?: boolean
}

const base = 'font-mono font-bold uppercase text-sm rounded transition-colors'

const variants: Record<ButtonVariant, string> = {
  default:
    'bg-white border-[3px] border-gray-900 px-6 py-3 hover:bg-gray-100 active:bg-gray-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400 disabled:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] disabled:cursor-not-allowed',
  primary:
    'bg-red-600 text-white border-[3px] border-red-900 px-6 py-3 hover:bg-red-700 active:bg-red-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400 disabled:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] disabled:cursor-not-allowed',
  menu:
    'text-left px-3 py-1 hover:bg-gray-100 flex items-center gap-2',
}

export function Button({ variant = 'default', active, className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {variant === 'menu' && (
        <span className={`text-xs ${active ? '' : 'opacity-0'}`}>▶</span>
      )}
      {children}
    </button>
  )
}
