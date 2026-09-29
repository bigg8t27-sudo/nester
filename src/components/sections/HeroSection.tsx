import { ArrowDown } from 'lucide-react'
import HeroSearch from '@/components/search/HeroSearch'

// Using a high-quality Unsplash image; structured so the URL can be replaced with a local asset
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80&auto=format&fit=crop'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero — Find your next place"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={HERO_IMAGE}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
        {/* Subtle vignette bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container pt-28 pb-24 md:pt-36 md:pb-32 flex flex-col gap-8">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 animate-fade-in">
          <span className="w-6 h-px bg-accent" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Ghana&apos;s premium property marketplace
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-3xl animate-fade-up" style={{ animationDelay: '80ms' }}>
          <h1 className="text-display text-white mb-4">
            Find your{' '}
            <span className="italic font-serif font-normal text-accent-light">next</span>{' '}
            place.
          </h1>
          <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-xl">
            Discover homes, apartments, land and spaces designed around the way you live.
          </p>
        </div>

        {/* Search widget */}
        <div className="animate-fade-up" style={{ animationDelay: '160ms' }}>
          <HeroSearch />
        </div>

        {/* Stats bar */}
        <div
          className="flex flex-wrap gap-6 mt-2 animate-fade-up"
          style={{ animationDelay: '240ms' }}
          aria-label="Platform statistics"
        >
          {HERO_STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span className="text-2xl font-semibold text-white">{value}</span>
              <span className="text-xs text-white/45 mt-0.5">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#explore"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-1.5 text-white/40 hover:text-white/70
                   transition-colors duration-200 group"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] uppercase tracking-widest">Explore</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}

const HERO_STATS = [
  { value: '1,200+', label: 'Active listings' },
  { value: '340+',   label: 'Verified agents' },
  { value: '12',     label: 'Cities covered' },
  { value: '98%',    label: 'Satisfaction rate' },
]
