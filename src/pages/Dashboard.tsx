import { Routes, Route, Link, Navigate } from 'react-router-dom'
import {
  LayoutDashboard, Heart, Clock, MessageCircle,
  Calendar, User, Settings, ArrowRight, Search,
} from 'lucide-react'
import DashboardLayout, { type DashboardNavItem } from '@/components/layout/DashboardLayout'
import PropertyCard from '@/components/property/PropertyCard'
import { useFavorites }      from '@/hooks/useFavorites'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { getPropertyById, ALL_PROPERTIES } from '@/data/properties'

// ── Nav ───────────────────────────────────────────────────────────────────────

const NAV: DashboardNavItem[] = [
  { label: 'Overview',        to: '/dashboard',           Icon: LayoutDashboard },
  { label: 'Saved',           to: '/dashboard/saved',     Icon: Heart },
  { label: 'Recently viewed', to: '/dashboard/recent',    Icon: Clock },
  { label: 'Messages',        to: '/dashboard/messages',  Icon: MessageCircle },
  { label: 'Viewings',        to: '/dashboard/viewings',  Icon: Calendar },
  { label: 'Profile',         to: '/dashboard/profile',   Icon: User },
  { label: 'Settings',        to: '/dashboard/settings',  Icon: Settings },
]

// ── Root ──────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <DashboardLayout title="My dashboard" subtitle="Account" navItems={NAV}>
      <Routes>
        <Route index          element={<DashboardOverview />} />
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
  const { favoriteIds }    = useFavorites()
  const { ids: recentIds } = useRecentlyViewed()

  const cards = [
    { Icon: Heart,         label: 'Saved properties',   value: favoriteIds.length, to: '/dashboard/saved',    color: 'text-red-500'     },
    { Icon: Clock,         label: 'Recently viewed',    value: recentIds.length,   to: '/dashboard/recent',   color: 'text-blue-500'    },
    { Icon: MessageCircle, label: 'Active inquiries',   value: 0,                  to: '/dashboard/messages', color: 'text-accent'      },
    { Icon: Calendar,      label: 'Scheduled viewings', value: 0,                  to: '/dashboard/viewings', color: 'text-emerald-500' },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ Icon, label, value, to, color }) => (
          <Link
            key={label}
            to={to}
            className="bg-white rounded-xl p-5 border border-border shadow-subtle
                       hover:shadow-card hover:border-accent/30 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-surface-secondary flex items-center justify-center
                              group-hover:bg-accent/8 transition-colors">
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
          <Link to="/properties" className="btn-primary text-sm py-2 flex items-center gap-2">
            <Search size={14} /> Browse properties
          </Link>
          <Link to="/sell"    className="btn-secondary text-sm py-2">List a property</Link>
          <Link to="/contact" className="btn-ghost    text-sm py-2">Get support</Link>
        </div>
      </div>

      {/* Suggested properties */}
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
          <p className="text-xs text-text-secondary mt-0.5">
            {saved.length} propert{saved.length === 1 ? 'y' : 'ies'} saved
          </p>
        </div>
        {saved.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-text-secondary hover:text-red-500 transition-colors"
          >
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
          <p className="text-xs text-text-secondary mt-0.5">
            {properties.length} propert{properties.length === 1 ? 'y' : 'ies'} viewed
          </p>
        </div>
        {properties.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="text-xs text-text-secondary hover:text-red-500 transition-colors"
          >
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
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-heading-4 font-semibold text-text-primary">Messages</h2>
      <EmptyState
        Icon={MessageCircle}
        title="No messages yet"
        description="When you contact an agent, your conversations will appear here."
        action={{ label: 'Browse properties', to: '/properties' }}
      />
    </div>
  )
}

// ── Viewings ──────────────────────────────────────────────────────────────────

function DashboardViewings() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-heading-4 font-semibold text-text-primary">Scheduled viewings</h2>
      <EmptyState
        Icon={Calendar}
        title="No viewings scheduled"
        description="Request a viewing from any property page and it will appear here."
        action={{ label: 'Find a property', to: '/properties' }}
      />
    </div>
  )
}

// ── Profile ───────────────────────────────────────────────────────────────────

function DashboardProfile() {
  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <h2 className="text-heading-4 font-semibold text-text-primary">Profile</h2>
      <div className="bg-white rounded-xl border border-border p-6 flex flex-col gap-5">
        {/* Avatar placeholder */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-surface-secondary flex items-center justify-center">
            <User size={28} className="text-text-secondary/40" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Guest user</p>
            <p className="text-xs text-text-secondary mt-0.5">No account connected</p>
          </div>
        </div>

        <div className="h-px bg-border" />

        <p className="text-sm text-text-secondary leading-relaxed">
          Profile management will be available once authentication is connected in a future phase.
        </p>

        <div className="flex gap-3">
          <Link to="/register" className="btn-primary text-sm">Create account</Link>
          <Link to="/login"    className="btn-secondary text-sm">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

// ── Settings ──────────────────────────────────────────────────────────────────

function DashboardSettings() {
  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <h2 className="text-heading-4 font-semibold text-text-primary">Settings</h2>
      <div className="bg-white rounded-xl border border-border p-6 flex flex-col gap-4">
        <p className="text-sm text-text-secondary leading-relaxed">
          Account settings — notifications, privacy, password — will be available once
          authentication is connected in a future phase.
        </p>
        <Link to="/register" className="btn-secondary text-sm self-start">Create account</Link>
      </div>
    </div>
  )
}

// ── Shared empty state ────────────────────────────────────────────────────────

function EmptyState({
  Icon, title, description, action,
}: {
  Icon:        React.ElementType
  title:       string
  description: string
  action:      { label: string; to: string }
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
      <Link to={action.to} className="btn-primary text-sm">{action.label}</Link>
    </div>
  )
}
