import DashboardLayout, { type DashboardNavItem } from '@/components/layout/DashboardLayout'
import PropertyForm from '@/components/property/PropertyForm'
import {
  LayoutDashboard, Building2, PlusCircle,
  MessageCircle, BarChart2, User, Settings,
} from 'lucide-react'

const NAV: DashboardNavItem[] = [
  { label: 'Overview',      to: '/agent/dashboard',           Icon: LayoutDashboard },
  { label: 'My properties', to: '/agent/properties',          Icon: Building2 },
  { label: 'Add property',  to: '/agent/properties/new',      Icon: PlusCircle },
  { label: 'Inquiries',     to: '/agent/dashboard/inquiries', Icon: MessageCircle },
  { label: 'Analytics',     to: '/agent/dashboard/analytics', Icon: BarChart2 },
  { label: 'Profile',       to: '/agent/dashboard/profile',   Icon: User },
  { label: 'Settings',      to: '/agent/dashboard/settings',  Icon: Settings },
]

export default function AgentAddProperty() {
  return (
    <DashboardLayout title="Add a property" subtitle="Agent portal" badge="Agent" navItems={NAV}>
      <div className="flex flex-col gap-6 max-w-3xl">
        <div>
          <h2 className="text-heading-4 font-semibold text-text-primary mb-1">New listing</h2>
          <p className="text-sm text-text-secondary">
            Fill out the form below to create a new property listing. It will be reviewed before going live.
          </p>
        </div>
        <PropertyForm mode="agent" />
      </div>
    </DashboardLayout>
  )
}
