import type { TextareaHTMLAttributes } from 'react'

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label:     string
  error?:    string
  hint?:     string
  required?: boolean
  id:        string
}

export default function FormTextarea({
  label, error, hint, required, id, className = '', ...props
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <textarea
        id={id}
        {...props}
        className={[
          'w-full rounded-lg border px-3.5 py-3 text-sm text-text-primary bg-white',
          'placeholder:text-text-secondary/40 resize-y min-h-[100px]',
          'focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent',
          'transition-colors duration-200',
          error ? 'border-red-300 bg-red-50/30' : 'border-border hover:border-text-secondary/40',
          className,
        ].join(' ')}
      />
      {hint  && !error && <p className="text-xs text-text-secondary/60">{hint}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}
