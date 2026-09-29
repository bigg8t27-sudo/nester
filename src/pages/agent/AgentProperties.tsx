import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import DashboardLayout, { type DashboardNavItem } from '@/components/layout/DashboardLayout'
import {
  LayoutDashboard, Building2, MessageCircle, BarChart2, User, Settings,
} from 'lucide-react'
import { formatPrice } from '@/utils/format'
import { propertiesApi } from '@/lib/api/properties'
import type { Property } from '@/types'

const NAV: DashboardNavItem[] = [
  { label: 'Overview',      to: '/agent/dashboard',           Icon: LayoutDashboard },
  { label: 'My properties', to: '/agent/properties',          Icon: Building2 },
  { label: 'Add property',  to: '/agent/properties/new',      Icon: PlusCircle },
  { label: 'Inquiries',     to: '/agent/dashboard/inquiries', Icon: MessageCircle },
  { label: 'Analytics',     to: '/agent/dashboard/analytics', Icon: BarChart2 },
  { label: 'Profile',       to: '/agent/dashboard/profile',   Icon: User },
  { label: 'Settings',      to: '/agent/dashboard/settings',  Icon: Settings },
]

const STATUS_STYLES: Record<string, string> = {
  active:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  paused:  'bg-surface-secondary text-text-secondary border-border',
}

export default function AgentProperties() {
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [listings, setListings] = useState<Property[]>([])
  const [error, setError] = useState('')
  useEffect(() => { void propertiesApi.mine().then(setListings).catch((reason) => setError(reason instanceof Error ? reason.message : 'Could not load listings.')) }, [])
  async function deleteListing(id: string) {
    if (!window.confirm('Delete this property listing?')) return
    try { await propertiesApi.delete(id); setListings((items) => items.filter((item) => item.id !== id)) }
    catch (reason) { window.alert(reason instanceof Error ? reason.message : 'Could not delete listing.') }
  }
  const agentListings = listings.map((property) => ({ ...property, status: 'active', inquiries: 0 }))

  return (
    <DashboardLayout title="My properties" subtitle="Agent portal" badge="Agent" navItems={NAV}>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-4 font-semibold text-text-primary">My listings</h2>
            <p className="text-xs text-text-secondary mt-0.5">{agentListings.length} properties managed</p>
          </div>
          <Link to="/agent/properties/new" className="btn-primary flex items-center gap-2 text-sm">
            <PlusCircle size={15} /> Add property
          </Link>
        </div>

        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        {/* Listing table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-secondary/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wide">Property</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wide">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wide">Views</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wide">Inquiries</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {agentListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-surface-secondary/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-12 h-9 rounded-lg object-cover flex-shrink-0 bg-surface-secondary"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text-primary line-clamp-1">{listing.title}</p>
                          <p className="text-xs text-text-secondary mt-0.5">{listing.location.neighborhood}, {listing.location.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-text-primary">
                        {formatPrice(listing.price, listing.currency)}
                      </p>
                      {listing.priceLabel && <p className="text-[10px] text-text-secondary">{listing.priceLabel}</p>}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${STATUS_STYLES[listing.status]}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-text-secondary">{listing.views}</td>
                    <td className="px-4 py-4 text-sm text-text-secondary">{listing.inquiries}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <Link to={`/properties/${listing.id}`} aria-label="View listing"
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors">
                          <Eye size={14} />
                        </Link>
                        <Link to={`/agent/properties/${listing.id}/edit`} aria-label="Edit listing"
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-hover text-text-secondary hover:text-accent transition-colors">
                          <Edit size={14} />
                        </Link>
                        <button type="button" aria-label="Delete listing"
                          onClick={() => void deleteListing(listing.id)}
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-hover text-text-secondary hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="md:hidden divide-y divide-border">
            {agentListings.map((listing) => (
              <div key={listing.id} className="p-4 flex gap-3">
                <img src={listing.images[0]} alt={listing.title}
                  className="w-16 h-14 rounded-lg object-cover flex-shrink-0 bg-surface-secondary"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary line-clamp-1">{listing.title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {formatPrice(listing.price, listing.currency)}{listing.priceLabel ? ' ' + listing.priceLabel : ''}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${STATUS_STYLES[listing.status]}`}>
                      {listing.status}
                    </span>
                    <span className="text-[10px] text-text-secondary">{listing.views} views</span>
                  </div>
                </div>
                <div className="relative flex-shrink-0">
                  <button type="button"
                    onClick={() => setMenuOpen(menuOpen === listing.id ? null : listing.id)}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-hover text-text-secondary transition-colors">
                    <MoreHorizontal size={16}/>
                  </button>
                  {menuOpen === listing.id && (
                    <div className="absolute right-0 top-8 bg-white rounded-lg shadow-modal border border-border py-1 z-10 w-32">
                      <Link to={`/properties/${listing.id}`} className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-surface-hover text-text-secondary">
                        <Eye size={12}/> View
                      </Link>
                      <Link to={`/agent/properties/${listing.id}/edit`} className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-surface-hover text-text-secondary w-full">
                        <Edit size={12}/> Edit
                      </Link>
                      <button type="button" onClick={() => void deleteListing(listing.id)} className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-surface-hover text-red-500 w-full">
                        <Trash2 size={12}/> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
