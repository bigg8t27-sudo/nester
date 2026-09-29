interface FormCheckboxGroupProps {
  label:    string
  options:  string[]
  selected: string[]
  onChange: (updated: string[]) => void
  columns?: 2 | 3 | 4
}

export default function FormCheckboxGroup({
  label, options, selected, onChange, columns = 3,
}: FormCheckboxGroupProps) {
  function toggle(opt: string) {
    const next = selected.includes(opt)
      ? selected.filter((s) => s !== opt)
      : [...selected, opt]
    onChange(next)
  }

  const gridCols = { 2: 'grid-cols-2', 3: 'grid-cols-2 sm:grid-cols-3', 4: 'grid-cols-2 sm:grid-cols-4' }[columns]

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">{label}</span>
      <div className={`grid ${gridCols} gap-2`}>
        {options.map((opt) => {
          const checked = selected.includes(opt)
          return (
            <label
              key={opt}
              className={[
                'flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer',
                'transition-all duration-150 text-sm',
                checked
                  ? 'bg-accent/8 border-accent/30 text-accent-dark font-medium'
                  : 'bg-white border-border text-text-secondary hover:border-text-secondary/60 hover:text-text-primary',
              ].join(' ')}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(opt)}
                className="w-3.5 h-3.5 rounded border-border accent-accent cursor-pointer"
                aria-label={opt}
              />
              {opt}
            </label>
          )
        })}
      </div>
    </div>
  )
}
