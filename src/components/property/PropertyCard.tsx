import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Bed, Bath, Car, ShieldCheck, Maximize2 } from 'lucide-react'
import type { Property } from '@/types'
import { formatPrice } from '@/utils/format'
import { useFavorites } from '@/hooks/useFavorites'

interface PropertyCardProps {
  property: Property
  className?: string
}

export default function PropertyCard({ property, className = '' }: PropertyCardProps) {
  const {
    id, title, price, currency, priceLabel, transactionType,
    propertyType, location, images, bedrooms, bathrooms, parking, area, verified,
  } = property

  const { isFavorite, toggle } = useFavorites()
  const [imgError, setImgError] = useState(false)

  const primaryImage = images[0]
  const favorite = isFavorite(id)

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    toggle(id)
  }

  return (
    <Link
      to={`/properties/${id}`}
      className={`card group flex flex-col ${className}`}
      aria-label={`View ${title}`}
    >
      {/* ── Image ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-secondary flex-shrink-0">
        {!imgError && primaryImage ? (
          <img
            src={primaryImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImagePlaceholder />
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={[
            'px-2.5 py-0.5 rounded-full text-xs font-medium',
            transactionType === 'buy'
              ? 'bg-text-primary text-white'
              : 'bg-accent text-white',
          ].join(' ')}>
            {transactionType === 'buy' ? 'For sale' : 'For rent'}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-text-secondary text-xs font-medium capitalize">
            {propertyType}
          </span>
        </div>

        {/* Verified badge */}
        {verified && (
          <div className="absolute top-3 right-10 flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-full">
            <ShieldCheck size={11} className="text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">Verified</span>
          </div>
        )}

        {/* Favorite button */}
        <button
          type="button"
          onClick={handleFavorite}
          aria-label={favorite ? `Remove ${title} from favorites` : `Save ${title} to favorites`}
          aria-pressed={favorite}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white
                     flex items-center justify-center transition-all duration-200 active:scale-90"
        >
          <Heart
            size={15}
            className={favorite ? 'fill-red-500 stroke-red-500' : 'stroke-text-secondary'}
          />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col gap-3 p-4 flex-1">

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-semibold text-text-primary tracking-tight">
            {formatPrice(price, currency)}
          </span>
          {priceLabel && (
            <span className="text-xs text-text-secondary">{priceLabel}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-text-primary line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-text-secondary">
          <MapPin size={13} className="flex-shrink-0 text-accent" aria-hidden="true" />
          <span className="text-xs truncate">
            {location.neighborhood}, {location.city}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" aria-hidden="true" />

        {/* Stats */}
        <div className="flex items-center gap-4">
          <StatItem icon={<Bed size={13} />} value={bedrooms} label="bed" />
          <StatItem icon={<Bath size={13} />} value={bathrooms} label="bath" />
          {parking > 0 && (
            <StatItem icon={<Car size={13} />} value={parking} label="park" />
          )}
          <span className="ml-auto flex items-center gap-1 text-xs text-text-secondary">
            <Maximize2 size={11} />
            {area} m²
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Helper components ──────────────────────────────────────────────────────

function StatItem({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex items-center gap-1 text-text-secondary" aria-label={`${value} ${label}`}>
      <span className="text-accent">{icon}</span>
      <span className="text-xs font-medium text-text-primary">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  )
}

function ImagePlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-surface-secondary gap-2">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="8" fill="#E5E5E5" />
        <path d="M12 28V21L20 14L28 21V28H12Z" stroke="#B89B5E" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <path d="M17 28V24H23V28" stroke="#B89B5E" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      </svg>
      <span className="text-xs text-text-secondary/50">No image</span>
    </div>
  )
}
