import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Paintbrush,
  FileText,
  Eye,
  Download,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Palette,
  Type,
  Globe,
  Mail,
  ArrowRight,
  Sparkles,
  Package,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FONTS = [
  'Inter',
  'Montserrat',
  'Roboto',
  'Poppins',
  'Playfair Display',
  'Open Sans',
];

const TEMPLATE_OPTIONS = [
  { id: 'reports', emoji: '\u{1F4C4}', label: 'Informes y Reports' },
  { id: 'presentations', emoji: '\u{1F4CA}', label: 'Presentaciones' },
  { id: 'emails', emoji: '\u{1F4E7}', label: 'Emails corporativos' },
  { id: 'proposals', emoji: '\u{1F4CB}', label: 'Propuestas comerciales' },
  { id: 'legal', emoji: '\u{1F4DD}', label: 'Contratos y Legal' },
  { id: 'brandguide', emoji: '\u{1F3A8}', label: 'Brand Guidelines' },
  { id: 'social', emoji: '\u{1F4F1}', label: 'Social Media Posts' },
  { id: 'landing', emoji: '\u{1F310}', label: 'Landing Pages' },
];

const STEP_META = [
  { label: 'Configura tu Marca', icon: Paintbrush },
  { label: 'Plantillas de Documento', icon: FileText },
  { label: 'Preview del Plugin', icon: Eye },
  { label: 'Instalar y Usar', icon: Package },
];

const INITIAL_FORM = {
  brandName: '',
  tagline: '',
  primaryColor: '#f97316',
  secondaryColor: '#1e293b',
  fontFamily: 'Inter',
  logoUrl: '',
  website: '',
  email: '',
  footer: '',
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

function generateBrandConfig(form) {
  return JSON.stringify(
    {
      brand: {
        name: form.brandName || 'Mi Marca',
        tagline: form.tagline || '',
        logo: form.logoUrl || './assets/logo.png',
        website: form.website || '',
        email: form.email || '',
        footer: form.footer || '',
      },
      theme: {
        primaryColor: form.primaryColor,
        secondaryColor: form.secondaryColor,
        fontFamily: form.fontFamily,
        headingFont: form.fontFamily,
        bodyFont: form.fontFamily,
      },
      assets: {
        logo: form.logoUrl || './assets/logo.png',
        favicon: './assets/favicon.ico',
        socialBanner: './assets/social-banner.png',
      },
    },
    null,
    2,
  );
}

function generatePluginJson(form, templates) {
  const slug = toKebab(form.brandName || 'mi-marca');
  return JSON.stringify(
    {
      name: `brand-${slug}`,
      version: '1.0.0',
      description: `Plugin de marca para ${form.brandName || 'Mi Marca'}. Aplica identidad visual y plantillas corporativas a todos los documentos.`,
      author: form.brandName || 'Mi Marca',
      skills: [
        {
          name: 'brand-documents',
          path: './skills/brand-documents/SKILL.md',
          description: 'Genera documentos con la identidad de marca',
        },
        {
          name: 'brand-templates',
          path: './skills/brand-templates/SKILL.md',
          description: 'Gestiona plantillas corporativas',
        },
        {
          name: 'brand-assets',
          path: './skills/brand-assets/SKILL.md',
          description: 'Kit de assets y recursos de marca',
        },
      ],
      templates: templates.map((t) => t.id),
      config: './brand-config.json',
    },
    null,
    2,
  );
}

function generateSkillMd(form) {
  const name = form.brandName || 'Mi Marca';
  return `---
name: "brand-documents"
description: "Genera documentos con identidad de marca ${name}"
version: "1.0.0"
author: "${name}"
category: documentacion
type: skill
difficulty: apprentice
language: es
platforms:
  - claude-code
tags:
  - brand
  - documentos
  - plantillas
---

# Brand Documents - ${name}

> Skill que aplica la identidad visual de ${name} a todos los documentos generados.

## Usage

\`/brand-report "Titulo del informe"\`
\`/brand-email "Asunto del email"\`
\`/brand-proposal "Nombre de la propuesta"\`

## Instructions

Cuando generes cualquier documento para ${name}:

1. **Siempre** incluir el logo y header corporativo
2. Usar la paleta de colores definida:
   - Color primario: ${form.primaryColor}
   - Color secundario: ${form.secondaryColor}
3. Tipografia: ${form.fontFamily}
4. Incluir footer corporativo: "${form.footer || `\u00A9 ${new Date().getFullYear()} ${name}. Todos los derechos reservados.`}"
5. Mantener tono profesional y consistente con la marca
${form.tagline ? `6. Incluir tagline cuando sea apropiado: "${form.tagline}"` : ''}

## Brand Config

Cargar configuracion desde \`../brand-config.json\` para obtener
colores, tipografias, logos y datos de contacto actualizados.

## Examples

### Generar informe
\`/brand-report "Informe trimestral Q1 2026"\`

### Generar email corporativo
\`/brand-email "Propuesta de colaboracion"\`

### Generar propuesta comercial
\`/brand-proposal "Servicios de consultoria"\`
`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-forge-400 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400">Copiado</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copiar</span>
        </>
      )}
    </button>
  );
}

