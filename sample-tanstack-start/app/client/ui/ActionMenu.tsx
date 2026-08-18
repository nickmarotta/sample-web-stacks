import { type ReactNode } from 'react'
import { Text } from './Text'

interface ActionMenuProps {
  message: string
  children: ReactNode
}

export function ActionMenu({ message, children }: ActionMenuProps) {
  return (
    <div className="border-t-[4px] border-gray-900 bg-white p-4 font-mono">
      <div className="flex">
        <div className="flex-1 border-r-[3px] border-gray-900 pr-4 flex items-center">
          <Text variant="body" className="font-bold">{message}</Text>
        </div>
        <div className="border-[3px] border-gray-900 rounded p-3 ml-2 grid grid-cols-2 gap-x-6 gap-y-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
          {children}
        </div>
      </div>
    </div>
  )
}
