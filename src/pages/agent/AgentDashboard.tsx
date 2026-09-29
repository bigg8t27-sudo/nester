import { Routes, Route, Navigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, PlusCircle,
  MessageCircle, BarChart2, User, Settings,
} from 'lucide-react'
import DashboardLayout, { type DashboardNavItem } from '@/components/layout/DashboardLayout'
import AgentOverview    from './AgentOverview'
import AgentProperties  from './AgentProperties'
import AgentAddProperty from './AgentAddProperty'

const NAV: DashboardNavItem[] = [
  { label: 'Overview',      to: '/agent/dashboard',              Icon: LayoutDashboard },
  { label: 'My properties', to: '/agent/properties',             Icon: Building2 },
  { label: 'Add property',  to: '/agent/properties/new',         Icon: PlusCircle },
  { label: 'Inquiries',     to: '/agent/dashboard/inquiries',    Icon: MessageCircle },
  { label: 'Analytics',     to: '/agent/dashboard/analytics',    Icon: BarChart2 },
  { label: 'Profile',       to: '/agent/dashboard/profile',      Icon: User },
  { label: 'Settings',      to: '/agent/dashboard/settings',     Icon: Settings },
]

export default function AgentDashboard() {
  return (
    <DashboardLayout title="Agent dashboard" subtitle="Agent portal" badge="Agent" navItems={NAV}>
      <Routes>
        <Route index element={<AgentOverview />} />
        <Route path="inquiries" element={<AgentPlaceholder title="Inquiries" description="Buyer and renter inquiries will appear here once the backend is connected." />} />
        <Route path="analytics" element={<AgentPlaceholder title="Analytics" description="Listing performance data will be available here in a future phase." />} />
        <Route path="profile"   element={<AgentPlaceholder title="Agent profile" description="Manage your agent profile and credentials here." />} />
        <Route path="settings"  element={<AgentPlaceholder title="Settings" description="Account settings will be available once authentication is connected." />} />
        <Route path="*"         element={<Navigate to="/agent/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  )
}

function AgentPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-heading-4 font-semibold text-text-primary">{title}</h2>
      <div className="bg-white rounded-xl border border-border p-8 text-center">
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </div>
  )
}

export { AgentProperties, AgentAddProperty }
