import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X, Maximize2, Images } from 'lucide-react'

interface PropertyGalleryProps {
  images: string[]
  title:  string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIdx,   setActiveIdx]   = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const total = images.length

  const prev = useCallback(() => {
    setActiveIdx((i) => (i - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    setActiveIdx((i) => (i + 1) % total)
  }, [total])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     setLightboxOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, prev, next])

  // Lock body scroll in lightbox
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxOpen])

  if (total === 0) return <GalleryPlaceholder />

  return (
    <>
      {/* ── Inline gallery ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">

        {/* Main image */}
        <div
          className="relative rounded-xl overflow-hidden bg-surface-secondary cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Open image gallery"
          onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
        >
          <div className="aspect-[16/9] md:aspect-[16/10]">
            <img
              src={images[activeIdx]}
              alt={`${title} — image ${activeIdx + 1} of ${total}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="eager"
            />
          </div>

          {/* Overlay controls */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Counter */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5
                          bg-black/50 text-white text-xs font-medium px-2.5 py-1.5 rounded-full
                          backdrop-blur-sm">
            <Images size={12} />
            {activeIdx + 1} / {total}
          </div>

          {/* Expand icon */}
          <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm
                          rounded-full flex items-center justify-center text-white
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Maximize2 size={14} />
          </div>

          {/* Prev / Next arrows (only when multiple images) */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                           bg-black/40 backdrop-blur-sm text-white flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-all duration-200
                           hover:bg-black/60 active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                           bg-black/40 backdrop-blur-sm text-white flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-all duration-200
                           hover:bg-black/60 active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {total > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-0.5">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIdx(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={i === activeIdx}
                className={[
                  'flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden',
                  'transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent',
                  i === activeIdx
                    ? 'ring-2 ring-accent ring-offset-1 opacity-100'
                    : 'opacity-55 hover:opacity-80',
                ].join(' ')}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Property image gallery"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
            <span className="text-white/60 text-sm">{activeIdx + 1} / {total}</span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center
                         justify-center text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Main lightbox image */}
          <div className="flex-1 flex items-center justify-center px-4 min-h-0 relative">
            {total > 1 && (
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 md:left-6 w-10 h-10 rounded-full bg-white/10
                           hover:bg-white/25 flex items-center justify-center text-white
                           transition-colors z-10"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            <img
              src={images[activeIdx]}
              alt={`${title} — image ${activeIdx + 1}`}
              className="max-h-full max-w-full object-contain rounded-lg select-none"
              draggable={false}
            />

            {total > 1 && (
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 md:right-6 w-10 h-10 rounded-full bg-white/10
                           hover:bg-white/25 flex items-center justify-center text-white
                           transition-colors z-10"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          {/* Thumbnail strip */}
          {total > 1 && (
            <div className="flex justify-center gap-2 px-4 py-4 flex-shrink-0 overflow-x-auto scrollbar-thin">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`View image ${i + 1}`}
                  className={[
                    'flex-shrink-0 w-14 h-10 rounded overflow-hidden transition-all duration-200',
                    i === activeIdx ? 'ring-2 ring-accent opacity-100' : 'opacity-40 hover:opacity-70',
                  ].join(' ')}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

function GalleryPlaceholder() {
  return (
    <div className="w-full aspect-[16/9] rounded-xl bg-surface-secondary flex flex-col items-center justify-center gap-2">
      <Images size={32} className="text-border" />
      <span className="text-xs text-text-secondary">No images available</span>
    </div>
  )
}
