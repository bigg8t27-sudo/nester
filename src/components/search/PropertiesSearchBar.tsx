import { useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface PropertiesSearchBarProps {
  value:    string
  onChange: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export default function PropertiesSearchBar({
  value,
  onChange,
  placeholder = 'Search by location, address or property type…',
  autoFocus = false,
}: PropertiesSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div className="relative flex items-center">
      <Search
        size={16}
        className="absolute left-3.5 text-text-secondary/60 pointer-events-none flex-shrink-0"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        aria-label="Search properties"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-white
                   text-sm text-text-primary placeholder:text-text-secondary/50
                   focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent
                   transition-colors duration-200"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 w-5 h-5 flex items-center justify-center rounded-full
                     text-text-secondary hover:text-text-primary hover:bg-surface-hover
                     transition-colors duration-150"
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}
