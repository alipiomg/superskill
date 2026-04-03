import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Lazy-loaded pages for better initial load
const Curso = lazy(() => import('./pages/Curso'))
const Leccion = lazy(() => import('./pages/Leccion'))
const Constructor = lazy(() => import('./pages/Constructor'))
const Catalogo = lazy(() => import('./pages/Catalogo'))
const Plugins = lazy(() => import('./pages/Plugins'))
const Configuracion = lazy(() => import('./pages/Configuracion'))
const Agentes = lazy(() => import('./pages/Agentes'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const BrandExample = lazy(() => import('./pages/BrandExample'))
const Guia = lazy(() => import('./pages/Guia'))
const Automatizaciones = lazy(() => import('./pages/Automatizaciones'))
const CursoPaperclip = lazy(() => import('./pages/CursoPaperclip'))
const CursoClaude = lazy(() => import('./pages/CursoClaude'))
const CursosOficiales = lazy(() => import('./pages/CursosOficiales'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-forge-500/30 border-t-forge-500 rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/curso" element={<Curso />} />
          <Route path="/curso/:nodeId" element={<Leccion />} />
          <Route path="/constructor" element={<Constructor />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/plugins" element={<Plugins />} />
          <Route path="/agentes" element={<Agentes />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/ejemplo-marca" element={<BrandExample />} />
          <Route path="/guia" element={<Guia />} />
          <Route path="/automatizaciones" element={<Automatizaciones />} />
          <Route path="/curso-paperclip" element={<CursoPaperclip />} />
          <Route path="/curso-claude" element={<CursoClaude />} />
          <Route path="/cursos-oficiales" element={<CursosOficiales />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
