import { useState } from 'react';
import { Building2, Layers, Download, Settings2, LayoutDashboard, Briefcase, Lightbulb, GitCompare, Target, Rocket, ChevronDown, ChevronRight, Copy, CheckCircle, Star, ArrowRight, BookOpen, Users, DollarSign, Clock, Shield, Play, ExternalLink } from 'lucide-react';

// ─── Code Block with copy ───────────────────────────────────────────────────
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };
  return (
    <div className="relative group mt-3">
      <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-700/80 text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
        {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 overflow-x-auto font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── Tip Box ────────────────────────────────────────────────────────────────
function TipBox({ children, type = 'tip' }) {
  const styles = {
    tip: 'border-forge-500/30 bg-forge-500/5 text-forge-300',
    warning: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-300',
    key: 'border-blue-500/30 bg-blue-500/5 text-blue-300',
    danger: 'border-red-500/30 bg-red-500/5 text-red-300',
  };
  const icons = { tip: Lightbulb, warning: Target, key: Star, danger: Shield };
  const Icon = icons[type] || Lightbulb;
  return (
    <div className={`mt-4 p-4 rounded-xl border ${styles[type]}`}>
      <div className="flex gap-2 items-start">
        <Icon className="w-5 h-5 mt-0.5 shrink-0" />
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ─── Section Data ───────────────────────────────────────────────────────────
const lessons = [
  {
    id: 'que-es',
    icon: Building2,
    title: '1. Que es Paperclip y por que esta explotando',
    color: 'forge',
    subtitle: 'Orquestacion open-source para empresas sin humanos — 32.000+ estrellas en GitHub',
    content: (
      <>
        <p>Paperclip es un servidor Node.js + interfaz React de codigo abierto que orquesta un equipo de agentes de IA para gestionar un negocio. La idea central es simple pero muy potente:</p>

        <div className="my-6 p-5 bg-zinc-900/80 rounded-xl border border-forge-500/20 text-center">
          <p className="text-lg text-forge-400 font-semibold italic">"Si Claude Code es el empleado, Paperclip es la empresa."</p>
        </div>

        <p>No es un chatbot. No es un framework de agentes. Te da la estructura organizativa para que corran solos: org chart, objetivos, presupuestos, gobernanza, tickets, heartbeats.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">Los datos que importan</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { value: '32.200+', label: 'Estrellas GitHub', sub: 'en menos de 3 semanas' },
            { value: '4.500+', label: 'Forks', sub: 'uno de los mas rapidos de 2026' },
            { value: 'MIT', label: 'Licencia', sub: 'gratuito, self-hosted' },
            { value: 'TypeScript', label: '96.8%', sub: 'stack moderno' },
            { value: 'v2026.318.0', label: 'Ultima version', sub: '18 marzo 2026' },
            { value: '$0', label: 'Coste del software', sub: 'solo pagas la IA' },
          ].map(d => (
            <div key={d.label} className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-center">
              <p className="text-forge-400 font-bold text-sm">{d.value}</p>
              <p className="text-xs text-zinc-400">{d.label}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{d.sub}</p>
            </div>
          ))}
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">¿Por que esta explotando ahora?</h4>
        <div className="space-y-2">
          {[
            'Claude Code y Co-work han demostrado que los agentes pueden completar tareas complejas solos',
            'El problema ahora es la COORDINACION — gestionar 20 terminales de Claude Code a la vez es caotico',
            'Paperclip resuelve exactamente ese problema con una interfaz tipo gestor empresarial',
          ].map((r, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-forge-500/20 text-forge-400 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
              <p className="text-sm text-zinc-400">{r}</p>
            </div>
          ))}
        </div>

        <TipBox type="key">
          Cuando Anthropic lanzo Co-work, ServiceNow cayo un 23%, Salesforce un 22% y Snowflake un 20%. El mercado ya vio que "empresa sin humanos" no es ciencia ficcion. Paperclip lo lleva al siguiente nivel.
        </TipBox>
      </>
    ),
  },
  {
    id: 'arquitectura',
    icon: Layers,
    title: '2. Arquitectura: Las 5 Capas del Sistema',
    color: 'blue',
    subtitle: 'Mission Control, Org Chart, Heartbeats, Governance y Multi-Company',
    content: (
      <>
        <p>Paperclip esta construido sobre 5 capas que trabajan juntas para mantener a tus agentes coordinados, alineados y bajo control.</p>

        <div className="mt-6 space-y-4">
          {[
            {
              n: 1, name: 'Mission Control', subtitle: 'El Por Que', color: 'text-red-400',
              desc: 'Defines el objetivo de tu empresa de IA. Todos los agentes y tareas trazan de vuelta a este objetivo. Nunca hacen cosas aleatorias — siempre saben el porque.',
              example: '"Convertirse en la comunidad de automatizacion con IA numero 1 de habla hispana."',
            },
            {
              n: 2, name: 'Org Chart', subtitle: 'La Estructura', color: 'text-blue-400',
              desc: 'Organigrama real donde cada rol esta ocupado por un agente de IA. CEO, CTO, CMO, Head of Support... Cada agente tiene titulo, jefe al que reportar y subordinados.',
              example: 'Los agentes pueden ser Claude Code, OpenClaw, Codex, Cursor, Bash scripts o cualquier HTTP endpoint.',
            },
            {
              n: 3, name: 'Heartbeats', subtitle: 'El Ritmo', color: 'text-green-400',
              desc: 'Los agentes no esperan sentados. Se despiertan en intervalos programados (cada 4h, 8h, diariamente...), comprueban si hay trabajo pendiente, lo ejecutan y vuelven a "dormir".',
              example: 'Tambien se activan cuando les asignas una tarea o alguien les menciona en un ticket.',
            },
            {
              n: 4, name: 'Governance', subtitle: 'El Control', color: 'text-yellow-400',
              desc: 'Tu eres el consejo de administracion. Los agentes no pueden contratar sin tu aprobacion. Puedes pausar cualquier agente, reasignar cualquier tarea en cualquier momento.',
              example: 'La autonomia es un privilegio que tu otorgas, no un comportamiento por defecto.',
            },
            {
              n: 5, name: 'Multi-Company', subtitle: 'La Escala', color: 'text-purple-400',
              desc: 'Un unico despliegue puede correr multiples empresas completamente aisladas entre si. Util si tienes varias lineas de negocio o multiples clientes.',
              example: 'Ideal para agencias que gestionan varios clientes con total aislamiento de datos.',
            },
          ].map(layer => (
            <div key={layer.n} className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">{layer.n}</span>
                <h5 className="text-white font-semibold">{layer.name} <span className="text-zinc-500 font-normal">— {layer.subtitle}</span></h5>
              </div>
              <p className="text-sm text-zinc-400 mt-2">{layer.desc}</p>
              <p className="text-xs text-zinc-500 mt-2 italic">{layer.example}</p>
            </div>
          ))}
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">Flujo de informacion</h4>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {['Mision empresa', 'Objetivo proyecto', 'Objetivo agente', 'Tarea especifica'].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">{s}</span>
              {i < 3 && <ArrowRight className="w-4 h-4 text-zinc-600" />}
            </span>
          ))}
        </div>

        <TipBox>
          <strong>Ejemplo real:</strong> Empresa "Alcanzar 10.000 miembros" → Proyecto "Campana contenido marzo" → Agente CMO "Aumentar engagement 30%" → Tarea "Escribir 3 posts sobre Co-work esta semana". El agente tiene TODO el contexto desde arriba.
        </TipBox>
      </>
    ),
  },
  {
    id: 'instalacion',
    icon: Download,
    title: '3. Instalacion Paso a Paso',
    color: 'green',
    subtitle: 'Tres opciones de instalacion — sin escribir codigo si no quieres',
    content: (
      <>
        <p>Paperclip esta diseñado para que cualquiera pueda instalarlo. Hay tres formas:</p>

        <h4 className="text-white font-semibold mt-6 mb-3">Opcion A — Un solo comando (recomendada)</h4>
        <p className="text-sm text-zinc-400 mb-2">Requisitos: Node.js 20+ y pnpm 9.15+. Si tienes Claude Code, ya los tienes.</p>
        <CodeBlock code="npx paperclipai onboard --yes" />
        <p className="text-xs text-zinc-500 mt-2">Descarga el repo, instala dependencias, crea PostgreSQL embebida y lanza en http://localhost:3100.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">Opcion B — Instalacion manual</h4>
        <CodeBlock code={`git clone https://github.com/paperclipai/paperclip.git
cd paperclip
pnpm install
pnpm dev`} />

        <h4 className="text-white font-semibold mt-6 mb-3">Opcion C — Desde Claude Code</h4>
        <CodeBlock code={`// Pidele directamente a Claude Code:
"Instala Paperclip desde https://github.com/paperclipai/paperclip.
Una vez instalado, ponlo en marcha."

// Claude Code clonara el repo, instalara dependencias
// y arrancara el servidor por ti.`} />

        <h4 className="text-white font-semibold mt-6 mb-3">Acceso movil con Tailscale</h4>
        <p className="text-sm text-zinc-400">Para acceder al dashboard desde el movil sin deployar a la nube:</p>
        <ul className="mt-2 space-y-1 text-sm text-zinc-400">
          <li>• Instala Tailscale en ordenador y movil</li>
          <li>• Accede a la IP de Tailscale + :3100 desde el movil</li>
          <li>• Controla toda tu empresa de agentes desde cualquier sitio</li>
        </ul>

        <TipBox type="key">
          No necesitas cuenta de Paperclip. Es 100% self-hosted, licencia MIT, completamente gratuito. Solo pagas por los tokens de IA que consuman los agentes.
        </TipBox>
      </>
    ),
  },
  {
    id: 'configuracion',
    icon: Settings2,
    title: '4. Configuracion Inicial: CEO, Heartbeats y Equipo',
    color: 'purple',
    subtitle: 'Los 5 pasos para poner en marcha tu empresa de agentes de IA',
    content: (
      <>
        <p>Tras la instalacion, el flujo de configuracion es intuitivo y guiado:</p>

        <div className="mt-6 space-y-4">
          {[
            {
              step: 1, title: 'Crear tu empresa',
              desc: 'Define nombre + mision y objetivo principal. Se especifico — cuanto mas claro, mejor trabajaran los agentes.',
              prompt: '"Mi empresa: [NOMBRE]. Mision: Convertirse en la consultora de automatizacion con IA de referencia en España con 50 clientes recurrentes."',
            },
            {
              step: 2, title: 'Crear el CEO y primer heartbeat',
              desc: 'Selecciona Sonnet 4.6 para el CEO (equilibrio coste/rendimiento). Configura su heartbeat cada 4-8 horas. El CEO se encargara de contratar al resto.',
              prompt: 'Dashboard → Create Agent → rol CEO → Claude Sonnet 4.6 → heartbeat cada 4-8h',
            },
            {
              step: 3, title: 'Conectar Claude Code',
              desc: 'Genera un invite en el dashboard de Paperclip. Pega el comando en tu sesion de Claude Code. Aparecera en el inbox para tu aprobacion.',
              prompt: 'Dashboard → Settings → Generate Invite → copiar → pegar en Claude Code',
            },
            {
              step: 4, title: 'Dar contexto de marca al CEO',
              desc: 'El CEO necesita conocer tu negocio para delegar correctamente.',
              prompt: '"CEO, aqui tienes el contexto: [NEGOCIO]. Publico: [ICP]. Stack: [HERRAMIENTAS]. Prioridades 30 dias: [OBJETIVOS]. Crea brand identity y empieza a construir el equipo."',
            },
            {
              step: 5, title: 'Dejar que el CEO construya el equipo',
              desc: 'El CEO propondra roles a contratar. Tu apruebas o rechazas cada solicitud en el inbox.',
              prompt: null,
            },
          ].map(s => (
            <div key={s.step} className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold shrink-0">{s.step}</span>
                <h5 className="text-white font-semibold">{s.title}</h5>
              </div>
              <p className="text-sm text-zinc-400 mt-2 ml-11">{s.desc}</p>
              {s.prompt && <p className="text-xs text-zinc-500 mt-2 ml-11 italic bg-zinc-900/80 p-2 rounded-lg">{s.prompt}</p>}
            </div>
          ))}
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">Roles tipicos del equipo</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="pb-2 pr-4">Rol</th>
                <th className="pb-2 pr-4">Responsabilidad</th>
                <th className="pb-2">Modelo</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              {[
                ['CEO', 'Estrategia, delegacion, coordinacion', 'Sonnet 4.6'],
                ['CMO', 'Contenido, redes, campañas', 'Sonnet 4.6'],
                ['CTO / Engineer', 'Codigo, desarrollo, bugs, PRs', 'Opus 4.6'],
                ['Head of SEO', 'Keywords, auditorias, optimizacion', 'Sonnet 4.6'],
                ['Head of Support', 'Tickets, documentacion, FAQs', 'Haiku 4.5'],
                ['Content Writer', 'Posts, newsletters, copys', 'Sonnet 4.6'],
              ].map(([rol, resp, modelo]) => (
                <tr key={rol} className="border-b border-zinc-800/50">
                  <td className="py-2 pr-4 font-semibold text-zinc-300">{rol}</td>
                  <td className="py-2 pr-4">{resp}</td>
                  <td className="py-2">{modelo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TipBox type="warning">
          Empieza con 3-4 agentes y escala gradualmente. El CEO es el agente mas caro porque delega mas. No necesitas 10 agentes el primer dia.
        </TipBox>
      </>
    ),
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    title: '5. El Dashboard: Gestion del Dia a Dia',
    color: 'cyan',
    subtitle: 'Inbox, Org Chart, Issues, Activity y Costs — las 5 areas que debes dominar',
    content: (
      <>
        <p>El dashboard de Paperclip tiene cinco areas principales:</p>

        <div className="mt-6 space-y-3">
          {[
            { name: 'Inbox', icon: '📥', desc: 'Tu centro de control. Todo lo que requiere tu aprobacion: contrataciones, estrategias del CEO, tareas de alto impacto. Revisalo al menos una vez al dia.', color: 'text-red-400' },
            { name: 'Org Chart', icon: '🏢', desc: 'Vista visual de todos los agentes, roles, jerarquias y estado actual. Puedes asignar tareas directamente a cualquier agente desde aqui.', color: 'text-blue-400' },
            { name: 'Issues / Tickets', icon: '📋', desc: 'Todo el trabajo pasa por tickets con propietario, estado, conversacion completa y trace de tool calls. Registro inmutable de todo lo que ha pasado.', color: 'text-green-400' },
            { name: 'Activity', icon: '📊', desc: 'Log de todas las acciones, decisiones y tool calls de todos los agentes. La caja negra para auditar comportamientos.', color: 'text-yellow-400' },
            { name: 'Costs', icon: '💰', desc: 'Breakdown de costes por agente, tarea y proyecto. Cada agente tiene presupuesto mensual. Al 80% recibe aviso. Al 100% se pausa automaticamente.', color: 'text-purple-400' },
          ].map(area => (
            <div key={area.name} className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-lg">{area.icon}</span>
                <h5 className={`font-semibold ${area.color}`}>{area.name}</h5>
              </div>
              <p className="text-sm text-zinc-400 mt-2">{area.desc}</p>
            </div>
          ))}
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">Control de costes: lo que debes saber</h4>
        <div className="space-y-2 text-sm text-zinc-400">
          <p>• Un heartbeat vacio (nada que hacer) cuesta ~<strong className="text-zinc-300">$0.16</strong> con Sonnet</p>
          <p>• 10 agentes 24/7 sin control = ~<strong className="text-red-400">$1.152/mes</strong> solo en heartbeats vacios</p>
          <p>• Con auto-pausa + uso real = <strong className="text-green-400">$20-100/mes</strong> para un proyecto activo</p>
        </div>

        <CodeBlock code={`// Instruccion clave para controlar costes:
"CEO, pausa automaticamente todos los agentes cuando no tengan
tareas pendientes. Activalos solo cuando haya trabajo nuevo o
cuando yo lo indique. Regla permanente de gestion del equipo."

// Modelos recomendados por tipo de agente:
// Haiku 4.5  → soporte, rutina (mas barato)
// Sonnet 4.6 → estrategia, contenido (equilibrado)
// Opus 4.6   → desarrollo complejo (mas potente)`} />
      </>
    ),
  },
  {
    id: 'casos-uso',
    icon: Briefcase,
    title: '6. Casos de Uso Reales',
    color: 'amber',
    subtitle: 'Contenido, agencia, SaaS, operaciones — donde Paperclip brilla',
    content: (
      <>
        <p>Paperclip no es para todo. Brilla en contextos muy especificos:</p>

        <div className="mt-6 space-y-4">
          {[
            {
              name: 'Gestion de contenido y comunidad',
              tag: 'El mas relevante',
              desc: 'Ideal para comunidades, newsletters, redes sociales o academias.',
              flow: ['CEO delega estrategia semanal al CMO', 'Content Writer crea posts, newsletters y scripts', 'Head of SEO analiza competidores cada 8h', 'Tu solo apruebas las piezas finales'],
              color: 'border-amber-500/30',
            },
            {
              name: 'Agencia de automatizacion o consultoria',
              tag: 'Multi-cliente',
              desc: 'Gestionar multiples clientes con total aislamiento de datos.',
              flow: ['Una empresa Paperclip por cliente', 'Founding Engineer gestiona desarrollo', 'Head of Support responde tickets cada 4h', 'CMO genera propuestas e informes'],
              color: 'border-blue-500/30',
            },
            {
              name: 'Proyecto digital / SaaS / web',
              tag: 'Caso demostrado',
              desc: 'Aaron Prince con "Traffic Exchange Script": web completa sin intervencion manual.',
              flow: ['Engineer configuro WordPress via WP-CLI', 'Head of SEO creo arquitectura SEO completa', 'CMO diseño lead magnet + landing + opt-in', 'Support escribio toda la documentacion'],
              color: 'border-green-500/30',
            },
            {
              name: 'Operaciones recurrentes',
              tag: 'Delegar y olvidar',
              desc: 'Cualquier tarea que se repite y no requiere decisiones nuevas.',
              flow: ['Analisis diario de metricas → dashboard automatico', 'Respuesta a tickets de soporte cada 4h', 'Briefing semanal de competidores cada lunes', 'Generacion de facturas y seguimiento de cobros'],
              color: 'border-purple-500/30',
            },
          ].map(c => (
            <div key={c.name} className={`p-4 bg-zinc-900/50 rounded-xl border ${c.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <h5 className="text-white font-semibold">{c.name}</h5>
                <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs text-zinc-400">{c.tag}</span>
              </div>
              <p className="text-sm text-zinc-400 mb-3">{c.desc}</p>
              <div className="space-y-1">
                {c.flow.map((f, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <ArrowRight className="w-3 h-3 text-zinc-600 mt-1 shrink-0" />
                    <p className="text-xs text-zinc-500">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'consejos',
    icon: Lightbulb,
    title: '7. Consejos Avanzados',
    color: 'yellow',
    subtitle: 'GitHub, auto-pausa, team roster, contexto de marca y limites',
    content: (
      <>
        <p>6 consejos para sacarle el maximo partido a Paperclip:</p>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <h5 className="text-yellow-400 font-semibold">1. GitHub para control de versiones</h5>
            <p className="text-sm text-zinc-400 mt-2">Inicializa la carpeta de tu empresa en git. Paperclip usara GitHub automaticamente para versionar cambios, crear branches y hacer PRs.</p>
            <CodeBlock code={`git init [carpeta-de-tu-empresa]
git remote add origin https://github.com/[tu-usuario]/[empresa].git
git push -u origin main

# Beneficios:
# - Log visual de todo lo que hicieron los agentes
# - Rollback si algo sale mal
# - Historial completo por fecha y agente`} />
          </div>

          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <h5 className="text-yellow-400 font-semibold">2. Auto-pausa de agentes</h5>
            <CodeBlock code={`"CEO, pausa automaticamente todos los agentes cuando no tengan
tareas pendientes. Activalos solo cuando haya trabajo nuevo
o cuando yo lo indique. Regla permanente de gestion."`} />
            <p className="text-xs text-zinc-500 mt-2">Esto reduce costes de ~$1.152/mes a $20-100/mes.</p>
          </div>

          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <h5 className="text-yellow-400 font-semibold">3. Team roster para coordinacion</h5>
            <p className="text-sm text-zinc-400 mt-2">Por defecto, los agentes no saben de la existencia de los demas.</p>
            <CodeBlock code={`"CEO, crea un archivo team-roster.md en la carpeta raiz con
la descripcion de cada agente, su rol, responsabilidades y
cuando debe ser contactado. Instruyeles a todos que lo lean
al inicio de cada heartbeat."`} />
          </div>

          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <h5 className="text-yellow-400 font-semibold">4. Contexto de marca primero</h5>
            <p className="text-sm text-zinc-400 mt-2">Dale al CEO todos los archivos de contexto antes de asignar tareas: brand guidelines, ICP, voice personality. Cuanto mas contexto, mejores outputs de todo el equipo.</p>
          </div>

          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <h5 className="text-yellow-400 font-semibold">5. Delimita el alcance</h5>
            <p className="text-sm text-zinc-400 mt-2">Error comun: mision muy amplia y dejar que el CEO construya sin limites. El sistema puede generar trabajo infinito.</p>
            <CodeBlock code={`"CEO, el alcance para este mes es:
[LISTA DE ENTREGABLES ESPECIFICOS].
Nada fuera de esta lista sin mi aprobacion.
Cuando termines un bloque, informame antes de empezar el siguiente."`} />
          </div>

          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <h5 className="text-yellow-400 font-semibold">6. Conversacion directa con agentes</h5>
            <p className="text-sm text-zinc-400 mt-2">Puedes hablar con cualquier agente abriendo su carpeta en Claude Code. Util para limpieza de contexto, revisar estado interno o instrucciones sin pasar por el CEO.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'comparativa',
    icon: GitCompare,
    title: '8. Paperclip vs Solo con Claude',
    color: 'red',
    subtitle: 'Tabla comparativa completa para saber cuando usar cada uno',
    content: (
      <>
        <p>Entender las diferencias te ayuda a elegir la herramienta correcta para cada situacion.</p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="pb-3 pr-4">Caracteristica</th>
                <th className="pb-3 pr-4">Solo Claude Co-work</th>
                <th className="pb-3">Paperclip + Claude</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              {[
                ['Agentes', '1 por sesion', 'Equipo completo (CEO, CMO, Eng...)'],
                ['Persistencia', 'Archivos MD manuales', 'Tickets automaticos'],
                ['Contexto', 'Solo dentro de la sesion', 'Fluye mision → proyecto → tarea'],
                ['Autonomia', 'Scheduled tasks (PC encendido)', 'Heartbeats autonomos'],
                ['Costes', 'Manual, sin limites', 'Presupuesto por agente, auto-pausa'],
                ['Coordinacion', 'Tu haces de intermediario', 'CEO delega automaticamente'],
                ['Auditoria', 'Solo lo que guardas en MD', 'Audit log inmutable de todo'],
                ['Multi-proyecto', 'Carpetas separadas', 'Multi-empresa aislada'],
                ['Curva aprendizaje', 'Baja', 'Media — requiere setup'],
                ['Iteracion creativa', 'Excelente — feedback rapido', 'Mas lento — "telefono roto"'],
                ['Skills/connectors', 'Nativo en Co-work', 'Via SKILL.md injection'],
              ].map(([feat, solo, clip]) => (
                <tr key={feat} className="border-b border-zinc-800/50">
                  <td className="py-2 pr-4 text-zinc-300 font-medium">{feat}</td>
                  <td className="py-2 pr-4">{solo}</td>
                  <td className="py-2">{clip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TipBox type="key">
          <strong>Resumen:</strong> Co-work es mejor para CREAR (iteracion rapida, feedback inmediato). Paperclip es mejor para DELEGAR (operaciones repetitivas, coordinacion de equipos). Usa ambos segun la fase.
        </TipBox>
      </>
    ),
  },
  {
    id: 'cuando-usar',
    icon: Target,
    title: '9. Cuando Usar Paperclip y Cuando NO',
    color: 'emerald',
    subtitle: 'La regla de oro: Paperclip es para delegar, no para crear',
    content: (
      <>
        <div className="grid gap-6 mt-4">
          <div>
            <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> CUANDO SI usar Paperclip</h4>
            <div className="space-y-2">
              {[
                'Trabajo REPETITIVO y bien definido que quieres delegar para siempre',
                'Necesitas coordinar 5+ agentes hacia un objetivo comun',
                'Quieres que el trabajo ocurra mientras duermes',
                'Gestionas multiples proyectos/clientes con aislamiento de datos',
                'Ya tienes un producto/proceso construido y quieres delegarlo',
                'Las tareas son claras: soporte, SEO, reporting, contenido rutinario',
                'Quieres monitorizar costes de IA de forma sistematica',
              ].map(r => (
                <div key={r} className="flex gap-2 items-start">
                  <ArrowRight className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-400">{r}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2"><Shield className="w-5 h-5" /> CUANDO NO usar Paperclip</h4>
            <div className="space-y-2">
              {[
                'Estas creando algo desde cero y necesitas iterar rapido',
                'Trabajo altamente subjetivo y creativo — el "telefono roto" degrada calidad',
                'Solo tienes 1-2 agentes — el overhead no merece la pena',
                'Necesitas resultados en minutos, no en horas',
                'Fase de descubrimiento — la direccion cambia constantemente',
                'No tienes tiempo de hacer el setup inicial correcto',
                'Tu proceso todavia no esta probado y necesitas ajustes frecuentes',
              ].map(r => (
                <div key={r} className="flex gap-2 items-start">
                  <ArrowRight className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-400">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-5 bg-zinc-900/80 rounded-xl border border-emerald-500/20 text-center">
          <p className="text-emerald-400 font-semibold">La Regla de Oro de Paperclip</p>
          <p className="text-sm text-zinc-400 mt-2">Primero construye el proceso con Claude Co-work en modo hands-on.</p>
          <p className="text-sm text-zinc-400">Cuando este probado y sea repetible → migra esa operacion a Paperclip.</p>
          <p className="text-sm text-zinc-300 mt-2 font-medium">No empieces desde cero esperando magia. Usalo para escalar lo que ya funciona.</p>
        </div>
      </>
    ),
  },
  {
    id: 'roadmap',
    icon: Rocket,
    title: '10. Roadmap: ClipMart y el Futuro',
    color: 'violet',
    subtitle: 'La App Store de empresas de IA y las mejoras que vienen',
    content: (
      <>
        <h4 className="text-white font-semibold mb-3">ClipMart — La App Store de empresas de IA</h4>
        <p className="text-sm text-zinc-400">ClipMart sera el marketplace donde podras descargar empresas completas de IA pre-construidas con un click. Cada template incluye estructura organizativa, agentes configurados, skills y objetivos iniciales.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">Templates confirmados</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Content Marketing Agency', agents: 8, desc: 'SEO, blogs, redes en autopilot' },
            { name: 'Crypto Trading Desk', agents: 12, desc: 'Analisis, ejecucion, compliance' },
            { name: 'E-commerce Operator', agents: 10, desc: 'Listings, soporte, inventario' },
            { name: 'YouTube Factory', agents: 6, desc: 'Scripts, edicion, thumbnails' },
            { name: 'Dev Agency', agents: 9, desc: 'PM, ingenieros, QA, DevOps' },
            { name: 'Real Estate Leads', agents: 7, desc: 'Prospecting, outreach, cierre' },
          ].map(t => (
            <div key={t.name} className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <h5 className="text-violet-400 font-semibold text-sm">{t.name}</h5>
              <p className="text-xs text-zinc-500 mt-1">{t.desc}</p>
              <span className="inline-flex items-center gap-1 mt-2 text-xs text-zinc-600">
                <Users className="w-3 h-3" /> {t.agents} agentes
              </span>
            </div>
          ))}
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">Otras mejoras en el roadmap</h4>
        <ul className="space-y-1 text-sm text-zinc-400">
          <li>• Mejor onboarding de OpenClaw</li>
          <li>• Cloud agents: soporte para Cursor + e2b agents</li>
          <li>• Soporte mejorado para harness engineering</li>
          <li>• Plugin system (knowledgebase, custom tracing, queues)</li>
          <li>• Mejor documentacion</li>
        </ul>

        <TipBox>
          <strong>Para empezar hoy:</strong> Instala Paperclip, crea una empresa con tu mision, pon un CEO con Sonnet 4.6 y dale contexto de marca. Deja que proponga el equipo y empieza con 3-4 agentes. Escala cuando veas resultados.
        </TipBox>
      </>
    ),
  },
];

// ─── Video Tutorials ────────────────────────────────────────────────────────
const videoCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'paperclip', label: 'Paperclip' },
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'skills', label: 'Skills' },
  { id: 'cowork', label: 'Co-work & Dispatch' },
];

const videoTutorials = [
  // ── Paperclip ──
  {
    id: 'C3-4llQYT8o',
    title: 'Paperclip: Orquesta agentes de IA como una empresa',
    channel: 'Tutorial Completo',
    duration: null,
    category: 'paperclip',
    tags: ['introduccion', 'setup', 'agentes'],
  },
  {
    id: 'Rgb-Kx-kkaA',
    title: 'Claude Code, Paperclip y el auge de las empresas de agentes de IA',
    channel: 'Chase AI',
    duration: '8:51',
    category: 'paperclip',
    tags: ['paperclip', 'agentes', 'vision-general'],
  },
  {
    id: 'iNxNkvZfNHM',
    title: 'PaperClip + OpenClaw + OpenCode: Control de mision de inteligencia de enjambre',
    channel: 'Devs Kingdom',
    duration: '9:08',
    category: 'paperclip',
    tags: ['paperclip', 'openclaw', 'multi-agente'],
  },
  // ── Claude Code ──
  {
    id: 'A6oW7SnNq2g',
    title: 'Tutorial de Claude Code',
    channel: 'Platzi',
    duration: '32:41',
    category: 'claude-code',
    tags: ['tutorial', 'español', 'principiante'],
  },
  {
    id: '2aN_-m1uU4k',
    title: 'Curso IA para Programadores en 2026 (Conceptos, Herramientas, Claude Code)',
    channel: 'midudev',
    duration: '1:39:57',
    category: 'claude-code',
    tags: ['curso', 'español', 'programadores'],
  },
  {
    id: '73eFWU-edO4',
    title: 'CLAUDE CODE 2026: Curso Completo en Español',
    channel: 'Benjamin Cordero',
    duration: '3:24:50',
    category: 'claude-code',
    tags: ['curso-completo', 'español', '2026'],
  },
  {
    id: 'qctLhAeIIrA',
    title: 'Claude Code Curso Completo GRATIS Para Principiantes 2026',
    channel: 'Juan Pe Navarro',
    duration: '1:32:24',
    category: 'claude-code',
    tags: ['curso', 'español', 'principiante'],
  },
  {
    id: 'xVxwXxDid-4',
    title: 'Domina el 90% de Claude Code en 37 Minutos',
    channel: 'Daniel Carreon',
    duration: '37:35',
    category: 'claude-code',
    tags: ['rapido', 'español', 'intermedio'],
  },
  // ── Skills ──
  {
    id: 'w2pXEmN6UiQ',
    title: '7 Skills de Claude Code BRUTALES Para Automatizar Todo (Paso a Paso)',
    channel: 'Juan Pe Navarro',
    duration: '26:06',
    category: 'skills',
    tags: ['skills', 'español', 'automatizacion'],
  },
  {
    id: 'UxfeF4bSBYI',
    title: 'Claude Code Skills Just Got a MASSIVE Upgrade',
    channel: 'Chase AI',
    duration: '12:19',
    category: 'skills',
    tags: ['skills', 'novedades', 'ingles'],
  },
  {
    id: 'a3uMv1S-1tM',
    title: 'Claude Skills Explained: Beginner to Advanced Tutorial',
    channel: 'Ali H. Salem',
    duration: '30:07',
    category: 'skills',
    tags: ['skills', 'tutorial-completo', 'ingles'],
  },
  // ── Co-work & Dispatch ──
  {
    id: '5tTI5XMIa8s',
    title: 'Claude Cowork Curso Completo (Automatiza Todo)',
    channel: 'Juan Pe Navarro',
    duration: '23:27',
    category: 'cowork',
    tags: ['cowork', 'español', 'curso-completo'],
  },
  {
    id: 'FfjEgKSfUnU',
    title: 'Claude Cowork Lanza el NUEVO Claude Dispatch (Claude Desde tu Movil)',
    channel: 'Juan Pe Navarro',
    duration: '15:29',
    category: 'cowork',
    tags: ['dispatch', 'español', 'novedad'],
  },
  {
    id: 'RHnnw2_ZwOY',
    title: 'Plugins de Claude Co-work: La Funcion que NADIE Te Cuenta y Automatiza TODO',
    channel: 'Claridad Artificial',
    duration: '24:55',
    category: 'cowork',
    tags: ['plugins', 'español', 'avanzado'],
  },
  {
    id: 'A6RbawFHC80',
    title: 'Crea equipos de agentes en Claude Cowork en 17 minutos',
    channel: 'Ben AI',
    duration: '17:38',
    category: 'cowork',
    tags: ['agentes', 'español', 'equipos'],
  },
  {
    id: 'loCbuKhTN6U',
    title: 'Como usar Claude Cowork mejor que el 99% (guia completa)',
    channel: 'Josue Estevez | CEO Geniify',
    duration: '23:56',
    category: 'cowork',
    tags: ['cowork', 'español', 'avanzado'],
  },
  // Para añadir más videos, copia este bloque:
  // {
  //   id: 'VIDEO_ID_DE_YOUTUBE',
  //   title: 'Titulo del video',
  //   channel: 'Nombre del canal',
  //   duration: '15:30',
  //   category: 'paperclip',  // paperclip | claude-code | skills | cowork
  //   tags: ['tag1', 'tag2'],
  // },
];

// ─── Color map ──────────────────────────────────────────────────────────────
const colorMap = {
  forge: { bg: 'bg-forge-500/10', border: 'border-forge-500/30', text: 'text-forge-400', iconBg: 'bg-forge-500/20' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', iconBg: 'bg-blue-500/20' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', iconBg: 'bg-green-500/20' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', iconBg: 'bg-purple-500/20' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', iconBg: 'bg-cyan-500/20' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', iconBg: 'bg-yellow-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', iconBg: 'bg-amber-500/20' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', iconBg: 'bg-red-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', iconBg: 'bg-violet-500/20' },
};

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function CursoPaperclip() {
  const [openSections, setOpenSections] = useState(new Set());
  const [videoFilter, setVideoFilter] = useState('all');

  const toggle = (id) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    if (openSections.size === lessons.length) {
      setOpenSections(new Set());
    } else {
      setOpenSections(new Set(lessons.map(l => l.id)));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forge-500/10 border border-forge-500/30 text-forge-400 text-sm font-medium mb-6">
          <Building2 className="w-4 h-4" />
          Curso Completo
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Dominando <span className="text-transparent bg-clip-text bg-gradient-to-r from-forge-400 to-purple-400">Paperclip</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          10 lecciones sobre orquestacion de agentes de IA con Paperclip: arquitectura, instalacion, gestion, casos de uso y consejos avanzados. Open-source, 32.000+ estrellas en GitHub.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-zinc-500">
          <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> 10 lecciones</span>
          <span>•</span>
          <span>Nivel: Intermedio</span>
          <span>•</span>
          <span>Actualizado: Marzo 2026</span>
        </div>
      </div>

      {/* Quick overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Capas', value: '5 capas', color: 'text-blue-400', icon: Layers },
          { label: 'Coste software', value: '$0 (MIT)', color: 'text-green-400', icon: DollarSign },
          { label: 'Heartbeats', value: 'Autonomos', color: 'text-purple-400', icon: Clock },
          { label: 'GitHub', value: '32.200+', color: 'text-forge-400', icon: Star },
        ].map(s => (
          <div key={s.label} className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 text-center">
            <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-1`} />
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Expand all */}
      <div className="flex justify-end mb-4">
        <button onClick={expandAll} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          {openSections.size === lessons.length ? 'Colapsar todo' : 'Expandir todo'}
        </button>
      </div>

      {/* Lessons */}
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const isOpen = openSections.has(lesson.id);
          const colors = colorMap[lesson.color] || colorMap.forge;
          const Icon = lesson.icon;

          return (
            <div key={lesson.id} className={`rounded-2xl border transition-all ${isOpen ? `${colors.border} ${colors.bg}` : 'border-zinc-800 hover:border-zinc-700'}`}>
              <button
                onClick={() => toggle(lesson.id)}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-base">{lesson.title}</h3>
                  <p className="text-zinc-500 text-sm mt-0.5 truncate">{lesson.subtitle}</p>
                </div>
                {isOpen ? <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" /> : <ChevronRight className="w-5 h-5 text-zinc-500 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-6 text-zinc-300 text-sm leading-relaxed">
                  <div className="border-t border-zinc-800/50 pt-5">
                    {lesson.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Video Tutoriales */}
      {videoTutorials.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Play className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Video Tutoriales</h2>
              <p className="text-sm text-zinc-500">{videoTutorials.length} videos sobre Paperclip, Claude Code, Skills y Co-work</p>
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {videoCategories.map(cat => {
              const count = cat.id === 'all' ? videoTutorials.length : videoTutorials.filter(v => v.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setVideoFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    videoFilter === cat.id
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-zinc-800/50 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
                  }`}
                >
                  {cat.label} <span className="text-xs opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            {videoTutorials.filter(v => videoFilter === 'all' || v.category === videoFilter).map((video) => (
              <div key={video.id} className="rounded-2xl border border-zinc-800 hover:border-red-500/30 bg-zinc-900/50 overflow-hidden transition-all">
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-white font-semibold">{video.title}</h3>
                      <p className="text-sm text-zinc-500 mt-1">
                        {video.channel}
                        {video.duration && <span> · {video.duration}</span>}
                      </p>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all"
                      title="Ver en YouTube"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  {video.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {video.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <div className="mt-12 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-center">
        <p className="text-zinc-400 text-sm">
          Curso inspirado en la seccion <strong className="text-zinc-300">Paperclip</strong> de la Guia Claude de Cafe Camaleonico (marzo 2026).
          <br />
          Potenciado y mejorado para <strong className="text-forge-400">La Forja de Skills</strong> por SalgadoIA.
        </p>
        <p className="text-zinc-600 text-xs mt-3">
          github.com/paperclipai/paperclip · paperclip.ing · MIT License · v2026.318.0
        </p>
      </div>
    </div>
  );
}
