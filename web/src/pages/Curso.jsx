import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { courseNodes, gamification, zonas } from '../data/courseData';
import NodeCard from '../components/NodeCard';
import XpBar from '../components/XpBar';
import { Trophy, RotateCcw, Route } from 'lucide-react';

export default function Curso() {
  const { progress, level, completionPercent, resetProgress, setRoute } = useProgress();

  const routes = [
    { id: 'lineal', label: 'Lineal', desc: 'Todos los conceptos en orden', nodes: courseNodes.map(n => n.id) },
    { id: 'practica', label: 'Práctica', desc: 'Aprende haciendo', nodes: ['que-es-un-skill','anatomia-skill-md','micro-skills','crear-skill-desde-cero','testing-y-evaluacion','fusion-de-skills','catalogar-y-organizar','plugins-claude-code'] },
    { id: 'arquitecto', label: 'Arquitecto', desc: 'Foco en diseño', nodes: ['que-es-un-skill','anatomia-skill-md','progressive-disclosure','agents-y-subagents','scripts-y-references','crear-skill-desde-cero','mejora-iterativa','fusion-de-skills','plugins-claude-code'] },
  ];

  const activeRoute = routes.find(r => r.id === progress.route) || routes[0];
  const routeNodes = courseNodes.filter(n => activeRoute.nodes.includes(n.id));

  return (
    <div className="min-h-screen px-6 py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">La Forja de Skills</h1>
          <p className="text-zinc-500">Domina la creación de Skills y Plugins para Claude Code</p>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{level.emoji}</div>
              <div>
                <h3 className="font-semibold text-white">{level.nombre}</h3>
                <p className="text-sm text-zinc-500">{progress.completedNodes.length}/{courseNodes.length} lecciones · {completionPercent}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {progress.earnedBadges.length > 0 && (
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-gold-400" />
                  <span className="text-sm text-gold-400 font-bold">{progress.earnedBadges.length}</span>
                </div>
              )}
              <button onClick={resetProgress} className="p-2 text-zinc-600 hover:text-zinc-400 transition-colors" title="Resetear progreso">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          <XpBar current={progress.currentXp} max={gamification.totalXp} level={level} showLabel={false} />
        </motion.div>

        {/* Route Selector */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <Route className="w-4 h-4 text-zinc-500 shrink-0" />
          {routes.map(r => (
            <button
              key={r.id}
              onClick={() => setRoute(r.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                progress.route === r.id
                  ? 'bg-forge-500/15 text-forge-400 border border-forge-500/30'
                  : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Nodes by Zone */}
        {zonas.map(zona => {
          const zoneNodes = routeNodes.filter(n => n.zona === zona.id);
          if (zoneNodes.length === 0) return null;

          return (
            <div key={zona.id} className="mb-10">
              <h2 className="text-lg font-bold text-zinc-300 mb-4 flex items-center gap-2">
                <span className="text-xl">{zona.emoji}</span>
                {zona.id}
              </h2>
              <div className="space-y-3">
                {zoneNodes.map((node, i) => {
                  const isCompleted = progress.completedNodes.includes(node.id);
                  const nodeIndex = routeNodes.indexOf(node);
                  const isLocked = nodeIndex > 0 && !progress.completedNodes.includes(routeNodes[nodeIndex - 1]?.id) && !isCompleted;
                  return (
                    <NodeCard key={node.id} node={node} index={i} isCompleted={isCompleted} isLocked={isLocked && nodeIndex !== 0} />
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Badges */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold-400" /> Badges
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {gamification.badges.map(b => {
              const earned = progress.earnedBadges.includes(b.id);
              return (
                <div key={b.id} className={`p-3 rounded-xl text-center transition-all ${
                  earned ? 'bg-gold-500/10 border border-gold-500/30' : 'bg-zinc-900 border border-zinc-800 opacity-40'
                }`}>
                  <div className="text-2xl mb-1">{b.emoji}</div>
                  <div className="text-xs font-medium text-zinc-300">{b.nombre}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
