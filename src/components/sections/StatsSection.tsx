import { ShieldCheck, Search, Users, TrendingUp } from 'lucide-react'

const STATS = [
  {
    Icon: Search,
    value: '1,200+',
    label: 'Active listings',
    description: 'Properties available across Ghana right now.',
  },
  {
    Icon: Users,
    value: '340+',
    label: 'Verified agents',
    description: 'Professional agents ready to assist you.',
  },
  {
    Icon: ShieldCheck,
    value: '100%',
    label: 'Verified listings',
    description: 'Every listing is reviewed before going live.',
  },
  {
    Icon: TrendingUp,
    value: '12',
    label: 'Cities covered',
    description: 'From Accra to Kumasi and Takoradi.',
  },
]

export default function StatsSection() {
  return (
    <section className="section-padding bg-text-primary" aria-labelledby="stats-heading">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">By the numbers</p>
          <h2 id="stats-heading" className="text-2xl md:text-heading-1 font-semibold text-white tracking-tight">
            Property discovery, reimagined
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STATS.map(({ Icon, value, label, description }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-white/8 flex items-center justify-center
                              group-hover:bg-accent/20 transition-colors duration-300">
                <Icon size={22} className="text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-white tracking-tight">{value}</p>
                <p className="text-sm font-medium text-white/70 mt-0.5">{label}</p>
                <p className="text-xs text-white/35 mt-1.5 leading-relaxed hidden md:block">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
