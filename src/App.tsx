import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Layout from '@/components/layout/Layout'

// Pages — main
import Home            from '@/pages/Home'
import Properties      from '@/pages/Properties'
import PropertyDetails from '@/pages/PropertyDetails'
import About           from '@/pages/About'
import Contact         from '@/pages/Contact'
import Sell            from '@/pages/Sell'
import Dashboard       from '@/pages/Dashboard'
import NotFound        from '@/pages/NotFound'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { FavoritesProvider } from '@/hooks/useFavorites'

// Auth pages — own full-screen layout
import Login    from '@/pages/Login'
import Register from '@/pages/Register'

// Agent pages — own layout (DashboardLayout embedded)
import AgentDashboard   from '@/pages/agent/AgentDashboard'
import AgentProperties  from '@/pages/agent/AgentProperties'
import AgentAddProperty from '@/pages/agent/AgentAddProperty'
import AgentEditProperty from '@/pages/agent/AgentEditProperty'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <ScrollToTop />
        <Routes>

        {/* ── Pages with shared Navbar + Footer layout ── */}
        <Route element={<Layout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/properties"     element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/about"          element={<About />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/sell"           element={<Sell />} />
        </Route>

        {/* ── Auth — full screen, no shared layout ── */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── User dashboard — nested routes ── */}
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* ── Agent portal ── */}
        <Route path="/agent/dashboard/*"  element={<ProtectedRoute roles={['AGENT','OWNER','ADMIN']}><AgentDashboard /></ProtectedRoute>} />
        <Route path="/agent/properties"   element={<ProtectedRoute roles={['AGENT','OWNER','ADMIN']}><AgentProperties /></ProtectedRoute>} />
        <Route path="/agent/properties/new" element={<ProtectedRoute roles={['AGENT','OWNER','ADMIN']}><AgentAddProperty /></ProtectedRoute>} />
        <Route path="/agent/properties/:id/edit" element={<ProtectedRoute roles={['AGENT','OWNER','ADMIN']}><AgentEditProperty /></ProtectedRoute>} />

        {/* ── 404 ── */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  )
}
