import { Link } from 'react-router-dom'
import { MapPin, ShieldCheck, Heart, Share2, GitCompare, ChevronRight } from 'lucide-react'
import type { Property } from '@/types'
import { formatPrice } from '@/utils/format'

interface PropertyHeaderProps {
  property:        Property
  isFavorite:      boolean
  isComparing:     boolean
  isFull:          boolean
  onFavorite:      () => void
  onShare:         () => void
  onCompare:       () => void
}

export default function PropertyHeader({
  property,
  isFavorite,
  isComparing,
  isFull,
  onFavorite,
  onShare,
  onCompare,
}: PropertyHeaderProps) {
  const { title, price, currency, priceLabel, transactionType, propertyType, location, verified } = property

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-xs text-text-secondary flex-wrap">
          <li><Link to="/" className="hover:text-text-primary transition-colors">Home</Link></li>
          <li aria-hidden="true"><ChevronRight size={12} /></li>
          <li><Link to="/properties" className="hover:text-text-primary transition-colors">Properties</Link></li>
          <li aria-hidden="true"><ChevronRight size={12} /></li>
          <li>
            <Link
              to={`/properties?city=${encodeURIComponent(location.city)}`}
              className="hover:text-text-primary transition-colors"
            >
              {location.city}
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight size={12} /></li>
          <li className="text-text-primary font-medium truncate max-w-[180px]">{title}</li>
        </ol>
      </nav>

      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {/* Transaction badge */}
            <span className={[
              'px-2.5 py-0.5 rounded-full text-xs font-semibold',
              transactionType === 'buy'
                ? 'bg-text-primary text-white'
                : 'bg-accent text-white',
            ].join(' ')}>
              {transactionType === 'buy' ? 'For sale' : 'For rent'}
            </span>

            {/* Property type */}
            <span className="px-2.5 py-0.5 rounded-full bg-surface-secondary text-text-secondary text-xs font-medium capitalize">
              {propertyType}
            </span>

            {/* Verified */}
            {verified && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                <ShieldCheck size={11} />
                Verified
              </span>
            )}
          </div>

          <h1 className="text-heading-2 md:text-heading-1 font-semibold text-text-primary tracking-tight leading-tight mb-3">
            {title}
          </h1>

          <div className="flex items-center gap-1.5 text-text-secondary">
            <MapPin size={14} className="text-accent flex-shrink-0" aria-hidden="true" />
            <span className="text-sm">
              {location.address}, {location.neighborhood}, {location.city}, {location.region}
            </span>
          </div>
        </div>

        {/* Action buttons — desktop */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0 pt-1">
          <ActionButton
            onClick={onShare}
            aria-label="Share property"
            title="Share"
          >
            <Share2 size={15} />
            <span className="text-xs">Share</span>
          </ActionButton>

          <ActionButton
            onClick={onCompare}
            aria-label={isComparing ? 'Remove from comparison' : isFull ? 'Comparison list full' : 'Add to comparison'}
            title="Compare"
            active={isComparing}
            disabled={isFull && !isComparing}
          >
            <GitCompare size={15} />
            <span className="text-xs">Compare</span>
          </ActionButton>

          <button
            type="button"
            onClick={onFavorite}
            aria-label={isFavorite ? 'Remove from saved properties' : 'Save property'}
            aria-pressed={isFavorite}
            className={[
              'flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all duration-200 active:scale-95',
              isFavorite
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'bg-white border-border text-text-secondary hover:border-accent hover:text-accent',
            ].join(' ')}
          >
            <Heart size={15} className={isFavorite ? 'fill-red-500 stroke-red-500' : ''} />
            <span className="text-xs font-medium">{isFavorite ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-display-sm font-semibold text-text-primary tracking-tight">
          {formatPrice(price, currency)}
        </span>
        {priceLabel && (
          <span className="text-base text-text-secondary">{priceLabel}</span>
        )}
      </div>
    </div>
  )
}

function ActionButton({
  children,
  active = false,
  disabled = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      {...props}
      className={[
        'flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium',
        'transition-all duration-200 active:scale-95',
        disabled
          ? 'opacity-40 cursor-not-allowed border-border text-text-secondary'
          : active
          ? 'bg-accent/10 border-accent/30 text-accent-dark'
          : 'bg-white border-border text-text-secondary hover:border-text-secondary hover:text-text-primary',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
