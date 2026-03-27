import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Palette, Zap, Users, GitBranch, Layers, ArrowRight,
  ChevronDown, ChevronRight, Terminal, Folder, Star, ExternalLink,
  Brain, Sparkles, Brush, Video, Scale, Landmark, TrendingUp, Code,
  Eye, RefreshCw
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

/* ─── collapsible section wrapper ─── */
function Section({ title, icon: Icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 text-left group"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forge-500/20 to-ember-500/20 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-forge-500/40 transition-colors">
          <Icon className="w-5 h-5 text-forge-400" />
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white flex-1">{title}</h2>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-zinc-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-6 pl-[52px]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── data ─── */
const heroCards = [
  { icon: Shield, title: 'SuperAgente', desc: 'Un superheroe digital con superskills asignadas', color: 'from-forge-500 to-forge-600' },
  { icon: Palette, title: 'ARTgent', desc: 'Agente con arte, cuidado y codigo abierto', color: 'from-ember-500 to-ember-600' },
  { icon: Zap, title: 'SuperSkills', desc: 'Las superhabilidades que potencian a cada agente', color: 'from-yellow-500 to-amber-500' },
];

const artgentCategories = [
  { emoji: '\uD83C\uDFA8', icon: Brush, label: 'Diseno & Branding', tag: 'Design ARTgent', color: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/30', text: 'text-pink-400' },
  { emoji: '\uD83D\uDDBC\uFE0F', icon: Layers, label: 'Imagen & Visual', tag: 'Image ARTgent', color: 'from-purple-500/20 to-violet-500/20', border: 'border-purple-500/30', text: 'text-purple-400' },
  { emoji: '\uD83C\uDFAC', icon: Video, label: 'Video & Motion', tag: 'Video ARTgent', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
  { emoji: '\u2696\uFE0F', icon: Scale, label: 'Legal & Compliance', tag: 'Legal ARTgent', color: 'from-slate-500/20 to-zinc-500/20', border: 'border-slate-500/30', text: 'text-slate-400' },
  { emoji: '\uD83D\uDCB0', icon: TrendingUp, label: 'Economico & Financiero', tag: 'Finance ARTgent', color: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  { emoji: '\uD83C\uDFDB\uFE0F', icon: Landmark, label: 'Fiscal & Hacienda', tag: 'Tax ARTgent', color: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500/30', text: 'text-amber-400' },
  { emoji: '\uD83D\uDCE2', icon: Star, label: 'Marketing & Growth', tag: 'Marketing ARTgent', color: 'from-forge-500/20 to-ember-500/20', border: 'border-forge-500/30', text: 'text-forge-400' },
  { emoji: '\uD83D\uDCBB', icon: Code, label: 'Desarrollo & Tech', tag: 'Dev ARTgent', color: 'from-cyan-500/20 to-sky-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
];

const pluginStructure = `~/.claude/plugins/mi-superagente/
\u251C\u2500\u2500 plugin.json
\u251C\u2500\u2500 skills/
\u2502   \u251C\u2500\u2500 skill-1/SKILL.md
\u2502   \u251C\u2500\u2500 skill-2/SKILL.md
\u2502   \u2514\u2500\u2500 skill-3/SKILL.md
\u2514\u2500\u2500 agents/
    \u2514\u2500\u2500 coordinator.md`;

const pluginJson = `{
  "name": "brand-hero",
  "description": "SuperAgente de marca y branding",
  "version": "1.0.0",
  "skills": ["brand-config", "doc-branding", "asset-generator"],
  "agent": "coordinator"
}`;

const installCmd = `# Instalar desde GitHub
git clone https://github.com/user/brand-hero ~/.claude/plugins/brand-hero`;

const brandHeroDiagram = `SuperAgente "BrandHero"
\u251C\u2500\u2500 \uD83C\uDFA8 Skill: Diseno de marca
\u251C\u2500\u2500 \uD83D\uDCC4 Skill: Generador de documentos
\u251C\u2500\u2500 \uD83D\uDDBC\uFE0F Skill: Assets de imagen
\u2514\u2500\u2500 \uD83D\uDCCA Skill: Auditoria de marca`;

const coordinatorDiagram = `Coordinador (coordinator.md)
\u2502
\u251C\u2500\u2500 \u2192 Agente 1: BrandDesigner
\u2502   \u251C\u2500\u2500 skill: logo-generator
\u2502   \u2514\u2500\u2500 skill: color-palette
\u2502
\u251C\u2500\u2500 \u2192 Agente 2: ContentWriter
\u2502   \u251C\u2500\u2500 skill: copywriting
\u2502   \u2514\u2500\u2500 skill: seo-optimizer
\u2502
\u2514\u2500\u2500 \u2192 Agente 3: DataAnalyst
    \u251C\u2500\u2500 skill: metrics-dashboard
    \u2514\u2500\u2500 skill: report-generator`;

const sinapsisPrompt = `# Generar curso de ARTgents con sinapsis-course-architect

/skill sinapsis-course-architect \\
  --tema "ARTgents: Agentes con Arte en Claude Code" \\
  --modulos 8 \\
  --nivel intermedio \\
  --idioma es \\
  --incluir "superagentes,skills,coordinadores,marketplace"`;

/* ─── main page ─── */
export default function Agentes() {
  return (
    <div className="min-h-screen px-6 py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">

        {/* ═══════════ HERO ═══════════ */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-14 text-center">
          <h1 className="text-4xl lg:text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-forge-400 to-ember-400 bg-clip-text text-transparent">
              SuperAgentes &amp; ARTgents
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-2">
            Crea SuperHeroes digitales con SuperHabilidades. Agentes con Arte, carino y codigo abierto.
          </p>
          <p className="text-sm font-mono bg-gradient-to-r from-forge-400 to-ember-400 bg-clip-text text-transparent">
            creART una nueva CREAlidART
          </p>
        </motion.div>

        {/* concept cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {heroCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4`}>
                <c.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">{c.title}</h3>
              <p className="text-sm text-zinc-500">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══════════ SECTIONS ═══════════ */}

        {/* 2 — Que es un SuperAgente */}
        <Section title="¿Qué es un SuperAgente?" icon={Shield} defaultOpen>
          <p className="text-zinc-400 mb-4">
            Un agente es como un superheroe: le asignas atributos y superpoderes (skills).
            Los atributos pueden ser: diseno, imagen, video, legal, economico, fiscal-hacienda, marketing, desarrollo y mas.
          </p>
          <p className="text-zinc-400 mb-4">
            Un plugin es como un superagente: multiples skills combinadas en un solo paquete.
            El directorio <code className="text-forge-400 font-mono text-sm">.claude-plugin/</code> organiza
            multiples skills dentro de un agente.
          </p>
          <div className="mb-4">
            <CodeBlock code={brandHeroDiagram} language="tree" />
          </div>
        </Section>

        {/* 3 — ARTgents */}
        <Section title="ARTgents: Agentes con Arte" icon={Palette}>
          <p className="text-zinc-400 mb-4">
            ARTgents son agentes con arte, con carino, cuidado y ademas estan hechos en codigo abierto,
            evolucionandose y permitiendo creART una nueva CREAlidART.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {artgentCategories.map((cat, i) => (
              <motion.div
                key={cat.tag}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${cat.color} border ${cat.border}`}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{cat.label}</p>
                  <p className={`text-xs font-mono ${cat.text}`}>{cat.tag}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* 4 — Construir un SuperAgente */}
        <Section title="Construir un SuperAgente" icon={Folder}>
          <p className="text-zinc-500 text-sm mb-3 font-semibold uppercase tracking-wider">Step 1 — Estructura del plugin</p>
          <CodeBlock code={pluginStructure} language="tree" />

          <p className="text-zinc-500 text-sm mt-6 mb-3 font-semibold uppercase tracking-wider">Step 2 — plugin.json</p>
          <CodeBlock code={pluginJson} language="json" />

          <p className="text-zinc-500 text-sm mt-6 mb-3 font-semibold uppercase tracking-wider">Step 3 — Instalar desde GitHub</p>
          <CodeBlock code={installCmd} language="bash" />
        </Section>

        {/* 5 — Coordinador de Agentes */}
        <Section title="Coordinador de Agentes" icon={GitBranch}>
          <p className="text-zinc-400 mb-4">
            Un coordinador maestro orquesta multiples agentes. Cada agente tiene sus propias skills
            y el coordinador decide cual agente maneja cada tarea.
          </p>
          <CodeBlock code={coordinatorDiagram} language="tree" />
          <div className="mt-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <p className="text-sm text-zinc-400">
              <span className="text-forge-400 font-semibold">Tip:</span> El archivo
              <code className="text-forge-400 font-mono mx-1">coordinator.md</code>
              contiene las instrucciones para que el coordinador decida que agente activar
              segun el contexto de la tarea.
            </p>
          </div>
        </Section>

        {/* 6 — Marketplace */}
        <Section title="Marketplace de SuperAgentes" icon={Star}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: 'superARTgents.com', desc: 'Marketplace oficial de ARTgents', badge: 'Proximamente', color: 'border-forge-500/30' },
              { name: 'GitHub Plugins', desc: 'Repositorios publicos de plugins', badge: 'Disponible', color: 'border-emerald-500/30' },
              { name: 'Community Skills', desc: 'Skills compartidas por la comunidad', badge: 'Disponible', color: 'border-emerald-500/30' },
              { name: 'Enterprise Agents', desc: 'Agentes para equipos y empresas', badge: 'Proximamente', color: 'border-amber-500/30' },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`bg-zinc-900/60 border ${item.color} rounded-2xl p-5`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    item.badge === 'Disponible'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* 7 — Evolucion con Sinapsis */}
        <Section title="Evolución con Sinapsis" icon={Brain}>
          <p className="text-zinc-400 mb-6">
            Sinapsis aprende del uso de los agentes. Los agentes mejoran con el tiempo a traves
            de la deteccion de patrones. Las skills pueden ser promovidas, evolucionadas y combinadas.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {[
              { icon: Eye, label: 'Usar', color: 'text-blue-400' },
              { icon: Sparkles, label: 'Observar', color: 'text-purple-400' },
              { icon: Brain, label: 'Aprender', color: 'text-forge-400' },
              { icon: RefreshCw, label: 'Mejorar', color: 'text-emerald-400' },
              { icon: TrendingUp, label: 'Evolucionar', color: 'text-ember-400' },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800"
              >
                <step.icon className={`w-6 h-6 ${step.color}`} />
                <span className="text-xs text-zinc-400 font-medium">{step.label}</span>
                {i < 4 && <ArrowRight className="w-3 h-3 text-zinc-700 hidden sm:block absolute -right-3" />}
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-zinc-500">
            <span className="text-forge-400 font-semibold">El ciclo:</span> usar &rarr; observar &rarr; aprender &rarr; mejorar &rarr; evolucionar
          </p>
        </Section>

        {/* ═══════════ CTA ═══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 mb-10 p-8 rounded-2xl bg-gradient-to-r from-forge-500/5 to-ember-500/5 border border-transparent"
          style={{ borderImage: 'linear-gradient(to right, var(--tw-gradient-from, #f97316), var(--tw-gradient-to, #ef4444)) 1' }}
        >
          <div className="bg-zinc-900/80 rounded-2xl p-8 border border-zinc-800 text-center">
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-ember-500/10 text-ember-400 border border-ember-500/30 mb-4 inline-block">
              Proximamente
            </span>
            <h2 className="text-2xl lg:text-3xl font-black mb-3">
              <span className="bg-gradient-to-r from-forge-400 to-ember-400 bg-clip-text text-transparent">
                superARTgents.com
              </span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-6">
              El mismo sistema de aprendizaje de SuperSkills, evolucionado con Sinapsis y enfocado a crear,
              organizar y coordinar tus propios agentes.
            </p>
            <CodeBlock code={sinapsisPrompt} language="bash" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
