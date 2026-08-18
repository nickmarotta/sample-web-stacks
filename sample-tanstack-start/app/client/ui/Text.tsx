import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'

type TextVariant =
  | 'pageTitle'
  | 'sectionHeader'
  | 'subheader'
  | 'label'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'error'
  | 'warning'
  | 'link'
  | 'navLink'

type TextProps<T extends ElementType> = {
  variant?: TextVariant
  as?: T
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant' | 'className' | 'children'>

const variants: Record<TextVariant, string> = {
  pageTitle: 'text-2xl font-bold uppercase',
  sectionHeader: 'text-xl font-bold border-b-4 border-gray-900 pb-2',
  subheader: 'text-sm font-bold uppercase',
  label: 'text-xs font-bold uppercase',
  body: 'text-sm',
  bodySmall: 'text-xs',
  caption: 'text-xs text-gray-500',
  error: 'text-sm text-red-700 font-bold',
  warning: 'text-sm text-yellow-700 font-bold',
  link: 'text-sm underline hover:text-gray-600',
  navLink: 'text-sm font-bold uppercase text-gray-600 hover:text-gray-900',
}

const elements: Record<TextVariant, ElementType> = {
  pageTitle: 'h1',
  sectionHeader: 'h2',
  subheader: 'h3',
  label: 'p',
  body: 'p',
  bodySmall: 'p',
  caption: 'p',
  error: 'p',
  warning: 'p',
  link: 'a',
  navLink: 'a',
}

export function Text<T extends ElementType = 'p'>({
  variant = 'body',
  as,
  className = '',
  children,
  ...props
}: TextProps<T>) {
  const Component = (as ?? elements[variant]) as ElementType
  return (
    <Component className={`font-mono ${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  )
}
