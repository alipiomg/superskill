import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, GraduationCap, Wrench, Library, Store, Plug, Shield, Paintbrush, Settings,
  Wand2, Brain, Zap, ArrowRight, Copy, Check, BookOpen, Compass, Target, Users,
  ExternalLink, Sparkles, Terminal, Timer, Building2, Award, MessageSquare, Mic
} from 'lucide-react';

const sectionCards = [
  { icon: Home, title: 'Inicio', desc: 'Dashboard con resumen de funcionalidades, 3 cursos, estadisticas y tu progreso', link: '/', color: 'from-forge-500 to-ember-500' },
  { icon: Brain, title: 'Curso Claude', desc: '16 lecciones sobre el ecosistema Claude: modelos, Co-work, Skills 2.0, Agents, Code e integraciones', link: '/curso-claude', color: 'from-blue-500 to-cyan-500' },
  { icon: GraduationCap, title: 'Curso Skills', desc: '16 lecciones gamificadas con XP, badges y niveles. Aprende desde cero a crear skills profesionales', link: '/curso', color: 'from-forge-500 to-forge-600' },
  { icon: Building2, title: 'Curso Paperclip', desc: '10 lecciones sobre orquestacion de agentes de IA con Paperclip: 32.000+ estrellas en GitHub', link: '/curso-paperclip', color: 'from-purple-500 to-violet-500' },
  { icon: Award, title: 'Cursos Oficiales Anthropic', desc: '20 cursos oficiales gratuitos con certificacion: API, prompting, MCP, Claude Code, agentes', link: '/cursos-oficiales', color: 'from-blue-500 to-purple-500' },
  { icon: Wrench, title: 'Constructor de Skills', desc: '5 modos: SuperConstructor (IA), Crear Skill, Micro-Skill, Mejorar y Fusionar', link: '/constructor', color: 'from-forge-500 to-forge-600' },
  { icon: Library, title: 'Catalogo', desc: '12 categorias para organizar y buscar tus skills creadas', link: '/catalogo', color: 'from-steel-500 to-forge-500' },
  { icon: Store, title: 'Marketplace', desc: '1800+ skills de 5 superrepositorios listos para instalar con un comando', link: '/marketplace', color: 'from-blue-500 to-blue-600' },
  { icon: Plug, title: 'Plugins', desc: 'Crea plugins distribuibles y aprende como funcionan en Claude Code', link: '/plugins', color: 'from-ember-500 to-ember-600' },
  { icon: Shield, title: 'ARTgents', desc: 'SuperAgentes con SuperHabilidades. Crea y coordina agentes especializados', link: '/agentes', color: 'from-purple-500 to-purple-600' },
  { icon: Paintbrush, title: 'Ejemplo: Brand Skill', desc: 'Ejemplo practico: crea tu plugin de marca personal paso a paso', link: '/ejemplo-marca', color: 'from-gold-500 to-forge-500' },
  { icon: Timer, title: 'Automatizaciones', desc: 'Cron jobs, health checks, CI/CD, backups, monitoring, alertas, SEO y mantenimiento', link: '/automatizaciones', color: 'from-cyan-500 to-cyan-600' },
  { icon: Settings, title: 'Configuracion', desc: 'Guia completa para configurar .claude, settings, hooks y repositorios', link: '/configuracion', color: 'from-zinc-500 to-zinc-600' },
];

