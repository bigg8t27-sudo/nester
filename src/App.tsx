import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Layout from '@/components/layout/Layout'

// Pages
import Home            from '@/pages/Home'
import Properties      from '@/pages/Properties'
import PropertyDetails from '@/pages/PropertyDetails'
import About           from '@/pages/About'
import Contact         from '@/pages/Contact'
import Sell            from '@/pages/Sell'
import Dashboard       from '@/pages/Dashboard'
import NotFound        from '@/pages/NotFound'

// Auth
import Login    from '@/pages/Login'
import Register from '@/pages/Register'

// Agent
import AgentDashboard   from '@/pages/agent/AgentDashboard'
import AgentProperties  from '@/pages/agent/AgentProperties'
import AgentAddProperty from '@/pages/agent/AgentAddProperty'

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
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/properties"     element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/about"          element={<About />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/sell"           element={<Sell />} />
        </Route>

        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard/*"        element={<Dashboard />} />
        <Route path="/agent/dashboard/*"  element={<AgentDashboard />} />
        <Route path="/agent/properties"   element={<AgentProperties />} />
        <Route path="/agent/properties/new" element={<AgentAddProperty />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
