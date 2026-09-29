import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, LayoutGrid, List, MapPin, Bed, Bath, Car, Maximize2, Heart, ShieldCheck } from 'lucide-react'

import { usePropertyFilters } from '@/hooks/usePropertyFilters'
import type { SearchFilters, SortOption, PropertyType, TransactionType, Property } from '@/types'
import { formatPrice } from '@/utils/format'
import { useFavorites } from '@/hooks/useFavorites'
import { ALL_PROPERTIES } from '@/data/properties'

import FilterPanel         from '@/components/search/FilterPanel'
import MobileFilterDrawer  from '@/components/search/MobileFilterDrawer'
import PropertiesSearchBar from '@/components/search/PropertiesSearchBar'
import SortSelect          from '@/components/search/SortSelect'
import ResultCount         from '@/components/search/ResultCount'
import PropertyGrid        from '@/components/property/PropertyGrid'
import EmptyState          from '@/components/property/EmptyState'

// ── URL param helpers ─────────────────────────────────────────────────────────

const VALID_SORTS: SortOption[] = ['newest', 'price-asc', 'price-desc', 'area-asc', 'area-desc']
const VALID_TYPES: PropertyType[] = ['apartment', 'house', 'villa', 'townhouse', 'land', 'commercial']

/** Read initial filters AND sort from URL search params */
function filtersFromParams(params: URLSearchParams): {
  filters: Partial<SearchFilters>
  sort:    SortOption
} {
  const filters: Partial<SearchFilters> = {}

  const type = params.get('type')
  if (type === 'buy' || type === 'rent') {
    filters.transactionType = type as TransactionType
  }

  const propertyType = params.get('propertyType')
  if (propertyType && VALID_TYPES.includes(propertyType as PropertyType)) {
    filters.propertyType = propertyType as PropertyType
  }

  const city = params.get('city')
  if (city) filters.city = city

  const q = params.get('q')
  if (q) filters.query = q

  const minPrice = params.get('minPrice')
  if (minPrice) filters.minPrice = Number(minPrice)

  const maxPrice = params.get('maxPrice')
  if (maxPrice) filters.maxPrice = Number(maxPrice)

  const beds = params.get('beds')
  if (beds) filters.minBedrooms = Number(beds)

  const baths = params.get('baths')
  if (baths) filters.minBathrooms = Number(baths)

  // Also read sort from URL
  const sortParam = params.get('sort')
  const sort: SortOption = (sortParam && VALID_SORTS.includes(sortParam as SortOption))
    ? (sortParam as SortOption)
    : 'newest'

  return { filters, sort }
}

