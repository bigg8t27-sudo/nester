import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard, Heart, Clock, MessageCircle,
  Calendar, User, Settings, ArrowRight, Search,
} from 'lucide-react'
import DashboardLayout, { type DashboardNavItem } from '@/components/layout/DashboardLayout'
import PropertyCard from '@/components/property/PropertyCard'
import { useFavorites }      from '@/hooks/useFavorites'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { getPropertyById, ALL_PROPERTIES } from '@/data/properties'
import { inquiriesApi } from '@/lib/api/inquiries'
import { viewingsApi } from '@/lib/api/viewings'
import { api } from '@/lib/api/client'
import { useAuth } from '@/lib/auth/AuthProvider'

const NAV: DashboardNavItem[] = [
  { label: 'Overview',         to: '/dashboard',           Icon: LayoutDashboard },
  { label: 'Saved',            to: '/dashboard/saved',     Icon: Heart },
  { label: 'Recently viewed',  to: '/dashboard/recent',    Icon: Clock },
  { label: 'Messages',         to: '/dashboard/messages',  Icon: MessageCircle },
  { label: 'Viewings',         to: '/dashboard/viewings',  Icon: Calendar },
  { label: 'Profile',          to: '/dashboard/profile',   Icon: User },
  { label: 'Settings',         to: '/dashboard/settings',  Icon: Settings },
]

