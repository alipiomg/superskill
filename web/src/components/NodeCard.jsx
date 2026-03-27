import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Lock, Play, Star } from 'lucide-react';
import * as Icons from 'lucide-react';

const colorMap = {
  forge: 'from-forge-500 to-forge-600',
  steel: 'from-steel-500 to-steel-600',
  ember: 'from-ember-500 to-ember-600',
  emerald: 'from-emerald-500 to-emerald-600',
  gold: 'from-gold-500 to-forge-500',
};

const bgColorMap = {
  forge: 'bg-forge-500/10 border-forge-500/20',
  steel: 'bg-steel-500/10 border-steel-500/20',
  ember: 'bg-ember-500/10 border-ember-500/20',
  emerald: 'bg-emerald-500/10 border-emerald-500/20',
  gold: 'bg-gold-500/10 border-gold-500/20',
};

const tipoLabel = {
  teoria: { label: 'Teoría', color: 'text-forge-400 bg-forge-500/10' },
  practica: { label: 'Práctica', color: 'text-steel-400 bg-steel-500/10' },
  reto: { label: 'Reto', color: 'text-ember-400 bg-ember-500/10' },
  'teoria-practica': { label: 'Teoría + Práctica', color: 'text-gold-400 bg-gold-500/10' },
};

export default function NodeCard({ node, index, isCompleted, isLocked }) {
  const IconComponent = Icons[node.icon] || Icons.BookOpen;
  const tipo = tipoLabel[node.tipo] || tipoLabel.teoria;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={isLocked ? '#' : `/curso/${node.id}`}
        className={`block group ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <div className={`relative p-5 rounded-2xl border transition-all duration-300 ${
          isCompleted
            ? 'bg-emerald-500/5 border-emerald-500/30'
            : isLocked
              ? 'bg-zinc-900/30 border-zinc-800'
              : `${bgColorMap[node.color]} hover:scale-[1.02] hover:shadow-lg`
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[node.color]} flex items-center justify-center shrink-0 ${
              isCompleted ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : ''
            }`}>
              {isCompleted ? (
                <Check className="w-6 h-6 text-white" />
              ) : isLocked ? (
                <Lock className="w-5 h-5 text-zinc-500" />
              ) : (
                <IconComponent className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-zinc-600 font-mono">#{node.orden}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tipo.color}`}>
                  {tipo.label}
                </span>
              </div>
              <h3 className={`font-semibold mb-1 ${isCompleted ? 'text-emerald-400' : 'text-zinc-200 group-hover:text-white'}`}>
                {node.titulo}
              </h3>
              <p className="text-sm text-zinc-500 line-clamp-2">{node.explicacion.substring(0, 120)}...</p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="text-sm font-mono font-bold text-forge-400">+{node.xp}xp</span>
              {!isLocked && !isCompleted && (
                <Play className="w-4 h-4 text-zinc-600 group-hover:text-forge-400 transition-colors" />
              )}
              {isCompleted && <Star className="w-4 h-4 text-gold-400" />}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}