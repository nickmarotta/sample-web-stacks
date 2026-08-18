import { type HTMLAttributes } from 'react'

type CardVariant = 'default' | 'active'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
}

const variants: Record<CardVariant, string> = {
  default: 'border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]',
  active: 'border-red-700 shadow-[4px_4px_0px_0px_rgba(185,28,28,0.6)]',
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  return (
    <div className={`bg-white border-[3px] rounded p-5 font-mono ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}
