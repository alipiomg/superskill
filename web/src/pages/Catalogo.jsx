import { motion } from 'framer-motion';
import { categories } from '../data/courseData';
import { Search, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Catalogo() {
  const [search, setSearch] = useState('');

  const filtered = search
    ? categories.filter(c => c.nombre.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search.toLowerCase()))
    : categories;

  return (
    <div className="min-h-screen px-6 py-8 lg:py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">Catálogo de Skills</h1>
          <p className="text-zinc-500 mb-8">12 categorías para organizar tu ecosistema de skills</p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar categoría..."
            className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-200 placeholder-zinc-600 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50"
          />
        </div>

        {/* Commands */}
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 mb-8">
          <p className="text-sm text-zinc-400">
            <span className="font-mono text-forge-400">/skill-catalog --list</span> · Ver todas las skills ·
            <span className="font-mono text-forge-400 ml-2">/skill-catalog --search "query"</span> · Buscar ·
            <span className="font-mono text-forge-400 ml-2">/skill-catalog --stats</span> · Estadísticas
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {cat.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{cat.nombre}</h3>
                  <p className="text-xs font-mono text-zinc-500">{cat.id}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-zinc-500">0 skills</span>
                <button className="flex items-center gap-1 text-xs text-forge-400 hover:text-forge-300 transition-colors">
                  <Plus className="w-3 h-3" /> Crear skill
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
