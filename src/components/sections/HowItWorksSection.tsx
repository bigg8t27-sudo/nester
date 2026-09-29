import { Search, Eye, MessageCircle, Key } from 'lucide-react'
import Button from '@/components/ui/Button'

const STEPS = [
  {
    step: '01',
    Icon: Search,
    title: 'Search & filter',
    description: 'Use our intelligent search to find properties by location, type, price, and more.',
  },
  {
    step: '02',
    Icon: Eye,
    title: 'Explore in detail',
    description: 'View high-resolution galleries, floor plans, and neighbourhood insights.',
  },
  {
    step: '03',
    Icon: MessageCircle,
    title: 'Connect with agents',
    description: 'Reach verified agents directly. Schedule viewings at your convenience.',
  },
  {
    step: '04',
    Icon: Key,
    title: 'Secure your place',
    description: 'Complete the process with confidence — every listing is reviewed and verified.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="how-it-works-heading">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Process</p>
              <h2 id="how-it-works-heading" className="text-section-heading mb-3">
                How NESTA works
              </h2>
              <p className="text-text-secondary leading-relaxed max-w-md">
                From first search to final handover, we&apos;ve designed every step to be simple, transparent,
                and trustworthy.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button as="link" to="/properties" variant="primary" size="lg">
                Start searching
              </Button>
              <Button as="link" to="/about" variant="secondary" size="lg">
                Learn more
              </Button>
            </div>
          </div>

          {/* Right — steps */}
          <div className="flex flex-col gap-6">
            {STEPS.map(({ step, Icon, title, description }, idx) => (
              <div
                key={step}
                className="flex items-start gap-5 p-5 rounded-xl bg-white shadow-subtle
                           hover:shadow-card transition-shadow duration-300 group"
              >
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-surface-secondary group-hover:bg-accent/10
                                  flex items-center justify-center transition-colors duration-300">
                    <Icon size={18} className="text-accent" aria-hidden="true" />
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1 min-h-[16px]" aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-text-secondary/50">{step}</span>
                    <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
