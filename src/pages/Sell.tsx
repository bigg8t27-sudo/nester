import { Link } from 'react-router-dom'
import { CheckCircle, TrendingUp, Users, ShieldCheck, BarChart2, ArrowRight } from 'lucide-react'
import PropertyForm from '@/components/property/PropertyForm'

const BENEFITS = [
  {
    Icon: Users,
    title: 'Reach qualified buyers',
    description: 'Your listing reaches a growing audience of buyers and renters actively searching in Ghana.',
  },
  {
    Icon: ShieldCheck,
    title: 'Verified listings stand out',
    description: 'NESTA-verified listings receive higher engagement and more serious enquiries.',
  },
  {
    Icon: TrendingUp,
    title: 'Performance insights',
    description: 'Track views, saves, and enquiries from your agent dashboard.',
  },
  {
    Icon: BarChart2,
    title: 'Easy listing management',
    description: 'Update, pause, or remove your listing at any time through your dashboard.',
  },
]

const STEPS = [
  { step: '01', title: 'Create your listing', description: 'Fill out your property details — title, type, location, price, and images.' },
  { step: '02', title: 'Submit for review', description: 'Our team verifies the listing to ensure it meets NESTA quality standards.' },
  { step: '03', title: 'Go live', description: 'Once approved, your property is visible to all users on the platform.' },
  { step: '04', title: 'Manage enquiries', description: 'Receive and respond to buyer and renter enquiries from your dashboard.' },
]

export default function Sell() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-text-primary pt-32 pb-16">
        <div className="section-container">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">List a property</p>
            <h1 className="text-3xl md:text-display-sm font-semibold text-white tracking-tight mb-4">
              List your property<br />with NESTA.
            </h1>
            <p className="text-white/55 leading-relaxed text-sm md:text-base max-w-xl">
              Reach thousands of qualified buyers and renters across Ghana. Our platform makes it
              simple to list, manage, and track your property performance.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Why NESTA</p>
            <h2 className="text-section-heading">Why list with us?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map(({ Icon, title, description }) => (
              <div key={title} className="bg-background rounded-xl p-5 border border-border hover:border-accent/30 hover:shadow-card transition-all duration-200">
                <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center mb-4 shadow-subtle">
                  <Icon size={18} className="text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Process</p>
            <h2 className="text-section-heading">How it works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-accent/10 text-accent-dark text-xs font-bold flex items-center justify-center">
                    {step}
                  </span>
                  <div className="flex-1 h-px bg-border" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-12 bg-white">
        <div className="section-container">
          <div className="bg-text-primary rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Included</p>
              <h2 className="text-xl font-semibold text-white mb-4">What you get with every listing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Listing page with full details',
                  'High-quality image gallery',
                  'Agent contact form',
                  'Viewing request system',
                  'Share and save features',
                  'Enquiry notifications',
                  'Listing performance dashboard',
                  'Verified badge after review',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-accent flex-shrink-0" />
                    <span className="text-xs text-white/65">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 md:w-52 flex-shrink-0">
              <Link to="/register" className="btn-accent w-full text-center py-3">
                Create agent account
              </Link>
              <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors">
                Already have an account? <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Listing Form */}
      <section className="section-padding bg-background" id="submit-listing">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Submit listing</p>
              <h2 className="text-section-heading mb-2">Add your property</h2>
              <p className="text-text-secondary text-sm">
                Fill out the form below. Your listing will be reviewed within 1–2 business days.
              </p>
            </div>
            <PropertyForm mode="sell" />
          </div>
        </div>
      </section>
    </div>
  )
}