/** Write current filters + sort back to URL */
function filtersToParams(filters: SearchFilters, sort: SortOption): URLSearchParams {
  const p = new URLSearchParams()
  if (filters.transactionType !== 'all')  p.set('type',         filters.transactionType)
  if (filters.propertyType    !== 'all')  p.set('propertyType', filters.propertyType)
  if (filters.city)                       p.set('city',         filters.city)
  if (filters.query)                      p.set('q',            filters.query)
  if (filters.minPrice  !== null)         p.set('minPrice',     String(filters.minPrice))
  if (filters.maxPrice  !== null)         p.set('maxPrice',     String(filters.maxPrice))
  if (filters.minBedrooms !== null)       p.set('beds',         String(filters.minBedrooms))
  if (filters.minBathrooms !== null)      p.set('baths',        String(filters.minBathrooms))
  if (sort !== 'newest')                  p.set('sort',         sort)
  return p
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [drawerOpen, setDrawerOpen]     = useState(false)
  const [viewMode,   setViewMode]       = useState<'grid' | 'list'>('grid')

  // Parse URL once on first render
  const { filters: initialFilters, sort: initialSort } = filtersFromParams(searchParams)

  const {
    filters, sort, results, total, activeCount,
    setFilters, setSort, resetFilters, toggleAmenity,
  } = usePropertyFilters(initialFilters, initialSort)

  // Sync filter/sort changes back to URL
  useEffect(() => {
    const next = filtersToParams(filters, sort)
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true })
    }
  // searchParams intentionally omitted — we only want to write, not re-read
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort])

  const handleReset = useCallback(() => {
    resetFilters()
    setSearchParams({}, { replace: true })
  }, [resetFilters, setSearchParams])

  return (
    <div className="min-h-screen bg-background">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="bg-text-primary pt-20 pb-10">
        <div className="section-container">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
            Listings
          </p>
          <h1 className="text-2xl md:text-heading-1 font-semibold text-white tracking-tight mb-6">
            Browse properties
          </h1>
          <PropertiesSearchBar
            value={filters.query}
            onChange={(q) => setFilters({ query: q })}
          />
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="section-container py-8">
        <div className="flex gap-7">

          {/* Sidebar — desktop only */}
          <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                sort={sort}
                activeCount={activeCount}
                onFilter={setFilters}
                onSort={setSort}
                onReset={handleReset}
                onToggleAmenity={toggleAmenity}
              />
            </div>
          </div>

          {/* Results column */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* Toolbar row */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <ResultCount count={total} total={ALL_PROPERTIES.length} />

              <div className="flex items-center gap-3 ml-auto">
                {/* Mobile filter button */}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-2 btn-secondary text-sm py-2"
                  aria-label={`Open filters${activeCount > 0 ? ` (${activeCount} active)` : ''}`}
                >
                  <SlidersHorizontal size={15} />
                  Filters
                  {activeCount > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full
                                     bg-accent text-white text-[10px] font-semibold -mr-1">
                      {activeCount}
                    </span>
                  )}
                </button>

                {/* Sort dropdown */}
                <SortSelect value={sort} onChange={setSort} />

                {/* Grid / list toggle */}
                <div className="hidden sm:flex items-center gap-1 bg-white border border-border rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                    aria-pressed={viewMode === 'grid'}
                    className={[
                      'w-7 h-7 flex items-center justify-center rounded transition-colors',
                      viewMode === 'grid'
                        ? 'bg-text-primary text-white'
                        : 'text-text-secondary hover:text-text-primary',
                    ].join(' ')}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    aria-pressed={viewMode === 'list'}
                    className={[
                      'w-7 h-7 flex items-center justify-center rounded transition-colors',
                      viewMode === 'list'
                        ? 'bg-text-primary text-white'
                        : 'text-text-secondary hover:text-text-primary',
                    ].join(' ')}
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeCount > 0 && (
              <ActiveFilterChips
                filters={filters}
                onFilter={setFilters}
                onToggleAmenity={toggleAmenity}
                onReset={handleReset}
              />
            )}

            {/* Grid or list */}
            {viewMode === 'grid' ? (
              <PropertyGrid properties={results} onClearFilters={handleReset} />
            ) : (
              <PropertyListView properties={results} onClearFilters={handleReset} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        sort={sort}
        activeCount={activeCount}
        resultCount={total}
        onFilter={setFilters}
        onSort={setSort}
        onReset={handleReset}
        onToggleAmenity={toggleAmenity}
      />
    </div>
  )
}

// ── Active filter chips ───────────────────────────────────────────────────────

interface ChipProps {
  filters:         SearchFilters
  onFilter:        (p: Partial<SearchFilters>) => void
  onToggleAmenity: (a: string) => void
  onReset:         () => void
}

