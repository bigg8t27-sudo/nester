import { Link } from 'react-router-dom'
import {
  Search, ShieldCheck, Users, TrendingUp,
  MapPin, Eye, MessageCircle, Key, ArrowRight, CheckCircle,
} from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    Icon: ShieldCheck,
    title: 'Verified listings',
    description: 'Every property is reviewed before it goes live. No ghost listings, no misleading information.',
  },
  {
    Icon: Eye,
    title: 'Full transparency',
    description: 'Prices, locations, and property details are shown clearly. No hidden fees or surprises.',
  },
  {
    Icon: Users,
    title: 'Qualified agents',
    description: 'All agents on NESTA are screened and verified before they can list properties.',
  },
  {
    Icon: TrendingUp,
    title: 'Market insight',
    description: 'Access accurate property data to help you make confident decisions.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    Icon: Search,
    title: 'Search and filter',
    description: 'Use our intelligent search to find properties by location, type, price, and amenities.',
  },
  {
    step: '02',
    Icon: Eye,
    title: 'Explore in detail',
    description: 'View high-resolution galleries, full property descriptions, and neighbourhood information.',
  },
  {
    step: '03',
    Icon: MessageCircle,
    title: 'Connect with agents',
    description: 'Reach verified agents directly and schedule viewings at your convenience.',
  },
  {
    step: '04',
    Icon: Key,
    title: 'Secure your property',
    description: 'Complete the process with confidence. Every listing is reviewed and verified.',
  },
]

const SERVICES = [
  {
    label: 'Buy',
    to: '/properties?type=buy',
    description: 'Find your perfect home. Browse hundreds of verified properties for sale across Ghana.',
    color: 'bg-text-primary',
  },
  {
    label: 'Rent',
    to: '/properties?type=rent',
    description: 'Discover quality rental properties. From short stays to long-term tenancies.',
    color: 'bg-accent',
  },
  {
    label: 'Sell',
    to: '/sell',
    description: 'List your property with NESTA and reach thousands of qualified buyers and renters.',
    color: 'bg-surface-secondary',
    dark: false,
  },
  {
    label: 'Explore',
    to: '/properties',
    description: 'Not sure what you are looking for? Browse our full catalogue of properties.',
    color: 'bg-surface-secondary',
    dark: false,
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="bg-background">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-text-primary pt-32 pb-20" aria-labelledby="about-hero-heading">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Our story</p>
            <h1
              id="about-hero-heading"
              className="text-display text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Property discovery,<br />
              <span className="italic font-serif font-normal text-accent-light">built for how you live.</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">
              NESTA is a modern property marketplace built for Ghana and designed to scale across Africa.
              We believe finding a home should be clear, trustworthy, and human — not overwhelming.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────────── */}
      <section className="section-padding bg-white" aria-labelledby="mission-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Mission</p>
              <h2 id="mission-heading" className="text-section-heading mb-5">
                Making property discovery simpler and more trustworthy.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The property market in Ghana can be difficult to navigate — fragmented listings,
                unverified information, and inconsistent pricing make it hard for people to find
                the right home or investment.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                NESTA was built to fix that. We bring together buyers, renters, sellers, and agents
                on a single platform designed around clarity, trust, and ease of use.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Verified listings before they go live',
                  'Transparent pricing with no hidden costs',
                  'Direct access to qualified, professional agents',
                  'Accurate property information in one place',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision card */}
            <div className="bg-background rounded-2xl p-8 border border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Vision</p>
              <h3 className="text-heading-3 font-semibold text-text-primary mb-4">
                The property platform Africa deserves.
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm mb-6">
                We are building NESTA for Ghana first — but the architecture, the product thinking,
                and the values are designed to scale across African markets where property discovery
                faces similar challenges.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '23+',  label: 'Active listings' },
                  { value: '6',    label: 'Verified agents' },
                  { value: '3',    label: 'Cities covered' },
                  { value: '100%', label: 'Reviewed listings' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-white rounded-xl p-4 border border-border text-center">
                    <p className="text-2xl font-semibold text-text-primary mb-1">{value}</p>
                    <p className="text-xs text-text-secondary">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section className="section-padding bg-background" aria-labelledby="how-heading">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Process</p>
            <h2 id="how-heading" className="text-section-heading">How NESTA works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, Icon, title, description }) => (
              <div key={step} className="bg-white rounded-xl p-6 border border-border hover:border-accent/30 hover:shadow-card transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <span className="text-xs font-semibold text-text-secondary/40">{step}</span>
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values / Trust ────────────────────────────────────────────── */}
      <section className="section-padding bg-text-primary" aria-labelledby="values-heading">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">What we stand for</p>
            <h2 id="values-heading" className="text-2xl md:text-heading-1 font-semibold text-white tracking-tight">
              Built on trust
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ Icon, title, description }) => (
              <div key={title} className="bg-white/5 rounded-xl p-6 border border-white/8 hover:bg-white/8 transition-colors duration-200">
                <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-white" aria-labelledby="services-heading">
        <div className="section-container">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">What we offer</p>
            <h2 id="services-heading" className="text-section-heading">One platform. Every need.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(({ label, to, description, color, dark = true }) => (
              <Link
                key={label}
                to={to}
                className={`group flex flex-col gap-3 p-6 rounded-xl ${color} hover:scale-[1.02] transition-transform duration-200`}
              >
                <span className={`text-lg font-semibold ${dark ? 'text-white' : 'text-text-primary'}`}>{label}</span>
                <p className={`text-xs leading-relaxed ${dark ? 'text-white/60' : 'text-text-secondary'}`}>{description}</p>
                <span className={`flex items-center gap-1 text-xs font-medium mt-auto ${dark ? 'text-white/70 group-hover:text-white' : 'text-text-secondary group-hover:text-accent'} transition-colors`}>
                  Learn more <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-background" aria-labelledby="location-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Where we operate</p>
              <h2 id="location-heading" className="text-section-heading mb-5">
                Starting in Ghana, building for Africa.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Our initial focus is on Ghana&apos;s key urban markets — Accra, Kumasi, and Takoradi —
                where demand for quality property information is highest.
              </p>
              <p className="text-text-secondary leading-relaxed">
                The platform is designed from the ground up to support multiple cities and countries
                as NESTA grows across the continent.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { city: 'Accra', neighborhoods: 'East Legon · Cantonments · Airport Residential · Labone · Osu · Spintex' },
                { city: 'Kumasi', neighborhoods: 'Nhyiaeso · Ayigya · Ahodwo · KNUST Area' },
                { city: 'Takoradi', neighborhoods: 'Beachfront · Effia · Harbour Area' },
              ].map(({ city, neighborhoods }) => (
                <div key={city} className="bg-white rounded-xl p-4 border border-border flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{city}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{neighborhoods}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="bg-text-primary rounded-2xl px-8 py-14 md:px-16 text-center relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-accent/10 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Get started</p>
              <h2 className="text-2xl md:text-heading-1 font-semibold text-white mb-4 tracking-tight">
                Ready to find your next place?
              </h2>
              <p className="text-white/55 max-w-md mx-auto text-sm mb-8">
                Browse our growing catalogue of verified properties or list your own.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/properties" className="btn-accent px-8 py-3 text-sm">
                  Explore properties
                </Link>
                <Link to="/sell" className="px-8 py-3 text-sm font-medium rounded bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors">
                  List a property
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
