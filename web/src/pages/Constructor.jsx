import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Sparkles, RefreshCw, GitMerge, ChevronRight, Check, Copy, Download, FileText, Zap, AlertTriangle, ArrowRight, Layers, GitBranch, Combine, Wand2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import SkillCreatorForm from '../components/SkillCreatorForm';
import SuperConstructor from '../components/SuperConstructor';

const modes = [
  { id: 'super', icon: Wand2, label: 'SuperConstructor', desc: 'Describe y genera con IA', featured: true },
  { id: 'create', icon: Hammer, label: 'Crear Skill', desc: 'Formulario paso a paso' },
  { id: 'micro', icon: Sparkles, label: 'Micro-Skill', desc: 'Skill ligero <100 lineas' },
  { id: 'improve', icon: RefreshCw, label: 'Mejorar', desc: 'Analiza y mejora un skill' },
  { id: 'fuse', icon: GitMerge, label: 'Fusionar', desc: 'Combina 2+ skills' },
];

// ─── Micro-Skill Creator ───────────────────────────────────────────

function MicroSkillCreator() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', description: '', trigger: '' });
  const [generated, setGenerated] = useState(null);
  const [copied, setCopied] = useState(false);

  const slugName = form.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').substring(0, 40);

  const generateMicroSkill = () => {
    const triggers = form.trigger.split(',').map(t => t.trim()).filter(Boolean);
    const output = `---
name: ${slugName}
description: |
  ${form.description}
  USAR cuando el usuario diga ${triggers.map(t => `"${t}"`).join(', ')}.
  NO usar para tareas no relacionadas.
author: SalgadoIA
version: 1.0.0
---

# ${form.name}

## Proposito
${form.description}

## Cuando se activa
${triggers.map(t => `- "${t}"`).join('\n')}

## Instrucciones
1. Analizar el contexto del proyecto actual
2. Preguntar requisitos si no estan claros
3. Ejecutar la tarea de forma directa y concisa
4. Validar el resultado

## Reglas
- Mantener el output breve y directo
- No duplicar funcionalidad existente
- Un solo proposito, una sola responsabilidad`;
    setGenerated(output);
    setStep(1);
  };

  const handleCopy = async () => {
    if (generated) {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!generated) return;
    const blob = new Blob([generated], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slugName || 'micro-skill'}-SKILL.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence mode="wait">
      {step === 0 && (
        <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-forge-500 text-white glow-forge">1</div>
            <div className="w-8 h-0.5 bg-zinc-800" />
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-zinc-800 text-zinc-500">2</div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-zinc-300">Nombre del micro-skill</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Ej: React Component Generator"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 placeholder-zinc-600 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-zinc-300">Descripcion</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Ej: Genera componentes React funcionales con TypeScript y Tailwind CSS siguiendo las convenciones del proyecto."
                className="w-full h-28 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-zinc-200 placeholder-zinc-600 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-zinc-300">Frases de activacion</label>
              <p className="text-xs text-zinc-500">Separadas por coma. Frases que el usuario diria para activar el skill.</p>
              <input
                type="text"
                value={form.trigger}
                onChange={e => setForm({ ...form, trigger: e.target.value })}
                placeholder="Ej: crear componente, generar componente react, nuevo componente"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 placeholder-zinc-600 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={generateMicroSkill}
              disabled={!form.name || !form.description || !form.trigger}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-forge-500 to-ember-500 text-white font-bold hover:from-forge-600 hover:to-ember-600 transition-all shadow-lg shadow-forge-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5" /> Generar Micro-Skill
            </button>
          </div>
        </motion.div>
      )}

      {step === 1 && generated && (
        <motion.div key="preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-emerald-500 text-white"><Check className="w-4 h-4" /></div>
            <div className="w-8 h-0.5 bg-emerald-500" />
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-forge-500 text-white glow-forge">2</div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Check className="w-6 h-6 text-emerald-400" />
              Micro-Skill Generado
            </h3>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm transition-colors">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
              <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm transition-colors">
                <Download className="w-4 h-4" /> Descargar
              </button>
              <button
                onClick={() => { setGenerated(null); setStep(0); setForm({ name: '', description: '', trigger: '' }); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forge-500/20 text-forge-400 hover:bg-forge-500/30 text-sm transition-colors"
              >
                <Sparkles className="w-4 h-4" /> Crear otro
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <div className="px-4 py-2 bg-zinc-800/50 border-b border-zinc-800 flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-500">SKILL.md</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-forge-500/20 text-forge-400">micro-skill</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm leading-relaxed max-h-[500px] overflow-y-auto">
              <code className="text-zinc-300 font-mono whitespace-pre-wrap">{generated}</code>
            </pre>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Skill Analyzer (Improve) ──────────────────────────────────────

function analyzeSkill(content) {
  const lines = content.split('\n');
  const lower = content.toLowerCase();

  // Frontmatter (0-25)
  let frontmatter = 0;
  const hasFrontmatter = content.startsWith('---');
  if (hasFrontmatter) frontmatter += 5;
  if (/name:\s*.+/i.test(content)) frontmatter += 5;
  if (/description:\s*.+/i.test(content)) frontmatter += 5;
  if (/author:\s*.+/i.test(content)) frontmatter += 3;
  if (/version:\s*.+/i.test(content)) frontmatter += 2;
  if (/USAR cuando/i.test(content)) frontmatter += 3;
  if (/NO usar/i.test(content)) frontmatter += 2;
  frontmatter = Math.min(25, frontmatter);

  // Content (0-25)
  let contenido = 0;
  const headings = lines.filter(l => /^##\s/.test(l)).length;
  contenido += Math.min(10, headings * 2);
  if (/instrucciones|instructions/i.test(content)) contenido += 5;
  if (/ejemplo|example/i.test(content)) contenido += 5;
  if (/reglas|rules/i.test(content)) contenido += 3;
  if (/```/.test(content)) contenido += 2;
  contenido = Math.min(25, contenido);

  // Structure (0-25)
  let estructura = 0;
  if (/commands\//i.test(content)) estructura += 7;
  if (/agents\//i.test(content)) estructura += 7;
  if (/references\//i.test(content)) estructura += 4;
  if (/templates\//i.test(content)) estructura += 4;
  if (/arquitectura|structure/i.test(content)) estructura += 3;
  estructura = Math.min(25, estructura);

  // Reuse (0-25)
  let reutilizacion = 0;
  if (/template/i.test(content)) reutilizacion += 6;
  if (/progressive disclosure/i.test(content)) reutilizacion += 6;
  if (/reutiliz|reusab/i.test(content)) reutilizacion += 5;
  if (/delegar|delegate/i.test(content)) reutilizacion += 4;
  if (/\bbase\b.*\bextension\b/i.test(content)) reutilizacion += 4;
  reutilizacion = Math.min(25, reutilizacion);

  const total = frontmatter + contenido + estructura + reutilizacion;

  // Suggestions
  const suggestions = [];
  if (!hasFrontmatter) suggestions.push({ text: 'Agregar frontmatter YAML (---)', impact: 5 });
  if (!/name:\s*.+/i.test(content)) suggestions.push({ text: 'Agregar campo "name" en frontmatter', impact: 5 });
  if (!/description:\s*.+/i.test(content)) suggestions.push({ text: 'Agregar campo "description" en frontmatter', impact: 5 });
  if (!/USAR cuando/i.test(content)) suggestions.push({ text: 'Agregar triggers con "USAR cuando..."', impact: 3 });
  if (!/NO usar/i.test(content)) suggestions.push({ text: 'Definir exclusiones con "NO usar cuando..."', impact: 2 });
  if (headings < 3) suggestions.push({ text: 'Agregar mas secciones con ## (minimo 3-4)', impact: 4 });
  if (!/instrucciones|instructions/i.test(content)) suggestions.push({ text: 'Agregar seccion de "## Instrucciones"', impact: 5 });
  if (!/ejemplo|example/i.test(content)) suggestions.push({ text: 'Incluir ejemplos de uso concretos', impact: 5 });
  if (!/commands\//i.test(content)) suggestions.push({ text: 'Definir carpeta commands/ para sub-comandos', impact: 7 });
  if (!/agents\//i.test(content)) suggestions.push({ text: 'Agregar agents/ para tareas delegables', impact: 7 });
  if (!/template/i.test(content)) suggestions.push({ text: 'Incluir templates reutilizables', impact: 6 });
  if (!/progressive disclosure/i.test(content)) suggestions.push({ text: 'Mencionar progressive disclosure para mantener body conciso', impact: 6 });
  if (!/version:\s*.+/i.test(content)) suggestions.push({ text: 'Agregar versionado semantico (version: X.Y.Z)', impact: 2 });

  suggestions.sort((a, b) => b.impact - a.impact);

  return {
    total,
    dimensions: [
      { label: 'Frontmatter', score: frontmatter, max: 25, color: 'forge' },
      { label: 'Contenido', score: contenido, max: 25, color: 'emerald' },
      { label: 'Estructura', score: estructura, max: 25, color: 'steel' },
      { label: 'Reutilizacion', score: reutilizacion, max: 25, color: 'amber' },
    ],
    suggestions: suggestions.slice(0, 8),
  };
}

function CircularProgress({ score, size = 120 }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : score >= 25 ? '#f97316' : '#ef4444';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#27272a" strokeWidth="8" fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth="8" fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white">{score}</span>
        <span className="text-xs text-zinc-500">/100</span>
      </div>
    </div>
  );
}

function DimensionBar({ label, score, max, color }) {
  const pct = (score / max) * 100;
  const colorMap = {
    forge: { bg: 'bg-forge-500', text: 'text-forge-400' },
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400' },
    steel: { bg: 'bg-steel-500', text: 'text-steel-400' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-400' },
  };
  const c = colorMap[color] || colorMap.forge;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <span className={`text-sm font-bold ${c.text}`}>{score}/{max}</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${c.bg}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function SkillAnalyzer() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!content.trim()) return;
    setResult(analyzeSkill(content));
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-300">Pega tu SKILL.md aqui</label>
            <p className="text-xs text-zinc-500">El analizador evaluara frontmatter, contenido, estructura y reutilizacion.</p>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`---\nname: mi-skill\ndescription: |\n  Descripcion del skill.\n  USAR cuando el usuario diga "...".\n---\n\n# Mi Skill\n\n## Instrucciones\n...`}
              className="w-full h-64 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-zinc-200 placeholder-zinc-600 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50 resize-none font-mono text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={!content.trim()}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-5 h-5" /> Analizar
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* Score + Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Circular score */}
            <div className="flex flex-col items-center justify-center gap-3">
              <CircularProgress score={result.total} />
              <p className="text-sm text-zinc-500 font-medium">
                {result.total >= 75 ? 'Excelente skill' : result.total >= 50 ? 'Buen skill, mejorable' : result.total >= 25 ? 'Necesita trabajo' : 'Muy basico'}
              </p>
            </div>

            {/* Dimension bars */}
            <div className="space-y-4">
              {result.dimensions.map(d => (
                <DimensionBar key={d.label} {...d} />
              ))}
            </div>
          </div>

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Sugerencias de mejora</h4>
              <div className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 border border-zinc-800"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-sm text-zinc-300">{s.text}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 flex-shrink-0 ml-3">+{s.impact} pts</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => setResult(null)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Analizar otro
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Skill Fuser ───────────────────────────────────────────────────

const fuseStrategies = [
  {
    id: 'merge',
    icon: Combine,
    label: 'Merge',
    desc: 'Unificar todo - solapamiento >50%',
    color: 'forge',
  },
  {
    id: 'compose',
    icon: GitBranch,
    label: 'Compose',
    desc: 'Orquestar - skills independientes',
    color: 'emerald',
  },
  {
    id: 'layer',
    icon: Layers,
    label: 'Layer',
    desc: 'Base + extension - jerarquico',
    color: 'steel',
  },
];

function extractMeta(content) {
  const name = content.match(/name:\s*(.+)/i)?.[1]?.trim() || 'unknown-skill';
  const desc = content.match(/description:\s*\|?\s*\n?\s*(.+)/i)?.[1]?.trim() || '';
  const triggers = [];
  const triggerMatches = content.match(/USAR cuando[^.]*\./gi);
  if (triggerMatches) triggers.push(...triggerMatches);
  const activationLines = content.match(/^- "(.+)"$/gm);
  if (activationLines) triggers.push(...activationLines.map(l => l.replace(/^- /, '')));

  const instructionBlock = content.match(/## Instrucciones\n([\s\S]*?)(?=\n## |\n---|\Z)/i)?.[1]?.trim() || '';
  const rulesBlock = content.match(/## Reglas\n([\s\S]*?)(?=\n## |\n---|\Z)/i)?.[1]?.trim() || '';

  return { name, desc, triggers, instructionBlock, rulesBlock };
}

function fuseSkills(contentA, contentB, strategy) {
  const a = extractMeta(contentA);
  const b = extractMeta(contentB);

  const allTriggers = [...new Set([...a.triggers, ...b.triggers])];
  const triggerStr = allTriggers.length > 0
    ? allTriggers.map(t => `  ${t}`).join('\n')
    : `  USAR cuando el usuario necesite "${a.name}" o "${b.name}".`;

  if (strategy === 'merge') {
    return `---
name: ${a.name}-${b.name}-merged
description: |
  Skill unificado que combina ${a.name} y ${b.name}.
${triggerStr}
  NO usar cuando la tarea no este relacionada con ninguno de los dos skills.
author: SalgadoIA
version: 1.0.0
---

# ${a.name} + ${b.name} (Merged)

## Proposito
Skill unificado que integra la funcionalidad de ambos skills originales
en un solo flujo coherente.

- **${a.name}**: ${a.desc}
- **${b.name}**: ${b.desc}

## Cuando se activa
${allTriggers.map(t => `- ${t}`).join('\n') || `- Cuando se necesite ${a.name} o ${b.name}`}

## Instrucciones
${a.instructionBlock ? `### De ${a.name}\n${a.instructionBlock}\n` : ''}
${b.instructionBlock ? `### De ${b.name}\n${b.instructionBlock}\n` : ''}

## Reglas
${a.rulesBlock || '- Seguir las convenciones del proyecto'}
${b.rulesBlock || ''}
- Priorizar coherencia entre ambos flujos
- No duplicar funcionalidad`;
  }

  if (strategy === 'compose') {
    return `---
name: ${a.name}-${b.name}-composed
description: |
  Orquestador que coordina ${a.name} y ${b.name} como skills independientes.
${triggerStr}
author: SalgadoIA
version: 1.0.0
---

# ${a.name} + ${b.name} (Composed)

## Proposito
Orquestador que ejecuta ambos skills de forma independiente,
delegando a cada uno segun el contexto.

## Skills Orquestados
1. **${a.name}**: ${a.desc}
2. **${b.name}**: ${b.desc}

## Instrucciones
1. Analizar la solicitud del usuario
2. Determinar cual skill (o ambos) aplica al caso
3. Si aplica ${a.name}:
${a.instructionBlock ? a.instructionBlock.split('\n').map(l => `   ${l}`).join('\n') : '   - Ejecutar flujo de ' + a.name}
4. Si aplica ${b.name}:
${b.instructionBlock ? b.instructionBlock.split('\n').map(l => `   ${l}`).join('\n') : '   - Ejecutar flujo de ' + b.name}
5. Integrar resultados si ambos fueron ejecutados

## Reglas
- Cada skill mantiene su propia responsabilidad
- No mezclar logica entre skills
- Delegar correctamente segun contexto`;
  }

  // layer
  return `---
name: ${a.name}-${b.name}-layered
description: |
  Skill jerarquico: ${a.name} (base) + ${b.name} (extension).
${triggerStr}
author: SalgadoIA
version: 1.0.0
---

# ${a.name} (Base) + ${b.name} (Extension)

## Proposito
Arquitectura en capas donde ${a.name} proporciona la funcionalidad base
y ${b.name} extiende con capacidades adicionales.

## Capa Base: ${a.name}
${a.desc}

## Extension: ${b.name}
${b.desc}

## Instrucciones

### Base (siempre se ejecuta)
${a.instructionBlock || '1. Ejecutar flujo base de ' + a.name}

### Extension (cuando aplica)
${b.instructionBlock || '1. Extender con funcionalidad de ' + b.name}

## Reglas
- La capa base siempre se ejecuta primero
- La extension solo se activa cuando es relevante
- La extension no puede contradecir la base
${a.rulesBlock || ''}
${b.rulesBlock || ''}`;
}

function SkillFuser() {
  const [skillA, setSkillA] = useState('');
  const [skillB, setSkillB] = useState('');
  const [strategy, setStrategy] = useState('merge');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFuse = () => {
    if (!skillA.trim() || !skillB.trim()) return;
    setResult(fuseSkills(skillA, skillB, strategy));
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fused-skill-${strategy}-SKILL.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const colorMap = {
    forge: {
      active: 'border-forge-500/50 bg-forge-500/10',
      icon: 'text-forge-400',
    },
    emerald: {
      active: 'border-emerald-500/50 bg-emerald-500/10',
      icon: 'text-emerald-400',
    },
    steel: {
      active: 'border-steel-500/50 bg-steel-500/10',
      icon: 'text-steel-400',
    },
  };

  if (result) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Check className="w-6 h-6 text-emerald-400" />
            Skill Fusionado ({strategy})
          </h3>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm transition-colors">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
            <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm transition-colors">
              <Download className="w-4 h-4" /> Descargar
            </button>
            <button
              onClick={() => { setResult(null); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forge-500/20 text-forge-400 hover:bg-forge-500/30 text-sm transition-colors"
            >
              <GitMerge className="w-4 h-4" /> Fusionar otro
            </button>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <div className="px-4 py-2 bg-zinc-800/50 border-b border-zinc-800 flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500">SKILL.md</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-forge-500/20 text-forge-400">{strategy}</span>
          </div>
          <pre className="p-6 overflow-x-auto text-sm leading-relaxed max-h-[500px] overflow-y-auto">
            <code className="text-zinc-300 font-mono whitespace-pre-wrap">{result}</code>
          </pre>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Two textareas side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-forge-400" /> Skill A
          </label>
          <textarea
            value={skillA}
            onChange={e => setSkillA(e.target.value)}
            placeholder="Pega aqui el contenido de SKILL.md del primer skill..."
            className="w-full h-52 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-zinc-200 placeholder-zinc-600 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50 resize-none font-mono text-xs"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-steel-400" /> Skill B
          </label>
          <textarea
            value={skillB}
            onChange={e => setSkillB(e.target.value)}
            placeholder="Pega aqui el contenido de SKILL.md del segundo skill..."
            className="w-full h-52 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-zinc-200 placeholder-zinc-600 focus:border-steel-500 focus:outline-none focus:ring-1 focus:ring-steel-500/50 resize-none font-mono text-xs"
          />
        </div>
      </div>

      {/* Strategy selector */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-zinc-300">Estrategia de fusion</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {fuseStrategies.map(s => {
            const isActive = strategy === s.id;
            const colors = colorMap[s.color];
            return (
              <button
                key={s.id}
                onClick={() => setStrategy(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isActive
                    ? `${colors.active} border-opacity-100 shadow-lg`
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'
                }`}
              >
                <s.icon className={`w-6 h-6 mb-2 ${isActive ? colors.icon : 'text-zinc-500'}`} />
                <h4 className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-zinc-300'}`}>{s.label}</h4>
                <p className="text-xs text-zinc-500 mt-1">{s.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fuse button */}
      <div className="flex justify-end">
        <button
          onClick={handleFuse}
          disabled={!skillA.trim() || !skillB.trim()}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-forge-500 to-ember-500 text-white font-bold hover:from-forge-600 hover:to-ember-600 transition-all shadow-lg shadow-forge-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GitMerge className="w-5 h-5" /> Fusionar
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Constructor Page ─────────────────────────────────────────

export default function Constructor() {
  const [mode, setMode] = useState('super');

  return (
    <div className="min-h-screen px-6 py-8 lg:py-12">
      <div className={`mx-auto ${mode === 'super' ? 'max-w-6xl' : 'max-w-4xl'}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">Constructor de Skills</h1>
          <p className="text-zinc-500 mb-8">Crea, mejora y fusiona skills para Claude Code Desktop</p>
        </motion.div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                mode === m.id
                  ? m.featured
                    ? 'border-forge-500 bg-gradient-to-br from-forge-500/20 to-ember-500/10 shadow-lg shadow-forge-500/20'
                    : 'border-forge-500/50 bg-forge-500/10 shadow-lg shadow-forge-500/10'
                  : m.featured
                    ? 'border-forge-500/30 bg-zinc-900/80 hover:border-forge-500/60 hover:bg-forge-500/5'
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'
              } ${m.featured && mode !== m.id ? 'lg:col-span-1' : ''}`}
            >
              <m.icon className={`w-6 h-6 mb-3 ${mode === m.id ? 'text-forge-400' : m.featured ? 'text-forge-500/70' : 'text-zinc-500'}`} />
              <h3 className={`font-semibold text-sm ${mode === m.id ? 'text-white' : 'text-zinc-300'}`}>{m.label}</h3>
              <p className="text-xs text-zinc-500 mt-1">{m.desc}</p>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {mode === 'super' && (
            <motion.div key="super" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SuperConstructor />
            </motion.div>
          )}
          {mode === 'create' && (
            <motion.div key="create" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <SkillCreatorForm />
              </div>
            </motion.div>
          )}
          {mode === 'micro' && (
            <motion.div key="micro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <MicroSkillCreator />
              </div>
            </motion.div>
          )}
          {mode === 'improve' && (
            <motion.div key="improve" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <SkillAnalyzer />
              </div>
            </motion.div>
          )}
          {mode === 'fuse' && (
            <motion.div key="fuse" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <SkillFuser />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
