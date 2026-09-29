import { useState, useCallback } from 'react'

const STORAGE_KEY = 'nesta_recently_viewed'
const MAX_ITEMS = 8

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as string[]
  } catch {
    // ignore corrupt data
  }
  return []
}

function save(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // fail silently
  }
}

/**
 * useRecentlyViewed
 * Tracks recently viewed property IDs in localStorage.
 * Most recently viewed is first. No duplicates. Capped at MAX_ITEMS.
 * Designed to be swapped to a backend later.
 */
export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>(load)

  const trackView = useCallback((id: string) => {
    setIds((prev) => {
      // Remove if already present, then prepend
      const next = [id, ...prev.filter((i) => i !== id)].slice(0, MAX_ITEMS)
      save(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.filter((i) => i !== id)
      save(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setIds([])
    save([])
  }, [])

  return { ids, trackView, remove, clear }
}
