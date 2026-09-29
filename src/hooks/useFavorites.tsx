import { createContext, useState, useCallback, useEffect, useContext } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth/AuthProvider'
import { favoritesApi } from '@/lib/api/favorites'

interface FavoritesValue {
  favorites: Set<string>; favoriteIds: string[]; count: number; isFavorite: (id: string) => boolean
  toggle: (id: string) => void; add: (id: string) => void; remove: (id: string) => void; clearAll: () => void
}
const FavoritesContext = createContext<FavoritesValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { user } = useAuth()
  const userId = user?.id
  const navigate = useNavigate()

  useEffect(() => {
    let alive = true
    if (!userId) { setFavorites(new Set()); return }
    void favoritesApi.list().then((properties) => { if (alive) setFavorites(new Set(properties.map((property) => property.id))) })
      .catch((error) => console.error('Could not load saved properties', error))
    return () => { alive = false }
  }, [userId])

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites])
  const change = useCallback(async (id: string, shouldSave: boolean) => {
    if (!user) { navigate('/login', { state: { message: 'Sign in to save properties.' } }); return }
    try {
      if (shouldSave) await favoritesApi.add(id)
      else await favoritesApi.remove(id)
      setFavorites((old) => { const next = new Set(old); shouldSave ? next.add(id) : next.delete(id); return next })
    } catch (error) { window.alert(error instanceof Error ? error.message : 'Could not update saved properties.') }
  }, [user, navigate])
  const toggle = useCallback((id: string) => { void change(id, !favorites.has(id)) }, [change, favorites])
  const add = useCallback((id: string) => { if (!favorites.has(id)) void change(id, true) }, [change, favorites])
  const remove = useCallback((id: string) => { if (favorites.has(id)) void change(id, false) }, [change, favorites])
  const clearAll = useCallback(() => { for (const id of favorites) void change(id, false) }, [change, favorites])

  return <FavoritesContext.Provider value={{ favorites, favoriteIds: [...favorites], count: favorites.size, isFavorite, toggle, add, remove, clearAll }}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const value = useContext(FavoritesContext)
  if (!value) throw new Error('useFavorites must be used inside FavoritesProvider')
  return value
}
