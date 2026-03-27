import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Brain,
  Search,
  Hammer,
  Copy,
  Download,
  Edit,
  ChevronRight,
  Zap,
  Star,
  ExternalLink,
  Package,
  Tag,
  Check,
  RefreshCw,
  X,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Skills Database (inline — no external file yet)
// ---------------------------------------------------------------------------

const SKILLS_DB = [
  {
    name: 'react-component-generator',
    description: 'Genera componentes React con TypeScript y Tailwind CSS siguiendo convenciones del proyecto.',
    category: 'desarrollo-web',
    type: 'agent',
    source: 'github.com/nicosalg/react-gen',
    keywords: ['react', 'componente', 'typescript', 'tailwind', 'frontend', 'jsx', 'tsx'],
  },
  {
    name: 'api-rest-express',
    description: 'Scaffold completo de APIs REST con Express, validacion, middleware y documentacion automatica.',
    category: 'desarrollo-web',
    type: 'workflow',
    source: 'github.com/nicosalg/api-forge',
    keywords: ['api', 'rest', 'express', 'node', 'backend', 'endpoint', 'servidor'],
  },
  {
    name: 'test-suite-builder',
    description: 'Genera tests unitarios, de integracion y e2e con Jest, Vitest o Playwright.',
    category: 'testing',
    type: 'agent',
    source: 'github.com/nicosalg/test-builder',
    keywords: ['test', 'jest', 'vitest', 'playwright', 'unitario', 'integracion', 'testing'],
  },
  {
    name: 'github-actions-automator',
    description: 'Crea workflows de CI/CD con GitHub Actions para build, test, lint y deploy.',
    category: 'devops',
    type: 'workflow',
    source: 'github.com/nicosalg/actions-forge',
    keywords: ['github', 'actions', 'ci', 'cd', 'deploy', 'pipeline', 'automatizar', 'workflow'],
  },
  {
    name: 'openapi-doc-gen',
    description: 'Genera documentacion OpenAPI/Swagger desde codigo fuente Express, Fastify o NestJS.',
    category: 'documentacion',
    type: 'tool',
    source: 'github.com/nicosalg/openapi-gen',
    keywords: ['openapi', 'swagger', 'documentacion', 'api', 'docs', 'especificacion'],
  },
  {
    name: 'npm-security-audit',
    description: 'Audita dependencias npm en busca de vulnerabilidades y sugiere actualizaciones seguras.',
    category: 'seguridad',
    type: 'tool',
    source: 'github.com/nicosalg/sec-audit',
    keywords: ['seguridad', 'audit', 'vulnerabilidad', 'npm', 'dependencia', 'cve'],
  },
  {
    name: 'csv-json-converter',
    description: 'Convierte archivos CSV a JSON con validacion de esquema, tipos y transformaciones.',
    category: 'datos',
    type: 'tool',
    source: 'github.com/nicosalg/csv-tools',
    keywords: ['csv', 'json', 'convertir', 'datos', 'transformar', 'validacion', 'archivo'],
  },
  {
    name: 'docker-compose-builder',
    description: 'Genera archivos docker-compose.yml optimizados para stacks de desarrollo.',
    category: 'devops',
    type: 'template',
    source: 'github.com/nicosalg/docker-forge',
    keywords: ['docker', 'compose', 'contenedor', 'devops', 'infraestructura'],
  },
  {
    name: 'prisma-schema-gen',
    description: 'Genera schemas de Prisma a partir de descripciones en lenguaje natural.',
    category: 'datos',
    type: 'agent',
    source: 'github.com/nicosalg/prisma-gen',
    keywords: ['prisma', 'schema', 'base de datos', 'orm', 'modelo', 'sql'],
  },
  {
    name: 'tailwind-component-lib',
    description: 'Genera una libreria de componentes UI reutilizables con Tailwind CSS.',
    category: 'desarrollo-web',
    type: 'template',
    source: 'github.com/nicosalg/tw-lib',
    keywords: ['tailwind', 'componente', 'ui', 'libreria', 'design system', 'css'],
  },
];

