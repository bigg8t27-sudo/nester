import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getPropertyById }        from '@/data/properties'
import { propertiesApi } from '@/lib/api/properties'
import type { Property } from '@/types'
import { useFavorites }           from '@/hooks/useFavorites'
import { useRecentlyViewed }      from '@/hooks/useRecentlyViewed'
import { usePropertyComparison }  from '@/hooks/usePropertyComparison'

import PropertyGallery            from '@/components/property/PropertyGallery'
import PropertyHeader             from '@/components/property/PropertyHeader'
import PropertyStats              from '@/components/property/PropertyStats'
import PropertyDescription        from '@/components/property/PropertyDescription'
import PropertyAmenities          from '@/components/property/PropertyAmenities'
import PropertyInformation        from '@/components/property/PropertyInformation'
import LocationSection            from '@/components/property/LocationSection'
import AgentCard                  from '@/components/property/AgentCard'
import RelatedProperties          from '@/components/property/RelatedProperties'
import ComparisonBar              from '@/components/property/ComparisonBar'
import ContactAgentModal          from '@/components/property/ContactAgentModal'
import ScheduleViewingModal       from '@/components/property/ScheduleViewingModal'
import PropertyShare              from '@/components/property/PropertyShare'
import PropertyNotFound           from '@/components/property/PropertyNotFound'
import PropertyDetailsSkeleton    from '@/components/property/PropertyDetailsSkeleton'

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>()

  // UI state
  const [showContact,  setShowContact]  = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [showShare,    setShowShare]    = useState(false)
  const [loading,      setLoading]      = useState(true)
  const [property, setProperty] = useState<Property | undefined>(undefined)

  // Hooks
  const { isFavorite, toggle: toggleFav }   = useFavorites()
  const { trackView }                        = useRecentlyViewed()
  const { ids: compareIds, isInComparison,
          isFull, toggle: toggleCompare,
          remove: removeCompare, clear: clearCompare } = usePropertyComparison()

  useEffect(() => {
    let alive = true
    setLoading(true)
    if (!id) { setProperty(undefined); setLoading(false); return }
    void propertiesApi.get(id).then((item) => { if (alive) setProperty(item) })
      .catch(() => { if (alive) setProperty(getPropertyById(id)) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [id])

  // Track recently viewed
  useEffect(() => {
    if (id) trackView(id)
  }, [id, trackView])

  if (loading) return <PropertyDetailsSkeleton />

  if (!property) return <PropertyNotFound />

  const favorite   = isFavorite(property.id)
  const comparing  = isInComparison(property.id)

  return (
    <>
      <div className="min-h-screen bg-background pb-24">

        {/* ── Page header band ─────────────────────────────────────────── */}
        <div className="bg-text-primary pt-20 pb-0">
          {/* intentionally thin — just provides navbar clearance */}
        </div>

        <div className="section-container py-8">

          {/* ── Two-column layout: main + sidebar ────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

            {/* ── Main column ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* Gallery */}
              <PropertyGallery images={property.images} title={property.title} />

              {/* Header + price + breadcrumb */}
              <PropertyHeader
                property={property}
                isFavorite={favorite}
                isComparing={comparing}
                isFull={isFull}
                onFavorite={() => toggleFav(property.id)}
                onShare={() => setShowShare(true)}
                onCompare={() => toggleCompare(property.id)}
              />

              {/* Stats bar */}
              <PropertyStats property={property} />

              {/* Section: Description */}
              <Section title="Description">
                <PropertyDescription description={property.description} />
              </Section>

              {/* Section: Features & Amenities */}
              <Section title="Features & amenities">
                <PropertyAmenities amenities={property.amenities} />
              </Section>

              {/* Section: Property information */}
              <Section title="Property information">
                <PropertyInformation property={property} />
              </Section>

              {/* Section: Location */}
              <Section title="Location">
                <LocationSection location={property.location} />
              </Section>

              {/* Related properties */}
              <div className="border-t border-border pt-8">
                <RelatedProperties currentId={property.id} />
              </div>
            </div>

            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-5">
              <div className="lg:sticky lg:top-24 flex flex-col gap-5">

                {/* Agent card */}
                <AgentCard
                  agent={property.agent}
                  onContact={() => setShowContact(true)}
                  onSchedule={() => setShowSchedule(true)}
                />

                {/* Mobile-only action row (save + share) */}
                <div className="flex gap-3 lg:hidden">
                  <button
                    type="button"
                    onClick={() => toggleFav(property.id)}
                    aria-label={favorite ? 'Remove from saved properties' : 'Save property'}
                    aria-pressed={favorite}
                    className={[
                      'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all',
                      favorite
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-white border-border text-text-secondary hover:border-accent hover:text-accent',
                    ].join(' ')}
                  >
                    <HeartIcon filled={favorite} />
                    {favorite ? 'Saved' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowShare(true)}
                    aria-label="Share property"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-white text-text-secondary hover:border-text-secondary text-sm font-medium transition-all"
                  >
                    <ShareIcon />
                    Share
                  </button>
                </div>

                {/* Add to compare */}
                <button
                  type="button"
                  onClick={() => toggleCompare(property.id)}
                  disabled={isFull && !comparing}
                  aria-pressed={comparing}
                  className={[
                    'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all',
                    comparing
                      ? 'bg-accent/10 border-accent/30 text-accent-dark'
                      : isFull
                      ? 'opacity-40 cursor-not-allowed border-border text-text-secondary'
                      : 'bg-white border-border text-text-secondary hover:border-accent hover:text-accent',
                  ].join(' ')}
                >
                  <CompareIcon />
                  {comparing ? 'Added to compare' : isFull ? 'Compare list full' : 'Add to compare'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Comparison bar (sticky bottom) ──────────────────────────── */}
      <ComparisonBar
        ids={compareIds}
        onRemove={removeCompare}
        onClear={clearCompare}
      />

      {/* ── Modals ───────────────────────────────────────────────────── */}
      {showContact  && (
        <ContactAgentModal
          property={property}
          agent={property.agent}
          onClose={() => setShowContact(false)}
        />
      )}

      {showSchedule && (
        <ScheduleViewingModal
          property={property}
          onClose={() => setShowSchedule(false)}
        />
      )}

      {showShare && (
        <PropertyShare
          property={property}
          onClose={() => setShowShare(false)}
        />
      )}
    </>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h2
        id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="text-heading-4 font-semibold text-text-primary mb-4"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

// ── Inline icon helpers (avoid extra imports) ─────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}

function CompareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <polyline points="18 8 22 12 18 16"/>
      <polyline points="6 8 2 12 6 16"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
  )
}
