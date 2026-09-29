import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, ChevronDown } from 'lucide-react'

const PROPERTY_TYPES = [
  { value: 'all',        label: 'All types' },
  { value: 'apartment',  label: 'Apartment' },
  { value: 'house',      label: 'House' },
  { value: 'villa',      label: 'Villa' },
  { value: 'townhouse',  label: 'Townhouse' },
  { value: 'land',       label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
]

export default function HeroSearch() {
  const navigate = useNavigate()
  const [tab,          setTab]          = useState<'buy' | 'rent'>('buy')
  const [location,     setLocation]     = useState('')
  const [propertyType, setPropertyType] = useState('all')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set('type', tab)
    if (location)     params.set('city', location)
    if (propertyType !== 'all') params.set('propertyType', propertyType)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Buy / Rent tabs */}
      <div className="flex mb-3">
        {(['buy', 'rent'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={[
              'px-5 py-2 text-sm font-medium rounded-t transition-colors duration-200 capitalize',
              tab === t
                ? 'bg-white text-text-primary'
                : 'bg-white/20 text-white/75 hover:bg-white/30 hover:text-white',
            ].join(' ')}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-xl shadow-modal p-2 flex flex-col sm:flex-row gap-2"
        role="search"
        aria-label="Search properties"
      >
        {/* Location */}
        <label className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors cursor-text">
          <MapPin size={16} className="text-accent flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">Location</span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Accra, East Legon…"
              className="text-sm text-text-primary placeholder:text-text-secondary/50 bg-transparent outline-none w-full"
              aria-label="Location"
            />
          </div>
        </label>

        {/* Divider */}
        <div className="hidden sm:block w-px self-stretch bg-border my-1" aria-hidden="true" />

        {/* Property type */}
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer min-w-[140px]">
          <div className="flex flex-col w-full">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">Type</span>
            <div className="flex items-center justify-between gap-1">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="text-sm text-text-primary bg-transparent outline-none w-full cursor-pointer appearance-none"
                aria-label="Property type"
              >
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt.value} value={pt.value}>{pt.label}</option>
                ))}
              </select>
              <ChevronDown size={13} className="text-text-secondary flex-shrink-0 pointer-events-none" />
            </div>
          </div>
        </label>

        {/* Search button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-text-primary text-white px-5 py-3 rounded-lg
                     text-sm font-medium hover:bg-accent transition-colors duration-200 active:scale-95
                     flex-shrink-0 sm:self-stretch"
          aria-label="Search properties"
        >
          <Search size={16} />
          <span>Search</span>
        </button>
      </form>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-xs text-white/50">Popular:</span>
        {['East Legon', 'Cantonments', 'Airport Residential', 'Labone'].map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => { setLocation(loc) }}
            className="text-xs text-white/70 hover:text-white underline underline-offset-2 decoration-white/30 transition-colors"
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  )
}
