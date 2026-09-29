import { ArrowUpDown } from 'lucide-react'
import type { SortOption } from '@/types'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest',     label: 'Newest first' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'area-asc',   label: 'Area: Smallest first' },
  { value: 'area-desc',  label: 'Area: Largest first' },
]

interface SortSelectProps {
  value:    SortOption
  onChange: (s: SortOption) => void
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative inline-flex items-center gap-2">
      <ArrowUpDown size={14} className="text-text-secondary flex-shrink-0 pointer-events-none" aria-hidden="true" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        aria-label="Sort properties"
        className="appearance-none bg-white border border-border rounded-lg
                   pl-2 pr-7 py-2 text-sm text-text-primary
                   focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent
                   cursor-pointer transition-colors duration-200 hover:border-text-secondary"
      >
        {SORT_OPTIONS.map(({ value: v, label }) => (
          <option key={v} value={v}>{label}</option>
        ))}
      </select>
      {/* Custom chevron */}
      <svg
        className="absolute right-2 pointer-events-none text-text-secondary"
        width="12" height="12" viewBox="0 0 12 12" fill="none"
        aria-hidden="true"
      >
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}
