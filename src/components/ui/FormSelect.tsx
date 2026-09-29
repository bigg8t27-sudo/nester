import type { SelectHTMLAttributes } from 'react'

interface Option { value: string; label: string }

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label:     string
  options:   Option[]
  error?:    string
  hint?:     string
  required?: boolean
  id:        string
  placeholder?: string
}

export default function FormSelect({
  label, options, error, hint, required, id, placeholder, className = '', ...props
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          {...props}
          className={[
            'w-full appearance-none rounded-lg border px-3.5 py-3 pr-9 text-sm text-text-primary bg-white',
            'focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent',
            'transition-colors duration-200 cursor-pointer',
            error ? 'border-red-300 bg-red-50/30' : 'border-border hover:border-text-secondary/40',
            className,
          ].join(' ')}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(({ value, label: lbl }) => (
            <option key={value} value={value}>{lbl}</option>
          ))}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"
          width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {hint  && !error && <p className="text-xs text-text-secondary/60">{hint}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}
