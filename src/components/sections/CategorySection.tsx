import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { CategoryItem } from '@/types'

const CATEGORIES: CategoryItem[] = [
  {
    type: 'apartment',
    label: 'Apartments',
    description: 'Modern city living',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=75&auto=format&fit=crop',
    count: 320,
  },
  {
    type: 'house',
    label: 'Houses',
    description: 'Space for your family',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=75&auto=format&fit=crop',
    count: 215,
  },
  {
    type: 'villa',
    label: 'Villas',
    description: 'Luxury & privacy',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=75&auto=format&fit=crop',
    count: 48,
  },
  {
    type: 'townhouse',
    label: 'Townhouses',
    description: 'Contemporary terraced living',
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&q=75&auto=format&fit=crop',
    count: 92,
  },
  {
    type: 'land',
    label: 'Land',
    description: 'Build your vision',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=75&auto=format&fit=crop',
    count: 174,
  },
  {
    type: 'commercial',
    label: 'Commercial',
    description: 'Offices & retail spaces',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=75&auto=format&fit=crop',
    count: 67,
  },
]

export default function CategorySection() {
  return (
    <section id="explore" className="section-padding bg-background" aria-labelledby="categories-heading">
      <div className="section-container">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Browse</p>
            <h2 id="categories-heading" className="text-section-heading">
              Explore by property type
            </h2>
          </div>
          <Link
            to="/properties"
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group flex-shrink-0"
          >
            View all properties
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.type} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ category }: { category: CategoryItem }) {
  const { type, label, description, image, count } = category

  return (
    <Link
      to={`/properties?propertyType=${type}`}
      className="group relative flex flex-col rounded-xl overflow-hidden aspect-[3/4] img-zoom
                 shadow-subtle hover:shadow-card-hover transition-shadow duration-300"
      aria-label={`Browse ${label}`}
    >
      {/* Image */}
      <img
        src={image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-card-overlay" />

      {/* Content */}
      <div className="relative mt-auto p-4 flex flex-col gap-0.5">
        <span className="text-white font-semibold text-sm leading-tight">{label}</span>
        <span className="text-white/60 text-xs">{description}</span>
        {count !== undefined && (
          <span className="text-accent text-xs mt-1">{count} listings</span>
        )}
      </div>
    </Link>
  )
}
