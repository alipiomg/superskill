import { NavLink, Outlet } from 'react-router-dom';
import { Hammer, BookOpen, Wrench, Library, Plug, GraduationCap, Settings, Menu, X, Shield, Store, Paintbrush, Compass, Timer, Building2, Brain } from 'lucide-react';
import ChatAssistant from './chat/ChatAssistant';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/', icon: Hammer, label: 'Inicio' },
  { to: '/guia', icon: Compass, label: 'Guía de Uso' },
  { to: '/curso', icon: GraduationCap, label: 'Curso' },
  { to: '/constructor', icon: Wrench, label: 'Constructor' },
  { to: '/catalogo', icon: Library, label: 'Catálogo' },
  { to: '/marketplace', icon: Store, label: 'Marketplace' },
  { to: '/plugins', icon: Plug, label: 'Plugins' },
  { to: '/agentes', icon: Shield, label: 'ARTgents' },
  { to: '/ejemplo-marca', icon: Paintbrush, label: 'Ejemplo Marca' },
  { to: '/automatizaciones', icon: Timer, label: 'Automatizaciones' },
  { to: '/curso-paperclip', icon: Building2, label: 'Curso Paperclip' },
  { to: '/curso-claude', icon: Brain, label: 'Curso Claude' },
  { to: '/configuracion', icon: Settings, label: 'Configuración' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-800 bg-zinc-950/80 backdrop-blur-xl fixed h-full z-40">
        <div className="p-6 border-b border-zinc-800">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forge-500 to-ember-500 flex items-center justify-center shadow-lg shadow-forge-500/25 group-hover:shadow-forge-500/50 transition-shadow">
              <Hammer className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">SuperSkill</h1>
              <p className="text-xs text-zinc-500">La Forja de Skills</p>
            </div>
          </NavLink>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-forge-500/15 text-forge-400 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <div className="px-4 py-3 rounded-xl bg-zinc-900/50 text-xs text-zinc-500">
            <p className="font-medium text-zinc-400 mb-1">SalgadoIA</p>
            <p>v1.0.0 · Sinapsis Ecosystem</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800 z-50 flex items-center justify-between px-4">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forge-500 to-ember-500 flex items-center justify-center">
            <Hammer className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">SuperSkill</span>
        </NavLink>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-zinc-400">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="lg:hidden fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl pt-16"
          >
            <nav className="p-4 space-y-2">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium ${
                      isActive ? 'bg-forge-500/15 text-forge-400' : 'text-zinc-400'
                    }`
                  }
                >
                  <Icon className="w-6 h-6" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <Outlet />
        <ChatAssistant />
      </main>
    </div>
  );
}