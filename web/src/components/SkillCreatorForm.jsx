import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Copy,
  Download,
  Check,
  Sparkles,
  Eye,
  FileText,
  Tag,
  Layers,
  BookOpen,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CATEGORIES = [
  'desarrollo-web', 'desarrollo-ia', 'automatizacion', 'documentacion',
  'testing', 'seguridad', 'datos', 'productividad', 'educacion',
  'blockchain', 'cms', 'meta-skill', 'creativity', 'devops', 'analytics',
];

const TYPES = [
  'prompt', 'template', 'agent', 'tool', 'workflow', 'skill', 'micro-skill', 'plugin',
];

const DIFFICULTIES = ['initiate', 'apprentice', 'hero', 'legend'];

const PLATFORMS = ['claude-code', 'cursor', 'windsurf', 'copilot', 'continue', 'all'];

const LANGUAGES = [
  { value: 'es', label: 'Espanol' },
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Portugues' },
];

const LICENSES = ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3', 'Unlicense', 'Proprietary'];

const STEP_META = [
  { label: 'Info basica', icon: FileText },
  { label: 'Metadatos', icon: Tag },
  { label: 'Contenido', icon: BookOpen },
  { label: 'Preview & Descarga', icon: Eye },
];

const INITIAL_FORM = {
  name: '',
  shortDescription: '',
  author: 'SalgadoIA',
  version: '1.0.0',
  language: 'es',
  category: 'desarrollo-web',
  type: 'skill',
  difficulty: 'apprentice',
  platforms: ['claude-code'],
  tags: '',
  license: 'MIT',
  longDescription: '',
  invocation: '',
  instructions: '',
  prompt: '',
  examples: '',
  prerequisites: '',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toKebab(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

function generateSkillMd(f) {
  const kebab = toKebab(f.name || 'mi-skill');
  const tagList = f.tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const yaml = [
    '---',
    `name: "${f.name}"`,
    `description: "${f.shortDescription}"`,
    `version: "${f.version}"`,
    `author: "${f.author}"`,
    `category: ${f.category}`,
    `type: ${f.type}`,
    `difficulty: ${f.difficulty}`,
    `language: ${f.language}`,
    `license: ${f.license}`,
    'platforms:',
    ...f.platforms.map((p) => `  - ${p}`),
    ...(tagList.length
      ? ['tags:', ...tagList.map((t) => `  - ${t}`)]
      : []),
    '---',
  ].join('\n');

  const showStructure = ['skill', 'plugin', 'agent'].includes(f.type);

  const body = [
    '',
    `# ${f.name || 'Mi Skill'}`,
    '',
    `> ${f.shortDescription || 'Descripcion corta del skill.'}`,
    '',
    '## Usage',
    f.invocation || '`/mi-comando`',
    '',
    ...(showStructure
      ? [
          '## Directory Structure',
          '```',
          `${kebab}/`,
          `├── SKILL.md    # Este archivo`,
          `├── commands/   # Comandos disponibles`,
          `└── references/ # Documentacion`,
          '```',
          '',
        ]
      : []),
    '## Overview',
    f.longDescription || '_Sin descripcion detallada._',
    '',
    '## Instructions',
    f.instructions || '_Sin instrucciones._',
    '',
    '## Main Content',
    f.prompt || '_Sin contenido principal._',
    '',
    '## Examples',
    f.examples || '_Sin ejemplos._',
    '',
    '## Prerequisites',
    f.prerequisites || '_Sin requisitos previos._',
  ].join('\n');

  return yaml + body;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function InputField({ label, required, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-zinc-300">
        {label}
        {required && <span className="text-forge-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, ...rest }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-zinc-200 placeholder-zinc-600 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50 transition-colors"
      {...rest}
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3, className = '' }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-zinc-200 placeholder-zinc-600 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50 resize-none transition-colors ${className}`}
    />
  );
}

function SelectField({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-zinc-200 focus:border-forge-500 focus:outline-none focus:ring-1 focus:ring-forge-500/50 transition-colors appearance-none cursor-pointer"
    >
      {options.map((opt) => {
        const v = typeof opt === 'string' ? opt : opt.value;
        const l = typeof opt === 'string' ? opt : opt.label;
        return (
          <option key={v} value={v}>
            {l}
          </option>
        );
      })}
    </select>
  );
}

function ToggleButtons({ options, value, onChange, multi = false }) {
  const isActive = (opt) => (multi ? value.includes(opt) : value === opt);

  const handleClick = (opt) => {
    if (multi) {
      if (opt === 'all') {
        onChange(value.includes('all') ? [] : ['all']);
        return;
      }
      let next = value.filter((v) => v !== 'all');
      next = next.includes(opt) ? next.filter((v) => v !== opt) : [...next, opt];
      if (next.length === 0) next = [];
      onChange(next);
    } else {
      onChange(opt);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => handleClick(opt)}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
            isActive(opt)
              ? 'bg-forge-500/15 text-forge-400 border-forge-500'
              : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step Indicator
// ---------------------------------------------------------------------------

function StepIndicator({ current, onGoTo }) {
  return (
    <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 mb-6">
      {STEP_META.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => i <= current && onGoTo(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                done
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-pointer'
                  : active
                  ? 'bg-forge-500/15 text-forge-400 border border-forge-500/50 glow-forge'
                  : 'bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-default'
              }`}
            >
              {done ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <span>{i + 1}</span>
              )}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEP_META.length - 1 && (
              <ChevronRight className={`w-4 h-4 shrink-0 ${done ? 'text-emerald-500' : 'text-zinc-700'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live Preview Panel
// ---------------------------------------------------------------------------

function LivePreview({ markdown, onCopy, copied }) {
  const lines = markdown.split('\n');
  const inFrontmatter = { current: false, count: 0 };

  const highlighted = lines.map((line, idx) => {
    if (line === '---') {
      inFrontmatter.count++;
      if (inFrontmatter.count === 1) inFrontmatter.current = true;
      else if (inFrontmatter.count === 2) inFrontmatter.current = false;
      return (
        <span key={idx} className="text-zinc-500">
          {line}
        </span>
      );
    }

    if (inFrontmatter.current) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0 && !line.startsWith('  -')) {
        return (
          <span key={idx}>
            <span className="text-emerald-400">{line.slice(0, colonIdx)}</span>
            <span className="text-zinc-500">:</span>
            <span className="text-zinc-200">{line.slice(colonIdx + 1)}</span>
          </span>
        );
      }
      if (line.startsWith('  -')) {
        return (
          <span key={idx}>
            <span className="text-zinc-500">  - </span>
            <span className="text-zinc-200">{line.slice(4)}</span>
          </span>
        );
      }
      return (
        <span key={idx} className="text-emerald-400">
          {line}
        </span>
      );
    }

    if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ')) {
      return (
        <span key={idx} className="text-forge-400 font-bold">
          {line}
        </span>
      );
    }
    if (line.startsWith('> ')) {
      return (
        <span key={idx} className="text-zinc-400 italic">
          {line}
        </span>
      );
    }
    if (line.startsWith('```')) {
      return (
        <span key={idx} className="text-zinc-500">
          {line}
        </span>
      );
    }
    if (line.startsWith('- ') || line.startsWith('  -')) {
      return (
        <span key={idx} className="text-zinc-300">
          {line}
        </span>
      );
    }

    return (
      <span key={idx} className="text-zinc-300">
        {line}
      </span>
    );
  });

  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col max-h-[calc(100vh-10rem)]">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-mono text-zinc-400">SKILL.md</span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto p-4 flex-1">
        <pre className="text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap break-words">
          {highlighted.map((el, i) => (
            <div key={i}>{el}</div>
          ))}
        </pre>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Summary Table (Step 4)
// ---------------------------------------------------------------------------

function SummaryTable({ form }) {
  const rows = [
    ['Nombre', form.name || '-'],
    ['Descripcion', form.shortDescription || '-'],
    ['Autor', form.author],
    ['Version', form.version],
    ['Idioma', form.language],
    ['Categoria', form.category],
    ['Tipo', form.type],
    ['Dificultad', form.difficulty],
    ['Plataformas', form.platforms.join(', ') || '-'],
    ['Tags', form.tags || '-'],
    ['Licencia', form.license],
    ['Invocacion', form.invocation || '-'],
  ];

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([key, val], i) => (
            <tr key={key} className={i % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-900/20'}>
              <td className="px-4 py-2.5 text-zinc-400 font-medium w-36">{key}</td>
              <td className="px-4 py-2.5 text-zinc-200">{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step Contents
// ---------------------------------------------------------------------------

function Step1({ form, set }) {
  return (
    <div className="space-y-5">
      <InputField label="Nombre del Skill" required>
        <TextInput
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Ej: React Component Generator"
        />
      </InputField>

      <InputField label="Descripcion Corta" required>
        <TextArea
          value={form.shortDescription}
          onChange={(e) => set('shortDescription', e.target.value)}
          placeholder="Genera componentes React con TypeScript y Tailwind CSS en segundos."
          rows={2}
        />
      </InputField>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InputField label="Autor">
          <TextInput value={form.author} onChange={(e) => set('author', e.target.value)} />
        </InputField>
        <InputField label="Version">
          <TextInput value={form.version} onChange={(e) => set('version', e.target.value)} />
        </InputField>
        <InputField label="Idioma">
          <SelectField
            value={form.language}
            onChange={(e) => set('language', e.target.value)}
            options={LANGUAGES}
          />
        </InputField>
      </div>
    </div>
  );
}

function Step2({ form, set }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Categoria">
          <SelectField
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            options={CATEGORIES}
          />
        </InputField>
        <InputField label="Tipo">
          <SelectField
            value={form.type}
            onChange={(e) => set('type', e.target.value)}
            options={TYPES}
          />
        </InputField>
      </div>

      <InputField label="Dificultad">
        <ToggleButtons
          options={DIFFICULTIES}
          value={form.difficulty}
          onChange={(v) => set('difficulty', v)}
        />
      </InputField>

      <InputField label="Plataformas compatibles">
        <ToggleButtons
          options={PLATFORMS}
          value={form.platforms}
          onChange={(v) => set('platforms', v)}
          multi
        />
      </InputField>

      <InputField label="Tags (separados por coma)">
        <TextInput
          value={form.tags}
          onChange={(e) => set('tags', e.target.value)}
          placeholder="react, typescript, tailwind, componentes"
        />
      </InputField>

      <InputField label="Licencia">
        <SelectField
          value={form.license}
          onChange={(e) => set('license', e.target.value)}
          options={LICENSES}
        />
      </InputField>
    </div>
  );
}

function Step3({ form, set }) {
  return (
    <div className="space-y-5">
      <InputField label="Descripcion Larga / Overview">
        <TextArea
          value={form.longDescription}
          onChange={(e) => set('longDescription', e.target.value)}
          placeholder="Explica en detalle que hace este skill, que problema resuelve y como se diferencia de otras soluciones..."
          rows={4}
        />
      </InputField>

      <InputField label="Invocacion (Comando o Trigger)">
        <TextInput
          value={form.invocation}
          onChange={(e) => set('invocation', e.target.value)}
          placeholder='/mi-comando "args"'
        />
      </InputField>

      <InputField label="Instrucciones de Uso">
        <TextArea
          value={form.instructions}
          onChange={(e) => set('instructions', e.target.value)}
          placeholder={"Paso 1: ...\nPaso 2: ...\nPaso 3: ..."}
          rows={4}
        />
      </InputField>

      <InputField label="Prompt / Contenido Principal">
        <TextArea
          value={form.prompt}
          onChange={(e) => set('prompt', e.target.value)}
          placeholder="Eres un experto en... Tu objetivo es..."
          rows={6}
          className="font-mono text-sm"
        />
      </InputField>

      <InputField label="Ejemplos de Uso">
        <TextArea
          value={form.examples}
          onChange={(e) => set('examples', e.target.value)}
          placeholder={"Ejemplo 1: ...\nEjemplo 2: ..."}
          rows={3}
        />
      </InputField>

      <InputField label="Requisitos Previos">
        <TextArea
          value={form.prerequisites}
          onChange={(e) => set('prerequisites', e.target.value)}
          placeholder={"- Claude Code instalado\n- Acceso a API\n- Node.js >= 18"}
          rows={3}
        />
      </InputField>
    </div>
  );
}

function Step4({ form, markdown, onCopy, onDownload, onReset, copied }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <Layers className="w-5 h-5 text-forge-400" />
          Resumen del Skill
        </h3>
        <p className="text-sm text-zinc-500 mb-4">Revisa los datos antes de copiar o descargar.</p>
        <SummaryTable form={form} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onCopy}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-forge-500 to-ember-500 text-white font-bold hover:from-forge-600 hover:to-ember-600 transition-all shadow-lg shadow-forge-500/25"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? 'Copiado!' : 'Copiar SKILL.md'}
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 font-medium hover:bg-zinc-800 transition-all"
        >
          <Download className="w-5 h-5" />
          Descargar
        </button>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 text-sm text-forge-400 hover:text-forge-300 transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Crear otro skill
      </button>

      {/* Mobile-only preview */}
      <div className="lg:hidden mt-6">
        <LivePreview markdown={markdown} onCopy={onCopy} copied={copied} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function SkillCreatorForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [copied, setCopied] = useState(false);

  const set = useCallback(
    (key, value) => setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  const markdown = useMemo(() => generateSkillMd(form), [form]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }, [markdown]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SKILL.md';
    a.click();
    URL.revokeObjectURL(url);
  }, [markdown]);

  const handleReset = useCallback(() => {
    setForm(INITIAL_FORM);
    setStep(0);
  }, []);

  const canAdvance = () => {
    if (step === 0) return form.name.trim() !== '' && form.shortDescription.trim() !== '';
    return true;
  };

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left column: Form */}
      <div className="min-w-0">
        <StepIndicator current={step} onGoTo={setStep} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            {step === 0 && <Step1 form={form} set={set} />}
            {step === 1 && <Step2 form={form} set={set} />}
            {step === 2 && <Step3 form={form} set={set} />}
            {step === 3 && (
              <Step4
                form={form}
                markdown={markdown}
                onCopy={handleCopy}
                onDownload={handleDownload}
                onReset={handleReset}
                copied={copied}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              step === 0
                ? 'invisible'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          {step < 3 && (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forge-500 text-white font-medium hover:bg-forge-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === 2 ? (
                <>
                  <Eye className="w-4 h-4" />
                  Ver preview
                </>
              ) : (
                <>
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Right column: Live preview (desktop only, hidden on mobile except step 4 handled inside Step4) */}
      <div className="hidden lg:block">
        <div className="sticky top-8">
          <LivePreview markdown={markdown} onCopy={handleCopy} copied={copied} />
        </div>
      </div>
    </div>
  );
}
