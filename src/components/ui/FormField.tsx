import type { InputHTMLAttributes, ReactNode } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label:      string
  error?:     string
  hint?:      string
  required?:  boolean
  id:         string
  icon?:      ReactNode
}

export default function FormField({
  label, error, hint, required, id, icon, className = '', ...props
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/50 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          {...props}
          className={[
            'w-full rounded-lg border px-3.5 py-3 text-sm text-text-primary bg-white',
            'placeholder:text-text-secondary/40',
            'focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent',
            'transition-colors duration-200',
            icon ? 'pl-10' : '',
            error ? 'border-red-300 bg-red-50/30' : 'border-border hover:border-text-secondary/40',
            className,
          ].join(' ')}
        />
      </div>
      {hint  && !error && <p className="text-xs text-text-secondary/60">{hint}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}
