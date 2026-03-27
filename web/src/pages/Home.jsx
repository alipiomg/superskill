import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hammer, GraduationCap, Wrench, Library, Plug, Sparkles, ArrowRight, Zap, GitMerge, RefreshCw, Wand2, Store, Shield, Paintbrush } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import XpBar from '../components/XpBar';
import { gamification, courseNodes } from '../data/courseData';

const features = [
  { icon: Wand2, title: 'SuperConstructor', desc: 'Describe y genera skills completas con IA en segundos', color: 'from-forge-500 to-ember-500', link: '/constructor', featured: true },
  { icon: Store, title: 'Marketplace', desc: '1800+ skills de 5 superrepositorios listos para instalar', color: 'from-blue-500 to-blue-600', link: '/marketplace' },
  { icon: Shield, title: 'ARTgents', desc: 'SuperAgentes con SuperHabilidades: creART una nueva CREAlidART', color: 'from-purple-500 to-purple-600', link: '/agentes' },
  { icon: Wrench, title: 'Constructor', desc: 'Crear, micro-skills, mejorar y fusionar paso a paso', color: 'from-forge-500 to-forge-600', link: '/constructor' },
  { icon: Paintbrush, title: 'Ejemplo Marca', desc: 'Crea tu plugin de branding personal paso a paso', color: 'from-gold-500 to-forge-500', link: '/ejemplo-marca' },
  { icon: GitMerge, title: 'Fusionar', desc: 'Combina 2+ skills: merge, compose o layer', color: 'from-steel-500 to-steel-600', link: '/constructor' },
  { icon: Plug, title: 'Plugins', desc: 'Crea plugins distribuibles para Claude Code', color: 'from-ember-500 to-ember-600', link: '/plugins' },
  { icon: Library, title: 'Catálogo', desc: '12 categorías para organizar tus skills', color: 'from-steel-500 to-forge-500', link: '/catalogo' },
  { icon: Sparkles, title: 'Sinapsis', desc: 'Aprende, evoluciona y mejora automáticamente', color: 'from-emerald-500 to-emerald-600', link: '/agentes' },
];

export default function Home() {
  const { progress, level, completionPercent } = useProgress();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-forge-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-forge-500/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forge-500/10 border border-forge-500/20 text-forge-400 text-sm font-medium mb-8">
            <Hammer className="w-4 h-4" />
            SuperSkill Creator · v1.0
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            La Forja de{' '}
            <span className="bg-gradient-to-r from-forge-400 via-ember-400 to-gold-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h1>

          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Crea SuperHéroes digitales con SuperHabilidades. Constructor con IA, Marketplace de 1800+ skills,
            ARTgents, plugins y un curso gamificado. creART una nueva CREAlidART.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/curso"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-forge-500 to-ember-500 text-white font-bold text-lg shadow-xl shadow-forge-500/25 hover:shadow-forge-500/40 hover:scale-105 transition-all"
            >
              <GraduationCap className="w-6 h-6" />
              Empezar el Curso
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/constructor"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-zinc-800 text-zinc-200 font-bold text-lg hover:bg-zinc-700 transition-all border border-zinc-700"
            >
              <Wrench className="w-5 h-5" />
              Crear una Skill
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Progress Card */}
      {progress.startedAt && (
        <section className="px-6 -mt-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto p-6 rounded-2xl bg-zinc-900/80 backdrop-blur border border-zinc-800"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Tu Progreso</h3>
              <span className="text-sm text-zinc-500">{progress.completedNodes.length}/{courseNodes.length} lecciones · {completionPercent}%</span>
            </div>
            <XpBar current={progress.currentXp} max={gamification.totalXp} level={level} />
          </motion.div>
        </section>
      )}

      {/* Features Grid */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Todo lo que necesitas para dominar skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={f.link} className="group block p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all hover:scale-[1.02]">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-zinc-500">{f.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { n: '1800+', label: 'Skills', sub: 'En el Marketplace' },
            { n: '16', label: 'Lecciones', sub: 'Curso gamificado + ARTgents' },
            { n: '705', label: 'XP Total', sub: '6 niveles de maestría' },
            { n: '9', label: 'Secciones', sub: 'Curso, Constructor, ARTgents...' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <div className="text-4xl font-black bg-gradient-to-r from-forge-400 to-gold-400 bg-clip-text text-transparent">{s.n}</div>
              <div className="font-semibold text-zinc-300 mt-1">{s.label}</div>
              <div className="text-xs text-zinc-600 mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-sm text-zinc-600">
        <p>SuperSkill Creator · SalgadoIA · Sinapsis Ecosystem</p>
      </footer>
    </div>
  );
}