const featuredTools = [
  {
    icon: Wand2,
    title: 'SuperConstructor',
    desc: 'Describe lo que quieres en un prompt libre y la IA genera una skill completa con nombre, comandos, triggers y SKILL.md listo para usar.',
    link: '/constructor',
    color: 'from-forge-500/10 to-ember-500/5 border-forge-500/30',
  },
  {
    icon: Store,
    title: 'Marketplace de Skills',
    desc: 'Accede a 1800+ skills de la comunidad de 5 superrepositorios. Instala repositorios completos con un solo comando.',
    link: '/marketplace',
    color: 'from-blue-500/10 to-blue-500/5 border-blue-500/30',
  },
  {
    icon: Award,
    title: 'Anthropic Academy',
    desc: '20 cursos oficiales gratuitos de Anthropic con certificacion. API, prompting, MCP, Claude Code, agentes y skills.',
    link: '/cursos-oficiales',
    color: 'from-purple-500/10 to-purple-500/5 border-purple-500/30',
  },
  {
    icon: Brain,
    title: 'Sinapsis: Aprendizaje Continuo',
    desc: 'Tu sistema aprende de como usas las skills, detecta patrones, los cristaliza como instincts y los evoluciona automaticamente.',
    link: '/curso/sinapsis-evolucion',
    color: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/30',
  },
  {
    icon: MessageSquare,
    title: 'Forjito: Asistente IA',
    desc: 'Asistente integrado con modo texto y voz. Preguntale sobre skills, navega la app, consulta tu progreso o pide ayuda.',
    link: '/',
    color: 'from-amber-500/10 to-amber-500/5 border-amber-500/30',
  },
  {
    icon: Timer,
    title: 'Automatizaciones',
    desc: 'Guia completa para montar cron jobs, CI/CD, backups, monitoring, alertas y mantenimiento de webs en produccion.',
    link: '/automatizaciones',
    color: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/30',
  },
];

const prompts = [
  { cmd: '/skill-create', desc: 'Crea una skill nueva paso a paso' },
  { cmd: '/skill-improve', desc: 'Analiza y mejora una skill existente' },
  { cmd: '/skill-fuse', desc: 'Fusiona 2+ skills en una superior' },
  { cmd: '/micro-skill', desc: 'Crea un micro-skill de <100 lineas' },
  { cmd: '/plugin-create', desc: 'Genera un plugin distribuible' },
  { cmd: '/skill-catalog --list', desc: 'Lista tus skills catalogadas' },
  { cmd: '/skill-catalog --search react', desc: 'Busca skills por keyword' },
  { cmd: '/analyze', desc: 'Detecta patrones en tus sesiones' },
  { cmd: '/instinct-status', desc: 'Ver instincts aprendidos por Sinapsis' },
  { cmd: '/evolve', desc: 'Evoluciona instincts en skills/commands' },
  { cmd: '/gotcha', desc: 'Captura un error->fix como instinct' },
];

const learningPaths = [
  {
    icon: Compass,
    title: 'Principiante',
    badge: 'Empieza aqui',
    color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    steps: [
      { label: 'Curso Claude (ecosistema completo)', link: '/curso-claude' },
      { label: 'Curso Skills (lecciones 1-4)', link: '/curso' },
      { label: 'Crear tu primer micro-skill', link: '/constructor' },
      { label: 'Cursos oficiales Anthropic', link: '/cursos-oficiales' },
    ],
  },
  {
    icon: Target,
    title: 'Constructor',
    badge: 'Ya conoces las skills',
    color: 'from-forge-500/20 to-forge-500/5 border-forge-500/30',
    badgeColor: 'bg-forge-500/10 text-forge-400 border-forge-500/20',
    steps: [
      { label: 'SuperConstructor (genera con IA)', link: '/constructor' },
      { label: 'Marketplace (1800+ skills)', link: '/marketplace' },
      { label: 'Fusionar skills', link: '/constructor' },
      { label: 'Automatizaciones de produccion', link: '/automatizaciones' },
    ],
  },
  {
    icon: Zap,
    title: 'Arquitecto',
    badge: 'Nivel avanzado',
    color: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    steps: [
      { label: 'ARTgents y SuperAgentes', link: '/agentes' },
      { label: 'Plugins distribuibles', link: '/plugins' },
      { label: 'Curso Paperclip (orquestacion)', link: '/curso-paperclip' },
      { label: 'Sinapsis: evolucion continua', link: '/curso/sinapsis-evolucion' },
    ],
  },
];

