import { type HTMLAttributes } from 'react'

interface MessageBoxProps extends HTMLAttributes<HTMLDivElement> {}

export function MessageBox({ className = '', children, ...props }: MessageBoxProps) {
  return (
    <div
      className={`bg-white border-[4px] border-gray-900 rounded p-4 font-mono text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