export default function Dashboard() {
  return (
    <DashboardLayout title="My dashboard" subtitle="Account" navItems={NAV}>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="saved"    element={<DashboardSaved />} />
        <Route path="recent"   element={<DashboardRecent />} />
        <Route path="messages" element={<DashboardMessages />} />
        <Route path="viewings" element={<DashboardViewings />} />
        <Route path="profile"  element={<DashboardProfile />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="*"        element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  )
}

// ── Overview ──────────────────────────────────────────────────────────────────
function DashboardOverview() {
  const { favoriteIds }  = useFavorites()
  const { ids: recentIds } = useRecentlyViewed()

  const cards = [
    { Icon: Heart,         label: 'Saved properties',   value: favoriteIds.length, to: '/dashboard/saved',    color: 'text-red-500' },
    { Icon: Clock,         label: 'Recently viewed',    value: recentIds.length,   to: '/dashboard/recent',   color: 'text-blue-500' },
    { Icon: MessageCircle, label: 'Active inquiries',   value: 0,                  to: '/dashboard/messages', color: 'text-accent' },
    { Icon: Calendar,      label: 'Scheduled viewings', value: 0,                  to: '/dashboard/viewings', color: 'text-emerald-500' },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ Icon, label, value, to, color }) => (
          <Link
            key={label}
            to={to}
            className="bg-white rounded-xl p-5 border border-border shadow-subtle hover:shadow-card hover:border-accent/30 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-surface-secondary flex items-center justify-center group-hover:bg-accent/8 transition-colors">
                <Icon size={17} className={color} />
              </div>
              <ArrowRight size={14} className="text-text-secondary/30 group-hover:text-accent transition-colors mt-1" />
            </div>
            <p className="text-2xl font-semibold text-text-primary">{value}</p>
            <p className="text-xs text-text-secondary mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/properties" className="btn-primary text-sm py-2 gap-2">
            <Search size={14} /> Browse properties
          </Link>
          <Link to="/sell" className="btn-secondary text-sm py-2">List a property</Link>
          <Link to="/contact" className="btn-ghost text-sm py-2">Get support</Link>
        </div>
      </div>

      {/* Featured picks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-text-primary">Properties you might like</h2>
          <Link to="/properties" className="text-xs text-accent hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_PROPERTIES.filter((p) => p.featured).slice(0, 3).map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Saved ─────────────────────────────────────────────────────────────────────
function DashboardSaved() {
  const { favoriteIds, clearAll } = useFavorites()
  const saved = favoriteIds.map((id) => getPropertyById(id)).filter(Boolean)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-heading-4 font-semibold text-text-primary">Saved properties</h2>
          <p className="text-xs text-text-secondary mt-0.5">{saved.length} propert{saved.length === 1 ? 'y' : 'ies'} saved</p>
        </div>
        {saved.length > 0 && (
          <button type="button" onClick={clearAll} className="text-xs text-text-secondary hover:text-red-500 transition-colors">
            Clear all
          </button>
        )}
      </div>

      {saved.length === 0 ? (
        <EmptyState
          Icon={Heart}
          title="No saved properties yet"
          description="Browse our listings and tap the heart icon to save properties here."
          action={{ label: 'Explore properties', to: '/properties' }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {saved.map((p) => p && <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  )
}

// ── Recently viewed ───────────────────────────────────────────────────────────
function DashboardRecent() {
  const { ids, clear } = useRecentlyViewed()
  const properties = ids.map((id) => getPropertyById(id)).filter(Boolean)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-heading-4 font-semibold text-text-primary">Recently viewed</h2>
          <p className="text-xs text-text-secondary mt-0.5">{properties.length} propert{properties.length === 1 ? 'y' : 'ies'} viewed</p>
        </div>
        {properties.length > 0 && (
          <button type="button" onClick={clear} className="text-xs text-text-secondary hover:text-red-500 transition-colors">
            Clear history
          </button>
        )}
      </div>

      {properties.length === 0 ? (
        <EmptyState
          Icon={Clock}
          title="No recently viewed properties"
          description="Properties you view will appear here so you can easily find them again."
          action={{ label: 'Start browsing', to: '/properties' }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p) => p && <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  )
}

// ── Messages ──────────────────────────────────────────────────────────────────
function DashboardMessages() {
  const [items, setItems] = useState<Awaited<ReturnType<typeof inquiriesApi.list>>>([])
  const [error, setError] = useState('')
  useEffect(() => { void inquiriesApi.list().then(setItems).catch((reason) => setError(reason.message)) }, [])
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-heading-4 font-semibold text-text-primary">Messages</h2>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {items.length ? <div className="divide-y divide-border rounded-xl border border-border bg-white">{items.map((item) => <article key={item.id} className="p-5">
        <div className="flex items-start justify-between gap-3"><Link className="font-medium text-text-primary hover:text-accent" to={`/properties/${item.property.id}`}>{item.property.title}</Link><span className="text-xs capitalize text-text-secondary">{item.status.toLowerCase()}</span></div>
        <p className="mt-2 text-sm text-text-secondary">{item.message}</p><p className="mt-2 text-xs text-text-secondary">Sent {new Date(item.createdAt).toLocaleDateString()}</p>
      </article>)}</div> : !error && <EmptyState
        Icon={MessageCircle}
        title="No messages yet"
        description="When you send a property inquiry, it will appear here."
        action={{ label: 'Browse properties', to: '/properties' }}
      />}
    </div>
  )
}

// ── Viewings ──────────────────────────────────────────────────────────────────
function DashboardViewings() {
  const [items, setItems] = useState<Awaited<ReturnType<typeof viewingsApi.list>>>([])
  const [error, setError] = useState('')
  useEffect(() => { void viewingsApi.list().then(setItems).catch((reason) => setError(reason.message)) }, [])
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-heading-4 font-semibold text-text-primary">Scheduled viewings</h2>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {items.length ? <div className="divide-y divide-border rounded-xl border border-border bg-white">{items.map((item) => <article key={item.id} className="p-5">
        <div className="flex items-start justify-between gap-3"><Link className="font-medium text-text-primary hover:text-accent" to={`/properties/${item.property.id}`}>{item.property.title}</Link><span className="text-xs capitalize text-text-secondary">{item.status.toLowerCase()}</span></div>
        <p className="mt-2 text-sm text-text-secondary">Requested {new Date(item.preferredDate).toLocaleDateString()} at {item.preferredTime}</p>
      </article>)}</div> : !error && <EmptyState
        Icon={Calendar}
        title="No viewings scheduled"
        description="Request a viewing from any property page and it will appear here."
        action={{ label: 'Find a property', to: '/properties' }}
      />}
    </div>
  )
}

// ── Profile ───────────────────────────────────────────────────────────────────
function DashboardProfile() {
  const { user, setUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  async function saveProfile(event: React.FormEvent) {
    event.preventDefault(); setSaving(true); setMessage('')
    try { const result = await api<{ user: NonNullable<typeof user> }>('/users/me', { method: 'PUT', body: JSON.stringify({ name, phone: phone || null }) }); setUser(result.user); setMessage('Profile updated.') }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Could not update profile.') }
    finally { setSaving(false) }
  }
  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <h2 className="text-heading-4 font-semibold text-text-primary">Profile</h2>
      <div className="bg-white rounded-xl border border-border p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-surface-secondary flex items-center justify-center">
            <User size={28} className="text-text-secondary/40" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{user?.name}</p>
            <p className="text-xs text-text-secondary mt-0.5">{user?.email}</p>
          </div>
        </div>
        <div className="divider" />
        <form onSubmit={saveProfile} className="flex flex-col gap-4">
          <label className="text-xs font-medium text-text-secondary">Name<input className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm" value={name} onChange={(event) => setName(event.target.value)} required minLength={2} /></label>
          <label className="text-xs font-medium text-text-secondary">Phone<input className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm" value={phone} onChange={(event) => setPhone(event.target.value)} /></label>
          {message && <p role="status" className="text-sm text-text-secondary">{message}</p>}
          <button disabled={saving} className="btn-primary self-start disabled:opacity-60">{saving ? 'Saving…' : 'Save profile'}</button>
        </form>
      </div>
    </div>
  )
}

// ── Settings ──────────────────────────────────────────────────────────────────
function DashboardSettings() {
  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <h2 className="text-heading-4 font-semibold text-text-primary">Settings</h2>
      <div className="bg-white rounded-xl border border-border p-6">
        <p className="text-sm text-text-secondary">
          Account settings will be available once authentication is connected.
        </p>
      </div>
    </div>
  )
}

// ── Shared empty state ────────────────────────────────────────────────────────
function EmptyState({ Icon, title, description, action }: {
  Icon: React.ElementType
  title: string
  description: string
  action: { label: string; to: string }
}) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-16 bg-white rounded-xl border border-border">
      <div className="w-14 h-14 rounded-2xl bg-surface-secondary flex items-center justify-center">
        <Icon size={24} className="text-text-secondary/40" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-1.5">{title}</h3>
        <p className="text-xs text-text-secondary max-w-xs leading-relaxed">{description}</p>
      </div>
      <Link to={action.to} className="btn-primary text-sm">
        {action.label}
      </Link>
    </div>
  )
}
