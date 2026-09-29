import { Bed, Bath, Car, Maximize2 } from 'lucide-react'
import type { Property } from '@/types'

interface PropertyStatsProps {
  property: Property
}

export default function PropertyStats({ property }: PropertyStatsProps) {
  const { bedrooms, bathrooms, parking, area, propertyType } = property
  const isLand       = propertyType === 'land'
  const isCommercial = propertyType === 'commercial'

  const stats = [
    ...((!isLand && !isCommercial) ? [
      { icon: <Bed  size={20} aria-hidden="true" />, value: bedrooms,  label: bedrooms  === 1 ? 'Bedroom'  : 'Bedrooms'  },
      { icon: <Bath size={20} aria-hidden="true" />, value: bathrooms, label: bathrooms === 1 ? 'Bathroom' : 'Bathrooms' },
    ] : []),
    ...(isCommercial ? [
      { icon: <Bath size={20} aria-hidden="true" />, value: bathrooms, label: bathrooms === 1 ? 'Bathroom' : 'Bathrooms' },
    ] : []),
    ...(parking > 0 ? [
      { icon: <Car size={20} aria-hidden="true" />, value: parking, label: parking === 1 ? 'Parking space' : 'Parking spaces' },
    ] : []),
    { icon: <Maximize2 size={20} aria-hidden="true" />, value: `${area.toLocaleString()} m²`, label: 'Total area', isString: true },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map(({ icon, value, label, isString }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-subtle
                     border border-border/60 hover:border-accent/30 transition-colors duration-200"
          aria-label={`${value} ${label}`}
        >
          <span className="text-accent">{icon}</span>
          <span className="text-xl font-semibold text-text-primary tracking-tight">
            {isString ? value : value}
          </span>
          <span className="text-xs text-text-secondary text-center">{label}</span>
        </div>
      ))}
    </div>
  )
}
