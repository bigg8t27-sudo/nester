import { useState, useCallback } from 'react'

const MAX_COMPARE = 3

/**
 * usePropertyComparison
 * Manages a client-side comparison list (max 3 properties).
 * Structured for future backend/account integration.
 */
export function usePropertyComparison() {
  const [ids,    setIds]    = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const isInComparison = useCallback(
    (id: string) => ids.includes(id),
    [ids],
  )

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((i) => i !== id)
        if (next.length === 0) setIsOpen(false)
        return next
      }
      if (prev.length >= MAX_COMPARE) return prev // silently cap
      const next = [...prev, id]
      setIsOpen(true)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.filter((i) => i !== id)
      if (next.length === 0) setIsOpen(false)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setIds([])
    setIsOpen(false)
  }, [])

  const isFull = ids.length >= MAX_COMPARE

  return {
    ids,
    count: ids.length,
    isFull,
    isOpen,
    setIsOpen,
    isInComparison,
    toggle,
    remove,
    clear,
  }
}
