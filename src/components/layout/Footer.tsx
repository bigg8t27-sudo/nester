import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react'

const FOOTER_LINKS = {
  Discover: [
    { label: 'Buy property',    to: '/properties?type=buy' },
    { label: 'Rent property',   to: '/properties?type=rent' },
    { label: 'New developments', to: '/properties?tag=new' },
    { label: 'Luxury homes',    to: '/properties?tag=luxury' },
    { label: 'Commercial',      to: '/properties?propertyType=commercial' },
  ],
  Company: [
    { label: 'About NESTA',     to: '/about' },
    { label: 'How it works',    to: '/about#how-it-works' },
    { label: 'Careers',         to: '/careers' },
    { label: 'Press',           to: '/press' },
    { label: 'Contact us',      to: '/contact' },
  ],
  Agents: [
    { label: 'List a property', to: '/sell' },
    { label: 'Agent dashboard', to: '/dashboard' },
    { label: 'Pricing',         to: '/pricing' },
    { label: 'Partner with us', to: '/contact' },
  ],
  Support: [
    { label: 'Help centre',     to: '/help' },
    { label: 'Privacy policy',  to: '/privacy' },
    { label: 'Terms of service', to: '/terms' },
    { label: 'Cookie policy',   to: '/cookies' },
  ],
}

const SOCIAL = [
  { Icon: Twitter,   label: 'Twitter',   href: '#' },
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Linkedin,  label: 'LinkedIn',  href: '#' },
  { Icon: Facebook,  label: 'Facebook',  href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-text-primary text-white" aria-label="Site footer">
      {/* ── Main footer grid ── */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-2 group" aria-label="NESTA home">
              <FooterLogo />
              <span className="text-lg font-semibold tracking-tight">NESTA</span>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              Discover homes, apartments, land and spaces designed around the way you live.
            </p>

            {/* Contact micro-info */}
            <ul className="flex flex-col gap-2.5 mt-1" aria-label="Contact information">
              <li className="flex items-start gap-2 text-xs text-white/45">
                <MapPin size={13} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-white/45">
                <Mail size={13} className="flex-shrink-0 text-accent" />
                <a href="mailto:hello@nesta.com.gh" className="hover:text-white/80 transition-colors">
                  hello@nesta.com.gh
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-white/45">
                <Phone size={13} className="flex-shrink-0 text-accent" />
                <a href="tel:+233302000000" className="hover:text-white/80 transition-colors">
                  +233 30 200 0000
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded flex items-center justify-center bg-white/8 text-white/50
                             hover:bg-accent hover:text-white transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/8">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © {year} NESTA Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-white/25">Built in</span>
            <span className="text-xs text-accent font-medium ml-1">Ghana 🇬🇭</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="rgba(255,255,255,0.08)" />
      <path d="M7 20V13.5L14 8L21 13.5V20H7Z" fill="none" stroke="#B89B5E" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11.5 20V16.5H16.5V20" fill="none" stroke="#B89B5E" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
