import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, GraduationCap, Code, Brain, Users, Globe, Wrench, Bot, Server, ChevronDown, ChevronRight, ExternalLink, Clock, Award, BookOpen, Filter, ArrowLeft, Sparkles, Layers, GitBranch, Cpu, Smartphone, Briefcase, Zap, Target } from 'lucide-react';

// ─── Course Data ────────────────────────────────────────────────────────────
const categories = [
  { id: 'fundamentals', label: 'Fundamentos', icon: Brain, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'development', label: 'Desarrollo', icon: Code, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 'ai-fluency', label: 'AI Fluency', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'cloud', label: 'Cloud & Deploy', icon: Server, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'agents', label: 'Agents & Skills', icon: Bot, color: 'text-forge-400', bg: 'bg-forge-500/10', border: 'border-forge-500/20' },
  { id: 'prompting', label: 'Prompting', icon: Sparkles, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
];

const learningPaths = [
  {
    id: 'beginner',
    label: 'Principiante',
    desc: 'Empieza desde cero con Claude',
    color: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/30',
    courses: ['claude-101', 'ai-fluency', 'intro-cowork'],
  },
  {
    id: 'developer',
    label: 'Desarrollador',
    desc: 'Domina la API, prompting y herramientas',
    color: 'from-green-500 to-emerald-500',
    border: 'border-green-500/30',
    courses: ['api-fundamentals', 'building-api', 'prompt-engineering', 'prompt-evals', 'tool-use'],
  },
  {
    id: 'agent-builder',
    label: 'Constructor de Agentes',
    desc: 'Crea agentes, skills y sistemas MCP',
    color: 'from-forge-500 to-ember-500',
    border: 'border-forge-500/30',
    courses: ['claude-code', 'intro-mcp', 'mcp-advanced', 'intro-skills', 'intro-subagents'],
  },
  {
    id: 'enterprise',
    label: 'Enterprise & Cloud',
    desc: 'Despliegue en AWS Bedrock y Google Vertex',
    color: 'from-purple-500 to-violet-500',
    border: 'border-purple-500/30',
    courses: ['bedrock', 'vertex'],
  },
];

const courses = [
  // Fundamentals
  {
    id: 'claude-101',
    title: 'Claude 101',
    desc: 'Funcionalidades core, workflows y mejores practicas para usar Claude en el dia a dia.',
    category: 'fundamentals',
    level: 'principiante',
    duration: '~1h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Brain,
    tags: ['basico', 'workflows', 'best practices'],
  },
  {
    id: 'intro-cowork',
    title: 'Introduction to Claude Cowork',
    desc: 'Aprende a usar Claude Cowork: tareas complejas, multi-sesion, acceso a archivos locales y automatizaciones.',
    category: 'fundamentals',
    level: 'principiante',
    duration: '~1h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Briefcase,
    tags: ['cowork', 'automatizacion', 'archivos'],
  },
  {
    id: 'ai-fluency',
    title: 'AI Fluency: Framework & Foundations',
    desc: 'Habilidades practicas para interactuar con IA de forma efectiva y etica. Co-desarrollado con universidades. Licencia Creative Commons.',
    category: 'ai-fluency',
    level: 'principiante',
    duration: '~2h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Users,
    tags: ['etica', 'framework', 'fundamentos'],
  },
  {
    id: 'ai-fluency-educators',
    title: 'AI Fluency for Educators',
    desc: 'AI literacy adaptada especificamente para educadores. Como integrar IA en el aula de forma responsable.',
    category: 'ai-fluency',
    level: 'principiante',
    duration: '~1.5h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: GraduationCap,
    tags: ['educacion', 'aula', 'docentes'],
  },
  {
    id: 'ai-fluency-students',
    title: 'AI Fluency for Students',
    desc: 'AI literacy adaptada para estudiantes. Aprende a usar IA como herramienta de aprendizaje.',
    category: 'ai-fluency',
    level: 'principiante',
    duration: '~1h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: BookOpen,
    tags: ['estudiantes', 'aprendizaje'],
  },
  {
    id: 'ai-fluency-nonprofits',
    title: 'AI Fluency for Nonprofits',
    desc: 'AI literacy para organizaciones sin animo de lucro. Maximiza el impacto social con IA.',
    category: 'ai-fluency',
    level: 'principiante',
    duration: '~1h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Globe,
    tags: ['ONGs', 'impacto social'],
  },
  {
    id: 'teaching-ai',
    title: 'Teaching AI Fluency',
    desc: 'Como enseñar AI fluency a otros. Metodologias, recursos y marcos pedagogicos.',
    category: 'ai-fluency',
    level: 'intermedio',
    duration: '~1.5h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Target,
    tags: ['enseñar', 'pedagogia', 'formacion'],
  },
  // Development
  {
    id: 'building-api',
    title: 'Building with the Claude API',
    desc: 'Curso tecnico de 8+ horas: operaciones API basicas, prompting avanzado, integracion de tools y sistemas RAG.',
    category: 'development',
    level: 'intermedio',
    duration: '8+ horas',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Code,
    tags: ['API', 'RAG', 'tools', 'SDK'],
    featured: true,
  },
  {
    id: 'api-fundamentals',
    title: 'Anthropic API Fundamentals',
    desc: 'Esenciales del Claude SDK: API keys, parametros de modelo, prompts multimodales y streaming.',
    category: 'development',
    level: 'principiante',
    duration: '~2h',
    platform: 'github',
    certificate: false,
    url: 'https://github.com/anthropics/courses/tree/master/anthropic_api_fundamentals',
    icon: Wrench,
    tags: ['SDK', 'API keys', 'streaming', 'multimodal'],
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering Interactive Tutorial',
    desc: 'Guia paso a paso con tecnicas clave de prompting. Disponible como AWS Workshop.',
    category: 'prompting',
    level: 'intermedio',
    duration: '~3h',
    platform: 'github',
    certificate: false,
    url: 'https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial',
    icon: Sparkles,
    tags: ['prompt engineering', 'tecnicas', 'workshop'],
    featured: true,
  },
  {
    id: 'real-world-prompting',
    title: 'Real World Prompting',
    desc: 'Incorpora tecnicas de prompting en prompts complejos y reales. Tambien disponible para Google Vertex.',
    category: 'prompting',
    level: 'avanzado',
    duration: '~2h',
    platform: 'github',
    certificate: false,
    url: 'https://github.com/anthropics/courses/tree/master/real_world_prompting',
    icon: Layers,
    tags: ['prompting avanzado', 'produccion', 'real world'],
  },
  {
    id: 'prompt-evals',
    title: 'Prompt Evaluations',
    desc: 'Escribe evaluaciones de produccion para medir la calidad de tus prompts sistematicamente.',
    category: 'prompting',
    level: 'avanzado',
    duration: '~2h',
    platform: 'github',
    certificate: false,
    url: 'https://github.com/anthropics/courses/tree/master/prompt_evaluations',
    icon: Target,
    tags: ['evaluaciones', 'calidad', 'testing', 'metricas'],
  },
  {
    id: 'tool-use',
    title: 'Tool Use',
    desc: 'Todo lo necesario para implementar tool use con Claude: definicion, invocacion y patrones avanzados.',
    category: 'development',
    level: 'intermedio',
    duration: '~3h',
    platform: 'github',
    certificate: false,
    url: 'https://github.com/anthropics/courses/tree/master/tool_use',
    icon: Wrench,
    tags: ['tools', 'function calling', 'integraciones'],
  },
  {
    id: 'claude-code',
    title: 'Claude Code in Action',
    desc: 'Usar Claude Code para desarrollo: comandos de terminal, gestion de contexto, custom commands, MCP e integracion con GitHub.',
    category: 'agents',
    level: 'intermedio',
    duration: '~1h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Terminal,
    tags: ['Claude Code', 'terminal', 'MCP', 'GitHub'],
    featured: true,
  },
  {
    id: 'intro-mcp',
    title: 'Introduction to Model Context Protocol',
    desc: 'Fundamentos de MCP: que es, como funciona, como conectar Claude con herramientas externas.',
    category: 'agents',
    level: 'intermedio',
    duration: '~1h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: GitBranch,
    tags: ['MCP', 'protocolo', 'herramientas'],
  },
  {
    id: 'mcp-advanced',
    title: 'MCP: Advanced Topics',
    desc: 'Patrones MCP de nivel produccion: servidores custom, transporte, seguridad y escalabilidad.',
    category: 'agents',
    level: 'avanzado',
    duration: '~1.5h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Cpu,
    tags: ['MCP avanzado', 'produccion', 'servidores'],
  },
  {
    id: 'intro-skills',
    title: 'Introduction to Agent Skills',
    desc: 'Construye skills para agentes: estructura, triggers, frontmatter y patrones de diseño.',
    category: 'agents',
    level: 'intermedio',
    duration: '~1h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Zap,
    tags: ['skills', 'agentes', 'SKILL.md'],
  },
  {
    id: 'intro-subagents',
    title: 'Introduction to Subagents',
    desc: 'Trabaja con subagentes: delegacion de tareas, coordinacion y patrones multi-agente.',
    category: 'agents',
    level: 'avanzado',
    duration: '~1h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Bot,
    tags: ['subagentes', 'multi-agente', 'delegacion'],
  },
  // Cloud
  {
    id: 'bedrock',
    title: 'Claude with Amazon Bedrock',
    desc: 'Usar Claude en AWS Bedrock: configuracion, API, costes y mejores practicas enterprise.',
    category: 'cloud',
    level: 'intermedio',
    duration: '~1h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Server,
    tags: ['AWS', 'Bedrock', 'enterprise', 'cloud'],
  },
  {
    id: 'vertex',
    title: 'Claude with Google Vertex AI',
    desc: 'Usar Claude en Google Cloud Vertex AI: setup, API, integracion con servicios GCP.',
    category: 'cloud',
    level: 'intermedio',
    duration: '~1h',
    platform: 'academy',
    certificate: true,
    url: 'https://anthropic.skilljar.com/',
    icon: Globe,
    tags: ['GCP', 'Vertex', 'enterprise', 'cloud'],
  },
];

// ─── Level colors ───────────────────────────────────────────────────────────
const levelColors = {
  principiante: 'bg-green-500/10 text-green-400 border-green-500/20',
  intermedio: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  avanzado: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const platformBadge = {
  academy: { label: 'Anthropic Academy', color: 'bg-blue-500/10 text-blue-400' },
  github: { label: 'GitHub Notebooks', color: 'bg-zinc-700/50 text-zinc-300' },
};

// ─── Main Component ─────────────────────────────────────────────────────────
export default function CursosOficiales() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [activePath, setActivePath] = useState(null);
  const [expandedPaths, setExpandedPaths] = useState(new Set());

  const togglePath = (id) => {
    setExpandedPaths(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredCourses = useMemo(() => {
    let result = courses;

    if (activePath) {
      const path = learningPaths.find(p => p.id === activePath);
      if (path) result = result.filter(c => path.courses.includes(c.id));
    }

    if (activeCategory !== 'all') {
      result = result.filter(c => c.category === activeCategory);
    }

    if (activeLevel !== 'all') {
      result = result.filter(c => c.level === activeLevel);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [search, activeCategory, activeLevel, activePath]);

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('all');
    setActiveLevel('all');
    setActivePath(null);
  };

  const hasFilters = search || activeCategory !== 'all' || activeLevel !== 'all' || activePath;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6">
      {/* Back link */}
      <Link to="/curso-claude" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-forge-400 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Volver a Dominando Claude
      </Link>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
          <GraduationCap className="w-4 h-4" />
          Cursos Oficiales de Anthropic
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-forge-400">Anthropic Academy</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          20 cursos oficiales gratuitos de Anthropic: desde fundamentos hasta agentes avanzados.
          Certificacion incluida. Todos self-paced.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-zinc-500">
          <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> 20 cursos</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Award className="w-4 h-4" /> Certificacion gratuita</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Self-paced</span>
          <span>·</span>
          <span>Marzo 2026</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-10">
        {categories.map(cat => {
          const count = courses.filter(c => c.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(activeCategory === cat.id ? 'all' : cat.id); setActivePath(null); }}
              className={`p-3 rounded-xl border text-center transition-all hover:scale-[1.03] ${
                activeCategory === cat.id
                  ? `${cat.bg} ${cat.border} ${cat.color}`
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <cat.icon className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs font-medium truncate">{cat.label}</p>
              <p className="text-[10px] text-zinc-600 mt-0.5">{count} cursos</p>
            </button>
          );
        })}
      </div>

      {/* Learning Paths */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-forge-400" />
          Rutas de Aprendizaje
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {learningPaths.map(path => {
            const isActive = activePath === path.id;
            const isExpanded = expandedPaths.has(path.id);
            const pathCourses = courses.filter(c => path.courses.includes(c.id));

            return (
              <div key={path.id} className={`rounded-2xl border transition-all ${isActive ? path.border + ' bg-zinc-900/80' : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700'}`}>
                <button
                  onClick={() => { setActivePath(isActive ? null : path.id); setActiveCategory('all'); togglePath(path.id); }}
                  className="w-full p-4 text-left flex items-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center shrink-0`}>
                    <span className="text-white font-bold text-sm">{pathCourses.length}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm">{path.label}</h3>
                    <p className="text-zinc-500 text-xs truncate">{path.desc}</p>
                  </div>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-zinc-500 shrink-0" />}
                </button>
                {isExpanded && (
                  <div className="px-4 pb-3 space-y-1">
                    {pathCourses.map((c, i) => (
                      <div key={c.id} className="flex items-center gap-2 text-xs text-zinc-500 py-1">
                        <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold shrink-0">{i + 1}</span>
                        <span className="truncate">{c.title}</span>
                        <span className={`ml-auto px-1.5 py-0.5 rounded text-[9px] border ${levelColors[c.level]}`}>{c.level}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar curso, tema o tag..."
            className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'principiante', 'intermedio', 'avanzado'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                activeLevel === lvl
                  ? 'bg-forge-500/15 text-forge-400 border-forge-500/30'
                  : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {lvl === 'all' ? 'Todos' : lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters summary */}
      {hasFilters && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-xs text-zinc-500">{filteredCourses.length} de {courses.length} cursos</span>
          <button onClick={clearFilters} className="text-xs text-forge-400 hover:text-forge-300 ml-2">Limpiar filtros</button>
        </div>
      )}

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
        {filteredCourses.map(course => {
          const Icon = course.icon;
          const catData = categories.find(c => c.id === course.category);

          return (
            <a
              key={course.id}
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
                course.featured
                  ? 'bg-zinc-900/80 border-forge-500/20 hover:border-forge-500/40'
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${catData?.bg || 'bg-zinc-800'} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${catData?.color || 'text-zinc-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm truncate">{course.title}</h3>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{course.desc}</p>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${levelColors[course.level]}`}>
                      {course.level}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${platformBadge[course.platform].color}`}>
                      {platformBadge[course.platform].label}
                    </span>
                    {course.certificate && (
                      <span className="flex items-center gap-0.5 text-[10px] text-gold-400">
                        <Award className="w-3 h-3" /> Certificado
                      </span>
                    )}
                    <span className="flex items-center gap-0.5 text-[10px] text-zinc-600 ml-auto">
                      <Clock className="w-3 h-3" /> {course.duration}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-500">No se encontraron cursos con esos filtros.</p>
          <button onClick={clearFilters} className="mt-2 text-sm text-forge-400 hover:text-forge-300">Limpiar filtros</button>
        </div>
      )}

      {/* Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <a
          href="https://anthropic.skilljar.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm flex items-center gap-1.5">
                Anthropic Academy <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-400 transition-colors" />
              </h3>
              <p className="text-xs text-zinc-500">15 cursos con certificacion · anthropic.skilljar.com</p>
            </div>
          </div>
        </a>
        <a
          href="https://github.com/anthropics/courses"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
              <Code className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm flex items-center gap-1.5">
                GitHub Courses <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
              </h3>
              <p className="text-xs text-zinc-500">5 cursos con Jupyter Notebooks · github.com/anthropics/courses</p>
            </div>
          </div>
        </a>
      </div>

      {/* Footer */}
      <div className="p-5 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-center">
        <p className="text-zinc-500 text-xs">
          Todos los cursos son oficiales de <strong className="text-zinc-300">Anthropic</strong> y 100% gratuitos.
          <br />
          Directorio curado para <strong className="text-forge-400">La Forja de Skills</strong> por SalgadoIA · Marzo 2026
        </p>
      </div>
    </div>
  );
}
