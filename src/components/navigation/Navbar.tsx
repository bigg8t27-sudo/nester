import { useState, useEffect, useRef } from 'react'
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { authApi } from '@/lib/api/auth'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useNavigate } from 'react-router-dom'

interface NavItem {
  label: string
  to: string
  children?: { label: string; to: string }[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Buy',     to: '/properties?type=buy' },
  { label: 'Rent',    to: '/properties?type=rent' },
  { label: 'Sell',    to: '/sell' },
  { label: 'Explore', to: '/properties' },
  { label: 'About',   to: '/about' },
]

export default function Navbar() {
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [scrolled,     setScrolled]     = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  async function logout() {
    try { await authApi.logout(); setUser(null); navigate('/') }
    catch (error) { window.alert(error instanceof Error ? error.message : 'Unable to sign out.') }
  }

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(null)
  }, [pathname])

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDropdownOpen(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled && !mobileOpen

  return (
    <header
      ref={navRef}
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-nav border-b border-border',
      ].join(' ')}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="NESTA home"
          >
            <NestLogo transparent={transparent} />
            <span
              className={[
                'text-lg font-semibold tracking-tight transition-colors duration-300',
                transparent ? 'text-white' : 'text-text-primary',
              ].join(' ')}
            >
              NESTA
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                transparent={transparent}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />
            ))}
          </nav>

          {/* ── Desktop CTAs ── */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? <>
              <Link to={user.role === 'AGENT' ? '/agent/dashboard' : '/dashboard'} className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary">{user.name}</Link>
              <button type="button" onClick={() => void logout()} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Sign out</button>
            </> : <>
            <Link
              to="/login"
              className={[
                'px-4 py-2 text-sm font-medium rounded transition-colors duration-200',
                transparent
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
              ].join(' ')}
            >
              Log in
            </Link>
            </>}
            <Link
              to="/register"
              className={[
                'px-4 py-2 text-sm font-medium rounded transition-all duration-200 active:scale-95',
                transparent
                  ? 'bg-white text-text-primary hover:bg-white/90'
                  : 'bg-text-primary text-white hover:bg-accent',
              ].join(' ')}
            >
              Get started
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className={[
              'lg:hidden flex items-center justify-center w-10 h-10 rounded transition-colors',
              transparent && !mobileOpen
                ? 'text-white hover:bg-white/10'
                : 'text-text-primary hover:bg-surface-hover',
            ].join(' ')}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border animate-slide-down">
          <div className="section-container py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <RouterNavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) => [
                  'px-3 py-3 text-sm font-medium rounded transition-colors',
                  isActive
                    ? 'bg-surface-secondary text-text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
                ].join(' ')}
              >
                {item.label}
              </RouterNavLink>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
              {user ? <>
                <Link to={user.role === 'AGENT' ? '/agent/dashboard' : '/dashboard'} className="btn-secondary w-full text-center">My dashboard</Link>
                <button type="button" onClick={() => void logout()} className="btn-primary w-full">Sign out</button>
              </> : <>
                <Link to="/login"    className="btn-secondary w-full text-center">Log in</Link>
                <Link to="/register" className="btn-primary  w-full text-center">Get started</Link>
              </>}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────

interface DesktopNavItemProps {
  item: NavItem
  transparent: boolean
  dropdownOpen: string | null
  setDropdownOpen: (v: string | null) => void
}

function DesktopNavItem({ item, transparent, dropdownOpen, setDropdownOpen }: DesktopNavItemProps) {
  const baseClass = [
    'px-3 py-2 text-sm font-medium rounded transition-colors duration-200',
    transparent
      ? 'text-white/85 hover:text-white hover:bg-white/10'
      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
  ].join(' ')

  if (item.children) {
    const open = dropdownOpen === item.label
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(open ? null : item.label)}
          className={`${baseClass} flex items-center gap-1`}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {item.label}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (
          <div className="absolute top-full left-0 mt-1.5 w-44 bg-white rounded-lg shadow-modal border border-border py-1 animate-slide-down">
            {item.children.map((child) => (
              <RouterNavLink
                key={child.label}
                to={child.to}
                className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
              >
                {child.label}
              </RouterNavLink>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <RouterNavLink
      to={item.to}
      className={({ isActive }) =>
        isActive && !transparent
          ? 'px-3 py-2 text-sm font-medium rounded text-text-primary bg-surface-secondary'
          : baseClass
      }
    >
      {item.label}
    </RouterNavLink>
  )
}

function NestLogo({ transparent }: { transparent: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="7" fill={transparent ? 'rgba(255,255,255,0.15)' : '#111111'} />
      <path
        d="M7 20V13.5L14 8L21 13.5V20H7Z"
        fill="none"
        stroke="#B89B5E"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 20V16.5H16.5V20"
        fill="none"
        stroke="#B89B5E"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
