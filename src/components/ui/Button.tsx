import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface SharedProps {
  variant?:   Variant
  size?:      Size
  className?: string
  icon?:      ReactNode
  iconRight?: ReactNode
}

// Button mode — native <button> element
interface AsButton extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  as?:      'button'
  to?:      never
  children: ReactNode
}

// Link mode — renders as <Link>
interface AsLink extends SharedProps {
  as:       'link'
  to:       string
  children: ReactNode
  type?:    never
}

type Props = AsButton | AsLink

const variantClasses: Record<Variant, string> = {
  primary:   'bg-text-primary text-white hover:bg-accent',
  secondary: 'bg-transparent text-text-primary border border-border hover:border-text-primary hover:bg-surface-hover',
  accent:    'bg-accent text-white hover:bg-accent-dark',
  ghost:     'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3.5 text-sm gap-2',
}

export default function Button(props: Props) {
  const { variant = 'primary', size = 'md', children, className = '', icon, iconRight } = props

  const classes = [
    'inline-flex items-center justify-center font-medium rounded',
    'transition-all duration-200 active:scale-95',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ')

  const content = (
    <>
      {icon      && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </>
  )

  if (props.as === 'link') {
    return <Link to={props.to} className={classes}>{content}</Link>
  }

  // Extract only native button attributes (exclude our custom props)
  const btnRest = Object.fromEntries(
    Object.entries(props).filter(([key]) => !['as', 'to', 'icon', 'iconRight', 'variant', 'size', 'className', 'children'].includes(key)),
  ) as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} {...btnRest}>
      {content}
    </button>
  )
}
