import type { Property } from '@/types'
import PropertyCard from './PropertyCard'
import EmptyState from './EmptyState'

interface PropertyGridProps {
  properties:     Property[]
  onClearFilters: () => void
}

export default function PropertyGrid({ properties, onClearFilters }: PropertyGridProps) {
  if (properties.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
      aria-label={`${properties.length} properties`}
    >
      {properties.map((property, i) => (
        <div
          key={property.id}
          className="animate-fade-up"
          style={{ animationDelay: `${Math.min(i * 40, 320)}ms`, animationFillMode: 'both' }}
        >
          <PropertyCard property={property} className="h-full" />
        </div>
      ))}
    </div>
  )
}
