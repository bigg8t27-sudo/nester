import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import type { SearchFilters, SortOption, PropertyType } from '@/types'
import { PROPERTY_CITIES } from '@/data/properties'

// ── Constants ─────────────────────────────────────────────────────────────────

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'apartment',  label: 'Apartment' },
  { value: 'house',      label: 'House' },
  { value: 'villa',      label: 'Villa' },
  { value: 'townhouse',  label: 'Townhouse' },
  { value: 'land',       label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
]

const BEDROOM_OPTIONS = [
  { value: 1,  label: '1+' },
  { value: 2,  label: '2+' },
  { value: 3,  label: '3+' },
  { value: 4,  label: '4+' },
  { value: 5,  label: '5+' },
]

const BATHROOM_OPTIONS = [
  { value: 1, label: '1+' },
  { value: 2, label: '2+' },
  { value: 3, label: '3+' },
  { value: 4, label: '4+' },
]

export const AMENITY_OPTIONS = [
  'Parking',
  'Swimming Pool',
  'Security',
  'Furnished',
  'Air Conditioning',
  'Generator',
  'Garden',
  'Gym',
]

// ── Props ─────────────────────────────────────────────────────────────────────

interface FilterPanelProps {
  filters:       SearchFilters
  sort:          SortOption
  activeCount:   number
  onFilter:      (partial: Partial<SearchFilters>) => void
  onSort:        (s: SortOption) => void
  onReset:       () => void
  onToggleAmenity: (amenity: string) => void
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function FilterPanel({
  filters,
  activeCount,
  onFilter,
  onReset,
  onToggleAmenity,
}: FilterPanelProps) {
  return (
    <aside
      className="w-full flex flex-col gap-0 bg-white rounded-xl shadow-subtle overflow-hidden"
      aria-label="Property filters"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-primary">Filters</span>
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-white text-[10px] font-semibold">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-text-secondary hover:text-accent transition-colors"
            aria-label="Clear all filters"
          >
            <RotateCcw size={11} />
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-col divide-y divide-border">
        {/* Transaction type */}
        <FilterSection title="Transaction">
          <div className="flex gap-2">
            {(['all', 'buy', 'rent'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onFilter({ transactionType: t })}
                className={[
                  'flex-1 py-2 rounded text-xs font-medium border transition-all duration-150',
                  filters.transactionType === t
                    ? 'bg-text-primary text-white border-text-primary'
                    : 'bg-transparent text-text-secondary border-border hover:border-text-primary hover:text-text-primary',
                ].join(' ')}
              >
                {t === 'all' ? 'All' : t === 'buy' ? 'Buy' : 'Rent'}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Property type */}
        <FilterSection title="Property type">
          <div className="grid grid-cols-2 gap-2">
            {PROPERTY_TYPES.map(({ value, label }) => {
              const active = filters.propertyType === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    onFilter({ propertyType: active ? 'all' : value as PropertyType })
                  }
                  className={[
                    'py-2 px-3 rounded text-xs font-medium border text-left transition-all duration-150',
                    active
                      ? 'bg-accent/10 text-accent-dark border-accent/30'
                      : 'bg-transparent text-text-secondary border-border hover:border-text-secondary hover:text-text-primary',
                  ].join(' ')}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* City */}
        <FilterSection title="City">
          <select
            value={filters.city}
            onChange={(e) => onFilter({ city: e.target.value })}
            className="input-base text-xs"
            aria-label="Filter by city"
          >
            <option value="">All cities</option>
            {PROPERTY_CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </FilterSection>

        {/* Price range */}
        <FilterSection title="Price range (GH₵)">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-text-secondary mb-1 block">Min</label>
              <input
                type="number"
                placeholder="0"
                min={0}
                value={filters.minPrice ?? ''}
                onChange={(e) =>
                  onFilter({ minPrice: e.target.value ? Number(e.target.value) : null })
                }
                className="input-base text-xs"
                aria-label="Minimum price"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-text-secondary mb-1 block">Max</label>
              <input
                type="number"
                placeholder="Any"
                min={0}
                value={filters.maxPrice ?? ''}
                onChange={(e) =>
                  onFilter({ maxPrice: e.target.value ? Number(e.target.value) : null })
                }
                className="input-base text-xs"
                aria-label="Maximum price"
              />
            </div>
          </div>
        </FilterSection>

        {/* Bedrooms */}
        <FilterSection title="Bedrooms">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onFilter({ minBedrooms: null })}
              className={[
                'py-1.5 px-3 rounded text-xs font-medium border transition-all duration-150',
                filters.minBedrooms === null
                  ? 'bg-text-primary text-white border-text-primary'
                  : 'text-text-secondary border-border hover:border-text-secondary hover:text-text-primary',
              ].join(' ')}
            >
              Any
            </button>
            {BEDROOM_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  onFilter({ minBedrooms: filters.minBedrooms === value ? null : value })
                }
                className={[
                  'py-1.5 px-3 rounded text-xs font-medium border transition-all duration-150',
                  filters.minBedrooms === value
                    ? 'bg-text-primary text-white border-text-primary'
                    : 'text-text-secondary border-border hover:border-text-secondary hover:text-text-primary',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Bathrooms */}
        <FilterSection title="Bathrooms">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onFilter({ minBathrooms: null })}
              className={[
                'py-1.5 px-3 rounded text-xs font-medium border transition-all duration-150',
                filters.minBathrooms === null
                  ? 'bg-text-primary text-white border-text-primary'
                  : 'text-text-secondary border-border hover:border-text-secondary hover:text-text-primary',
              ].join(' ')}
            >
              Any
            </button>
            {BATHROOM_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  onFilter({ minBathrooms: filters.minBathrooms === value ? null : value })
                }
                className={[
                  'py-1.5 px-3 rounded text-xs font-medium border transition-all duration-150',
                  filters.minBathrooms === value
                    ? 'bg-text-primary text-white border-text-primary'
                    : 'text-text-secondary border-border hover:border-text-secondary hover:text-text-primary',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection title="Amenities">
          <div className="flex flex-col gap-2">
            {AMENITY_OPTIONS.map((amenity) => {
              const checked = filters.amenities.includes(amenity)
              return (
                <label
                  key={amenity}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleAmenity(amenity)}
                    className="w-4 h-4 rounded border-border text-accent
                               focus:ring-accent/30 focus:ring-2 cursor-pointer"
                    aria-label={amenity}
                  />
                  <span
                    className={[
                      'text-xs transition-colors',
                      checked ? 'text-text-primary font-medium' : 'text-text-secondary group-hover:text-text-primary',
                    ].join(' ')}
                  >
                    {amenity}
                  </span>
                </label>
              )
            })}
          </div>
        </FilterSection>
      </div>
    </aside>
  )
}

// ── Collapsible section wrapper ───────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="px-5 py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full mb-3 group"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary group-hover:text-text-primary transition-colors">
          {title}
        </span>
        {open
          ? <ChevronUp size={13} className="text-text-secondary" />
          : <ChevronDown size={13} className="text-text-secondary" />}
      </button>
      {open && children}
    </div>
  )
}
