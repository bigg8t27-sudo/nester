import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Property } from '@/types'
import PropertyCard from './PropertyCard'
import { getRelatedProperties } from '@/data/properties'

interface RelatedPropertiesProps {
  currentId: string
}

export default function RelatedProperties({ currentId }: RelatedPropertiesProps) {
  const related = getRelatedProperties(currentId, 3)

  if (related.length === 0) return null

  return (
    <section aria-labelledby="related-heading">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">Similar</p>
          <h2 id="related-heading" className="text-heading-3 font-semibold text-text-primary">
            You might also like
          </h2>
        </div>
        <Link
          to="/properties"
          className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-text-secondary
                     hover:text-text-primary transition-colors group"
        >
          View all
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((property: Property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}
