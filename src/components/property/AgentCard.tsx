import { ShieldCheck, Phone, Mail, ListChecks } from 'lucide-react'
import type { Agent } from '@/types'

interface AgentCardProps {
  agent:           Agent
  onContact:       () => void
  onSchedule:      () => void
}

export default function AgentCard({ agent, onContact, onSchedule }: AgentCardProps) {
  const { name, photo, agency, verified, listings, phone, email } = agent

  return (
    <div className="bg-white rounded-xl border border-border p-5 flex flex-col gap-5">
      {/* Agent identity */}
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={photo}
            alt={name}
            className="w-14 h-14 rounded-full object-cover bg-surface-secondary"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=B89B5E&color=fff&size=56`
            }}
          />
          {verified && (
            <span
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-emerald-500 rounded-full
                         flex items-center justify-center border-2 border-white"
              title="Verified agent"
            >
              <ShieldCheck size={10} className="text-white" />
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-primary">{name}</h3>
          <p className="text-xs text-text-secondary truncate">{agency}</p>
          <div className="flex items-center gap-1 mt-1">
            {verified && (
              <span className="text-[10px] text-emerald-700 font-medium">Verified agent</span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-1.5 text-xs text-text-secondary border-t border-border pt-4">
        <ListChecks size={13} className="text-accent" />
        <span>{listings} active listings</span>
      </div>

      {/* Contact info */}
      <div className="flex flex-col gap-2">
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 text-xs text-text-secondary hover:text-accent transition-colors"
          aria-label={`Call ${name}`}
        >
          <Phone size={13} className="text-accent flex-shrink-0" />
          <span>{phone}</span>
        </a>
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-xs text-text-secondary hover:text-accent transition-colors"
          aria-label={`Email ${name}`}
        >
          <Mail size={13} className="text-accent flex-shrink-0" />
          <span className="truncate">{email}</span>
        </a>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={onContact}
          className="btn-primary w-full py-2.5 text-sm"
        >
          Contact agent
        </button>
        <button
          type="button"
          onClick={onSchedule}
          className="btn-secondary w-full py-2.5 text-sm"
        >
          Schedule a viewing
        </button>
      </div>
    </div>
  )
}
