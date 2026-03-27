import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Curso from './pages/Curso'
import Leccion from './pages/Leccion'
import Constructor from './pages/Constructor'
import Catalogo from './pages/Catalogo'
import Plugins from './pages/Plugins'
import Configuracion from './pages/Configuracion'
import Agentes from './pages/Agentes'
import Marketplace from './pages/Marketplace'
import BrandExample from './pages/BrandExample'
import Guia from './pages/Guia'
import Automatizaciones from './pages/Automatizaciones'
import CursoPaperclip from './pages/CursoPaperclip'
import CursoClaude from './pages/CursoClaude'
import NotFound from './pages/NotFound'

function App() {
  return (
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
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
