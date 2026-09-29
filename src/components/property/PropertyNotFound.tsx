import { Link } from 'react-router-dom'
import { SearchX } from 'lucide-react'

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-surface-secondary flex items-center justify-center">
          <SearchX size={36} className="text-text-secondary/40" aria-hidden="true" />
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-2">
          <h1 className="text-heading-2 font-semibold text-text-primary">Property not found</h1>
          <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
            The property you&apos;re looking for may have been removed, rented, or is no longer available
            on NESTA.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/properties" className="btn-primary">
            Explore properties
          </Link>
          <Link to="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
