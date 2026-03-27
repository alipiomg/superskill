import { motion } from 'framer-motion';
import { Settings, FolderOpen, Download, Star, ExternalLink, Shield, Terminal, Zap, Copy, Check, ChevronDown, ChevronRight, BookOpen, Layers, Plug, Wrench } from 'lucide-react';
import { useState } from 'react';
import CodeBlock from '../components/CodeBlock';

/* ─── SUPER REPOSITORIOS ─── */
const superRepos = [
  {
    emoji: '⭐',
    skills: '1.200+',
    name: 'sickn33/antigravity-awesome-skills',
    url: 'https://github.com/sickn33/antigravity-awesome-skills',
    tipo: 'Universal',
    desc: 'La colección más grande y versátil. Playbooks para planificación, código, debugging, testing y seguridad. Compatible con 10+ plataformas.',
    tags: ['Claude Code', 'Cursor', 'Copilot', 'Gemini CLI'],
    color: 'from-yellow-500 to-amber-500',
    stars: 5,
  },
  {
    emoji: '🤖',
    skills: '150+',
    name: 'ComposioHQ/awesome-claude-skills',
    url: 'https://github.com/ComposioHQ/awesome-claude-skills',
    tipo: 'Automatización',
    desc: 'Convierte a Claude en un agente real. Emails automáticos, issues en repos, publicación en Slack, conexión con +1.000 apps.',
    tags: ['Emails', 'Slack', 'GitHub Issues', '+1.000 apps'],
    color: 'from-blue-500 to-cyan-500',
    stars: 4,
  },
  {
    emoji: '🏭',
    skills: '192',
    name: 'alirezarezvani/claude-skills',
    url: 'https://github.com/alirezarezvani/claude-skills',
    tipo: 'Producción',
    desc: '17 agentes completos, 254 herramientas Python, soporte para 11 plataformas. Nivel production-ready para proyectos empresariales.',
    tags: ['17 agentes', '254 tools Python', '11 plataformas'],
    color: 'from-purple-500 to-violet-500',
    stars: 4,
  },
  {
    emoji: '🎨',
    skills: '200+',
    name: 'VoltAgent/awesome-agent-skills',
    url: 'https://github.com/VoltAgent/awesome-agent-skills',
    tipo: 'Creativo',
    desc: 'Skills oficiales de Anthropic incluidas. Word, PowerPoint, diseño frontend, arte generativo y mucho más.',
    tags: ['Oficial Anthropic', 'Word', 'PowerPoint', 'Arte generativo'],
    color: 'from-pink-500 to-rose-500',
    stars: 4,
  },
  {
    emoji: '✅',
    skills: '17',
    name: 'anthropics/skills',
    url: 'https://github.com/anthropics/skills',
    tipo: 'Oficial',
    desc: 'El repositorio oficial del equipo de Anthropic. Arte y creatividad, testing y QA, branding empresarial. Máxima confiabilidad.',
    tags: ['Oficial Anthropic', 'Arte', 'Testing QA', 'Branding'],
    color: 'from-emerald-500 to-green-500',
    stars: 5,
  },
];

/* ─── SKILLS RECOMENDADAS POR CATEGORÍA ─── */
const recommendedSkills = [
  { cat: 'Productividad', skills: ['git-commit-gen', 'gitignore-gen', 'editorconfig-gen', 'project-scaffolder'], source: 'antigravity' },
  { cat: 'Documentación', skills: ['readme-gen', 'changelog-writer', 'api-docs-gen', 'jsdoc-annotator'], source: 'antigravity' },
  { cat: 'Testing', skills: ['unit-test-gen', 'e2e-test-gen', 'test-coverage-check', 'mock-data-gen'], source: 'claude-skills' },
  { cat: 'Automatización', skills: ['email-sender', 'slack-notifier', 'github-issue-creator', 'cron-scheduler'], source: 'composio' },
  { cat: 'Frontend', skills: ['react-component-gen', 'tailwind-optimizer', 'responsive-checker', 'a11y-auditor'], source: 'volt-agent' },
  { cat: 'Seguridad', skills: ['secret-scanner', 'dependency-audit', 'owasp-checker', 'env-validator'], source: 'antigravity' },
];