function CodePreview({ code, language = 'json', title }) {
  return (
    <div className="rounded-xl overflow-hidden bg-black/40 border border-zinc-800">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-800">
        <span className="text-xs font-mono text-zinc-500">
          {title || language}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed max-h-80 overflow-y-auto">
        <code className="text-zinc-300 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEP_META.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive
                    ? 'border-forge-500 bg-forge-500/20 text-forge-400'
                    : isCompleted
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                      : 'border-zinc-700 bg-zinc-900/50 text-zinc-600'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1.5 font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-forge-400'
                    : isCompleted
                      ? 'text-emerald-400'
                      : 'text-zinc-600'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEP_META.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-1 mt-[-18px] transition-colors duration-300 ${
                  isCompleted ? 'bg-emerald-500/50' : 'bg-zinc-800'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step components
// ---------------------------------------------------------------------------

function Step1BrandConfig({ form, setForm }) {
  const upd = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left - Form */}
      <div className="space-y-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-forge-400" />
          Identidad de Marca
        </h3>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300">
            Nombre de tu marca/empresa <span className="text-forge-400">*</span>
          </label>
          <input
            type="text"
            value={form.brandName}
            onChange={upd('brandName')}
            placeholder="Ej: TechCorp, Mi Empresa"
            className="w-full bg-black/30 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300">
            Slogan o tagline
          </label>
          <input
            type="text"
            value={form.tagline}
            onChange={upd('tagline')}
            placeholder="Ej: Innovacion que transforma"
            className="w-full bg-black/30 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-300">
              <span className="flex items-center gap-2">
                Color principal
                <span
                  className="w-4 h-4 rounded-full border border-zinc-600 inline-block"
                  style={{ backgroundColor: form.primaryColor }}
                />
              </span>
            </label>
            <input
              type="color"
              value={form.primaryColor}
              onChange={upd('primaryColor')}
              className="w-full h-11 bg-black/30 border border-zinc-700 rounded-lg cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-300">
              <span className="flex items-center gap-2">
                Color secundario
                <span
                  className="w-4 h-4 rounded-full border border-zinc-600 inline-block"
                  style={{ backgroundColor: form.secondaryColor }}
                />
              </span>
            </label>
            <input
              type="color"
              value={form.secondaryColor}
              onChange={upd('secondaryColor')}
              className="w-full h-11 bg-black/30 border border-zinc-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <Type className="w-4 h-4 text-forge-400" />
            Tipografia principal
          </label>
          <select
            value={form.fontFamily}
            onChange={upd('fontFamily')}
            className="w-full bg-black/30 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-forge-500 focus:outline-none"
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300">
            URL o ruta del logo
          </label>
          <input
            type="text"
            value={form.logoUrl}
            onChange={upd('logoUrl')}
            placeholder="./assets/logo.png"
            className="w-full bg-black/30 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-forge-400" />
              Sitio web
            </label>
            <input
              type="text"
              value={form.website}
              onChange={upd('website')}
              placeholder="https://miempresa.com"
              className="w-full bg-black/30 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-forge-400" />
              Email de contacto
            </label>
            <input
              type="text"
              value={form.email}
              onChange={upd('email')}
              placeholder="hola@miempresa.com"
              className="w-full bg-black/30 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300">
            Texto de pie de pagina
          </label>
          <textarea
            value={form.footer}
            onChange={upd('footer')}
            placeholder={`\u00A9 ${new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.`}
            rows={2}
            className="w-full bg-black/30 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Right - Live Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-forge-400" />
          Vista previa en tiempo real
        </h3>
        <CodePreview
          code={generateBrandConfig(form)}
          language="json"
          title="brand-config.json"
        />
      </div>
    </div>
  );
}

function Step2Templates({ selectedTemplates, setSelectedTemplates }) {
  const toggle = (id) => {
    setSelectedTemplates((prev) =>
      prev.find((t) => t.id === id)
        ? prev.filter((t) => t.id !== id)
        : [...prev, TEMPLATE_OPTIONS.find((t) => t.id === id)],
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <FileText className="w-5 h-5 text-forge-400" />
        Selecciona las plantillas que necesitas
      </h3>
      <p className="text-sm text-zinc-400">
        Elige los tipos de documento que tu plugin de marca debe manejar. Se
        generara una plantilla para cada uno.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TEMPLATE_OPTIONS.map((tpl) => {
          const isSelected = selectedTemplates.some((s) => s.id === tpl.id);
          return (
            <button
              key={tpl.id}
              onClick={() => toggle(tpl.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'border-forge-500 bg-forge-500/10 text-white'
                  : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
              }`}
            >
              <span className="text-xl">{tpl.emoji}</span>
              <span className="font-medium text-sm">{tpl.label}</span>
              {isSelected && (
                <Check className="w-4 h-4 text-forge-400 ml-auto" />
              )}
            </button>
          );
        })}
      </div>

      {selectedTemplates.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-forge-500/5 border border-forge-500/20">
          <p className="text-sm text-forge-400 font-medium">
            {selectedTemplates.length} plantilla
            {selectedTemplates.length !== 1 ? 's' : ''} seleccionada
            {selectedTemplates.length !== 1 ? 's' : ''}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTemplates.map((t) => (
              <span
                key={t.id}
                className="text-xs px-2 py-1 rounded-md bg-forge-500/10 text-forge-300 border border-forge-500/20"
              >
                {t.emoji} {t.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Step3Preview({ form, selectedTemplates }) {
  const slug = toKebab(form.brandName || 'mi-marca');

  const fileTree = `brand-${slug}/
\u251C\u2500\u2500 plugin.json
\u251C\u2500\u2500 brand-config.json
\u251C\u2500\u2500 skills/
\u2502   \u251C\u2500\u2500 brand-documents/SKILL.md
\u2502   \u251C\u2500\u2500 brand-templates/SKILL.md
\u2502   \u2514\u2500\u2500 brand-assets/SKILL.md
\u2514\u2500\u2500 templates/
    \u251C\u2500\u2500 report.md
    \u251C\u2500\u2500 email.md
    \u2514\u2500\u2500 proposal.md`;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Eye className="w-5 h-5 text-forge-400" />
        Preview del Plugin Generado
      </h3>

      {/* File tree */}
      <div>
        <h4 className="text-sm font-semibold text-zinc-400 mb-2 flex items-center gap-2">
          <Package className="w-4 h-4" />
          Estructura de archivos
        </h4>
        <CodePreview code={fileTree} language="tree" title="file tree" />
      </div>

      {/* brand-config.json */}
      <div>
        <h4 className="text-sm font-semibold text-zinc-400 mb-2">
          brand-config.json
        </h4>
        <CodePreview
          code={generateBrandConfig(form)}
          language="json"
          title="brand-config.json"
        />
      </div>

      {/* plugin.json */}
      <div>
        <h4 className="text-sm font-semibold text-zinc-400 mb-2">
          plugin.json
        </h4>
        <CodePreview
          code={generatePluginJson(form, selectedTemplates)}
          language="json"
          title="plugin.json"
        />
      </div>

      {/* SKILL.md */}
      <div>
        <h4 className="text-sm font-semibold text-zinc-400 mb-2">
          skills/brand-documents/SKILL.md
        </h4>
        <CodePreview
          code={generateSkillMd(form)}
          language="markdown"
          title="SKILL.md"
        />
      </div>
    </div>
  );
}

function Step4Install({ form, selectedTemplates }) {
  const slug = toKebab(form.brandName || 'mi-marca');
  const [copiedAll, setCopiedAll] = useState(false);

  const installCommands = `# Crear la estructura del plugin
mkdir -p brand-${slug}/{skills/{brand-documents,brand-templates,brand-assets},templates}

# Copiar los archivos generados
cp plugin.json brand-${slug}/
cp brand-config.json brand-${slug}/

# Instalar el plugin en Claude Code
cd brand-${slug}
claude mcp add brand-${slug} ./plugin.json`;

  const handleCopyAll = async () => {
    const fullPlugin = [
      '// === plugin.json ===',
      generatePluginJson(form, selectedTemplates),
      '',
      '// === brand-config.json ===',
      generateBrandConfig(form),
      '',
      '// === skills/brand-documents/SKILL.md ===',
      generateSkillMd(form),
    ].join('\n');

    await navigator.clipboard.writeText(fullPlugin);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadZip = () => {
    alert(
      `El archivo brand-${slug}.zip se descargaria con toda la estructura del plugin. Esta funcionalidad requiere una libreria de ZIP en el navegador.`,
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Download className="w-5 h-5 text-forge-400" />
        Instalar y Usar tu Brand Plugin
      </h3>

      {/* Install commands */}
      <div>
        <h4 className="text-sm font-semibold text-zinc-400 mb-2">
          Comandos de instalacion
        </h4>
        <CodePreview
          code={installCommands}
          language="bash"
          title="terminal"
        />
      </div>

      {/* Usage examples */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-zinc-400">
          Ejemplos de uso
        </h4>

        {[
          {
            cmd: `/brand-report "Informe Q1 2026"`,
            desc: 'Genera un informe con la identidad de tu marca',
          },
          {
            cmd: `/brand-email "Propuesta para cliente"`,
            desc: 'Genera un email corporativo con tu branding',
          },
          {
            cmd: `/brand-assets`,
            desc: 'Genera un kit completo de assets de marca',
          },
        ].map((example, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800"
          >
            <ArrowRight className="w-4 h-4 text-forge-400 mt-0.5 shrink-0" />
            <div>
              <code className="text-sm text-forge-300 font-mono">
                {example.cmd}
              </code>
              <p className="text-xs text-zinc-500 mt-1">{example.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all bg-forge-500 hover:bg-forge-600 text-white"
        >
          {copiedAll ? (
            <>
              <Check className="w-4 h-4" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copiar Plugin Completo
            </>
          )}
        </button>

        <button
          onClick={handleDownloadZip}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all border border-zinc-700 text-zinc-300 hover:border-forge-500 hover:text-forge-400"
        >
          <Download className="w-4 h-4" />
          Descargar ZIP
        </button>
      </div>

      {/* Success message */}
      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-emerald-400">
              Tu Brand Plugin esta listo!
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Copia los archivos generados a tu proyecto y empieza a crear
              documentos con tu identidad de marca. Cada documento que generes
              llevara automaticamente tu branding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function BrandSkillDemo() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [selectedTemplates, setSelectedTemplates] = useState([
    TEMPLATE_OPTIONS[0],
    TEMPLATE_OPTIONS[2],
    TEMPLATE_OPTIONS[3],
  ]);

  const canNext =
    step === 0
      ? form.brandName.trim().length > 0
      : step === 1
        ? selectedTemplates.length > 0
        : true;

  const next = () => {
    if (canNext && step < STEP_META.length - 1) setStep((s) => s + 1);
  };
  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return (
    <div className="w-full rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-forge-500/20 flex items-center justify-center">
            <Paintbrush className="w-5 h-5 text-forge-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Brand Skill Builder
            </h2>
            <p className="text-sm text-zinc-500">
              Crea un plugin que aplique tu marca a todos los documentos
            </p>
          </div>
        </div>

        <StepIndicator currentStep={step} />
      </div>

      {/* Body */}
      <div className="px-6 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && <Step1BrandConfig form={form} setForm={setForm} />}
            {step === 1 && (
              <Step2Templates
                selectedTemplates={selectedTemplates}
                setSelectedTemplates={setSelectedTemplates}
              />
            )}
            {step === 2 && (
              <Step3Preview
                form={form}
                selectedTemplates={selectedTemplates}
              />
            )}
            {step === 3 && (
              <Step4Install
                form={form}
                selectedTemplates={selectedTemplates}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
        <button
          onClick={prev}
          disabled={step === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            step === 0
              ? 'text-zinc-700 cursor-not-allowed'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </button>

        <span className="text-xs text-zinc-600">
          Paso {step + 1} de {STEP_META.length}
        </span>

        {step < STEP_META.length - 1 ? (
          <button
            onClick={next}
            disabled={!canNext}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              canNext
                ? 'bg-forge-500 hover:bg-forge-600 text-white'
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
            }`}
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-[120px]" />
        )}
      </div>
    </div>
  );
}