function ActiveFilterChips({ filters, onFilter, onToggleAmenity, onReset }: ChipProps) {
  const chips: { label: string; onRemove: () => void }[] = []

  if (filters.transactionType !== 'all') {
    chips.push({
      label: filters.transactionType === 'buy' ? 'For sale' : 'For rent',
      onRemove: () => onFilter({ transactionType: 'all' }),
    })
  }
  if (filters.propertyType !== 'all') {
    const label = filters.propertyType.charAt(0).toUpperCase() + filters.propertyType.slice(1)
    chips.push({ label, onRemove: () => onFilter({ propertyType: 'all' }) })
  }
  if (filters.city) {
    chips.push({ label: filters.city, onRemove: () => onFilter({ city: '' }) })
  }
  if (filters.query) {
    chips.push({ label: `"${filters.query}"`, onRemove: () => onFilter({ query: '' }) })
  }
  if (filters.minPrice !== null) {
    chips.push({
      label: `Min GH₵${filters.minPrice.toLocaleString()}`,
      onRemove: () => onFilter({ minPrice: null }),
    })
  }
  if (filters.maxPrice !== null) {
    chips.push({
      label: `Max GH₵${filters.maxPrice.toLocaleString()}`,
      onRemove: () => onFilter({ maxPrice: null }),
    })
  }
  if (filters.minBedrooms !== null) {
    chips.push({
      label: `${filters.minBedrooms}+ beds`,
      onRemove: () => onFilter({ minBedrooms: null }),
    })
  }
  if (filters.minBathrooms !== null) {
    chips.push({
      label: `${filters.minBathrooms}+ baths`,
      onRemove: () => onFilter({ minBathrooms: null }),
    })
  }
  filters.amenities.forEach((a) => {
    chips.push({ label: a, onRemove: () => onToggleAmenity(a) })
  })

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Active filters">
      {chips.map(({ label, onRemove }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                     bg-white border border-border text-xs font-medium text-text-primary
                     shadow-subtle"
        >
          {label}
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${label} filter`}
            className="text-text-secondary hover:text-text-primary transition-colors ml-0.5"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="text-xs text-text-secondary hover:text-accent underline underline-offset-2 transition-colors"
      >
        Clear all
      </button>
    </div>
  )
}

// ── List view ─────────────────────────────────────────────────────────────────

function PropertyListView({
  properties,
  onClearFilters,
}: {
  properties: Property[]
  onClearFilters: () => void
}) {
  if (properties.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />
  }

  return (
    <div className="flex flex-col gap-4" aria-label={`${properties.length} properties`}>
      {properties.map((p, i) => (
        <div
          key={p.id}
          className="animate-fade-up"
          style={{ animationDelay: `${Math.min(i * 30, 240)}ms`, animationFillMode: 'both' }}
        >
          <PropertyListCard property={p} />
        </div>
      ))}
    </div>
  )
}

function PropertyListCard({ property: p }: { property: Property }) {
  const { isFavorite, toggle } = useFavorites()
  const [imgError, setImgError] = useState(false)
  const favorite = isFavorite(p.id)

  return (
    <Link
      to={`/properties/${p.id}`}
      className="group flex gap-0 bg-white rounded-xl overflow-hidden shadow-subtle
                 hover:shadow-card-hover transition-shadow duration-250"
      aria-label={`View ${p.title}`}
    >
      {/* Image */}
      <div className="relative w-48 sm:w-56 md:w-64 flex-shrink-0 overflow-hidden bg-surface-secondary">
        {!imgError && p.images[0] ? (
          <img
            src={p.images[0]}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-secondary min-h-[140px]">
            <span className="text-text-secondary/30 text-xs">No image</span>
          </div>
        )}
        <span className={[
          'absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-xs font-medium',
          p.transactionType === 'buy' ? 'bg-text-primary text-white' : 'bg-accent text-white',
        ].join(' ')}>
          {p.transactionType === 'buy' ? 'For sale' : 'For rent'}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-5 flex flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-medium text-text-secondary capitalize">
                {p.propertyType}
              </span>
              {p.verified && (
                <span className="flex items-center gap-1">
                  <ShieldCheck size={11} className="text-emerald-600" />
                  <span className="text-[10px] text-emerald-700 font-medium">Verified</span>
                </span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug mb-1.5">
              {p.title}
            </h3>
            <div className="flex items-center gap-1 text-text-secondary">
              <MapPin size={12} className="text-accent flex-shrink-0" />
              <span className="text-xs truncate">{p.location.neighborhood}, {p.location.city}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(p.id) }}
            aria-label={favorite ? 'Remove from favorites' : 'Save to favorites'}
            aria-pressed={favorite}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-border
                       hover:border-accent transition-colors flex-shrink-0"
          >
            <Heart size={14} className={favorite ? 'fill-red-500 stroke-red-500' : 'stroke-text-secondary'} />
          </button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 mt-3">
          <div className="flex items-center gap-3 text-text-secondary flex-wrap">
            {p.bedrooms > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <Bed size={12} className="text-accent" />
                {p.bedrooms} bed
              </span>
            )}
            {p.bathrooms > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <Bath size={12} className="text-accent" />
                {p.bathrooms} bath
              </span>
            )}
            {p.parking > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <Car size={12} className="text-accent" />
                {p.parking}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs">
              <Maximize2 size={11} className="text-accent" />
              {p.area} m²
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-semibold text-text-primary tracking-tight">
              {formatPrice(p.price, p.currency)}
            </span>
            {p.priceLabel && (
              <span className="text-xs text-text-secondary">{p.priceLabel}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
