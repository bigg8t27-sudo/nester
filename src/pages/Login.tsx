import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

interface FormState { email: string; password: string; remember: boolean }
interface FormErrors { email?: string; password?: string }

function NestLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#111111"/>
      <path d="M7 20V13.5L14 8L21 13.5V20H7Z" fill="none" stroke="#B89B5E" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M11.5 20V16.5H16.5V20" fill="none" stroke="#B89B5E" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Login() {
  const [form,        setForm]        = useState<FormState>({ email: '', password: '', remember: false })
  const [errors,      setErrors]      = useState<FormErrors>({})
  const [showPass,    setShowPass]    = useState(false)
  const [submitted,   setSubmitted]   = useState(false)
  const [loading,     setLoading]     = useState(false)

  function set(field: keyof Omit<FormState, 'remember'>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate(): boolean {
    const errs: FormErrors = {}
    if (!form.email.trim())   errs.email    = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.'
    if (!form.password.trim()) errs.password = 'Password is required.'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 700)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-text-primary p-12">
        <Link to="/" className="flex items-center gap-2.5" aria-label="NESTA home">
          <NestLogo />
          <span className="text-lg font-semibold text-white tracking-tight">NESTA</span>
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Welcome back</p>
          <h2 className="text-3xl font-semibold text-white mb-4 tracking-tight leading-tight">
            Your next place<br />is waiting.
          </h2>
          <p className="text-white/45 text-sm leading-relaxed max-w-sm">
            Sign in to access your saved properties, scheduled viewings, and more.
          </p>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} NESTA Technologies Ltd.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <Link to="/" className="lg:hidden flex items-center gap-2 mb-8" aria-label="NESTA home">
          <NestLogo />
          <span className="text-lg font-semibold tracking-tight">NESTA</span>
        </Link>

        <div className="w-full max-w-sm">
          {submitted ? (
            <div className="text-center flex flex-col gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="text-heading-4 font-semibold">Sign-in prepared</h3>
              <p className="text-sm text-text-secondary">
                Authentication backend is not connected yet. This will work once the backend is live.
              </p>
              <button type="button" onClick={() => setSubmitted(false)} className="btn-secondary">Try again</button>
              <Link to="/" className="text-sm text-accent hover:underline">Back to home</Link>
            </div>
          ) : (
              <div className="mb-7">
                <h1 className="text-heading-3 font-semibold text-text-primary mb-1">Sign in</h1>
                <p className="text-sm text-text-secondary">Welcome back. Enter your details below.</p>
              </div>
          )}

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="login-email" className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Email<span className="text-accent ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/40 pointer-events-none" />
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set('email')}
                      className={`w-full rounded-lg border pl-10 pr-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${errors.email ? 'border-red-300 bg-red-50/30' : 'border-border'}`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="login-pass" className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                      Password<span className="text-accent ml-0.5">*</span>
                    </label>
                    <Link to="/forgot-password" className="text-xs text-accent hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/40 pointer-events-none" />
                    <input
                      id="login-pass"
                      type={showPass ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={set('password')}
                      className={`w-full rounded-lg border pl-10 pr-10 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${errors.password ? 'border-red-300 bg-red-50/30' : 'border-border'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      aria-label={showPass ? 'Hide password' : 'Show password'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                {/* Remember me */}
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) => setForm((prev) => ({ ...prev, remember: e.target.checked }))}
                    className="w-4 h-4 rounded border-border accent-accent cursor-pointer"
                  />
                  <span className="text-sm text-text-secondary">Remember me for 30 days</span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 mt-1 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {loading ? 'Signing in…' : 'Sign in'}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-text-secondary">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Google placeholder */}
                <button
                  type="button"
                  className="w-full py-3 rounded-lg border border-border bg-white text-sm font-medium text-text-primary
                             flex items-center justify-center gap-3 hover:bg-surface-hover transition-colors"
                  onClick={() => alert('Google sign-in will be available once authentication is connected.')}
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
              </form>

              <p className="text-center text-sm text-text-secondary mt-6">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-accent font-medium hover:underline">Create one</Link>
              </p>

        </div>
      </div>
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
