import { NavLink } from 'react-router-dom'
import { type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface DashboardNavItem {
  label: string
  to:    string
  Icon:  LucideIcon
}

interface DashboardLayoutProps {
  title:    string
  subtitle: string
  navItems: DashboardNavItem[]
  children: ReactNode
  badge?:   string
}

export default function DashboardLayout({
  title, subtitle, navItems, children, badge,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header band */}
      <div className="bg-text-primary">
        <div className="section-container py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{subtitle}</p>
                {badge && (
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-semibold">
                    {badge}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="flex gap-8">
          {/* Sidebar nav */}
          <aside className="hidden md:flex flex-col gap-1 w-48 xl:w-56 flex-shrink-0">
            {navItems.map(({ label, to, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) => [
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-text-primary text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
                ].join(' ')}
              >
                <Icon size={16} className="flex-shrink-0" />
                {label}
              </NavLink>
            ))}
          </aside>

          {/* Mobile nav strip */}
          <div className="md:hidden w-full overflow-x-auto scrollbar-thin mb-4">
            <div className="flex gap-2 pb-1">
              {navItems.map(({ label, to, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) => [
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors',
                    isActive
                      ? 'bg-text-primary text-white'
                      : 'bg-white border border-border text-text-secondary hover:text-text-primary',
                  ].join(' ')}
                >
                  <Icon size={14} />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
