import { NavLink, Outlet } from 'react-router-dom';
import { Hammer, BookOpen, Wrench, Library, Plug, GraduationCap, Settings, Menu, X, Shield, Store, Paintbrush, Compass, Timer, Building2, Brain } from 'lucide-react';
import ChatAssistant from './chat/ChatAssistant';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navGroups = [
  {
    label: null,
    items: [
      { to: '/', icon: Hammer, label: 'Inicio' },
      { to: '/guia', icon: Compass, label: 'Guia de Uso' },
    ],
  },
  {
    label: 'Aprender',
    items: [
      { to: '/curso-claude', icon: Brain, label: 'Curso Claude' },
      { to: '/curso', icon: GraduationCap, label: 'Curso Skills' },
      { to: '/curso-paperclip', icon: Building2, label: 'Curso Paperclip' },
    ],
  },
  {
    label: 'Crear',
    items: [
      { to: '/constructor', icon: Wrench, label: 'Constructor' },
      { to: '/catalogo', icon: Library, label: 'Catalogo' },
      { to: '/marketplace', icon: Store, label: 'Marketplace' },
      { to: '/plugins', icon: Plug, label: 'Plugins' },
    ],
  },
  {
    label: 'Avanzado',
    items: [
      { to: '/agentes', icon: Shield, label: 'ARTgents' },
      { to: '/ejemplo-marca', icon: Paintbrush, label: 'Ejemplo Marca' },
      { to: '/automatizaciones', icon: Timer, label: 'Automatizaciones' },
    ],
  },
  {
    label: null,
    items: [
      { to: '/configuracion', icon: Settings, label: 'Configuracion' },
    ],
  },
];

const allNavItems = navGroups.flatMap(g => g.items);

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
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className="px-4 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">{group.label}</p>
              )}
              {!group.label && gi > 0 && (
                <div className="my-2 border-t border-zinc-800/50" />
              )}
              {group.items.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-forge-500/15 text-forge-400 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                    }`
                  }
                >
                  <Icon className="w-4.5 h-4.5" />
                  {label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <div className="px-4 py-3 rounded-xl bg-zinc-900/50 text-xs text-zinc-500">
            <p className="font-medium text-zinc-400 mb-1">SalgadoIA</p>
            <p>v3.4.0 · Sinapsis Ecosystem</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800 z-50 flex items-center justify-between px-4">
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800 pt-16 overflow-y-auto"
            >
              <nav className="p-4 space-y-1">
                {navGroups.map((group, gi) => (
                  <div key={gi}>
                    {group.label && (
                      <p className="px-4 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">{group.label}</p>
                    )}
                    {!group.label && gi > 0 && (
                      <div className="my-2 border-t border-zinc-800/50" />
                    )}
                    {group.items.map(({ to, icon: Icon, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium ${
                            isActive ? 'bg-forge-500/15 text-forge-400' : 'text-zinc-400'
                          }`
                        }
                      >
                        <Icon className="w-5 h-5" />
                        {label}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        <Outlet />
        <ChatAssistant />
      </main>
    </div>
  );
}
