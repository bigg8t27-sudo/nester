import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { SearchFilters, SortOption } from '@/types'
import FilterPanel from './FilterPanel'

interface MobileFilterDrawerProps {
  open:            boolean
  onClose:         () => void
  filters:         SearchFilters
  sort:            SortOption
  activeCount:     number
  resultCount:     number
  onFilter:        (partial: Partial<SearchFilters>) => void
  onSort:          (s: SortOption) => void
  onReset:         () => void
  onToggleAmenity: (amenity: string) => void
}

export default function MobileFilterDrawer({
  open,
  onClose,
  filters,
  sort,
  activeCount,
  resultCount,
  onFilter,
  onSort,
  onReset,
  onToggleAmenity,
}: MobileFilterDrawerProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel — slides up from bottom */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Property filters"
        className="fixed bottom-0 inset-x-0 z-50 bg-background rounded-t-2xl
                   max-h-[90vh] flex flex-col animate-fade-up shadow-modal"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" aria-hidden="true" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">Filters</span>
            {activeCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-white text-[10px] font-semibold">
                {activeCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-hover transition-colors"
          >
            <X size={18} className="text-text-secondary" />
          </button>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {/* Wrap in a container that strips the card shadow of FilterPanel */}
          <div className="[&>aside]:shadow-none [&>aside]:rounded-none [&>aside]:bg-transparent">
            <FilterPanel
              filters={filters}
              sort={sort}
              activeCount={0} /* header already shown above */
              onFilter={onFilter}
              onSort={onSort}
              onReset={onReset}
              onToggleAmenity={onToggleAmenity}
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex-shrink-0 p-4 border-t border-border flex gap-3">
          <button
            type="button"
            onClick={() => { onReset(); onClose() }}
            className="flex-1 btn-secondary text-sm py-3"
          >
            Clear filters
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-primary text-sm py-3"
          >
            {resultCount === 0
              ? 'No results'
              : `View ${resultCount} propert${resultCount === 1 ? 'y' : 'ies'}`}
          </button>
        </div>
      </div>
    </>
  )
}
