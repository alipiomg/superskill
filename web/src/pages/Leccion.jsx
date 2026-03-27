import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Lightbulb, Code, Trophy, BookMarked } from 'lucide-react';
import { courseNodes } from '../data/courseData';
import { useProgress } from '../hooks/useProgress';
import CodeBlock from '../components/CodeBlock';

export default function Leccion() {
  const { nodeId } = useParams();
  const navigate = useNavigate();
  const { progress, completeNode } = useProgress();

  const node = courseNodes.find(n => n.id === nodeId);
  if (!node) return <div className="p-12 text-center text-zinc-500">Lección no encontrada</div>;

  const currentIndex = courseNodes.findIndex(n => n.id === nodeId);
  const prev = currentIndex > 0 ? courseNodes[currentIndex - 1] : null;
  const next = currentIndex < courseNodes.length - 1 ? courseNodes[currentIndex + 1] : null;
  const isCompleted = progress.completedNodes.includes(nodeId);

  const handleComplete = () => {
    completeNode(nodeId, node.xp);
    if (next) {
      setTimeout(() => navigate(`/curso/${next.id}`), 500);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 lg:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <Link to="/curso" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al curso
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-zinc-600">#{node.orden}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-forge-500/10 text-forge-400 capitalize">{node.tipo}</span>
            <span className="text-xs text-zinc-600">{node.zona}</span>
            <span className="text-sm font-mono text-forge-400 ml-auto">+{node.xp} XP</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">{node.titulo}</h1>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Explicación */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800"
          >
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <BookOpen className="w-5 h-5 text-forge-400" /> Explicación
            </h2>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line">{node.explicacion}</p>
          </motion.section>

          {/* Metáfora */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-forge-500/5 to-gold-500/5 border border-forge-500/10"
          >
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <Lightbulb className="w-5 h-5 text-gold-400" /> Metáfora
            </h2>
            <p className="text-zinc-300 leading-relaxed italic">{node.metafora}</p>
          </motion.section>

          {/* Ejemplo de código */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <Code className="w-5 h-5 text-steel-400" /> Ejemplo
            </h2>
            <CodeBlock code={node.ejemplo} language="markdown" />
          </motion.section>

          {/* Mini Reto */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-ember-500/5 border border-ember-500/20"
          >
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <Trophy className="w-5 h-5 text-ember-400" /> Mini-Reto: {node.miniReto.titulo}
            </h2>
            <p className="text-zinc-300 mb-4">{node.miniReto.descripcion}</p>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-zinc-400">Criterios de éxito:</p>
              {node.miniReto.criterios.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-zinc-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500/50 shrink-0 mt-0.5" />
                  {c}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Glosario */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800"
          >
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <BookMarked className="w-5 h-5 text-emerald-400" /> Glosario
            </h2>
            <dl className="space-y-3">
              {node.glosario.map(g => (
                <div key={g.termino}>
                  <dt className="font-mono text-sm font-semibold text-forge-400">{g.termino}</dt>
                  <dd className="text-sm text-zinc-400 ml-4">{g.definicion}</dd>
                </div>
              ))}
            </dl>
          </motion.section>
        </div>

        {/* Complete + Navigation */}
        <div className="mt-10 space-y-4">
          {!isCompleted && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleComplete}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-forge-500 to-ember-500 text-white font-bold text-lg shadow-xl shadow-forge-500/20 hover:shadow-forge-500/40 transition-shadow flex items-center justify-center gap-3"
            >
              <CheckCircle className="w-6 h-6" />
              Completar Lección (+{node.xp} XP)
            </motion.button>
          )}
          {isCompleted && (
            <div className="w-full py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-lg text-center flex items-center justify-center gap-3">
              <CheckCircle className="w-6 h-6" />
              Lección completada · +{node.xp} XP ganados
            </div>
          )}
          <div className="flex justify-between">
            {prev ? (
              <Link to={`/curso/${prev.id}`} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {prev.titulo}
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/curso/${next.id}`} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                {next.titulo} <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link to="/curso" className="flex items-center gap-2 text-sm text-forge-400 hover:text-forge-300 transition-colors">
                Ver progreso <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
