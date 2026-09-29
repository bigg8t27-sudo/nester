import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, MessageCircle, Building2, TrendingUp, PlusCircle, ArrowRight } from 'lucide-react'
import { propertiesApi } from '@/lib/api/properties'
import { inquiriesApi } from '@/lib/api/inquiries'
import type { Property } from '@/types'

export default function AgentOverview() {
  const [properties, setProperties] = useState<Property[]>([])
  const [inquiries, setInquiries] = useState<Awaited<ReturnType<typeof inquiriesApi.list>>>([])
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    void Promise.all([propertiesApi.mine(), inquiriesApi.list()])
      .then(([myProperties, myInquiries]) => { if (active) { setProperties(myProperties); setInquiries(myInquiries) } })
      .catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : 'Unable to load agent metrics.') })
    return () => { active = false }
  }, [])

  const inquiriesByProperty = useMemo(() => inquiries.reduce<Record<string, number>>((totals, inquiry) => {
    totals[inquiry.property.id] = (totals[inquiry.property.id] || 0) + 1
    return totals
  }, {}), [inquiries])
  const totalViews = properties.reduce((total, property) => total + (property.views || 0), 0)
  const averageAgeDays = properties.length
    ? Math.round(properties.reduce((sum, property) => sum + (Date.now() - new Date(property.createdAt).getTime()) / 86400000, 0) / properties.length)
    : 0
  const stats = [
    { Icon: Eye, label: 'Total listing views', value: totalViews.toLocaleString(), detail: 'From stored property views' },
    { Icon: MessageCircle, label: 'Total inquiries', value: inquiries.length.toLocaleString(), detail: 'Across your listings' },
    { Icon: Building2, label: 'Total listings', value: properties.length.toLocaleString(), detail: 'Properties you manage' },
    { Icon: TrendingUp, label: 'Average listing age', value: `${averageAgeDays} days`, detail: 'Based on listing creation dates' },
  ]
  const recentProperties = properties.slice(0, 3)

  return (
    <div className="flex flex-col gap-8">
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ Icon, label, value, detail }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-border shadow-subtle">
            <div className="w-9 h-9 rounded-lg bg-surface-secondary flex items-center justify-center mb-3"><Icon size={17} className="text-accent" /></div>
            <p className="text-2xl font-semibold text-text-primary">{value}</p>
            <p className="text-xs text-text-secondary mt-0.5">{label}</p>
            <p className="text-[10px] mt-1.5 font-medium text-text-secondary">{detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">Recent listings</h2>
          <Link to="/agent/properties" className="flex items-center gap-1 text-xs text-accent hover:underline">View all <ArrowRight size={11}/></Link>
        </div>
        {recentProperties.length ? <div className="divide-y divide-border">{recentProperties.map((property) => (
          <div key={property.id} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary line-clamp-1">{property.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">Listed</span>
                <span className="text-[10px] text-text-secondary">{property.views || 0} views · {inquiriesByProperty[property.id] || 0} inquiries</span>
              </div>
            </div>
            <Link to={`/properties/${property.id}`} className="btn-ghost text-xs py-1.5 px-3 flex-shrink-0">View</Link>
          </div>
        ))}</div> : !error && <p className="px-5 py-6 text-sm text-text-secondary">No listings yet.</p>}
      </div>

      <div className="bg-text-primary rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h3 className="text-sm font-semibold text-white mb-1">Add a new listing</h3><p className="text-xs text-white/50">Reach more buyers and renters by adding your next property.</p></div>
        <Link to="/agent/properties/new" className="btn-accent flex items-center gap-2 flex-shrink-0 text-sm"><PlusCircle size={15} /> Add property</Link>
      </div>
    </div>
  )
}
