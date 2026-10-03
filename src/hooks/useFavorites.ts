import { useState, useCallback } from 'react'

const STORAGE_KEY = 'nesta_favorites'

function loadFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return new Set<string>(parsed)
  } catch {
    // ignore corrupt data
  }
  return new Set()
}

function saveToStorage(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
  } catch {
    // fail silently
  }
}

/**
 * useFavorites
 * Manages property favorites with localStorage persistence.
 * Designed so the persistence layer can be swapped to an API call later.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(loadFromStorage)

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites],
  )

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      saveToStorage(next)
      return next
    })
  }, [])

  const add = useCallback((id: string) => {
    setFavorites((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      saveToStorage(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setFavorites((prev) => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      saveToStorage(next)
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    setFavorites(new Set())
    saveToStorage(new Set())
  }, [])

  return {
    favorites,
    favoriteIds: [...favorites],
    count: favorites.size,
    isFavorite,
    toggle,
    add,
    remove,
    clearAll,
  }
}
