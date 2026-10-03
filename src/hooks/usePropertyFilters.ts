import { useState, useMemo, useCallback } from 'react'
import type { Property, SearchFilters, SortOption } from '@/types'
import { ALL_PROPERTIES } from '@/data/properties'

// ── Default state ─────────────────────────────────────────────────────────────

export const DEFAULT_FILTERS: SearchFilters = {
  query:           '',
  transactionType: 'all',
  propertyType:    'all',
  city:            '',
  minPrice:        null,
  maxPrice:        null,
  minBedrooms:     null,
  minBathrooms:    null,
  amenities:       [],
}

export const DEFAULT_SORT: SortOption = 'newest'

// ── Filter + sort logic (pure, testable) ──────────────────────────────────────

export function applyFilters(properties: Property[], filters: SearchFilters): Property[] {
  const q = filters.query.trim().toLowerCase()

  return properties.filter((p) => {
    // Text search — title, neighborhood, city, address
    if (q) {
      const haystack = [
        p.title,
        p.location.neighborhood,
        p.location.city,
        p.location.address,
        p.location.region,
      ].join(' ').toLowerCase()
      if (!haystack.includes(q)) return false
    }

    // Transaction type
    if (filters.transactionType !== 'all' && p.transactionType !== filters.transactionType) {
      return false
    }

    // Property type
    if (filters.propertyType !== 'all' && p.propertyType !== filters.propertyType) {
      return false
    }

    // City (case-insensitive exact match on city name)
    if (filters.city && p.location.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false
    }

    // Price range
    if (filters.minPrice !== null && p.price < filters.minPrice) return false
    if (filters.maxPrice !== null && p.price > filters.maxPrice) return false

    // Bedrooms
    if (filters.minBedrooms !== null && p.bedrooms < filters.minBedrooms) return false

    // Bathrooms
    if (filters.minBathrooms !== null && p.bathrooms < filters.minBathrooms) return false

    // Amenities — property must include every selected amenity
    if (filters.amenities.length > 0) {
      const lower = p.amenities.map((a) => a.toLowerCase())
      const allMatch = filters.amenities.every((a) => lower.includes(a.toLowerCase()))
      if (!allMatch) return false
    }

    return true
  })
}

export function applySorting(properties: Property[], sort: SortOption): Property[] {
  const copy = [...properties]
  switch (sort) {
    case 'newest':
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'area-asc':
      return copy.sort((a, b) => a.area - b.area)
    case 'area-desc':
      return copy.sort((a, b) => b.area - a.area)
    default:
      return copy
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export interface UsePropertyFiltersReturn {
  filters:      SearchFilters
  sort:         SortOption
  results:      Property[]
  total:        number
  activeCount:  number   // number of non-default filters active
  setFilters:   (f: Partial<SearchFilters>) => void
  setSort:      (s: SortOption) => void
  resetFilters: () => void
  toggleAmenity:(amenity: string) => void
}

export function usePropertyFilters(
  initialFilters: Partial<SearchFilters> = {},
  initialSort:    SortOption = DEFAULT_SORT,
): UsePropertyFiltersReturn {
  const [filters, setFiltersState] = useState<SearchFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  })
  const [sort, setSort] = useState<SortOption>(initialSort)

  const setFilters = useCallback((partial: Partial<SearchFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }))
  }, [])

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS)
    setSort(DEFAULT_SORT)
  }, [])

  const toggleAmenity = useCallback((amenity: string) => {
    setFiltersState((prev) => {
      const exists = prev.amenities.includes(amenity)
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      }
    })
  }, [])

  // Derived results — only re-computed when filters or sort change
  const results = useMemo(() => {
    const filtered = applyFilters(ALL_PROPERTIES, filters)
    return applySorting(filtered, sort)
  }, [filters, sort])

  // Count how many filters differ from defaults (for badge/indicator)
  const activeCount = useMemo(() => {
    let n = 0
    if (filters.query)                         n++
    if (filters.transactionType !== 'all')     n++
    if (filters.propertyType !== 'all')        n++
    if (filters.city)                          n++
    if (filters.minPrice !== null)             n++
    if (filters.maxPrice !== null)             n++
    if (filters.minBedrooms !== null)          n++
    if (filters.minBathrooms !== null)         n++
    if (filters.amenities.length > 0)          n += filters.amenities.length
    return n
  }, [filters])

  return {
    filters,
    sort,
    results,
    total: results.length,
    activeCount,
    setFilters,
    setSort,
    resetFilters,
    toggleAmenity,
  }
}
