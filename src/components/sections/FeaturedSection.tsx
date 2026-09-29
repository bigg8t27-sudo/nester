import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PropertyCard from '@/components/property/PropertyCard'
import { FEATURED_PROPERTIES } from '@/data/properties'

export default function FeaturedSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="featured-heading">
      <div className="section-container">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Handpicked</p>
            <h2 id="featured-heading" className="text-section-heading">
              Featured properties
            </h2>
            <p className="text-text-secondary text-sm mt-2 max-w-md">
              A curated selection of our most sought-after listings across Accra and beyond.
            </p>
          </div>
          <Link
            to="/properties"
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group flex-shrink-0"
          >
            See all listings
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Property grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROPERTIES.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
