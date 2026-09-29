import type { Currency, TransactionType, PropertyType } from '@/types'

/**
 * Format a property price with the correct currency symbol.
 */
export function formatPrice(price: number, currency: Currency = 'GHS'): string {
  const symbols: Record<Currency, string> = {
    GHS: 'GH₵',
    USD: '$',
    EUR: '€',
    GBP: '£',
  }
  const symbol = symbols[currency]

  if (price >= 1_000_000) {
    return `${symbol}${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`
  }
  if (price >= 1_000) {
    return `${symbol}${(price / 1_000).toFixed(price % 1_000 === 0 ? 0 : 1)}K`
  }
  return `${symbol}${price.toLocaleString()}`
}

/**
 * Human-readable transaction type labels.
 */
export function transactionLabel(type: TransactionType): string {
  return type === 'buy' ? 'For sale' : 'For rent'
}

/**
 * Human-readable property type labels.
 */
export function propertyTypeLabel(type: PropertyType): string {
  const map: Record<PropertyType, string> = {
    apartment:  'Apartment',
    house:      'House',
    villa:      'Villa',
    townhouse:  'Townhouse',
    land:       'Land',
    commercial: 'Commercial',
  }
  return map[type]
}

/**
 * Format area in square metres with locale-aware number.
 */
export function formatArea(sqm: number): string {
  return `${sqm.toLocaleString()} m²`
}

/**
 * Relative time label (e.g. "3 days ago").
 */
export function relativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7)  return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}
