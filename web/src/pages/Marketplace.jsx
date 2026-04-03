import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { categories } from '../data/courseData';
import {
  Search, Star, GitBranch, Download, Copy, Check, ExternalLink,
  Package, Users, Layers, Terminal, Shield, Zap, Brain, Filter,
  ChevronDown, ChevronRight, ArrowRight
} from 'lucide-react';

const repos = [
  {
    name: 'antigravity',
    author: 'nicosalg',
    skills: '1200+',
    url: 'github.com/nicosalg/antigravity',
    cloneUrl: 'https://github.com/nicosalg/antigravity',
    installDir: 'antigravity',
    description: 'La coleccion mas grande de skills para Claude Code. Prompts, templates, agentes y workflows listos para usar.',
    tags: ['prompts', 'templates', 'agents', 'workflows'],
    stars: '2.1k',
    accent: 'forge',
    accentColor: 'from-forge-500 to-forge-600',
    borderColor: 'border-forge-500/30',
    textColor: 'text-forge-400',
    bgGlow: 'from-forge-500/5',
  },
  {
    name: 'ComposioHQ',
    author: 'nicosalg',
    skills: '150+',
    url: 'github.com/nicosalg/composio',
    cloneUrl: 'https://github.com/nicosalg/composio',
    installDir: 'composio',
    description: 'Integraciones con herramientas y APIs externas. Conecta tus agentes con el mundo real.',
    tags: ['tools', 'integrations', 'APIs'],
    stars: '890',
    accent: 'blue',
    accentColor: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    bgGlow: 'from-blue-500/5',
  },
  {
    name: 'alirezarezvani',
    author: 'nicosalg',
    skills: '192',
    url: 'github.com/nicosalg/awesome-claude-code-skills',
    cloneUrl: 'https://github.com/nicosalg/awesome-claude-code-skills',
    installDir: 'awesome',
    description: 'Skills curados y verificados por la comunidad. Calidad garantizada con revisiones de codigo.',
    tags: ['curated', 'community', 'verified'],
    stars: '650',
    accent: 'green',
    accentColor: 'from-green-500 to-green-600',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
    bgGlow: 'from-green-500/5',
  },
  {
    name: 'VoltAgent',
    author: 'nicosalg',
    skills: '200+',
    url: 'github.com/nicosalg/voltagent-skills',
    cloneUrl: 'https://github.com/nicosalg/voltagent-skills',
    installDir: 'voltagent',
    description: 'Skills especializados en agentes y automatizacion con IA. Potencia tus SuperAgentes.',
    tags: ['agents', 'automation', 'AI'],
    stars: '1.2k',
    accent: 'purple',
    accentColor: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    bgGlow: 'from-purple-500/5',
  },
  {
    name: 'Anthropic Official',
    author: 'anthropics',
    skills: '17',
    url: 'github.com/anthropics/skills',
    cloneUrl: 'https://github.com/anthropics/skills',
    installDir: 'anthropic',
    description: 'Skills oficiales de Anthropic. Referencia y mejores practicas directamente de los creadores.',
    tags: ['official', 'verified', 'reference'],
    stars: '3.4k',
    accent: 'amber',
    accentColor: 'from-amber-500 to-amber-600',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    bgGlow: 'from-amber-500/5',
  },
];

const stats = [
  { label: 'Skills disponibles', value: '1800+', icon: Package },
  { label: 'Repositorios', value: '5', icon: GitBranch },
  { label: 'Categorias', value: '12', icon: Layers },
  { label: 'Contribuidores', value: '500+', icon: Users },
];

const filterChips = ['Todos', 'prompts', 'agents', 'tools', 'official', 'community', 'APIs'];

const categorySkillCounts = {
  'desarrollo-web': 320,
  'desarrollo-ia': 280,
  'automatizacion': 210,
  'documentacion': 150,
  'testing': 130,
  'seguridad': 95,
  'datos': 170,
  'productividad': 190,
  'educacion': 85,
  'blockchain': 45,
  'cms': 60,
  'meta-skill': 65,
};

