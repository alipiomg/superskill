import { motion } from 'framer-motion';
import { Plug, Package, Globe, Shield, Terminal } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

const pluginStructure = `mi-plugin/
├── .claude-plugin/
│   └── plugin.json     # Metadata obligatoria
├── .mcp.json           # Opcional: servidores MCP
└── skills/
    ├── skill-uno/
    │   └── SKILL.md    # Skill 1
    └── skill-dos/
        └── SKILL.md    # Skill 2`;

const pluginJson = `{
  "name": "mi-plugin",
  "description": "Plugin para generar componentes React y tests",
  "author": {
    "name": "SalgadoIA",
    "email": "contacto@salgadoia.com"
  }
}`;

const installFlow = `# 1. Registrar marketplace en settings.json
"extraKnownMarketplaces": {
  "mi-marketplace": {
    "url": "https://github.com/tu-usuario/tu-marketplace"
  }
}

# 2. Los plugins se clonan automáticamente en:
~/.claude/plugins/marketplaces/mi-marketplace/plugins/

# 3. Invocar skills del plugin:
mi-plugin:skill-uno`;

const sections = [
  { icon: Package, title: '¿Qué es un Plugin?', desc: 'Un paquete distribuible que contiene skills. Se instala desde marketplaces (repos Git).', color: 'from-forge-500 to-forge-600' },
  { icon: Globe, title: 'Marketplaces', desc: 'Repositorios Git que indexan plugins. Claude Code clona y actualiza automáticamente.', color: 'from-steel-500 to-steel-600' },
  { icon: Shield, title: 'Seguridad', desc: 'blocklist.json para bloquear plugins. install-counts-cache.json para popularidad.', color: 'from-ember-500 to-ember-600' },
];

export default function Plugins() {
  return (
    <div className="min-h-screen px-6 py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">Plugins en Claude Code</h1>
          <p className="text-zinc-500 mb-8">Crea y distribuye paquetes de skills para la comunidad</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-forge-500/10 to-ember-500/10 border border-forge-500/20 mb-10 flex items-center gap-4">
          <Terminal className="w-8 h-8 text-forge-400 shrink-0" />
          <div>
            <p className="text-sm text-zinc-400 mb-1">Crea un plugin desde Claude Code:</p>
            <code className="text-lg font-mono text-forge-400">/plugin-create --nombre "mi-plugin"</code>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Estructura de un Plugin</h2>
        <CodeBlock code={pluginStructure} language="tree" />

        <h2 className="text-xl font-bold text-white mt-10 mb-4">plugin.json — Metadata</h2>
        <CodeBlock code={pluginJson} language="json" />

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Flujo de Instalación</h2>
        <CodeBlock code={installFlow} language="bash" />

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Skill Local vs Plugin</h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="text-left py-3 px-4 text-zinc-400 font-medium"></th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Skill Local</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Plugin</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 font-medium">Ubicación</td>
                <td className="py-3 px-4 font-mono text-xs text-forge-400">~/.claude/skills/</td>
                <td className="py-3 px-4 font-mono text-xs text-steel-400">~/.claude/plugins/marketplaces/</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 font-medium">Distribución</td>
                <td className="py-3 px-4">Manual</td>
                <td className="py-3 px-4">Via marketplace (Git)</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 font-medium">Invocación</td>
                <td className="py-3 px-4 font-mono text-xs">nombre-skill</td>
                <td className="py-3 px-4 font-mono text-xs">plugin:skill</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Actualización</td>
                <td className="py-3 px-4">Manual</td>
                <td className="py-3 px-4">Automática (Git)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
