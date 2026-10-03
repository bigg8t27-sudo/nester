import { Link } from 'react-router-dom'
import { Eye, MessageCircle, Building2, TrendingUp, PlusCircle, ArrowRight } from 'lucide-react'

// Mock stats — replace with real API calls in a future phase
const MOCK_STATS = [
  { Icon: Eye,           label: 'Total listing views',  value: '1,247', detail: '+12% this week' },
  { Icon: MessageCircle, label: 'Total inquiries',      value: '38',    detail: '+5 this week' },
  { Icon: Building2,     label: 'Total listings',       value: '6',     detail: '2 pending review' },
  { Icon: TrendingUp,    label: 'Avg. days on market',  value: '18',    detail: 'Down from 24' },
]

const MOCK_RECENT = [
  { id: 'prop-001', title: 'Modern 3 Bedroom Apartment in East Legon', status: 'active',  views: 142, inquiries: 8 },
  { id: 'prop-005', title: '2 Bedroom Townhouse in Labone',             status: 'active',  views: 89,  inquiries: 4 },
  { id: 'prop-012', title: '2 Bedroom Apartment in East Legon Hills',   status: 'pending', views: 0,   inquiries: 0 },
]

const STATUS_STYLES: Record<string, string> = {
  active:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  paused:  'bg-surface-secondary text-text-secondary border-border',
}

export default function AgentOverview() {
  return (
    <div className="flex flex-col gap-8">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map(({ Icon, label, value, detail }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-border shadow-subtle">
            <div className="w-9 h-9 rounded-lg bg-surface-secondary flex items-center justify-center mb-3">
              <Icon size={17} className="text-accent" />
            </div>
            <p className="text-2xl font-semibold text-text-primary">{value}</p>
            <p className="text-xs text-text-secondary mt-0.5">{label}</p>
            <p className="text-[10px] mt-1.5 font-medium text-emerald-600">{detail}</p>
          </div>
        ))}
      </div>

      {/* Recent listings */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">Recent listings</h2>
          <Link to="/agent/properties" className="flex items-center gap-1 text-xs text-accent hover:underline">
            View all <ArrowRight size={11} />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {MOCK_RECENT.map(({ id, title, status, views, inquiries }) => (
            <div key={id} className="flex items-center gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary line-clamp-1">{title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${STATUS_STYLES[status]}`}>
                    {status}
                  </span>
                  <span className="text-[10px] text-text-secondary">{views} views · {inquiries} inquiries</span>
                </div>
              </div>
              <Link to={`/properties/${id}`} className="btn-ghost text-xs py-1.5 px-3 flex-shrink-0">
                View
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick add */}
      <div className="bg-text-primary rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white mb-1">Add a new listing</h3>
          <p className="text-xs text-white/50">Reach more buyers and renters by adding your next property.</p>
        </div>
        <Link to="/agent/properties/new" className="btn-accent flex items-center gap-2 flex-shrink-0 text-sm">
          <PlusCircle size={15} /> Add property
        </Link>
      </div>
    </div>
  )
}
