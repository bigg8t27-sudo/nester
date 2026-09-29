import { useState, useEffect } from 'react'
import { X, Calendar, CheckCircle } from 'lucide-react'
import type { Property } from '@/types'
import { viewingsApi } from '@/lib/api/viewings'

interface ScheduleViewingModalProps {
  property: Property
  onClose:  () => void
}

interface FormState {
  name:    string
  email:   string
  phone:   string
  date:    string
  time:    string
  message: string
}

interface FormErrors {
  name?:  string
  email?: string
  date?:  string
  time?:  string
}

// Time slots available for viewings
const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM',
]

// Minimum date = tomorrow
function getMinDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function ScheduleViewingModal({ property, onClose }: ScheduleViewingModalProps) {
  const [form, setForm]         = useState<FormState>({
    name: '', email: '', phone: '', date: '', time: '', message: '',
  })
  const [errors,    setErrors]    = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function validate(): boolean {
    const errs: FormErrors = {}
    if (!form.name.trim())  errs.name  = 'Name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.'
    if (!form.date)         errs.date  = 'Please select a date.'
    if (!form.time)         errs.time  = 'Please select a time.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true); setServerError('')
    try { await viewingsApi.create({ propertyId: property.id, name: form.name, email: form.email, phone: form.phone || undefined, preferredDate: form.date, preferredTime: form.time, message: form.message }); setSubmitted(true) }
    catch (error) { setServerError(error instanceof Error ? error.message : 'Unable to submit viewing request.') }
    finally { setLoading(false) }
  }

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }
  }

  const inputCls = (hasErr: boolean) =>
    `w-full rounded-lg border px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50
     focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent transition-colors
     ${hasErr ? 'border-red-300 bg-red-50/40' : 'border-border bg-white'}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-modal w-full max-w-md mx-4 flex flex-col
                   max-h-[92vh] overflow-y-auto animate-fade-up"
        role="dialog"
        aria-modal="true"
        aria-label="Schedule a viewing"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-accent" />
            <h2 className="text-heading-4 font-semibold text-text-primary">Schedule a viewing</h2>
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
          <div className="flex flex-col items-center text-center gap-4 px-8 py-10">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle size={28} className="text-emerald-600" />
            </div>
            <h3 className="text-heading-4 font-semibold">Viewing request sent</h3>
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              Your request for {form.date} at {form.time} was submitted. The property contact will confirm the appointment.
            </p>
            <button type="button" onClick={onClose} className="btn-primary px-8 mt-2">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 p-6">
            {/* Property context */}
            <div className="bg-surface-secondary rounded-lg px-4 py-3">
              <p className="text-xs text-text-secondary">Scheduling a viewing for:</p>
              <p className="text-sm font-medium text-text-primary line-clamp-1">{property.title}</p>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary">
                Your name<span className="text-accent ml-0.5">*</span>
              </label>
              <input type="text" value={form.name} onChange={set('name')}
                className={inputCls(!!errors.name)} placeholder="Kwame Mensah" />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary">
                Email<span className="text-accent ml-0.5">*</span>
              </label>
              <input type="email" value={form.email} onChange={set('email')}
                className={inputCls(!!errors.email)} placeholder="you@example.com" />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary">Phone (optional)</label>
              <input type="tel" value={form.phone} onChange={set('phone')}
                className={inputCls(false)} placeholder="+233 24 000 0000" />
            </div>

            {/* Date + Time row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text-secondary">
                  Preferred date<span className="text-accent ml-0.5">*</span>
                </label>
                <input type="date" value={form.date} onChange={set('date')}
                  min={getMinDate()}
                  className={inputCls(!!errors.date)} />
                {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text-secondary">
                  Preferred time<span className="text-accent ml-0.5">*</span>
                </label>
                <select value={form.time} onChange={set('time')}
                  className={`${inputCls(!!errors.time)} cursor-pointer`}>
                  <option value="">Select time</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.time && <p className="text-xs text-red-500">{errors.time}</p>}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary">Message (optional)</label>
              <textarea value={form.message} onChange={set('message')} rows={2}
                placeholder="Any specific notes for the viewing…"
                className={`${inputCls(false)} resize-none`} />
            </div>

            {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60">
              <Calendar size={15} />
              {loading ? 'Sending…' : 'Request viewing'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
