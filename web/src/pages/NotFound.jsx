import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hammer, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-forge-500/20 to-ember-500/20 border border-forge-500/30 flex items-center justify-center mx-auto mb-8">
          <Hammer className="w-10 h-10 text-forge-400" />
        </div>

        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-xl text-zinc-400 mb-2">Pagina no encontrada</p>
        <p className="text-sm text-zinc-600 mb-8">
          Esta ruta no existe en La Forja. Quizas el enlace esta roto o la pagina fue movida.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-forge-500 to-ember-500 text-white font-semibold hover:scale-105 transition-all shadow-lg shadow-forge-500/25"
          >
            <Home className="w-4 h-4" />
            Ir al Inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-medium hover:bg-zinc-700 transition-all border border-zinc-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver atras
          </button>
        </div>
      </motion.div>
    </div>
  );
}
