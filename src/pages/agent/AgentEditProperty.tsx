import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, LayoutDashboard, Building2, PlusCircle, MessageCircle, BarChart2, User, Settings } from 'lucide-react'
import DashboardLayout, { type DashboardNavItem } from '@/components/layout/DashboardLayout'
import PropertyForm from '@/components/property/PropertyForm'
import { propertiesApi } from '@/lib/api/properties'
import type { Property } from '@/types'

const NAV: DashboardNavItem[] = [
  { label: 'Overview', to: '/agent/dashboard', Icon: LayoutDashboard },
  { label: 'My properties', to: '/agent/properties', Icon: Building2 },
  { label: 'Add property', to: '/agent/properties/new', Icon: PlusCircle },
  { label: 'Inquiries', to: '/agent/dashboard/inquiries', Icon: MessageCircle },
  { label: 'Analytics', to: '/agent/dashboard/analytics', Icon: BarChart2 },
  { label: 'Profile', to: '/agent/dashboard/profile', Icon: User },
  { label: 'Settings', to: '/agent/dashboard/settings', Icon: Settings },
]

export default function AgentEditProperty() {
  const { id = '' } = useParams<{ id: string }>()
  const [property, setProperty] = useState<Property | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    void propertiesApi.get(id).then((item) => { if (active) setProperty(item) })
      .catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : 'Unable to load this property.') })
    return () => { active = false }
  }, [id])

  return (
    <DashboardLayout title="Edit property" subtitle="Agent portal" badge="Agent" navItems={NAV}>
      {error ? <div className="flex flex-col gap-4"><p role="alert" className="text-sm text-red-700">{error}</p><Link to="/agent/properties" className="btn-secondary self-start">Back to properties</Link></div>
        : !property ? <p className="text-sm text-text-secondary">Loading property…</p>
          : <div className="flex flex-col gap-6 max-w-3xl">
            <Link to="/agent/properties" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"><ArrowLeft size={15} /> Back to properties</Link>
            <PropertyForm mode="agent" propertyToEdit={property} />
          </div>}
    </DashboardLayout>
  )
}
