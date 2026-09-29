import Button from '@/components/ui/Button'

export default function CTASection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="cta-heading">
      <div className="section-container">
        <div
          className="relative rounded-2xl overflow-hidden bg-text-primary px-8 py-16 md:px-16 md:py-20
                     flex flex-col md:flex-row items-center justify-between gap-10"
        >
          {/* Decorative accent circle */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/3 pointer-events-none"
            aria-hidden="true"
          />

          {/* Copy */}
          <div className="relative z-10 flex flex-col gap-4 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              For property owners
            </p>
            <h2 id="cta-heading" className="text-2xl md:text-heading-1 font-semibold text-white tracking-tight">
              List your property with NESTA.
            </h2>
            <p className="text-white/55 leading-relaxed text-sm md:text-base">
              Reach thousands of qualified buyers and renters across Ghana. Our platform makes it
              easy to list, manage, and track your property performance.
            </p>
          </div>

          {/* Actions */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Button as="link" to="/register" variant="accent" size="lg">
              List a property
            </Button>
            <Button as="link" to="/about" size="lg"
              className="bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
