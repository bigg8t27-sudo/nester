import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  onClearFilters: () => void
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center
                 py-20 px-6 rounded-xl bg-white shadow-subtle"
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-surface-secondary flex items-center justify-center mb-5">
        <SearchX size={28} className="text-text-secondary/50" aria-hidden="true" />
      </div>

      {/* Copy */}
      <h3 className="text-heading-4 font-semibold text-text-primary mb-2">
        No properties found
      </h3>
      <p className="text-sm text-text-secondary max-w-xs leading-relaxed mb-6">
        Try adjusting your search or filters to find what you&apos;re looking for.
      </p>

      {/* CTA */}
      <button
        type="button"
        onClick={onClearFilters}
        className="btn-primary"
      >
        Clear filters
      </button>
    </div>
  )
}
