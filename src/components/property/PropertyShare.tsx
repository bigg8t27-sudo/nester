import { useState, useEffect, useRef } from 'react'
import { X, Link2, MessageCircle, Mail, Check } from 'lucide-react'
import type { Property } from '@/types'

interface PropertyShareProps {
  property: Property
  onClose:  () => void
}

export default function PropertyShare({ property, onClose }: PropertyShareProps) {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const url      = window.location.href
  const title    = property.title
  const text     = `Check out this property on NESTA: ${title}`

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
      } catch {
        // user cancelled or error — ignore
      }
    }
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`
  const emailUrl    = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={ref}
        className="bg-white rounded-2xl shadow-modal w-full max-w-sm mx-4 p-6 flex flex-col gap-5 animate-fade-up"
        role="dialog"
        aria-modal="true"
        aria-label="Share property"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-heading-4 font-semibold text-text-primary">Share property</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors"
          >
            <X size={18} className="text-text-secondary" />
          </button>
        </div>

        {/* Property title */}
        <div className="bg-surface-secondary rounded-lg px-4 py-3">
          <p className="text-xs text-text-secondary line-clamp-2 font-medium">{title}</p>
        </div>

        {/* Share options */}
        <div className="flex flex-col gap-2">
          {/* Copy link */}
          <button
            type="button"
            onClick={copyLink}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border
                       hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-surface-secondary group-hover:bg-accent/10 flex items-center justify-center transition-colors">
              {copied ? <Check size={16} className="text-emerald-600" /> : <Link2 size={16} className="text-accent" />}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {copied ? 'Link copied!' : 'Copy link'}
              </p>
              <p className="text-xs text-text-secondary truncate max-w-[220px]">{url}</p>
            </div>
          </button>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border
                       hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-200 group"
            aria-label="Share on WhatsApp"
          >
            <div className="w-9 h-9 rounded-lg bg-surface-secondary group-hover:bg-[#25D366]/10 flex items-center justify-center transition-colors">
              <MessageCircle size={16} className="text-[#25D366]" />
            </div>
            <p className="text-sm font-medium text-text-primary">Share on WhatsApp</p>
          </a>

          {/* Email */}
          <a
            href={emailUrl}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border
                       hover:border-blue-300/40 hover:bg-blue-50/40 transition-all duration-200 group"
            aria-label="Share via email"
          >
            <div className="w-9 h-9 rounded-lg bg-surface-secondary group-hover:bg-blue-50 flex items-center justify-center transition-colors">
              <Mail size={16} className="text-blue-500" />
            </div>
            <p className="text-sm font-medium text-text-primary">Share via email</p>
          </a>

          {/* Native share (mobile) */}
          {hasNativeShare && (
            <button
              type="button"
              onClick={nativeShare}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border
                         hover:bg-surface-hover transition-colors text-sm font-medium text-text-secondary mt-1"
            >
              More options…
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
