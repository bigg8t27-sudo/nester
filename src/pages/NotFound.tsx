import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        {/* Visual */}
        <div className="relative">
          <span className="text-[8rem] font-semibold text-border leading-none select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="7" fill="#111111" />
              <path d="M7 20V13.5L14 8L21 13.5V20H7Z" fill="none" stroke="#B89B5E" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M11.5 20V16.5H16.5V20" fill="none" stroke="#B89B5E" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-heading-2 font-semibold text-text-primary">Page not found</h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex gap-3">
          <Button as="link" to="/" variant="primary">Go home</Button>
          <Button as="link" to="/properties" variant="secondary">Browse properties</Button>
        </div>
      </div>
    </div>
  )
}