/* ─── CONFIGURACIÓN RECOMENDADA ─── */
const settingsJson = `{
  // ~/.claude/settings.json — Configuración recomendada
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Bash(node:*)",
      "Read",
      "Write",
      "Edit"
    ]
  },
  "env": {
    "CLAUDE_SKILLS_DIR": "~/.claude/skills",
    "CLAUDE_PLUGINS_DIR": "~/.claude/plugins"
  }
}`;

const folderStructure = `~/.claude/
├── settings.json              # Configuración global
├── settings.local.json        # Overrides locales (no commitear)
├── CLAUDE.md                  # Instrucciones personales para Claude
│
├── skills/                    # 📁 TUS SKILLS LOCALES
│   ├── mi-skill/
│   │   ├── SKILL.md           # Skill principal
│   │   ├── commands/          # Comandos /nombre
│   │   ├── agents/            # Subagentes
│   │   ├── references/        # Docs extensas
│   │   └── templates/         # Plantillas
│   ├── otro-skill/
│   │   └── SKILL.md
│   └── ...
│
├── plugins/                   # 📁 PLUGINS (MARKETPLACES)
│   ├── known_marketplaces.json
│   ├── blocklist.json
│   └── marketplaces/
│       ├── claude-plugins-official/
│       │   └── plugins/
│       │       └── skill-creator/
│       │           ├── .claude-plugin/plugin.json
│       │           └── skills/
│       └── mi-marketplace/
│           └── plugins/
│
└── hooks/                     # 📁 HOOKS (automatizaciones)
    ├── pre-tool-use.sh        # Se ejecuta ANTES de cada herramienta
    └── post-tool-use.sh       # Se ejecuta DESPUÉS de cada herramienta`;

const installSteps = `# ═══════════════════════════════════════════
# PASO 1: Crear la estructura base
# ═══════════════════════════════════════════
mkdir -p ~/.claude/skills
mkdir -p ~/.claude/plugins/marketplaces

# ═══════════════════════════════════════════
# PASO 2: Instalar repositorios de skills
# ═══════════════════════════════════════════

# ⭐ Antigravity (1.200+ skills universales)
git clone https://github.com/sickn33/antigravity-awesome-skills.git \\
  ~/.claude/plugins/marketplaces/antigravity

# 🤖 Composio (150+ skills de automatización)
git clone https://github.com/ComposioHQ/awesome-claude-skills.git \\
  ~/.claude/plugins/marketplaces/composio

# 🏭 Claude Skills (192 skills production-ready)
git clone https://github.com/alirezarezvani/claude-skills.git \\
  ~/.claude/plugins/marketplaces/claude-skills

# 🎨 VoltAgent (200+ skills creativos)
git clone https://github.com/VoltAgent/awesome-agent-skills.git \\
  ~/.claude/plugins/marketplaces/volt-agent

# ✅ Anthropic Oficial (17 skills oficiales)
git clone https://github.com/anthropics/skills.git \\
  ~/.claude/plugins/marketplaces/anthropic-official

# ═══════════════════════════════════════════
# PASO 3: Registrar marketplaces
# ═══════════════════════════════════════════
# Añade a ~/.claude/plugins/known_marketplaces.json:
cat > ~/.claude/plugins/known_marketplaces.json << 'EOF'
{
  "antigravity": {
    "url": "https://github.com/sickn33/antigravity-awesome-skills"
  },
  "composio": {
    "url": "https://github.com/ComposioHQ/awesome-claude-skills"
  },
  "claude-skills": {
    "url": "https://github.com/alirezarezvani/claude-skills"
  },
  "volt-agent": {
    "url": "https://github.com/VoltAgent/awesome-agent-skills"
  },
  "anthropic-official": {
    "url": "https://github.com/anthropics/skills"
  }
}
EOF

echo "✅ 1.750+ skills instaladas y listas"`;

