import { MapPin, Map } from 'lucide-react'
import type { PropertyLocation } from '@/types'

interface LocationSectionProps {
  location: PropertyLocation
}

export default function LocationSection({ location }: LocationSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Address summary */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-accent flex-shrink-0" aria-hidden="true" />
          <span className="text-sm font-medium text-text-primary">
            {location.address}
          </span>
        </div>
        <p className="text-sm text-text-secondary pl-6">
          {location.neighborhood} · {location.city} · {location.region} · {location.country}
        </p>
      </div>

      {/* Map placeholder — structured for future Google Maps / Mapbox integration */}
      <div
        className="w-full rounded-xl overflow-hidden bg-surface-secondary border border-border
                   flex flex-col items-center justify-center gap-3 aspect-[16/7]"
        aria-label="Property location map"
        role="img"
        /* data-lat and data-lng are available for future map integration */
        data-lat={location.coordinates?.lat}
        data-lng={location.coordinates?.lng}
      >
        <div className="w-12 h-12 rounded-full bg-white shadow-subtle flex items-center justify-center">
          <Map size={22} className="text-accent" aria-hidden="true" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-text-primary">
            {location.neighborhood}, {location.city}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            Interactive map available in a future update
          </p>
          {location.coordinates && (
            <p className="text-[10px] text-text-secondary/50 mt-1 font-mono">
              {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
