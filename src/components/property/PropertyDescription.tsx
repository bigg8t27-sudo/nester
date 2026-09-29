import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface PropertyDescriptionProps {
  description: string
  collapseAt?: number // char count threshold before showing "Read more"
}

export default function PropertyDescription({
  description,
  collapseAt = 300,
}: PropertyDescriptionProps) {
  const [expanded, setExpanded] = useState(false)
  const isLong = description.length > collapseAt

  const displayed = isLong && !expanded
    ? description.slice(0, collapseAt).trimEnd() + '…'
    : description

  // Split on double newlines to preserve paragraph structure
  const paragraphs = displayed.split(/\n{2,}/).filter(Boolean)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 text-text-secondary leading-relaxed text-sm md:text-base">
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 text-sm font-medium text-accent
                     hover:text-accent-dark transition-colors self-start"
          aria-expanded={expanded}
        >
          {expanded ? (
            <><ChevronUp size={15} /> Show less</>
          ) : (
            <><ChevronDown size={15} /> Read more</>
          )}
        </button>
      )}
    </div>
  )
}
