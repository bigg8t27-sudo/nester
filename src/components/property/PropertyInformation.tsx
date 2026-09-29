import type { Property } from '@/types'
import { relativeTime } from '@/utils/format'

interface PropertyInformationProps {
  property: Property
}

export default function PropertyInformation({ property }: PropertyInformationProps) {
  const {
    id, propertyType, transactionType, yearBuilt,
    furnished, availability, createdAt, area, verified,
  } = property

  // Only render rows where we actually have data
  const rows: { label: string; value: string }[] = [
    { label: 'Property ID',       value: id.toUpperCase() },
    { label: 'Property type',     value: propertyType.charAt(0).toUpperCase() + propertyType.slice(1) },
    { label: 'Transaction',       value: transactionType === 'buy' ? 'For sale' : 'For rent' },
    { label: 'Total area',        value: `${area.toLocaleString()} m²` },
    ...(yearBuilt  ? [{ label: 'Year built',  value: String(yearBuilt) }]  : []),
    ...(furnished !== undefined ? [{ label: 'Furnishing', value: furnished ? 'Furnished' : 'Unfurnished' }] : []),
    ...(availability ? [{ label: 'Availability', value: availability }]    : []),
    { label: 'Listed',            value: relativeTime(createdAt) },
    { label: 'Verification',      value: verified ? 'Verified listing' : 'Unverified' },
  ]

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <dl>
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={[
              'flex items-center justify-between px-4 py-3 gap-4',
              i < rows.length - 1 ? 'border-b border-border/60' : '',
              i % 2 === 0 ? 'bg-white' : 'bg-surface-secondary/40',
            ].join(' ')}
          >
            <dt className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex-shrink-0">
              {label}
            </dt>
            <dd className="text-sm text-text-primary font-medium text-right">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