function searchSkills(query) {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  return SKILLS_DB.map(skill => {
    let score = 0;
    const haystack = `${skill.name} ${skill.description} ${skill.keywords.join(' ')}`.toLowerCase();
    for (const word of words) {
      if (haystack.includes(word)) score += 20;
      for (const kw of skill.keywords) {
        if (kw.includes(word) || word.includes(kw)) score += 15;
      }
    }
    score = Math.min(98, score);
    return { ...skill, matchPercent: score };
  })
    .filter(s => s.matchPercent > 15)
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 5);
}

function analyzePrompt(prompt) {
  const lower = prompt.toLowerCase();

  const categoryMap = {
    'desarrollo-web': ['react', 'vue', 'angular', 'frontend', 'backend', 'api', 'rest', 'graphql', 'next', 'express', 'componente', 'endpoint', 'html', 'css', 'web'],
    testing: ['test', 'jest', 'vitest', 'playwright', 'cypress', 'unitario', 'e2e', 'integracion', 'tdd'],
    devops: ['deploy', 'ci', 'cd', 'github actions', 'docker', 'pipeline', 'kubernetes', 'infraestructura', 'automatiza'],
    documentacion: ['documentacion', 'openapi', 'swagger', 'readme', 'jsdoc', 'docs'],
    seguridad: ['seguridad', 'audit', 'vulnerabilidad', 'cve', 'owasp', 'pentest'],
    datos: ['csv', 'json', 'datos', 'etl', 'transformar', 'convertir', 'schema', 'base de datos', 'sql'],
    'desarrollo-ia': ['ia', 'ml', 'llm', 'prompt', 'modelo', 'embeddings', 'rag'],
    automatizacion: ['automatizar', 'workflow', 'script', 'cron', 'batch', 'task'],
    productividad: ['productividad', 'refactor', 'lint', 'format', 'optimizar'],
  };

  let bestCategory = 'desarrollo-web';
  let bestScore = 0;
  for (const [cat, keywords] of Object.entries(categoryMap)) {
    const score = keywords.filter(kw => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestCategory = cat;
    }
  }

  // Extract potential triggers from the prompt
  const triggerStops = new Set(['quiero','que','una','skill','con','para','el','la','los','las','un','del','de','y','en','al']);
  const triggerPatterns = lower
    .split(/[,.\n]+/)
    .map(t => t.split(/\s+/).filter(w => !triggerStops.has(w)).join(' ').trim())
    .filter(t => t.length > 4 && t.length < 60);

  // Generate a name from the prompt
  const stopWordsSet = new Set(['quiero','que','una','uno','skill','con','para','el','la','los','las','un','del','de','y','en','al','genere','cree','haga','pueda','desde','detecte','siga','sus','convenciones','proyecto','actual','sea','tenga']);
  const nameWords = lower
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .split(/[\s,.\n]+/)
    .map(w => w.replace(/[^a-z0-9]/g, ''))
    .filter(w => w.length > 2 && !stopWordsSet.has(w))
    .slice(0, 4);
  const suggestedName = nameWords.join('-') || 'custom-skill';

  // Determine type
  let type = 'skill';
  if (lower.includes('agent') || lower.includes('analiz') || lower.includes('audit')) type = 'agent';
  if (lower.includes('template') || lower.includes('scaffold') || lower.includes('genera')) type = 'workflow';
  if (lower.includes('herramienta') || lower.includes('convert') || lower.includes('transform')) type = 'tool';

  // Determine difficulty
  let difficulty = 'apprentice';
  if (lower.includes('simple') || lower.includes('basico')) difficulty = 'initiate';
  if (lower.includes('avanzad') || lower.includes('complej')) difficulty = 'hero';
  if (lower.includes('enterprise') || lower.includes('produccion')) difficulty = 'legend';

  // Generate commands
  const commands = [];
  if (lower.includes('api') || lower.includes('endpoint')) commands.push({ cmd: '/generate-api', desc: 'Genera endpoint REST completo' });
  if (lower.includes('test')) commands.push({ cmd: '/generate-tests', desc: 'Genera suite de tests' });
  if (lower.includes('component') || lower.includes('componente')) commands.push({ cmd: '/generate-component', desc: 'Genera componente con tipos' });
  if (lower.includes('deploy') || lower.includes('ci')) commands.push({ cmd: '/setup-pipeline', desc: 'Configura pipeline CI/CD' });
  if (lower.includes('doc') || lower.includes('openapi')) commands.push({ cmd: '/generate-docs', desc: 'Genera documentacion automatica' });
  if (lower.includes('audit') || lower.includes('seguridad')) commands.push({ cmd: '/security-audit', desc: 'Ejecuta auditoria de seguridad' });
  if (lower.includes('convert') || lower.includes('transform') || lower.includes('csv')) commands.push({ cmd: '/convert-data', desc: 'Convierte y valida datos' });
  if (commands.length === 0) commands.push({ cmd: `/${suggestedName}`, desc: 'Ejecuta la skill principal' });

  // Agents
  const agents = [];
  if (type === 'agent' || lower.includes('analiz') || lower.includes('valid')) {
    agents.push(lower.includes('seguridad') ? 'security-validator' : lower.includes('test') ? 'test-generator' : 'code-analyzer');
  }

  // Generate triggers
  const triggers = triggerPatterns.length > 0
    ? triggerPatterns.slice(0, 5)
    : [`ejecutar ${suggestedName}`, `crear ${nameWords[0] || 'recurso'}`, `generar ${nameWords[1] || 'output'}`];

  // Quality score
  const quality = Math.min(95, Math.max(75, 70 + nameWords.length * 3 + commands.length * 4 + (agents.length > 0 ? 5 : 0)));

  return {
    suggestedName,
    category: bestCategory,
    type,
    difficulty,
    commands,
    agents,
    triggers,
    quality,
  };
}