const categoryTopSkills = {
  'desarrollo-web': ['react-component-gen', 'api-rest-builder', 'css-optimizer'],
  'desarrollo-ia': ['model-trainer', 'prompt-engineer', 'dataset-cleaner'],
  'automatizacion': ['ci-cd-pipeline', 'task-scheduler', 'file-watcher'],
  'documentacion': ['readme-generator', 'api-docs', 'changelog-auto'],
  'testing': ['unit-test-gen', 'e2e-builder', 'mock-factory'],
  'seguridad': ['vuln-scanner', 'auth-auditor', 'secret-detector'],
  'datos': ['csv-transformer', 'sql-optimizer', 'data-visualizer'],
  'productividad': ['git-workflow', 'code-reviewer', 'refactor-assist'],
  'educacion': ['tutorial-builder', 'quiz-generator', 'explainer'],
  'blockchain': ['smart-contract-gen', 'web3-deploy', 'token-creator'],
  'cms': ['content-migrator', 'seo-optimizer', 'media-processor'],
  'meta-skill': ['skill-composer', 'skill-tester', 'skill-deployer'],
};

const quickInstallScript = `# Instalar todos los repositorios recomendados
mkdir -p ~/.claude/skills && cd ~/.claude/skills

# SuperRepositorios
git clone https://github.com/nicosalg/antigravity
git clone https://github.com/nicosalg/composio
git clone https://github.com/nicosalg/awesome-claude-code-skills awesome
git clone https://github.com/nicosalg/voltagent-skills voltagent
git clone https://github.com/anthropics/skills anthropic

echo "1800+ skills instalados!"`;

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRepo, setExpandedRepo] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});
  const [activeFilter, setActiveFilter] = useState('Todos');

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => setCopiedStates(prev => ({ ...prev, [id]: false })), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = searchQuery === '' ||
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === 'Todos' ||
      repo.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen px-6 py-8 lg:py-12">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl lg:text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-forge-400 via-amber-400 to-forge-500 bg-clip-text text-transparent">
              Marketplace de SuperSkills
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            Encuentra, instala y combina superhabilidades para tus SuperAgentes
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar skills, repos, tags..."
              className="w-full pl-12 pr-10 py-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-zinc-200 placeholder-zinc-600 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50 transition-all"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {filterChips.map(chip => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === chip
                    ? 'bg-forge-500/20 text-forge-400 border border-forge-500/40'
                    : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-400'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-forge-500/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-forge-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-zinc-500">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Repository Cards */}
        <div className="space-y-4 mb-14">
          {filteredRepos.map((repo, i) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className={`rounded-2xl bg-zinc-900/60 border ${repo.borderColor} hover:border-opacity-60 transition-all overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-white">{repo.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${repo.accentColor} text-white`}>
                        <Package className="w-3 h-3" />
                        {repo.skills} skills
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        {repo.stars}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">{repo.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {repo.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                          {tag}
                        </span>
                      ))}
                      <a
                        href={`https://${repo.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors ml-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {repo.url}
                      </a>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <div className="flex items-center gap-2 bg-zinc-950 rounded-lg border border-zinc-800 pl-3 pr-1 py-1">
                      <code className="text-xs text-zinc-400 font-mono whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px]">
                        git clone {repo.cloneUrl} ~/.claude/skills/{repo.installDir}
                      </code>
                      <button
                        onClick={() => copyToClipboard(`git clone ${repo.cloneUrl} ~/.claude/skills/${repo.installDir}`, `install-${repo.name}`)}
                        className="p-1.5 rounded-md hover:bg-zinc-800 transition-colors shrink-0"
                        title="Copiar comando"
                      >
                        {copiedStates[`install-${repo.name}`] ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                      </button>
                    </div>
                    <button
                      onClick={() => setExpandedRepo(expandedRepo === repo.name ? null : repo.name)}
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        expandedRepo === repo.name
                          ? `bg-gradient-to-r ${repo.accentColor} text-white`
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {expandedRepo === repo.name ? (
                        <><ChevronDown className="w-4 h-4" /> Ocultar skills</>
                      ) : (
                        <><ChevronRight className="w-4 h-4" /> Ver skills</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Skills List */}
              <AnimatePresence>
                {expandedRepo === repo.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-zinc-800/50">
                      <p className="text-xs text-zinc-500 mb-3">Ejemplos de skills en este repositorio:</p>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        {['prompt-engineer', 'code-reviewer', 'api-builder', 'test-generator', 'docs-writer', 'refactor-assist', 'debug-helper', 'deploy-config'].map(skill => (
                          <div key={skill} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                            <Zap className={`w-3 h-3 ${repo.textColor}`} />
                            <span className="text-xs text-zinc-400 font-mono">{skill}</span>
                          </div>
                        ))}
                      </div>
                      <p className={`text-xs ${repo.textColor} mt-3`}>
                        Y {repo.skills} mas en el repositorio...
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredRepos.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500">No se encontraron repositorios para "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Quick Install Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-14"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Terminal className="w-6 h-6 text-forge-400" />
            Instalacion Rapida
          </h2>
          <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-zinc-500 font-mono">~/.claude/skills</span>
              </div>
              <button
                onClick={() => copyToClipboard(quickInstallScript, 'quick-install')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forge-500/10 text-forge-400 text-xs font-medium hover:bg-forge-500/20 transition-colors"
              >
                {copiedStates['quick-install'] ? (
                  <><Check className="w-3.5 h-3.5" /> Copiado!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copiar todo</>
                )}
              </button>
            </div>
            {/* Terminal Body */}
            <pre className="p-5 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-zinc-500"># Instalar todos los repositorios recomendados</span>{'\n'}
                <span className="text-green-400">mkdir</span><span className="text-zinc-300"> -p ~/.claude/skills </span><span className="text-zinc-500">&&</span><span className="text-green-400"> cd</span><span className="text-zinc-300"> ~/.claude/skills</span>{'\n'}
                {'\n'}
                <span className="text-zinc-500"># SuperRepositorios</span>{'\n'}
                <span className="text-green-400">git clone</span><span className="text-cyan-400"> https://github.com/nicosalg/antigravity</span>{'\n'}
                <span className="text-green-400">git clone</span><span className="text-cyan-400"> https://github.com/nicosalg/composio</span>{'\n'}
                <span className="text-green-400">git clone</span><span className="text-cyan-400"> https://github.com/nicosalg/awesome-claude-code-skills</span><span className="text-zinc-300"> awesome</span>{'\n'}
                <span className="text-green-400">git clone</span><span className="text-cyan-400"> https://github.com/nicosalg/voltagent-skills</span><span className="text-zinc-300"> voltagent</span>{'\n'}
                <span className="text-green-400">git clone</span><span className="text-cyan-400"> https://github.com/anthropics/skills</span><span className="text-zinc-300"> anthropic</span>{'\n'}
                {'\n'}
                <span className="text-green-400">echo</span><span className="text-yellow-300"> "1800+ skills instalados!"</span>
              </code>
            </pre>
          </div>
        </motion.div>

        {/* Category Browser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-14"
        >
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Layers className="w-6 h-6 text-forge-400" />
            Explorar por Categoria
          </h2>
          <p className="text-zinc-500 text-sm mb-6">12 categorias para encontrar el superpoder que necesitas</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.03 }}
                className="group p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 transition-all hover:scale-[1.01] relative overflow-hidden"
              >
                {/* Left color accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${cat.color}`} />

                <div className="flex items-center gap-3 mb-3 pl-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {cat.emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{cat.nombre}</h3>
                    <p className="text-xs text-zinc-500">{categorySkillCounts[cat.id] || 0} skills</p>
                  </div>
                </div>

                <div className="pl-3 space-y-1">
                  {(categoryTopSkills[cat.id] || []).map(skill => (
                    <div key={skill} className="flex items-center gap-2">
                      <Zap className="w-2.5 h-2.5 text-zinc-600" />
                      <span className="text-xs text-zinc-500 font-mono">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-14"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Como Funciona</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              {
                step: 1,
                title: 'Buscar',
                desc: 'Encuentra un skill en el marketplace por nombre, categoria o tag.',
                icon: Search,
                color: 'from-forge-500 to-forge-600',
              },
              {
                step: 2,
                title: 'Instalar',
                desc: 'Clona el repositorio en tu directorio ~/.claude/skills/ con un solo comando.',
                icon: Download,
                color: 'from-blue-500 to-blue-600',
              },
              {
                step: 3,
                title: 'Usar',
                desc: 'Invoca con /skill-name o deja que los triggers lo activen automaticamente.',
                icon: Zap,
                color: 'from-green-500 to-green-600',
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-xs font-bold text-zinc-600 mb-1">PASO {item.step}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-zinc-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Evolucion con Sinapsis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl bg-gradient-to-br from-purple-500/5 via-zinc-900/60 to-forge-500/5 border border-purple-500/20 p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-forge-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Evolucion con Sinapsis</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Shield className="w-2.5 h-2.5" />
                Conectado con Sinapsis
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { text: 'Cuando usas un skill, Sinapsis observa patrones de uso', icon: Search },
              { text: 'Skills que usas frecuentemente se promueven automaticamente', icon: Star },
              { text: 'Nuevos skills se sugieren basados en tus patrones de uso', icon: Zap },
              { text: 'Tus agentes aprenden y evolucionan sus superpoderes con el tiempo', icon: Brain },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/30">
                <item.icon className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <p className="text-sm text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
