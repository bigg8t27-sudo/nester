import { X, GitCompare } from 'lucide-react'
import { getPropertyById } from '@/data/properties'
import { formatPrice } from '@/utils/format'

interface ComparisonBarProps {
  ids:      string[]
  onRemove: (id: string) => void
  onClear:  () => void
}

export default function ComparisonBar({ ids, onRemove, onClear }: ComparisonBarProps) {
  if (ids.length === 0) return null

  const properties = ids.map((id) => getPropertyById(id)).filter(Boolean)

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border shadow-modal
                 animate-slide-down"
      role="region"
      aria-label="Property comparison"
    >
      <div className="section-container py-3">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-thin">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <GitCompare size={16} className="text-accent" />
            <span className="text-sm font-semibold text-text-primary whitespace-nowrap">
              Compare ({ids.length}/3)
            </span>
          </div>

          {/* Selected properties */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {properties.map((p) => {
              if (!p) return null
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-2 bg-surface-secondary rounded-lg px-3 py-2 flex-shrink-0"
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-8 h-8 rounded object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-text-primary line-clamp-1 max-w-[120px]">
                      {p.title}
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      {formatPrice(p.price, p.currency)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(p.id)}
                    aria-label={`Remove ${p.title} from comparison`}
                    className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-border text-text-secondary hover:text-text-primary transition-colors flex-shrink-0"
                  >
                    <X size={11} />
                  </button>
                </div>
              )
            })}

            {/* Empty slots */}
            {Array.from({ length: 3 - ids.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-36 h-12 rounded-lg border-2 border-dashed border-border flex items-center justify-center flex-shrink-0"
              >
                <span className="text-xs text-text-secondary/50">Add property</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <button
              type="button"
              onClick={onClear}
              className="btn-ghost text-xs py-1.5 px-3"
            >
              Clear
            </button>
            <button
              type="button"
              disabled={ids.length < 2}
              className="btn-primary text-xs py-1.5 px-4 disabled:opacity-40 disabled:cursor-not-allowed"
              title={ids.length < 2 ? 'Add at least 2 properties to compare' : 'Compare properties'}
            >
              Compare now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
