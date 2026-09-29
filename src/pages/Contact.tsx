import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react'
import FormField    from '@/components/ui/FormField'
import FormSelect   from '@/components/ui/FormSelect'
import FormTextarea from '@/components/ui/FormTextarea'

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormState {
  name:    string
  email:   string
  phone:   string
  subject: string
  message: string
}

interface FormErrors {
  name?:    string
  email?:   string
  subject?: string
  message?: string
}

const SUBJECTS = [
  { value: 'general',    label: 'General enquiry' },
  { value: 'listing',    label: 'Listing support' },
  { value: 'technical',  label: 'Technical issue' },
  { value: 'agent',      label: 'Agent registration' },
  { value: 'press',      label: 'Press & media' },
  { value: 'other',      label: 'Other' },
]

const CONTACT_INFO = [
  {
    Icon: MapPin,
    label: 'Office',
    value: 'Accra, Greater Accra, Ghana',
    sub: 'Airport City area',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'hello@nesta.com.gh',
    href: 'mailto:hello@nesta.com.gh',
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+233 30 200 0000',
    href: 'tel:+233302000000',
  },
  {
    Icon: Clock,
    label: 'Hours',
    value: 'Mon – Fri, 8:00 AM – 6:00 PM',
    sub: 'GMT (Ghana Mean Time)',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form,      setForm]      = useState<FormState>({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors,    setErrors]    = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }
  }

  function validate(): boolean {
    const errs: FormErrors = {}
    if (!form.name.trim())    errs.name    = 'Your name is required.'
    if (!form.email.trim())   errs.email   = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (!form.subject)        errs.subject = 'Please select a subject.'
    if (!form.message.trim()) errs.message = 'Message is required.'
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Simulate async — no real backend yet
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 800)
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="bg-text-primary pt-32 pb-16">
        <div className="section-container">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Contact us</p>
          <h1 className="text-3xl md:text-heading-1 font-semibold text-white tracking-tight mb-3">
            Get in touch
          </h1>
          <p className="text-white/55 max-w-md text-sm">
            Have a question, need support, or want to partner with NESTA? We would love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Contact info sidebar */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-heading-4 font-semibold text-text-primary mb-1">Contact information</h2>
                <p className="text-sm text-text-secondary">Reach us through any of these channels.</p>
              </div>

              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map(({ Icon, label, value, sub, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center flex-shrink-0 shadow-subtle">
                      <Icon size={15} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-text-primary font-medium hover:text-accent transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-text-primary font-medium">{value}</p>
                      )}
                      {sub && <p className="text-xs text-text-secondary mt-0.5">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Response time note */}
              <div className="bg-accent/8 border border-accent/20 rounded-xl p-4">
                <p className="text-xs font-semibold text-accent-dark mb-1">Response time</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  We typically respond to enquiries within 1–2 business days.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-border p-8 shadow-subtle">
                {submitted ? (
                  <div className="flex flex-col items-center text-center gap-5 py-10">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                      <CheckCircle size={32} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-heading-4 font-semibold text-text-primary mb-2">Message received</h3>
                      <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
                        Thank you for reaching out. This is a frontend demo — no message was actually sent.
                        A real backend will handle submissions in a future phase.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                      className="btn-secondary"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-heading-4 font-semibold text-text-primary mb-1">Send us a message</h2>
                      <p className="text-sm text-text-secondary">Fill out the form and we will get back to you.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        id="contact-name"
                        label="Full name"
                        required
                        placeholder="Kwame Mensah"
                        value={form.name}
                        onChange={set('name')}
                        error={errors.name}
                        autoComplete="name"
                      />
                      <FormField
                        id="contact-email"
                        label="Email address"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={set('email')}
                        error={errors.email}
                        autoComplete="email"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        id="contact-phone"
                        label="Phone number"
                        type="tel"
                        placeholder="+233 24 000 0000"
                        value={form.phone}
                        onChange={set('phone')}
                        autoComplete="tel"
                      />
                      <FormSelect
                        id="contact-subject"
                        label="Subject"
                        required
                        placeholder="Select a subject…"
                        options={SUBJECTS}
                        value={form.subject}
                        onChange={set('subject')}
                        error={errors.subject}
                      />
                    </div>

                    <FormTextarea
                      id="contact-message"
                      label="Message"
                      required
                      placeholder="Tell us how we can help…"
                      rows={5}
                      value={form.message}
                      onChange={set('message')}
                      error={errors.message}
                    />

                    <p className="text-[10px] text-text-secondary/50">
                      This form is frontend-only. No data will be transmitted until a backend is connected.
                    </p>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary py-3 flex items-center justify-center gap-2 self-start px-8 disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send size={15} />
                      )}
                      {loading ? 'Sending…' : 'Send message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
