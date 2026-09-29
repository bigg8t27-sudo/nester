import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'accent' | 'success' | 'neutral'
  className?: string
}

const variants = {
  default: 'bg-text-primary/10 text-text-primary',
  accent:  'bg-accent/15 text-accent-dark',
  success: 'bg-emerald-50 text-emerald-700',
  neutral: 'bg-surface-secondary text-text-secondary',
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
