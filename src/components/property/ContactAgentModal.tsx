import { useState, useEffect } from 'react'
import { X, Send, CheckCircle } from 'lucide-react'
import type { Agent, Property } from '@/types'

interface ContactAgentModalProps {
  property: Property
  agent:    Agent
  onClose:  () => void
}

interface FormState {
  name:    string
  email:   string
  phone:   string
  message: string
}

interface FormErrors {
  name?:    string
  email?:   string
  message?: string
}

export default function ContactAgentModal({ property, agent, onClose }: ContactAgentModalProps) {
  const [form, setForm]         = useState<FormState>({
    name:    '',
    email:   '',
    phone:   '',
    message: `Hi ${agent.name}, I'm interested in this property and would like to know more about availability and viewing options.`,
  })
  const [errors,    setErrors]    = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function validate(): boolean {
    const errs: FormErrors = {}
    if (!form.name.trim())    errs.name    = 'Name is required.'
    if (!form.email.trim())   errs.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (!form.message.trim()) errs.message = 'Message is required.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Frontend-only: simulate async, no real backend yet
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 600)
  }

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="bg-white rounded-2xl shadow-modal w-full max-w-md mx-4 flex flex-col
                   max-h-[90vh] overflow-y-auto animate-fade-up"
        role="dialog"
        aria-modal="true"
        aria-label="Contact agent"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-heading-4 font-semibold text-text-primary">Contact agent</h2>
            <p className="text-xs text-text-secondary mt-0.5">{agent.name} · {agent.agency}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors"
          >
            <X size={18} className="text-text-secondary" />
          </button>
        </div>

        {submitted ? (
          <SuccessState title="Inquiry sent" message="Your message was delivered to NESTA and is available to the property contact." onClose={onClose} />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 p-6">
            {/* Property context */}
            <div className="bg-surface-secondary rounded-lg px-4 py-3">
              <p className="text-xs text-text-secondary">Regarding:</p>
              <p className="text-sm font-medium text-text-primary line-clamp-1">{property.title}</p>
            </div>

            <Field label="Your name" error={errors.name} required>
              <input type="text" value={form.name} onChange={set('name')}
                className={inputClass(!!errors.name)} placeholder="Kwame Mensah" />
            </Field>

            <Field label="Email address" error={errors.email} required>
              <input type="email" value={form.email} onChange={set('email')}
                className={inputClass(!!errors.email)} placeholder="you@example.com" />
            </Field>

            <Field label="Phone number" error={undefined}>
              <input type="tel" value={form.phone} onChange={set('phone')}
                className={inputClass(false)} placeholder="+233 24 000 0000" />
            </Field>

            <Field label="Message" error={errors.message} required>
              <textarea value={form.message} onChange={set('message')} rows={4}
                className={`${inputClass(!!errors.message)} resize-none`} />
            </Field>

            <p className="text-[10px] text-text-secondary/60">
              This form is frontend-only. No message will be delivered until a backend is connected.
            </p>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60">
              <Send size={15} />
              {loading ? 'Sending…' : 'Send inquiry'}
            </button>
          </form>
        )}
      </div>
    </ModalBackdrop>
  )
}

// ── Shared helpers ────────────────────────────────────────────────────────────

function ModalBackdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {children}
    </div>
  )
}

function Field({ label, error, required, children }: {
  label:    string
  error?:   string
  required?: boolean
  children:  React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-text-secondary">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

function SuccessState({ title, message, onClose }: { title: string; message: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 px-8 py-10">
      <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
        <CheckCircle size={28} className="text-emerald-600" />
      </div>
      <h3 className="text-heading-4 font-semibold">{title}</h3>
      <p className="text-sm text-text-secondary max-w-xs leading-relaxed">{message}</p>
      <button type="button" onClick={onClose} className="btn-primary px-8 mt-2">Done</button>
    </div>
  )
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50
    focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent transition-colors
    ${hasError ? 'border-red-300 bg-red-50/40' : 'border-border bg-white'}`
}