// ---------------------------------------------------------------------------
// Inspiration Chips
// ---------------------------------------------------------------------------

const INSPIRATION_CHIPS = [
  'Genera APIs REST con Express y TypeScript',
  'Crea tests unitarios para React',
  'Automatiza deploys con GitHub Actions',
  'Genera documentacion OpenAPI desde codigo',
  'Audita seguridad de dependencias npm',
  'Convierte CSV a JSON con validacion',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function matchBadgeColor(pct) {
  if (pct > 80) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  if (pct > 50) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  if (pct > 30) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  return 'bg-red-500/20 text-red-400 border-red-500/30';
}

function generateSkillMd(prompt, analysis) {
  const {
    suggestedName,
    category,
    type,
    difficulty,
    commands,
    agents,
    triggers,
  } = analysis;

  const title = suggestedName
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const commandsTable = commands
    .map(c => `| \`${c.cmd}\` | ${c.desc} |`)
    .join('\n');

  const triggersList = triggers.map(t => `- "${t}"`).join('\n');

  const agentFiles = agents.length > 0
    ? agents.map(a => `├── agents/\n│   └── ${a}.md`).join('\n')
    : '';

  const commandFiles = commands
    .map(c => `│   └── ${c.cmd.replace('/', '')}.md`)
    .join('\n');

  const categoryRules = {
    'desarrollo-web': '- Usar TypeScript cuando el proyecto lo soporte\n- Seguir patrones de diseno del framework detectado\n- Incluir tipos/interfaces en archivos separados',
    testing: '- Cubrir happy path y edge cases\n- Usar mocks solo cuando sea necesario\n- Mantener tests independientes entre si',
    devops: '- Usar secrets de GitHub para credenciales\n- Incluir steps de cache para dependencias\n- Separar jobs de build, test y deploy',
    documentacion: '- Seguir la especificacion oficial del formato\n- Incluir ejemplos reales del proyecto\n- Mantener la documentacion sincronizada con el codigo',
    seguridad: '- Reportar severidad segun CVSS\n- Sugerir fix automatico cuando sea posible\n- No exponer datos sensibles en los reportes',
    datos: '- Validar esquemas antes de transformar\n- Manejar errores de parsing gracefully\n- Soportar streaming para archivos grandes',
    'desarrollo-ia': '- Optimizar tokens enviados al modelo\n- Incluir fallbacks para rate limits\n- Cachear respuestas cuando sea apropiado',
    automatizacion: '- Incluir dry-run antes de ejecutar cambios\n- Logging detallado de cada paso\n- Rollback automatico en caso de fallo',
    productividad: '- No modificar archivos sin confirmacion\n- Mostrar diff antes de aplicar cambios\n- Respetar configuracion local del proyecto',
  };

  return `---
name: "${suggestedName}"
description: |
  ${prompt.substring(0, 200).replace(/\n/g, '\n  ')}
  USAR cuando el usuario diga ${triggers.slice(0, 3).map(t => `"${t}"`).join(', ')}.
  NO usar cuando no este relacionado con ${category.replace(/-/g, ' ')}.
author: "SalgadoIA"
version: "1.0.0"
category: "${category}"
type: "${type}"
difficulty: "${difficulty}"
platforms:
  - claude-code
tags:
  - ${category}
  - ${type}
  - auto-generated
---

# ${title}

> ${prompt.substring(0, 120).replace(/\n/g, ' ')}

## Proposito

${prompt.replace(/\n/g, '\n')}

Esta skill fue disenada para automatizar y estandarizar este proceso,
asegurando consistencia con las convenciones del proyecto actual y
las mejores practicas de la industria.

## Cuando se activa

${triggersList}

## Comandos disponibles

| Comando | Descripcion |
|---------|-------------|
${commandsTable}

## Instrucciones

1. **Analizar el contexto**: Leer la estructura del proyecto, detectar
   framework, lenguaje, patrones y convenciones existentes.
2. **Validar requisitos**: Confirmar con el usuario los parametros
   necesarios antes de generar codigo.
3. **Generar artefactos**: Crear los archivos necesarios siguiendo
   las convenciones detectadas en el paso 1.
4. **Integrar con el proyecto**: Asegurar que los archivos generados
   se integren correctamente con imports, rutas y configuracion.
5. **Validar resultado**: Ejecutar linters, type-checking y tests
   si estan configurados en el proyecto.
6. **Documentar cambios**: Listar los archivos creados/modificados
   y explicar las decisiones tomadas.

## Arquitectura

\`\`\`
${suggestedName}/
├── SKILL.md
├── commands/
${commandFiles}
${agentFiles ? agentFiles + '\n' : ''}└── references/
    └── docs.md
\`\`\`

## Reglas

- Seguir las convenciones del proyecto actual
- No duplicar funcionalidad existente
- Usar progressive disclosure (body < 500 lineas)
- Preferir editar archivos existentes sobre crear nuevos
- Incluir comentarios explicativos en codigo generado
${categoryRules[category] || '- Mantener el output limpio y consistente'}

## Ejemplo de uso

\`\`\`
Usuario: ${triggers[0] || 'ejecuta la skill'}
Claude: Analizando proyecto... Detectado: [framework].
        Generando ${type} con las siguientes caracteristicas:
        ${commands.map(c => `- ${c.desc}`).join('\n        ')}
        Listo. ${commands.length} archivo(s) generado(s).
\`\`\`
`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AnalysisStep({ icon: Icon, text, active, done }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 py-3"
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
          done
            ? 'bg-emerald-500/20 border border-emerald-500/40'
            : active
            ? 'bg-forge-500/20 border border-forge-500/40'
            : 'bg-zinc-800 border border-zinc-700'
        }`}
      >
        {done ? (
          <Check className="w-5 h-5 text-emerald-400" />
        ) : (
          <motion.div
            animate={active ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Icon className={`w-5 h-5 ${active ? 'text-forge-400' : 'text-zinc-500'}`} />
          </motion.div>
        )}
      </div>
      <span
        className={`text-sm font-medium transition-colors ${
          done ? 'text-emerald-400' : active ? 'text-white' : 'text-zinc-500'
        }`}
      >
        {text}
      </span>
      {active && (
        <motion.div
          className="ml-auto flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-forge-500"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

function SimilarSkillCard({ skill, onUseAsBase }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-forge-500/40 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-zinc-400" />
          <span className="font-semibold text-white text-sm">{skill.name}</span>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${matchBadgeColor(
            skill.matchPercent
          )}`}
        >
          {skill.matchPercent}%
        </span>
      </div>
      <p className="text-xs text-zinc-400 mb-3 leading-relaxed">{skill.description}</p>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
          {skill.category}
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
          {skill.type}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-zinc-600 flex items-center gap-1">
          <ExternalLink className="w-3 h-3" />
          {skill.source}
        </span>
        <button
          onClick={() => onUseAsBase(skill)}
          className="text-xs px-3 py-1.5 rounded-lg bg-forge-500/10 text-forge-400 hover:bg-forge-500/20 border border-forge-500/20 hover:border-forge-500/40 transition-all flex items-center gap-1"
        >
          <Zap className="w-3 h-3" />
          Usar como base
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function SuperConstructor() {
  const [phase, setPhase] = useState('input'); // 'input' | 'analyzing' | 'results'
  const [prompt, setPrompt] = useState('');
  const [analysisSteps, setAnalysisSteps] = useState([false, false, false]);
  const [results, setResults] = useState(null);
  const [copiedMd, setCopiedMd] = useState(false);

  // Editable result fields
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editType, setEditType] = useState('');
  const [editDifficulty, setEditDifficulty] = useState('');
  const [editTriggers, setEditTriggers] = useState([]);
  const [editCommands, setEditCommands] = useState([]);
  const [editAgents, setEditAgents] = useState([]);
  const [generatedMd, setGeneratedMd] = useState('');

  const CATEGORIES = [
    'desarrollo-web', 'desarrollo-ia', 'automatizacion', 'documentacion',
    'testing', 'seguridad', 'datos', 'productividad', 'devops', 'analytics',
  ];
  const TYPES = ['prompt', 'template', 'agent', 'tool', 'workflow', 'skill'];
  const DIFFICULTIES = ['initiate', 'apprentice', 'hero', 'legend'];

  const handleForge = useCallback(() => {
    if (!prompt.trim()) return;

    setPhase('analyzing');
    setAnalysisSteps([false, false, false]);

    // Step 1 — 500ms
    setTimeout(() => setAnalysisSteps(prev => [true, prev[1], prev[2]]), 500);
    // Step 2 — 1500ms
    setTimeout(() => setAnalysisSteps(prev => [prev[0], true, prev[2]]), 1500);
    // Step 3 — 2500ms
    setTimeout(() => setAnalysisSteps(prev => [prev[0], prev[1], true]), 2500);

    // Show results after all steps done
    setTimeout(() => {
      const analysis = analyzePrompt(prompt);
      const similar = searchSkills(prompt);
      const md = generateSkillMd(prompt, analysis);

      setEditName(analysis.suggestedName);
      setEditDesc(prompt.substring(0, 200));
      setEditCategory(analysis.category);
      setEditType(analysis.type);
      setEditDifficulty(analysis.difficulty);
      setEditTriggers([...analysis.triggers]);
      setEditCommands([...analysis.commands]);
      setEditAgents([...analysis.agents]);
      setGeneratedMd(md);

      setResults({ analysis, similar, md });
      setPhase('results');
    }, 3200);
  }, [prompt]);

  const handleUseAsBase = useCallback(
    (skill) => {
      if (!results) return;
      // Merge the base skill info into the generated output
      setEditName(skill.name);
      setEditDesc(skill.description);
      setEditCategory(skill.category);
      setEditType(skill.type);

      // Regenerate markdown with merged data
      const merged = {
        ...results.analysis,
        suggestedName: skill.name,
        category: skill.category,
        type: skill.type,
      };
      setGeneratedMd(generateSkillMd(skill.description, merged));
    },
    [results]
  );

  const handleCopyMd = async () => {
    await navigator.clipboard.writeText(generatedMd);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([generatedMd], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editName || 'skill'}-SKILL.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setPhase('input');
    setPrompt('');
    setResults(null);
    setGeneratedMd('');
    setCopiedMd(false);
  };

  const removeTrigger = (idx) => {
    setEditTriggers(prev => prev.filter((_, i) => i !== idx));
  };

  // ─── Phase 1: Prompt Input ─────────────────────────────────────────
  const renderInput = () => (
    <motion.div
      key="input"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-forge-500 to-ember-500 mb-5 shadow-lg shadow-forge-500/30"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
          Super Constructor
        </h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Describe tu skill ideal y la IA la forjara por ti en segundos.
        </p>
      </div>

      {/* Prompt Textarea with glow */}
      <div className="relative mb-6 group">
        {/* Animated gradient border */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-forge-500 via-amber-500 to-ember-500 opacity-40 group-focus-within:opacity-100 blur-sm transition-opacity duration-500 animate-gradient-shift" />
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-forge-500 via-amber-500 to-ember-500 opacity-30 group-focus-within:opacity-80 transition-opacity duration-500 animate-gradient-shift" />
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe que quieres que haga tu skill... Ej: 'Quiero una skill que genere componentes React con TypeScript y Tailwind, que analice el proyecto actual y siga sus convenciones'"
          rows={6}
          className="relative w-full bg-zinc-950 rounded-2xl p-6 text-zinc-200 placeholder-zinc-600 text-base leading-relaxed resize-none focus:outline-none z-10"
        />
      </div>

      {/* Inspiration chips */}
      <div className="mb-8">
        <p className="text-xs text-zinc-600 uppercase tracking-wider font-semibold mb-3">
          Inspiracion rapida
        </p>
        <div className="flex flex-wrap gap-2">
          {INSPIRATION_CHIPS.map((chip) => (
            <motion.button
              key={chip}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPrompt(chip)}
              className="px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-sm hover:border-forge-500/40 hover:text-forge-300 hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
            >
              <Zap className="w-3 h-3 inline mr-1.5 opacity-50" />
              {chip}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Forge Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleForge}
          disabled={!prompt.trim()}
          className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-forge-500 to-ember-500 text-white text-lg font-bold shadow-xl shadow-forge-500/30 hover:shadow-forge-500/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-forge-500/30"
        >
          <Sparkles className="w-6 h-6" />
          Forjar con IA
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );

  // ─── Phase 2: Analyzing ────────────────────────────────────────────
  const renderAnalyzing = () => {
    const steps = [
      { icon: Brain, text: 'Analizando intent...' },
      { icon: Search, text: 'Buscando skills similares...' },
      { icon: Hammer, text: 'Generando skill completa...' },
    ];

    // Derive active / done states
    const getStepState = (idx) => {
      const stepsCompleted = analysisSteps.filter(Boolean).length;
      if (analysisSteps[idx]) {
        // If the *next* step is already true or this is the last completed step
        if (idx < 2 && analysisSteps[idx + 1]) return { active: false, done: true };
        // Current active step (last completed)
        return { active: true, done: false };
      }
      // Not yet reached
      if (stepsCompleted === idx) return { active: false, done: false };
      return { active: false, done: false };
    };

    // Simpler logic: step is "done" if the next one has started, "active" if it just started
    const doneArr = [
      analysisSteps[1], // step 0 done when step 1 starts
      analysisSteps[2], // step 1 done when step 2 starts
      false,            // step 2 is never "done" in this phase
    ];
    const activeArr = [
      analysisSteps[0] && !analysisSteps[1],
      analysisSteps[1] && !analysisSteps[2],
      analysisSteps[2],
    ];

    return (
      <motion.div
        key="analyzing"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-lg mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-forge-500 to-ember-500 mb-4 shadow-lg shadow-forge-500/40"
          >
            <Hammer className="w-7 h-7 text-white" />
          </motion.div>
          <h3 className="text-2xl font-black text-white">Forjando tu skill...</h3>
          <p className="text-zinc-500 text-sm mt-1">Esto tomara unos segundos</p>
        </div>

        <div className="bg-zinc-900/60 rounded-2xl border border-zinc-800 p-6 space-y-1">
          {steps.map((step, idx) =>
            analysisSteps[idx] || (idx === 0) ? (
              <AnalysisStep
                key={idx}
                icon={step.icon}
                text={step.text}
                active={activeArr[idx]}
                done={doneArr[idx]}
              />
            ) : null
          )}
        </div>
      </motion.div>
    );
  };

  // ─── Phase 3: Results ──────────────────────────────────────────────
  const renderResults = () => {
    if (!results) return null;
    const { analysis, similar } = results;

    return (
      <motion.div
        key="results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        {/* Quality Score Bar */}
        <div className="mb-8 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold text-white">Calidad estimada</span>
            </div>
            <span className="text-2xl font-black text-amber-400">{analysis.quality}/100</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${analysis.quality}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-forge-500 to-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left: Similar Skills */}
          <div className="xl:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-zinc-400" />
              Skills similares
            </h3>
            {similar.length > 0 ? (
              <div className="space-y-3">
                {similar.map((skill) => (
                  <SimilarSkillCard
                    key={skill.name}
                    skill={skill}
                    onUseAsBase={handleUseAsBase}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-center">
                <Package className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-sm text-zinc-500">
                  No se encontraron skills similares. Tu skill sera unica!
                </p>
              </div>
            )}
          </div>

          {/* Right: Generated Skill */}
          <div className="xl:col-span-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-forge-400" />
              Skill generada
            </h3>

            {/* Editable fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Nombre</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Categoria</label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setEditCategory(cat)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        editCategory === cat
                          ? 'bg-forge-500/20 text-forge-400 border-forge-500/40'
                          : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Tipo</label>
                <div className="flex flex-wrap gap-1.5">
                  {TYPES.map(t => (
                    <button
                      key={t}
                      onClick={() => setEditType(t)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        editType === t
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Dificultad</label>
                <div className="flex flex-wrap gap-1.5">
                  {DIFFICULTIES.map(d => (
                    <button
                      key={d}
                      onClick={() => setEditDifficulty(d)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        editDifficulty === d
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Descripcion</label>
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 resize-none focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50"
              />
            </div>

            {/* Triggers */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Triggers</label>
              <div className="flex flex-wrap gap-2">
                {editTriggers.map((trigger, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    <Tag className="w-3 h-3 text-forge-400" />
                    {trigger}
                    <button
                      onClick={() => removeTrigger(idx)}
                      className="ml-1 text-zinc-600 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Commands */}
            {editCommands.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Comandos</label>
                <div className="flex flex-wrap gap-2">
                  {editCommands.map((cmd, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 font-mono"
                    >
                      {cmd.cmd}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Agents */}
            {editAgents.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Agentes</label>
                <div className="flex flex-wrap gap-2">
                  {editAgents.map((agent, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono"
                    >
                      {agent}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SKILL.md Preview */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                SKILL.md Preview
              </label>
              <div className="rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                    </div>
                    <span className="text-xs font-mono text-zinc-500 ml-2">SKILL.md</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-forge-500/20 text-forge-400 font-semibold">
                    {generatedMd.split('\n').length} lineas
                  </span>
                </div>
                <pre className="p-6 overflow-x-auto overflow-y-auto max-h-[500px] text-sm leading-relaxed">
                  <code className="text-zinc-300 font-mono whitespace-pre-wrap">{generatedMd}</code>
                </pre>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCopyMd}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm font-medium transition-colors border border-zinc-700"
              >
                {copiedMd ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copiedMd ? 'Copiado!' : 'Copiar SKILL.md'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownloadMd}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm font-medium transition-colors border border-zinc-700"
              >
                <Download className="w-4 h-4" />
                Descargar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forge-500/10 text-forge-400 hover:bg-forge-500/20 text-sm font-medium transition-colors border border-forge-500/20"
              >
                <Edit className="w-4 h-4" />
                Editar en Constructor
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-forge-500 to-ember-500 text-white text-sm font-bold shadow-lg shadow-forge-500/20 hover:shadow-forge-500/40 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Crear otro
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen px-6 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {phase === 'input' && renderInput()}
          {phase === 'analyzing' && renderAnalyzing()}
          {phase === 'results' && renderResults()}
        </AnimatePresence>
      </div>

      {/* Global glow animation style */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