const claudeMd = `# CLAUDE.md — Instrucciones personales para Claude Code
# Coloca este archivo en ~/.claude/CLAUDE.md o en la raíz del proyecto

## Identidad
Soy un desarrollador full-stack. Mi stack principal:
- Frontend: React 19, Vite, Tailwind CSS 4
- Backend: Node.js, Express
- DB: PostgreSQL, MongoDB
- Deploy: Vercel, Railway

## Preferencias de código
- TypeScript siempre que sea posible
- Componentes funcionales con hooks
- Tailwind para estilos (nunca CSS-in-JS)
- Tests con Vitest
- ESLint + Prettier configurados

## Skills favoritas
- /skill-create para generar skills
- /micro-skill para tareas rápidas
- /skill-improve para mejorar skills existentes

## Reglas
- Responder siempre en español
- Usar conventional commits
- No crear archivos de documentación sin pedir
- Preferir editar archivos existentes sobre crear nuevos`;

const hooksConfig = `{
  // settings.json — Configuración de Hooks
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/pre-tool-use.sh \\"$TOOL_NAME\\" \\"$INPUT\\""
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/post-tool-use.sh \\"$TOOL_NAME\\" \\"$OUTPUT\\""
          }
        ]
      }
    ]
  }
}`;

/* ─── COLLAPSIBLE SECTION ─── */
function Section({ title, icon: Icon, children, defaultOpen = false, color = 'forge' }) {
  const [open, setOpen] = useState(defaultOpen);
  const colors = {
    forge: 'from-forge-500 to-forge-600',
    steel: 'from-steel-500 to-steel-600',
    ember: 'from-ember-500 to-ember-600',
    emerald: 'from-emerald-500 to-emerald-600',
    gold: 'from-gold-500 to-forge-500',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-zinc-800 overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 bg-zinc-900/50 hover:bg-zinc-900/80 transition-colors text-left"
      >
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-white flex-1">{title}</h3>
        {open ? <ChevronDown className="w-5 h-5 text-zinc-500" /> : <ChevronRight className="w-5 h-5 text-zinc-500" />}
      </button>
      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="p-6 border-t border-zinc-800 space-y-6">
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─── MAIN PAGE ─── */
export default function Configuracion() {
  const [copiedCmd, setCopiedCmd] = useState(null);

  const copyCmd = async (text, id) => {
    await navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="min-h-screen px-6 py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">Configuración de Claude Code</h1>
          <p className="text-zinc-500 mb-4">Guía completa para configurar tu carpeta .claude, instalar skills y tener tu ecosistema listo</p>
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="px-3 py-1 rounded-full bg-forge-500/10 text-forge-400 text-xs font-medium">Setup inicial</span>
            <span className="px-3 py-1 rounded-full bg-steel-500/10 text-steel-400 text-xs font-medium">1.750+ skills disponibles</span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">5 superrepositorios</span>
          </div>
        </motion.div>

        {/* Quick Start Banner */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-forge-500/10 via-ember-500/5 to-gold-500/10 border border-forge-500/20 mb-10"
        >
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-gold-400" /> Quick Start — 3 minutos
          </h2>
          <p className="text-sm text-zinc-400 mb-4">Ejecuta estos comandos para tener todo configurado:</p>
          <div className="space-y-2">
            {[
              { cmd: 'mkdir -p ~/.claude/skills ~/.claude/plugins/marketplaces', label: '1. Crear estructura' },
              { cmd: 'git clone https://github.com/anthropics/skills.git ~/.claude/plugins/marketplaces/anthropic-official', label: '2. Skills oficiales' },
              { cmd: 'git clone https://github.com/sickn33/antigravity-awesome-skills.git ~/.claude/plugins/marketplaces/antigravity', label: '3. +1.200 skills' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-xs text-zinc-500 shrink-0">{item.label}</span>
                <code className="text-sm font-mono text-forge-400 flex-1 overflow-x-auto">{item.cmd}</code>
                <button onClick={() => copyCmd(item.cmd, i)} className="text-zinc-500 hover:text-zinc-300 shrink-0">
                  {copiedCmd === i ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">

          {/* SECTION 1: Estructura de carpetas */}
          <Section title="Estructura de la carpeta .claude" icon={FolderOpen} color="forge" defaultOpen={true}>
            <p className="text-zinc-400 text-sm mb-4">
              La carpeta <code className="text-forge-400 bg-zinc-800 px-2 py-0.5 rounded">~/.claude/</code> es el corazón de Claude Code.
              Aquí viven tus skills, plugins, hooks y configuración. Esta es la estructura recomendada:
            </p>
            <CodeBlock code={folderStructure} language="tree" />
            <div className="mt-4 p-4 rounded-xl bg-forge-500/5 border border-forge-500/10">
              <p className="text-sm text-zinc-400">
                <strong className="text-forge-400">Tip:</strong> La carpeta <code className="text-forge-400">skills/</code> es para tus skills locales (solo tú las usas).
                La carpeta <code className="text-forge-400">plugins/marketplaces/</code> es para skills instaladas desde repos externos.
              </p>
            </div>
          </Section>

          {/* SECTION 2: settings.json */}
          <Section title="Configurar settings.json" icon={Settings} color="steel">
            <p className="text-zinc-400 text-sm mb-4">
              El archivo <code className="text-steel-400 bg-zinc-800 px-2 py-0.5 rounded">~/.claude/settings.json</code> controla permisos,
              variables de entorno y hooks. Esta es la configuración recomendada para empezar:
            </p>
            <CodeBlock code={settingsJson} language="json" />

            <h4 className="font-semibold text-white mt-6 mb-3">Archivos de configuración</h4>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Archivo</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Alcance</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Uso</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 font-mono text-xs text-forge-400">~/.claude/settings.json</td>
                    <td className="py-3 px-4">Global</td>
                    <td className="py-3 px-4">Permisos, hooks, env vars para TODOS los proyectos</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 font-mono text-xs text-forge-400">~/.claude/settings.local.json</td>
                    <td className="py-3 px-4">Global privado</td>
                    <td className="py-3 px-4">Overrides que NO se commitean (API keys, etc.)</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 font-mono text-xs text-forge-400">.claude/settings.json</td>
                    <td className="py-3 px-4">Proyecto</td>
                    <td className="py-3 px-4">Config específica del proyecto (se commitea)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs text-forge-400">.claude/settings.local.json</td>
                    <td className="py-3 px-4">Proyecto privado</td>
                    <td className="py-3 px-4">Overrides del proyecto (NO commitear)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* SECTION 3: CLAUDE.md */}
          <Section title="Personalizar CLAUDE.md" icon={BookOpen} color="emerald">
            <p className="text-zinc-400 text-sm mb-4">
              <code className="text-emerald-400 bg-zinc-800 px-2 py-0.5 rounded">CLAUDE.md</code> es tu archivo de instrucciones personales.
              Claude lo lee al inicio de cada sesión. Ponlo en <code className="text-emerald-400">~/.claude/CLAUDE.md</code> (global)
              o en la raíz del proyecto (por proyecto).
            </p>
            <CodeBlock code={claudeMd} language="markdown" />
            <div className="mt-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-sm text-zinc-400">
                <strong className="text-emerald-400">Tip:</strong> Incluye tu stack, tus preferencias de código, y tus skills favoritas.
                Claude las recordará en cada sesión.
              </p>
            </div>
          </Section>

          {/* SECTION 4: Hooks */}
          <Section title="Configurar Hooks (automatizaciones)" icon={Zap} color="gold">
            <p className="text-zinc-400 text-sm mb-4">
              Los hooks son scripts que se ejecutan automáticamente antes o después de cada herramienta.
              Sirven para: logging, validación, observación de patrones (Sinapsis), y automatizaciones.
            </p>
            <CodeBlock code={hooksConfig} language="json" />

            <h4 className="font-semibold text-white mt-6 mb-3">Tipos de hooks</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'PreToolUse', desc: 'Se ejecuta ANTES de cada herramienta. Útil para validar, bloquear o modificar input.', color: 'text-gold-400' },
                { name: 'PostToolUse', desc: 'Se ejecuta DESPUÉS de cada herramienta. Útil para logging, observación y métricas.', color: 'text-forge-400' },
                { name: 'Notification', desc: 'Se ejecuta cuando Claude envía una notificación. Para alertas personalizadas.', color: 'text-steel-400' },
                { name: 'Stop', desc: 'Se ejecuta cuando Claude termina una tarea. Para limpieza y reportes finales.', color: 'text-emerald-400' },
              ].map(h => (
                <div key={h.name} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <h5 className={`font-mono font-semibold ${h.color} mb-1`}>{h.name}</h5>
                  <p className="text-xs text-zinc-500">{h.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* SECTION 5: SUPER REPOSITORIOS */}
          <Section title="SuperRepositorios de Skills" icon={Star} color="gold" defaultOpen={true}>
            <p className="text-zinc-400 text-sm mb-6">
              Estos son los mejores repositorios de skills para Claude Code. En total suman <strong className="text-white">+1.750 skills</strong> listas para usar.
              Clona los que necesites en <code className="text-forge-400 bg-zinc-800 px-2 py-0.5 rounded">~/.claude/plugins/marketplaces/</code>.
            </p>

            <div className="space-y-4">
              {superRepos.map((repo, i) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${repo.color} flex items-center justify-center text-2xl shrink-0 shadow-lg`}>
                      {repo.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs font-bold text-white">{repo.skills} skills</span>
                        <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs text-zinc-400">{repo.tipo}</span>
                        <div className="flex ml-auto">
                          {Array.from({ length: repo.stars }).map((_, s) => (
                            <Star key={s} className="w-3 h-3 text-gold-400 fill-gold-400" />
                          ))}
                        </div>
                      </div>
                      <a href={repo.url} target="_blank" rel="noopener noreferrer"
                        className="font-semibold text-white hover:text-forge-400 transition-colors flex items-center gap-1"
                      >
                        {repo.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-sm text-zinc-500 mt-1">{repo.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {repo.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs text-zinc-400">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Install command */}
                  <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-zinc-800/50 border border-zinc-800">
                    <Terminal className="w-4 h-4 text-zinc-500 shrink-0" />
                    <code className="text-xs font-mono text-forge-400 flex-1 overflow-x-auto">
                      git clone {repo.url}.git ~/.claude/plugins/marketplaces/{repo.name.split('/')[0]}
                    </code>
                    <button
                      onClick={() => copyCmd(`git clone ${repo.url}.git ~/.claude/plugins/marketplaces/${repo.name.split('/')[0]}`, repo.name)}
                      className="text-zinc-500 hover:text-zinc-300 shrink-0"
                    >
                      {copiedCmd === repo.name ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Install ALL button */}
            <div className="mt-6 p-4 rounded-xl bg-forge-500/10 border border-forge-500/20">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Download className="w-4 h-4 text-forge-400" />
                Instalar TODOS los repositorios
              </h4>
              <p className="text-xs text-zinc-500 mb-3">Copia este script completo para instalar los 5 repositorios de una vez:</p>
              <CodeBlock code={installSteps} language="bash" />
            </div>
          </Section>

          {/* SECTION 6: Skills recomendadas */}
          <Section title="Skills Recomendadas por Categoría" icon={Layers} color="steel">
            <p className="text-zinc-400 text-sm mb-6">
              Con +1.750 skills disponibles, aquí tienes las más recomendadas organizadas por necesidad:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedSkills.map((cat, i) => (
                <motion.div
                  key={cat.cat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800"
                >
                  <h4 className="font-semibold text-white mb-3">{cat.cat}</h4>
                  <div className="space-y-1.5">
                    {cat.skills.map(s => (
                      <div key={s} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-forge-500 shrink-0" />
                        <span className="font-mono text-zinc-300">{s}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-600 mt-3">Fuente: {cat.source}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* SECTION 7: Panel de control */}
          <Section title="Paneles de Control para Skills" icon={Wrench} color="ember">
            <p className="text-zinc-400 text-sm mb-4">
              Hay varias formas de crear paneles de control para ejecutar y gestionar tus skills:
            </p>

            <div className="space-y-4">
              {/* Panel 1: CLI Commands */}
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-forge-400" />
                  Panel CLI (Integrado)
                </h4>
                <p className="text-sm text-zinc-500 mb-3">Usa los comandos de SuperSkill directamente en Claude Code:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { cmd: '/skill-create', desc: 'Crear skill nueva' },
                    { cmd: '/micro-skill', desc: 'Micro-skill rápido' },
                    { cmd: '/skill-improve', desc: 'Mejorar skill' },
                    { cmd: '/skill-fuse', desc: 'Fusionar skills' },
                    { cmd: '/skill-catalog --list', desc: 'Ver catálogo' },
                    { cmd: '/plugin-create', desc: 'Crear plugin' },
                  ].map(c => (
                    <div key={c.cmd} className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/50">
                      <code className="text-xs font-mono text-forge-400">{c.cmd}</code>
                      <span className="text-xs text-zinc-600 ml-auto">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel 2: Web Dashboard */}
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-steel-400" />
                  Panel Web (Esta App)
                </h4>
                <p className="text-sm text-zinc-500 mb-3">
                  Esta misma web sirve como panel de control. Desde aquí puedes:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    '📚 Ver el curso completo',
                    '🔨 Crear skills con el Constructor',
                    '📁 Navegar el Catálogo de 12 categorías',
                    '🔌 Aprender sobre Plugins',
                    '⚙️ Configurar tu entorno',
                    '📊 Tracking de progreso con XP',
                  ].map(f => (
                    <div key={f} className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400">{f}</div>
                  ))}
                </div>
              </div>

              {/* Panel 3: CLAUDE.md Dashboard */}
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  Panel por Voz (CLAUDE.md)
                </h4>
                <p className="text-sm text-zinc-500 mb-3">
                  Añade en tu CLAUDE.md un "menú" de skills disponibles. Claude lo lee al inicio y te ofrece las opciones:
                </p>
                <CodeBlock code={`# Mis Skills Disponibles
## Comandos rápidos
- "crear skill" → /skill-create
- "mejorar skill" → /skill-improve
- "fusionar" → /skill-fuse
- "micro" → /micro-skill
- "catálogo" → /skill-catalog --list

## Workflows frecuentes
- "nuevo proyecto React" → scaffold + eslint + prettier + gitignore
- "auditar código" → security scan + tests + coverage
- "documentar API" → jsdoc + readme + changelog`} language="markdown" />
              </div>

              {/* Panel 4: Hooks Dashboard */}
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-gold-400" />
                  Panel Automático (Hooks + Sinapsis)
                </h4>
                <p className="text-sm text-zinc-500 mb-3">
                  Con el sistema Sinapsis, Claude observa tus patrones y sugiere skills automáticamente:
                </p>
                <div className="space-y-2 text-sm text-zinc-400">
                  <div className="p-3 rounded-lg bg-zinc-800/50 flex items-start gap-2">
                    <span className="text-gold-400">→</span>
                    <span>Detecta que siempre generas .gitignore al iniciar proyecto → Crea instinct automático</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-800/50 flex items-start gap-2">
                    <span className="text-gold-400">→</span>
                    <span>Detecta que corriges el mismo error 3 veces → Crea gotcha como instinct</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-800/50 flex items-start gap-2">
                    <span className="text-gold-400">→</span>
                    <span>Usa <code className="text-forge-400">/analyze</code> para ver patrones y <code className="text-forge-400">/evolve</code> para convertirlos en skills</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* SECTION 8: Checklist final */}
          <Section title="Checklist de Configuración Completa" icon={Shield} color="emerald">
            <div className="space-y-3">
              {[
                { done: true, text: 'Crear ~/.claude/skills/ y ~/.claude/plugins/marketplaces/' },
                { done: true, text: 'Configurar settings.json con permisos básicos' },
                { done: true, text: 'Crear CLAUDE.md con tu identidad y preferencias' },
                { done: false, text: 'Clonar al menos 1 superrepositorio de skills' },
                { done: false, text: 'Registrar marketplaces en known_marketplaces.json' },
                { done: false, text: 'Instalar SuperSkill (ya lo tienes si estás viendo esto)' },
                { done: false, text: 'Crear tu primer skill con /skill-create' },
                { done: false, text: 'Configurar hooks para observación (opcional, avanzado)' },
                { done: false, text: 'Completar el curso "La Forja de Skills"' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    item.done ? 'border-emerald-500 bg-emerald-500/20' : 'border-zinc-600'
                  }`}>
                    {item.done && <Check className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <span className={`text-sm ${item.done ? 'text-zinc-400 line-through' : 'text-zinc-300'}`}>{item.text}</span>
                </div>
              ))}
            </div>
          </Section>

        </div>

        {/* Footer */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 text-center">
          <p className="text-sm text-zinc-500">
            SuperSkill Creator · SalgadoIA · Sinapsis Ecosystem
          </p>
          <p className="text-xs text-zinc-600 mt-1">
            +1.750 skills de la comunidad · 5 superrepositorios · 7 comandos propios
          </p>
        </div>
      </div>
    </div>
  );
}
