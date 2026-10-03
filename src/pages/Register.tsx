import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, Home, Key, Building2, CheckCircle } from 'lucide-react'

type UserRole = 'buyer' | 'renter' | 'agent' | 'owner'

interface FormState {
  name:     string
  email:    string
  phone:    string
  password: string
  confirm:  string
  role:     UserRole
  agree:    boolean
}

interface FormErrors {
  name?:     string
  email?:    string
  phone?:    string
  password?: string
  confirm?:  string
  agree?:    string
}

const ROLES: { value: UserRole; label: string; description: string; Icon: React.ElementType }[] = [
  { value: 'buyer',  Icon: Home,      label: 'Buyer',           description: 'I am looking to buy a property.' },
  { value: 'renter', Icon: Home,      label: 'Renter',          description: 'I am looking to rent a property.' },
  { value: 'agent',  Icon: Key,       label: 'Agent',           description: 'I am a professional real estate agent.' },
  { value: 'owner',  Icon: Building2, label: 'Property owner',  description: 'I own property and want to list it.' },
]

function NestLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#111111"/>
      <path d="M7 20V13.5L14 8L21 13.5V20H7Z" fill="none" stroke="#B89B5E" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M11.5 20V16.5H16.5V20" fill="none" stroke="#B89B5E" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Register() {
  const [form,      setForm]      = useState<FormState>({ name: '', email: '', phone: '', password: '', confirm: '', role: 'buyer', agree: false })
  const [errors,    setErrors]    = useState<FormErrors>({})
  const [showPass,  setShowPass]  = useState(false)
  const [showConf,  setShowConf]  = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  function set(field: keyof Omit<FormState, 'role' | 'agree'>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field as keyof FormErrors]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate(): boolean {
    const errs: FormErrors = {}
    if (!form.name.trim())    errs.name     = 'Full name is required.'
    if (!form.email.trim())   errs.email    = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.'
    if (form.phone && !/^\+?[\d\s\-()]{7,}$/.test(form.phone)) errs.phone = 'Enter a valid phone number.'
    if (!form.password)       errs.password = 'Password is required.'
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.'
    else if (!/[A-Z]/.test(form.password)) errs.password = 'Include at least one uppercase letter.'
    if (!form.confirm)        errs.confirm  = 'Please confirm your password.'
    else if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.'
    if (!form.agree)          errs.agree    = 'You must accept the terms to continue.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Frontend-only — no real registration yet
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 800)
  }

  function getStrength(pw: string): { score: number; label: string; color: string } {
    let score = 0
    if (pw.length >= 8)           score++
    if (/[A-Z]/.test(pw))         score++
    if (/[0-9]/.test(pw))         score++
    if (/[^a-zA-Z0-9]/.test(pw))  score++
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
    const colors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-emerald-500']
    return { score, label: labels[score] || '', color: colors[score] || '' }
  }
  const strength = form.password ? getStrength(form.password) : null

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left branding */}
      <div className="hidden lg:flex flex-col justify-between w-5/12 bg-text-primary p-12">
        <Link to="/" className="flex items-center gap-2.5" aria-label="NESTA home">
          <NestLogo />
          <span className="text-lg font-semibold text-white tracking-tight">NESTA</span>
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Get started</p>
          <h2 className="text-3xl font-semibold text-white mb-5 tracking-tight leading-tight">
            Join thousands of<br />people finding homes<br />with NESTA.
          </h2>
          <div className="flex flex-col gap-3">
            {['Free to browse all listings', 'Save properties you love', 'Contact agents directly', 'Track your viewings'].map((p) => (
              <div key={p} className="flex items-center gap-2.5">
                <CheckCircle size={14} className="text-accent flex-shrink-0" />
                <span className="text-sm text-white/60">{p}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} NESTA Technologies Ltd.</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
          <NestLogo />
          <span className="text-lg font-semibold tracking-tight">NESTA</span>
        </Link>

        <div className="w-full max-w-md">
          {submitted ? (
            <div className="text-center flex flex-col gap-5 items-center py-10">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle size={32} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-heading-4 font-semibold mb-2">Account prepared</h3>
                <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
                  Your details have been captured. Authentication will work once the backend is connected.
                </p>
              </div>
              <Link to="/" className="btn-primary px-8">Explore properties</Link>
              <Link to="/login" className="text-sm text-accent hover:underline">Sign in instead</Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-heading-3 font-semibold text-text-primary mb-1">Create your account</h1>
                <p className="text-sm text-text-secondary">Join NESTA to start discovering properties.</p>
              </div>

              {/* Role selector */}
              <div className="flex flex-col gap-2 mb-6">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">I am a…</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ROLES.map(({ value, label, Icon }) => (
                    <button key={value} type="button"
                      onClick={() => setForm((prev) => ({ ...prev, role: value }))}
                      aria-pressed={form.role === value}
                      className={[
                        'flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all duration-150',
                        form.role === value
                          ? 'bg-text-primary border-text-primary text-white'
                          : 'bg-white border-border text-text-secondary hover:border-text-secondary hover:text-text-primary',
                      ].join(' ')}>
                      <Icon size={18} />
                      <span className="text-[10px] font-semibold leading-tight">{label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  {ROLES.find((r) => r.value === form.role)?.description}
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <InputRow id="reg-name" label="Full name" required icon={<User size={14}/>}
                  type="text" autoComplete="name" placeholder="Kwame Mensah"
                  value={form.name} onChange={set('name')} error={errors.name} />

                <InputRow id="reg-email" label="Email address" required icon={<Mail size={14}/>}
                  type="email" autoComplete="email" placeholder="you@example.com"
                  value={form.email} onChange={set('email')} error={errors.email} />

                <InputRow id="reg-phone" label="Phone number" icon={<Phone size={14}/>}
                  type="tel" autoComplete="tel" placeholder="+233 24 000 0000"
                  value={form.phone} onChange={set('phone')} error={errors.phone} />

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-pass" className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Password<span className="text-accent ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/40 pointer-events-none" />
                    <input id="reg-pass" type={showPass ? 'text' : 'password'}
                      autoComplete="new-password" placeholder="Min. 8 characters"
                      value={form.password} onChange={set('password')}
                      className={`w-full rounded-lg border pl-10 pr-10 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${errors.password ? 'border-red-300' : 'border-border'}`} />
                    <button type="button" onClick={() => setShowPass((v) => !v)}
                      aria-label={showPass ? 'Hide password' : 'Show password'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors">
                      {showPass ? <EyeOff size={14}/> : <Eye size={14}/>}
                    </button>
                  </div>
                  {strength && strength.score > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1 flex-1">
                        {[1,2,3,4].map((i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= strength.score ? strength.color : 'bg-border'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-text-secondary">{strength.label}</span>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                {/* Confirm */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-confirm" className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Confirm password<span className="text-accent ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/40 pointer-events-none" />
                    <input id="reg-confirm" type={showConf ? 'text' : 'password'}
                      autoComplete="new-password" placeholder="Repeat your password"
                      value={form.confirm} onChange={set('confirm')}
                      className={`w-full rounded-lg border pl-10 pr-10 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${errors.confirm ? 'border-red-300' : 'border-border'}`} />
                    <button type="button" onClick={() => setShowConf((v) => !v)}
                      aria-label={showConf ? 'Hide' : 'Show'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors">
                      {showConf ? <EyeOff size={14}/> : <Eye size={14}/>}
                    </button>
                  </div>
                  {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}
                </div>

                {/* Terms */}
                <div className="flex flex-col gap-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={form.agree}
                      onChange={(e) => { setForm((p) => ({ ...p, agree: e.target.checked })); setErrors((p) => ({ ...p, agree: undefined })) }}
                      className="w-4 h-4 rounded border-border accent-accent mt-0.5 cursor-pointer flex-shrink-0" />
                    <span className="text-xs text-text-secondary leading-relaxed">
                      I agree to the <a href="#" className="text-accent hover:underline">Terms of Service</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agree && <p className="text-xs text-red-500 pl-6">{errors.agree}</p>}
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full py-3 mt-1 flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                  {loading ? 'Creating account…' : 'Create account'}
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border"/>
                  <span className="text-xs text-text-secondary">or</span>
                  <div className="flex-1 h-px bg-border"/>
                </div>

                <button type="button"
                  className="w-full py-3 rounded-lg border border-border bg-white text-sm font-medium text-text-primary flex items-center justify-center gap-3 hover:bg-surface-hover transition-colors"
                  onClick={() => alert('Google sign-up coming soon.')}>
                  <GoogleIcon /> Continue with Google
                </button>
              </form>

              <p className="text-center text-sm text-text-secondary mt-5">
                Already have an account?{' '}
                <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
              </p>
              <p className="text-center text-[10px] text-text-secondary/40 mt-3">
                Authentication connects in a future phase.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
interface InputRowProps {
  id: string; label: string; required?: boolean; icon?: React.ReactNode
  error?: string; [k: string]: unknown
}
function InputRow({ id, label, required, icon, error, ...props }: InputRowProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/40 pointer-events-none">{icon}</span>}
        <input id={id} {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          className={`w-full rounded-lg border ${icon ? 'pl-10' : 'pl-3.5'} pr-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${error ? 'border-red-300' : 'border-border'}`}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