const repos = [
  { name: 'anthropics/claude-code-skills', url: 'https://github.com/anthropics/claude-code-skills' },
  { name: 'antigravity-official/skill-packs', url: 'https://github.com/antigravity-official/skill-packs' },
  { name: 'ComposioHQ/composio-skills', url: 'https://github.com/ComposioHQ/composio-skills' },
  { name: 'alirezarezvani/claude-skills', url: 'https://github.com/alirezarezvani/claude-skills' },
  { name: 'VoltAgent/claude-skills', url: 'https://github.com/VoltAgent/claude-skills' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} className="p-1.5 rounded-lg text-zinc-500 hover:text-forge-400 hover:bg-zinc-800 transition-all" title="Copiar">
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

export default function Guia() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-forge-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-forge-500/5 rounded-full blur-3xl" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forge-500/10 border border-forge-500/20 text-forge-400 text-sm font-medium mb-8">
            <BookOpen className="w-4 h-4" />
            SuperSkill Creator v3.6.0
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Guia de{' '}
            <span className="bg-gradient-to-r from-forge-400 to-ember-400 bg-clip-text text-transparent">Uso</span>
          </h1>

          <p className="text-xl text-zinc-400 mb-4 max-w-2xl mx-auto leading-relaxed">
            Todo lo que puedes hacer en SuperSkill, explicado de forma sencilla
          </p>
          <p className="text-sm text-zinc-600 max-w-xl mx-auto">
            3 cursos · 42 lecciones · 1800+ skills · 14 secciones · Asistente IA con voz · Automatizaciones · Cursos oficiales Anthropic
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-16">
        {/* Que es SuperSkill */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="bg-gradient-to-br from-forge-500/10 to-ember-500/5 border border-forge-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-forge-400" />
              <h2 className="text-2xl font-bold text-white">Que es SuperSkill?</h2>
            </div>
            <div className="space-y-3 text-zinc-300 leading-relaxed">
              <p>
                SuperSkill es tu <span className="text-forge-400 font-semibold">centro de comando</span> para crear, aprender y gestionar skills y plugins de Claude Code Desktop.
              </p>
              <p>
                <span className="text-ember-400 font-semibold">Skills</span> = instrucciones que potencian a Claude con superpoderes especificos. Incluye <span className="text-blue-400 font-semibold">3 cursos gamificados</span> (Claude, Skills, Paperclip), un directorio de <span className="text-purple-400 font-semibold">20 cursos oficiales de Anthropic</span>, un marketplace con 1800+ skills, un constructor con IA, automatizaciones y un asistente IA con voz.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Novedades v3.6 */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-white mb-6">Novedades v3.6.0</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Brain, label: 'Curso Claude', desc: '16 lecciones sobre modelos, Co-work, Skills 2.0, Agents, Code', color: 'text-blue-400' },
              { icon: Building2, label: 'Curso Paperclip', desc: '10 lecciones sobre orquestacion de agentes de IA', color: 'text-purple-400' },
              { icon: Award, label: 'Cursos Oficiales Anthropic', desc: '20 cursos gratuitos con certificacion, buscador y rutas', color: 'text-gold-400' },
              { icon: Timer, label: 'Automatizaciones', desc: 'Cron, CI/CD, backups, monitoring, alertas, SEO', color: 'text-cyan-400' },
              { icon: Mic, label: 'Forjito con Voz', desc: 'Habla con Forjito: reconocimiento de voz + respuesta hablada', color: 'text-amber-400' },
              { icon: Compass, label: 'Navegacion agrupada', desc: 'Menu lateral organizado: Aprender, Crear, Avanzado', color: 'text-forge-400' },
            ].map(n => (
              <div key={n.label} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <n.icon className={`w-5 h-5 ${n.color} mt-0.5 shrink-0`} />
                <div>
                  <h4 className="text-white font-semibold text-sm">{n.label}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Secciones de la App */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Secciones de la App</h2>
            <p className="text-zinc-500">14 secciones — navega directamente a cualquiera</p>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectionCards.map((card) => (
              <motion.div key={card.title} variants={item}>
                <Link to={card.link} className="group block bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${card.color} bg-opacity-20`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-white text-sm">{card.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">{card.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Herramientas Destacadas */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Herramientas Destacadas</h2>
            <p className="text-zinc-500">Las funcionalidades mas potentes de SuperSkill</p>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool) => (
              <motion.div key={tool.title} variants={item}>
                <Link to={tool.link} className={`group block bg-gradient-to-br ${tool.color} rounded-2xl p-6 hover:scale-[1.02] transition-all h-full`}>
                  <div className="p-3 rounded-xl bg-white/5 w-fit mb-4">
                    <tool.icon className="w-6 h-6 text-forge-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{tool.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Prompts Utiles */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="w-6 h-6 text-forge-400" />
              <h2 className="text-3xl font-bold text-white">Prompts Utiles</h2>
            </div>
            <p className="text-zinc-500">Comandos que puedes usar directamente en Claude Code</p>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
            {prompts.map((p, i) => (
              <motion.div key={p.cmd} variants={item}
                className={`flex items-center justify-between px-5 py-3.5 ${i !== prompts.length - 1 ? 'border-b border-zinc-800/60' : ''} hover:bg-zinc-800/30 transition-colors`}>
                <div className="flex items-center gap-4 min-w-0">
                  <code className="text-sm font-mono text-forge-400 bg-forge-500/10 px-3 py-1 rounded-lg shrink-0">{p.cmd}</code>
                  <span className="text-sm text-zinc-400 truncate">{p.desc}</span>
                </div>
                <CopyButton text={p.cmd} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Rutas de Aprendizaje */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Rutas de Aprendizaje</h2>
            <p className="text-zinc-500">Elige tu camino segun tu nivel</p>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <motion.div key={path.title} variants={item}>
                <div className={`bg-gradient-to-br ${path.color} rounded-2xl p-6 h-full flex flex-col`}>
                  <div className="flex items-center gap-3 mb-4">
                    <path.icon className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-bold text-white">{path.title}</h3>
                  </div>
                  <span className={`inline-block w-fit text-xs font-medium px-3 py-1 rounded-full border mb-5 ${path.badgeColor}`}>{path.badge}</span>
                  <ol className="space-y-3 flex-1">
                    {path.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <Link to={step.link} className="text-sm text-zinc-200 hover:text-forge-400 transition-colors">{step.label}</Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Comunidad y Recursos */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-forge-400" />
              <h2 className="text-3xl font-bold text-white">Comunidad y Recursos</h2>
            </div>
            <p className="text-zinc-500">Repositorios, ecosistema y mas</p>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div variants={item} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">5 SuperRepositorios</h3>
                <div className="space-y-3">
                  {repos.map((repo) => (
                    <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-zinc-400 hover:text-forge-400 transition-colors">
                      <ExternalLink className="w-4 h-4 shrink-0" />
                      <span className="font-mono text-xs">{repo.name}</span>
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={item} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recursos Oficiales</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Anthropic Academy (15 cursos)', url: 'https://anthropic.skilljar.com/' },
                    { name: 'GitHub Courses (5 notebooks)', url: 'https://github.com/anthropics/courses' },
                    { name: 'Anthropic Skills Repo', url: 'https://github.com/anthropics/skills' },
                    { name: 'Claude Documentation', url: 'https://docs.anthropic.com' },
                    { name: 'Paperclip (orquestacion)', url: 'https://github.com/paperclipai/paperclip' },
                  ].map((r) => (
                    <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-zinc-400 hover:text-forge-400 transition-colors">
                      <ExternalLink className="w-4 h-4 shrink-0" />
                      <span className="text-xs">{r.name}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div variants={item} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                <Sparkles className="w-5 h-5 text-forge-400 mb-3" />
                <h4 className="font-semibold text-white text-sm mb-1">superARTgents.com</h4>
                <p className="text-xs text-zinc-500">Proximamente</p>
              </motion.div>
              <motion.div variants={item} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                <Brain className="w-5 h-5 text-forge-400 mb-3" />
                <h4 className="font-semibold text-white text-sm mb-1">Sinapsis Ecosystem</h4>
                <p className="text-xs text-zinc-500">Aprendizaje continuo integrado</p>
              </motion.div>
              <motion.div variants={item} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                <MessageSquare className="w-5 h-5 text-forge-400 mb-3" />
                <h4 className="font-semibold text-white text-sm mb-1">Forjito Asistente</h4>
                <p className="text-xs text-zinc-500">Texto + voz, 40+ conceptos, navegacion</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Footer CTA */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Listo para empezar?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">Elige tu camino y comienza a crear skills increibles</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/curso-claude"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all">
              <Brain className="w-6 h-6" />
              Curso Claude
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/constructor"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-zinc-800 text-zinc-200 font-bold text-lg hover:bg-zinc-700 transition-all border border-zinc-700">
              <Wrench className="w-5 h-5" />
              Crear una Skill
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
