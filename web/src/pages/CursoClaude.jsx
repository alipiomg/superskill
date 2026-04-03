import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Cpu, Maximize2, Briefcase, FolderOpen, Zap, TestTube, GitBranch, Bot, Smartphone, Send, Monitor, Terminal, LayoutGrid, TrendingUp, MessageSquare, ChevronDown, ChevronRight, Copy, CheckCircle, Lightbulb, Target, Star, BookOpen, ArrowRight, GraduationCap, Award, ExternalLink, Sparkles } from 'lucide-react';

// ─── Code Block with copy ───────────────────────────────────────────────────
function CodeBlock({ code, lang = 'text' }) {
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
  };
  const icons = { tip: Lightbulb, warning: Target, key: Star };
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
    id: 'ecosistema',
    icon: Brain,
    title: '1. El Ecosistema Claude',
    color: 'forge',
    subtitle: 'Chat, Co-work y Code — tres herramientas, tres superpoderes',
    content: (
      <>
        <p>Claude no es un unico producto. Es un ecosistema de tres herramientas diferenciadas, cada una diseñada para un tipo de trabajo distinto. Entender cuando usar cada una es la diferencia entre usarlo bien y aprovecharlo al maximo.</p>

        <div className="mt-6 grid gap-4">
          {[
            { name: 'Claude Chat', desc: 'Conversaciones rapidas, brainstorming, redaccion. Sesiones de 5-10 min.', metaphor: 'Asistente que responde preguntas', color: 'text-blue-400' },
            { name: 'Claude Co-work', desc: 'Tareas complejas, proyectos multi-sesion, automatizaciones. Acceso a archivos locales.', metaphor: '"Vibe Working" — como el Vibe Coding pero para cualquier profesional', color: 'text-purple-400' },
            { name: 'Claude Code', desc: 'Desarrollo de software, scripting, Vibe Coding. Corre en terminal con acceso completo al sistema.', metaphor: 'Desarrollador que construye software. El mejor asistente de codigo del mundo.', color: 'text-green-400' },
          ].map(h => (
            <div key={h.name} className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <h4 className={`font-semibold ${h.color}`}>{h.name}</h4>
              <p className="text-sm text-zinc-400 mt-1">{h.desc}</p>
              <p className="text-xs text-zinc-500 mt-2 italic">{h.metaphor}</p>
            </div>
          ))}
        </div>

        <TipBox type="key">
          <strong>Regla de oro:</strong> Chat para pensar, Co-work para ejecutar, Code para construir. No uses un martillo para pintar un cuadro.
        </TipBox>
      </>
    ),
  },
  {
    id: 'modelos',
    icon: Cpu,
    title: '2. Modelos: Opus 4.6, Sonnet 4.6, Haiku 4.5',
    color: 'blue',
    subtitle: 'Conoce las specs y elige el modelo correcto para cada tarea',
    content: (
      <>
        <p>La familia Claude 4.x es la mas avanzada hasta la fecha. Cada modelo tiene su lugar optimo.</p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="pb-3 pr-4">Modelo</th>
                <th className="pb-3 pr-4">Contexto</th>
                <th className="pb-3 pr-4">Max Output</th>
                <th className="pb-3 pr-4">Precio API</th>
                <th className="pb-3">Mejor para</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 pr-4 font-semibold text-red-400">Opus 4.6</td>
                <td className="py-3 pr-4">1M tokens</td>
                <td className="py-3 pr-4">128K</td>
                <td className="py-3 pr-4">$5/$25</td>
                <td className="py-3">Agentic, coding complejo, razonamiento profundo, tareas +14h</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 pr-4 font-semibold text-blue-400">Sonnet 4.6</td>
                <td className="py-3 pr-4">1M tokens</td>
                <td className="py-3 pr-4">64K</td>
                <td className="py-3 pr-4">$3/$15</td>
                <td className="py-3">Modelo por defecto. Equilibrio rendimiento/coste. Casi igual que Opus 4.5</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-green-400">Haiku 4.5</td>
                <td className="py-3 pr-4">200K tokens</td>
                <td className="py-3 pr-4">32K</td>
                <td className="py-3 pr-4">Mas barato</td>
                <td className="py-3">Scheduled tasks, resumenes, tareas rapidas. Ahorra tokens</td>
              </tr>
            </tbody>
          </table>
        </div>

        <TipBox>
          <strong>Datos clave de Opus 4.6:</strong> ARC-AGI-2: 68.8% (vs 37.6% de Opus 4.5), Terminal-Bench 2.0: 65.4% — el mejor score en coding agentic del mundo. 16 agentes Opus 4.6 escribieron un compilador C completo en Rust en 2 semanas.
        </TipBox>

        <TipBox type="key">
          <strong>Sonnet 4.6:</strong> Modelo por defecto de claude.ai. SWE-bench ~80%. OSWorld-Verified: 72.5% (human-level). 30-50% mas rapido que Sonnet 4.5. En el free tier incluye file creation, connectors, skills y context compaction.
        </TipBox>
      </>
    ),
  },
  {
    id: 'contexto',
    icon: Maximize2,
    title: '3. Context Window de 1M Tokens',
    color: 'green',
    subtitle: 'Context Compaction y Adaptive Thinking — el fin del "context rot"',
    content: (
      <>
        <p>Desde marzo 2026, el context window de 1M tokens esta disponible para Opus 4.6 y Sonnet 4.6 sin coste adicional.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">¿Que significa 1M tokens en la practica?</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /> ~750.000 palabras o ~750 novelas en un solo prompt</li>
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /> Codebases enteras de miles de archivos en una sola sesion</li>
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /> Soporte para hasta 600 imagenes o paginas de PDF por peticion</li>
        </ul>

        <h4 className="text-white font-semibold mt-6 mb-3">Context Compaction</h4>
        <p className="text-sm text-zinc-400">Funcion automatica que resume y reemplaza el contexto antiguo cuando la conversacion se acerca al limite. Agentes que pueden trabajar indefinidamente sin perder el hilo.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">Adaptive Thinking</h4>
        <p className="text-sm text-zinc-400">Reemplaza el toggle manual de "extended thinking". El modelo decide solo cuanto pensar segun la complejidad:</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { level: 'Low', desc: 'Consultas simples, formateo' },
            { level: 'Medium', desc: 'Coding estandar, escritura' },
            { level: 'High', desc: 'Debugging complejo, arquitectura' },
            { level: 'Max', desc: 'Algoritmos novedosos, investigacion profunda' },
          ].map(l => (
            <div key={l.level} className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <span className="text-green-400 font-semibold text-sm">{l.level}</span>
              <p className="text-xs text-zinc-500 mt-1">{l.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'cowork',
    icon: Briefcase,
    title: '4. Claude Co-work — La Herramienta Central',
    color: 'purple',
    subtitle: 'Acceso a archivos, sub-agentes en paralelo, tareas programadas',
    content: (
      <>
        <p>Co-work se lanzo en enero 2026. Da a Claude acceso directo de lectura/escritura a carpetas de tu ordenador, puede ejecutar tareas multi-paso de forma autonoma y lanzar sub-agentes en paralelo.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">Requisitos</h4>
        <ul className="space-y-1 text-sm text-zinc-400">
          <li>• Plan Pro, Max o Team de Claude</li>
          <li>• App de escritorio de Claude (solo MacOS por ahora)</li>
          <li>• Co-work NO funciona en navegador, solo en la app de escritorio</li>
        </ul>

        <h4 className="text-white font-semibold mt-6 mb-3">Capacidades completas</h4>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[
            'Skills — automatizaciones reutilizables',
            'Connectors — Gmail, Notion, Slack, CRMs via MCP',
            'Plugins — bundles de skills + connectors',
            'Scheduled Tasks — tareas programadas',
            'Sub-agentes en paralelo (100-200 tareas)',
            'Projects — workspace con memoria persistente',
            'Dispatch — asistente desde movil',
            'Computer Use — controla apps del escritorio',
          ].map(c => (
            <div key={c} className="p-2 bg-zinc-900/50 rounded-lg text-xs text-zinc-400 border border-zinc-800/50">{c}</div>
          ))}
        </div>

        <TipBox type="key">
          Cuando Anthropic lanzo Co-work, las acciones de ServiceNow cayeron un 23%, Salesforce un 22% y Snowflake un 20%. El mercado interpreto que Co-work amenaza directamente el software empresarial existente.
        </TipBox>
      </>
    ),
  },
  {
    id: 'projects',
    icon: FolderOpen,
    title: '5. Projects — Memoria y Organizacion',
    color: 'cyan',
    subtitle: 'Workspace con memoria dura, blanda y gestion automatica del contexto',
    content: (
      <>
        <p>Projects agrupa todo el trabajo relacionado en un workspace dedicado con memoria persistente y gestion automatica del contexto entre sesiones.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">¿Que incluye un Project?</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Instrucciones personalizadas por proyecto</li>
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Archivos de contexto (propuestas, workflows, docs)</li>
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Tareas programadas a nivel proyecto</li>
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Memoria automatica — Claude genera un archivo de memoria cada 24h</li>
        </ul>

        <h4 className="text-white font-semibold mt-6 mb-3">Tipos de memoria</h4>
        <div className="grid gap-3 mt-3">
          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <h5 className="text-cyan-400 font-semibold text-sm">Memoria dura</h5>
            <p className="text-xs text-zinc-400 mt-1">Archivos learnings.md o memory.md que tu le ordenas crear y mantener. Lo que guardas explicitamente.</p>
          </div>
          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <h5 className="text-cyan-400 font-semibold text-sm">Memoria blanda</h5>
            <p className="text-xs text-zinc-400 mt-1">Claude extrae automaticamente matices de todas las conversaciones del proyecto. Todo lo que no añadiste al archivo pero esta en las sesiones.</p>
          </div>
        </div>

        <TipBox>
          <strong>Prompt de cierre de sesion (el mas importante):</strong> "Por favor, revisa esta sesion. Extrae los aprendizajes importantes y añadelos a nuestros archivos MD. Toma una snapshot del estado actual. Creame un prompt listo para continuar en la proxima sesion."
        </TipBox>
      </>
    ),
  },
  {
    id: 'skills',
    icon: Zap,
    title: '6. Skills — La Clave de la Automatizacion',
    color: 'yellow',
    subtitle: 'Workflows de IA reutilizables: lo formas una vez y ya sabe hacer el proceso',
    content: (
      <>
        <p>Una Skill es un workflow de IA reutilizable. Es el nucleo de toda la automatizacion en Co-work y Code. Piensalo como contratar a un empleado inteligente: lo formas una vez y ya sabe hacer el proceso para siempre.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">Anatomia de una Skill</h4>
        <ul className="space-y-1 text-sm text-zinc-400">
          <li>• <strong className="text-zinc-300">Descripcion ligera</strong> — Claude la carga siempre en contexto como indice</li>
          <li>• <strong className="text-zinc-300">Archivo skill.md</strong> — instrucciones paso a paso del proceso</li>
          <li>• <strong className="text-zinc-300">Archivos de referencia</strong> — documentos de contexto, politicas, ejemplos</li>
          <li>• <strong className="text-zinc-300">Codigo opcional</strong> — scripts Python para outputs deterministas</li>
          <li>• <strong className="text-zinc-300">Plantillas e iconos</strong> — para el output</li>
        </ul>

        <h4 className="text-white font-semibold mt-6 mb-3">Metodologia correcta para crear Skills</h4>
        <div className="space-y-2 mt-3">
          {[
            { step: 1, text: 'Haz el proceso UNA VEZ manualmente con Claude' },
            { step: 2, text: 'Corrige errores durante el proceso (las correcciones quedaran en la skill)' },
            { step: 3, text: 'Al final: "convierte esto en una skill"' },
            { step: 4, text: 'Especifica nombre, trigger, proceso exacto, archivos de referencia y output esperado' },
          ].map(s => (
            <div key={s.step} className="flex gap-3 items-start">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm font-bold shrink-0">{s.step}</span>
              <p className="text-sm text-zinc-400 pt-1">{s.text}</p>
            </div>
          ))}
        </div>

        <TipBox type="key">
          <strong>El truco de la Skill auto-aprendiente:</strong> "Añade una funcion de actualizacion progresiva: cada vez que el usuario diga que no haga algo, actualiza automaticamente el archivo skill.md con esa regla nueva. La skill mejora cada vez que la uso."
        </TipBox>

        <h4 className="text-white font-semibold mt-6 mb-3">Skills vs Plugins vs Commands</h4>
        <div className="grid gap-2">
          <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-sm">
            <strong className="text-yellow-400">Skill:</strong> <span className="text-zinc-400">Proceso individual. Ej: "redactar newsletter".</span>
          </div>
          <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-sm">
            <strong className="text-blue-400">Command:</strong> <span className="text-zinc-400">Encadena multiples skills en secuencia con un solo /comando.</span>
          </div>
          <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-sm">
            <strong className="text-purple-400">Plugin:</strong> <span className="text-zinc-400">Bundle de skills + connectors + commands. Se exporta como ZIP.</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'skills2',
    icon: TestTube,
    title: '7. Skills 2.0 — Testing y Optimizacion',
    color: 'emerald',
    subtitle: 'Evals, A/B testing y optimizacion sistematica de tus skills',
    content: (
      <>
        <p>Skills 2.0 incluye evals (tests automaticos) y A/B testing integrado. Permite pasar de skills genericas a skills optimizadas y fiables de forma sistematica.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">¿Que son los Evals?</h4>
        <p className="text-sm text-zinc-400">Tests automaticos que Claude ejecuta sobre tu skill. Lanza 3-10 variaciones en paralelo, las puntua segun criterios que tu defines y te da un informe estructurado.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">Como usar los Evals correctamente</h4>
        <ul className="space-y-1 text-sm text-zinc-400">
          <li>• Optimiza UNA cosa por test — no 5-6 variables a la vez</li>
          <li>• Define criterios precisos: word count, tono de voz, estructura, uso de MCPs</li>
          <li>• Revisa el informe, da feedback especifico y pide que actualice la skill</li>
          <li>• Repite el bucle hasta consistencia</li>
        </ul>

        <h4 className="text-white font-semibold mt-6 mb-3">A/B Testing de Skills</h4>
        <div className="grid gap-2 mt-3">
          {[
            { goal: 'Optimizar velocidad', desc: 'Claude crea version B mas ligera. Resultado medible: tokens usados + segundos.' },
            { goal: 'Optimizar contexto', desc: 'Prueba si incluir/excluir un archivo de referencia mejora o perjudica el output.' },
            { goal: 'Nuevo modelo', desc: 'Cuando sale Opus 4.7/4.8, tu skill puede quedar obsoleta. Testea siempre.' },
          ].map(t => (
            <div key={t.goal} className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <span className="text-emerald-400 font-semibold text-sm">{t.goal}</span>
              <p className="text-xs text-zinc-500 mt-1">{t.desc}</p>
            </div>
          ))}
        </div>

        <TipBox>
          <strong>Ejemplo real:</strong> Skill "YouTube → Newsletter". Test basico (sin criterios): 0 fallos detectados = test inutil. Test con criterios precisos: 2/5 fallos en word count, 1/5 en historias personales. Version optimizada: 77K tokens vs 93K, 160s vs 204s.
        </TipBox>
      </>
    ),
  },
  {
    id: 'patrones',
    icon: GitBranch,
    title: '8. Los 5 Patrones de Skills (Anthropic)',
    color: 'orange',
    subtitle: 'Orquestacion, Multi-MCP, Refinamiento, Seleccion y Dominio',
    content: (
      <>
        <p>Anthropic publico una guia oficial con los 5 patrones de workflow mas comunes. Conocerlos te permite estructurar tus skills correctamente desde el principio.</p>

        <div className="mt-6 space-y-4">
          {[
            { n: 1, name: 'Orquestacion Secuencial', desc: 'Pasos que deben completarse en orden especifico.', example: 'Onboarding cliente → crear cuenta → pago → suscripcion → email de bienvenida', tip: 'Es el patron mas comun.' },
            { n: 2, name: 'Coordinacion Multi-MCP', desc: 'Interaccion con multiples herramientas en paralelo o secuencia.', example: 'Exportar de Figma → guardar en Drive → crear tarea en Linear → notificar en Slack', tip: 'Ideal para actualizar multiples sistemas con un solo trigger.' },
            { n: 3, name: 'Refinamiento Iterativo', desc: 'Loop hasta alcanzar calidad objetivo.', example: 'Redactar → puntuar (0-1) → si <0.8 reescribir → maximo 3 loops', tip: 'Es el patron base de Claude Code bajo el capo.' },
            { n: 4, name: 'Seleccion de Herramienta por Contexto', desc: 'Diferentes acciones segun el tipo de input.', example: 'Routing de tickets de soporte → FAQ skill / escalation skill / RMA skill', tip: 'Primero clasifica, luego actua.' },
            { n: 5, name: 'Inteligencia de Dominio', desc: 'No es sobre proceso ni MCPs. Es sobre subir tu base de conocimiento.', example: '20 años de experiencia + notas de voz transcritas = skill que responde igual que tu', tip: 'Ideal para soporte T1 del equipo.' },
          ].map(p => (
            <div key={p.n} className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold">{p.n}</span>
                <h5 className="text-white font-semibold">{p.name}</h5>
              </div>
              <p className="text-sm text-zinc-400 mt-2">{p.desc}</p>
              <p className="text-xs text-zinc-500 mt-2"><strong className="text-zinc-400">Ejemplo:</strong> {p.example}</p>
              <p className="text-xs text-orange-400/80 mt-1 italic">{p.tip}</p>
            </div>
          ))}
        </div>

        <TipBox type="key">
          <strong>Regla de oro:</strong> No metas todo en una skill gigante. Skills pequeñas y enfocadas rinden mejor. Encadenalas con un Command de un solo /slash y tendras un pipeline completo.
        </TipBox>
      </>
    ),
  },
  {
    id: 'agentes',
    icon: Bot,
    title: '9. Agents y Sub-agentes en Co-work',
    color: 'red',
    subtitle: 'Procesa 150 leads en 2 minutos con sub-agentes en paralelo',
    content: (
      <>
        <p>Los sub-agentes convierten Co-work en algo comparable a N8N o Make. Antes, procesar 150 leads era imposible por el context window. Con sub-agentes en paralelo tarda 2 minutos.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">¿Como funcionan?</h4>
        <p className="text-sm text-zinc-400">Claude lanza agentes independientes en paralelo. Cada uno trabaja aislado, con su propia tarea. El agente principal solo recibe el resumen de cada sub-agente — esto mantiene el context window limpio.</p>

        <CodeBlock code={`// Prompt clave para activar sub-agentes
"Quiero procesar esta lista de 150 leads.
Lanza 15 sub-agentes en PARALELO, cada uno procesando 10 leads.
Criterios: [TUS CRITERIOS].
Entrega un CSV actualizado con estado de cualificacion y razon."

// IMPORTANTE: Debes decir "en paralelo" explicitamente.
// Sin esa palabra, Claude puede ejecutarlos en secuencia.`} />

        <h4 className="text-white font-semibold mt-6 mb-3">Best practices</h4>
        <ul className="space-y-1 text-sm text-zinc-400">
          <li>• 5-15 tareas por sub-agente es el rango optimo</li>
          <li>• 100-200 items: funciona perfectamente</li>
          <li>• Mas de 200: considera N8N o Make</li>
          <li>• Consume muchos tokens — plan Max recomendado para uso intensivo</li>
        </ul>

        <h4 className="text-white font-semibold mt-6 mb-3">Co-work vs Claude Code para agentes</h4>
        <div className="grid gap-3 mt-3">
          <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-sm">
            <strong className="text-purple-400">Co-work (sub-agentes):</strong> <span className="text-zinc-400">Aislados, no se comunican. Ideal para tareas independientes en paralelo.</span>
          </div>
          <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-sm">
            <strong className="text-green-400">Claude Code (multi-agent teams):</strong> <span className="text-zinc-400">Los agentes se comunican y colaboran. 16 agentes Opus 4.6 construyeron un compilador C completo en 2 semanas.</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'channels',
    icon: Smartphone,
    title: '10. Channels — Control desde Telegram/Discord',
    color: 'sky',
    subtitle: 'Controla Claude Code desde tu movil via Telegram o Discord',
    content: (
      <>
        <p>Claude Code Channels permite controlar una sesion de Claude Code desde Telegram o Discord en tu movil. La sesion corre en tu ordenador y tu la gestionas a distancia.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">Setup en Telegram</h4>
        <div className="space-y-2">
          {[
            'Crear bot en @BotFather → /newbot → obtener token',
            'En Claude Code: /plugin install telegram',
            'Configurar: /telegram configure [TOKEN]',
            'Reiniciar sesion con flag --channels telegram',
            'En Telegram: enviar cualquier mensaje al bot → pairing code',
            'CRITICO: ejecutar el comando de allowlist para bloquear acceso a solo tu cuenta',
          ].map((s, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
              <p className="text-sm text-zinc-400">{s}</p>
            </div>
          ))}
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">Capacidades nuevas</h4>
        <ul className="space-y-1 text-sm text-zinc-400">
          <li>• <strong className="text-zinc-300">Permission relay:</strong> Aprueba acciones desde el telefono sin estar delante del PC</li>
          <li>• <strong className="text-zinc-300">Voice mode:</strong> Envia notas de voz que Claude transcribe y responde</li>
          <li>• <strong className="text-zinc-300">--bare flag:</strong> Para llamadas scripted sin hooks ni plugins</li>
        </ul>

        <TipBox type="warning">
          <strong>Limitaciones:</strong> La sesion terminal NO va a Telegram (sesiones aisladas). Limite de 4.096 chars por mensaje en Telegram. Tu ordenador debe estar encendido y el terminal activo.
        </TipBox>
      </>
    ),
  },
  {
    id: 'dispatch',
    icon: Send,
    title: '11. Dispatch — Asistente Persistente en el Movil',
    color: 'violet',
    subtitle: 'Un unico chat persistente entre TODOS tus dispositivos',
    content: (
      <>
        <p>Dispatch es la funcionalidad mas nueva y potente de Co-work. Un unico chat persistente y compartido entre todos tus dispositivos. Donde Co-work tiene multiples sesiones, Dispatch tiene una sola sesion siempre activa.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">¿Que diferencia a Dispatch?</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" /> <strong className="text-zinc-300">Sesion unificada:</strong> El mismo chat en desktop y movil en tiempo real</li>
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" /> <strong className="text-zinc-300">Orquestador de agentes:</strong> Puede iniciar tareas de Co-work Y sesiones de Claude Code</li>
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" /> <strong className="text-zinc-300">Acceso a archivos locales</strong> desde el telefono</li>
          <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" /> <strong className="text-zinc-300">Browser automation</strong> combinado con la extension de Chrome</li>
        </ul>

        <h4 className="text-white font-semibold mt-6 mb-3">Los 6 tools internos de Dispatch</h4>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[
            { name: 'start_task', desc: 'Inicia sesion de Co-work' },
            { name: 'start_code_task', desc: 'Invoca Claude Code' },
            { name: 'list_code_workspaces', desc: 'Lista workspaces' },
            { name: 'read_transcript', desc: 'Lee historial cross-session' },
            { name: 'send_message', desc: 'Envia msgs a otras sesiones' },
            { name: 'list_sessions', desc: 'Monitoriza sesiones activas' },
          ].map(t => (
            <div key={t.name} className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
              <code className="text-violet-400 text-xs">{t.name}</code>
              <p className="text-xs text-zinc-500 mt-0.5">{t.desc}</p>
            </div>
          ))}
        </div>

        <TipBox>
          <strong>Caso avanzado:</strong> Desde el movil, pide a Dispatch que coordine multiples agentes especializados: agente de cualificacion → agente de enriquecimiento → agente de redaccion de outreach. Todo con un mensaje.
        </TipBox>
      </>
    ),
  },
  {
    id: 'computer-use',
    icon: Monitor,
    title: '12. Computer Use — Claude Controla tu Escritorio',
    color: 'pink',
    subtitle: 'Screenshots, raton, teclado — automatiza incluso apps sin API',
    content: (
      <>
        <p>Claude Code puede tomar screenshots, controlar el raton y el teclado, y navegar por las apps de tu escritorio de forma nativa. Activalo en Settings → General → Desktop App → Computer Use.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">¿Que puede hacer?</h4>
        <ul className="space-y-1 text-sm text-zinc-400">
          <li>• Abrir aplicaciones de escritorio (Slack, ClickUp, apps locales)</li>
          <li>• Navegar interfaces visuales — hace zoom en botones para identificarlos</li>
          <li>• Adjuntar archivos, enviar mensajes, rellenar formularios en apps locales</li>
          <li>• Tomar y analizar screenshots para verificar el estado de la pantalla</li>
          <li>• Combinado con Dispatch: hacer todo esto desde el movil</li>
          <li>• Combinado con Scheduled Tasks: computer use automatizado a horas especificas</li>
        </ul>

        <TipBox type="key">
          <strong>La combinacion mas potente: Computer Use + Dispatch + Scheduled Tasks.</strong> Ejemplo: "Cada lunes a las 9am, abre mi app de analitica y descarga el informe." Incluso apps legacy sin API se vuelven automatizables por primera vez.
        </TipBox>

        <TipBox type="warning">
          <strong>Limitaciones (research preview):</strong> Solo MacOS. Solo planes Pro. En navegadores web: solo lectura, no puede hacer click. Para browser automation usa la extension de Chrome o Playwright CLI.
        </TipBox>
      </>
    ),
  },
  {
    id: 'claude-code',
    icon: Terminal,
    title: '13. Claude Code — Vibe Coding y Desarrollo',
    color: 'green',
    subtitle: 'El mejor asistente de codigo del mundo: hooks, channels, multi-agent teams',
    content: (
      <>
        <p>Claude Code es la version mas autonoma de Claude, optimizada para escribir codigo, ejecutar comandos y gestionar repos de GitHub. Microsoft, Google y OpenAI lo usan internamente.</p>

        <h4 className="text-white font-semibold mt-6 mb-3">Capacidades exclusivas</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• <strong className="text-zinc-300">Hooks:</strong> Scripts deterministas en puntos especificos del ciclo. 100% garantizados (skills son 99%)</li>
          <li>• <strong className="text-zinc-300">Remote Control / Channels:</strong> Controla desde movil via Telegram o Discord</li>
          <li>• <strong className="text-zinc-300">Multi-agent teams:</strong> Agentes que se comunican entre si</li>
          <li>• <strong className="text-zinc-300">Cambio de modelo en sesion:</strong> Haiku → Sonnet → Opus durante la misma sesion</li>
          <li>• <strong className="text-zinc-300">Claude Code Security:</strong> Escanea codebases buscando vulnerabilidades. Encontro 500+ en librerias open source</li>
        </ul>

        <h4 className="text-white font-semibold mt-6 mb-3">Modelos recomendados para Claude Code</h4>
        <div className="grid gap-2 mt-3">
          <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-sm">
            <strong className="text-green-400">Haiku 4.5</strong> — <span className="text-zinc-400">Tareas rutinarias y scheduled tasks (ahorra tokens)</span>
          </div>
          <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-sm">
            <strong className="text-blue-400">Sonnet 4.6</strong> — <span className="text-zinc-400">Coding de calidad, balance rendimiento/coste. Modelo por defecto recomendado</span>
          </div>
          <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-sm">
            <strong className="text-red-400">Opus 4.6</strong> — <span className="text-zinc-400">Codigo complejo, razonamiento profundo. Para los problemas mas dificiles</span>
          </div>
        </div>

        <TipBox>
          <strong>Claude Code en la Nube:</strong> Desde claude.ai/code puedes programar tareas que se ejecutan en servidores de Anthropic 24/7 aunque tu laptop este cerrado. Ideal para code reviews diarios, scrapers y auditorias de seguridad nocturnas.
        </TipBox>
      </>
    ),
  },
  {
    id: 'integraciones',
    icon: LayoutGrid,
    title: '14. Claude en Excel, PowerPoint, Chrome y Replit',
    color: 'teal',
    subtitle: 'Claude integrado en las herramientas que ya usas',
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-semibold mb-3">Claude en Microsoft Excel</h4>
            <ul className="space-y-1 text-sm text-zinc-400">
              <li>• Tablas dinamicas, graficos, formato condicional, ecuaciones nativas</li>
              <li>• Nunca hallucina valores — usa formulas reales de Excel</li>
              <li>• Forecasting financiero — entiende modelos estandar del sector</li>
              <li>• Contexto completo compartido con Co-work</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Claude en PowerPoint (feb 2026)</h4>
            <ul className="space-y-1 text-sm text-zinc-400">
              <li>• Generacion y edicion de slides con lenguaje natural</li>
              <li>• Acceso a skills, connectors y contexto compartido</li>
              <li>• Compatible con los modelos mas recientes</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Claude en Chrome (extension)</h4>
            <ul className="space-y-1 text-sm text-zinc-400">
              <li>• <strong className="text-zinc-300">"Teach Claude":</strong> Ejecutas un proceso y Claude lo aprende como skill</li>
              <li>• Haiku 4.5 como modelo por defecto — rapido y responsivo</li>
              <li>• Multiples tabs simultaneamente</li>
              <li>• Sube imagenes a formularios directamente</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Claude Code en Replit</h4>
            <ul className="space-y-1 text-sm text-zinc-400">
              <li>• Frameworks: NodeJS (APIs) o ExpressJS (portales con login)</li>
              <li>• Autenticacion built-in: Google, GitHub, Apple, email</li>
              <li>• Boton "Publish" → URL publica en menos de 1 minuto</li>
              <li>• Replit agent + Claude Code en paralelo en el mismo proyecto</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'casos',
    icon: TrendingUp,
    title: '15. Casos Practicos: Ventas y Marketing',
    color: 'amber',
    subtitle: 'Automatizaciones reales que puedes implementar hoy',
    content: (
      <>
        <h4 className="text-white font-semibold mb-3">Automatizaciones de Ventas</h4>
        <div className="space-y-3">
          {[
            { name: 'Prospeccion y Lead Gen', desc: 'Apify scrapa engagers de LinkedIn → sub-agentes cualifican en paralelo contra ICP → enriquecimiento → CSV listo para outreach. 150 leads en 2 minutos.' },
            { name: 'Lead Nurturing', desc: 'Revisa leads perdidos en CRM, scrapa LinkedIn + emails historicos → CSV priorizado por tamaño empresa e ICP para follow-up con Gmail connector.' },
            { name: 'Call Prep automatica', desc: 'Cada mañana a las 7am: revisa CRM, extrae reuniones del dia → dashboard HTML con historial, agenda sugerida y preguntas de discovery.' },
            { name: 'Win/Loss Analysis mensual', desc: 'Analiza leads ganados/perdidos en CRM + transcripciones + emails → Google Doc con win rate, patrones de exito, objeciones comunes.' },
            { name: 'Pipeline Review diario', desc: 'Analiza pipeline + emails + transcripciones → DM en Slack con leads mas calientes y en riesgo. Puede auto-actualizar el pipeline.' },
          ].map(c => (
            <div key={c.name} className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <h5 className="text-amber-400 font-semibold text-sm">{c.name}</h5>
              <p className="text-xs text-zinc-400 mt-1">{c.desc}</p>
            </div>
          ))}
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">Automatizaciones de Marketing</h4>
        <div className="space-y-3">
          {[
            { name: 'Newsletter writer', desc: 'YouTube URL → Apify scrapa transcript → 5 angulos → outline → newsletter completa en tu tono de voz.' },
            { name: 'LinkedIn post writer', desc: 'Mismo proceso, adaptado a LinkedIn con hook templates y tono de red social.' },
            { name: 'Infographic creator', desc: 'LinkedIn post → visualizacion → copy → imagen generada con Google Imagen 3 (NanoBanana MCP) siguiendo brand guidelines.' },
            { name: 'Content Ideation diaria', desc: 'Revisa Anthropic, A16Z y otras fuentes → filtra por relevancia para tu ICP → HTML dashboard con ideas. CSV para evitar duplicados.' },
          ].map(c => (
            <div key={c.name} className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <h5 className="text-amber-400 font-semibold text-sm">{c.name}</h5>
              <p className="text-xs text-zinc-400 mt-1">{c.desc}</p>
            </div>
          ))}
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">Connectors esenciales</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {['Apify', 'CRM (Attio, HubSpot)', 'Fireflies', 'Gmail', 'Clay', 'Instantly', 'Google Imagen 3', 'Supabase'].map(c => (
            <span key={c} className="px-3 py-1.5 bg-zinc-900/50 rounded-full text-xs text-zinc-400 border border-zinc-800/50">{c}</span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'prompts',
    icon: MessageSquare,
    title: '16. Prompts Clave para Empezar Hoy',
    color: 'forge',
    subtitle: 'Los prompts mas importantes para configurar tu ecosistema Claude',
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-semibold mb-2">Setup inicial de Co-work</h4>
            <CodeBlock code={`"Acabo de darte acceso a esta carpeta vacia. Es tu workspace para todos los proyectos.
Crea la siguiente estructura: context/ (archivos permanentes), projects/ (activos), outputs/ (entregables).
Dentro de context/, crea tres MD: about-me.md, brand-voice.md y working-preferences.md.
Para cada uno, hazme las preguntas necesarias para rellenarlos bien."`} />
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Crear Project para nuevo cliente</h4>
            <CodeBlock code={`"Empezamos con un cliente nuevo: [NOMBRE]. Lee la propuesta adjunta y:
1) Crea tareas programadas basadas en el timeline de la propuesta.
2) Crea archivos learnings.md y memory.md para guardar aprendizajes del proyecto.
3) Al inicio de cada sesion, lee siempre estos archivos.
4) Cada vez que aprendas algo importante, añadelo a los MD."`} />
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Crear una Skill desde un proceso</h4>
            <CodeBlock code={`"Ahora convierte este proceso en una skill. Nombre: [NOMBRE]. Trigger: cuando mencione [TRIGGER].
Sigue el proceso exacto de esta sesion. Incluye todos los archivos de referencia.
Haz obligatorio leerlos en el mismo punto del proceso.
Añade funcion de actualizacion progresiva: cuando diga que no haga algo,
actualiza automaticamente el archivo skill.md con esa regla nueva."`} />
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Sub-agentes en paralelo</h4>
            <CodeBlock code={`"Quiero procesar esta lista de [N] leads.
Lanza [N/10] sub-agentes en PARALELO, cada uno procesando 10 leads.
Criterios de cualificacion: [CRITERIOS].
Entrega un CSV actualizado con columna de estado y razon de cualificacion."`} />
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Prompt de cierre de sesion</h4>
            <CodeBlock code={`"Voy a cerrar esta sesion. Por favor:
1) Extrae los aprendizajes mas importantes y añadelos a nuestros archivos MD.
2) Snapshot del estado: que hemos hecho, que esta pendiente, cual es el siguiente paso exacto.
3) Creame un prompt listo para continuar en la proxima sesion desde donde lo dejamos."`} />
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Crear Plugin con multiples skills</h4>
            <CodeBlock code={`"Crea un plugin llamado [NOMBRE]. Dentro:
1) Skill de cualificacion de leads con agente.md separado.
2) Skill de enriquecimiento con agente.md separado.
3) Command outbound-pipeline que ejecuta ambas skills en secuencia.
En todas las skills especifica que deben usar sub-agentes en paralelo.
Guardalo como ZIP compartible."`} />
          </div>
        </div>

        <TipBox type="key">
          <strong>Recuerda:</strong> La informacion evoluciona al ritmo de Anthropic. Mantente al dia con las actualizaciones de modelos y funcionalidades. Cada nuevo modelo puede requerir re-evaluar tus skills.
        </TipBox>
      </>
    ),
  },
];

// ─── Color map ──────────────────────────────────────────────────────────────
const colorMap = {
  forge: { bg: 'bg-forge-500/10', border: 'border-forge-500/30', text: 'text-forge-400', iconBg: 'bg-forge-500/20' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', iconBg: 'bg-blue-500/20' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', iconBg: 'bg-green-500/20' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', iconBg: 'bg-purple-500/20' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', iconBg: 'bg-cyan-500/20' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', iconBg: 'bg-yellow-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', iconBg: 'bg-orange-500/20' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', iconBg: 'bg-red-500/20' },
  sky: { bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-400', iconBg: 'bg-sky-500/20' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', iconBg: 'bg-violet-500/20' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', iconBg: 'bg-pink-500/20' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400', iconBg: 'bg-teal-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', iconBg: 'bg-amber-500/20' },
};

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function CursoClaude() {
  const [openSections, setOpenSections] = useState(new Set());

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
          <Brain className="w-4 h-4" />
          Curso Completo
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Dominando <span className="text-transparent bg-clip-text bg-gradient-to-r from-forge-400 to-blue-400">Claude</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          16 lecciones cubriendo todo el ecosistema Claude: modelos, Co-work, Skills, Agents, Code, integraciones y casos practicos. Basado en informacion verificada a marzo 2026.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-zinc-500">
          <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> 16 lecciones</span>
          <span>•</span>
          <span>Nivel: Todos</span>
          <span>•</span>
          <span>Actualizado: Marzo 2026</span>
        </div>
      </div>

      {/* Quick overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Ecosistema', value: '3 tools', color: 'text-forge-400' },
          { label: 'Modelos', value: '3 modelos', color: 'text-blue-400' },
          { label: 'Contexto', value: '1M tokens', color: 'text-green-400' },
          { label: 'Patrones', value: '5 oficiales', color: 'text-orange-400' },
        ].map(s => (
          <div key={s.label} className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Official Courses Banner */}
      <Link
        to="/cursos-oficiales"
        className="group block mb-8 p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-forge-500/5 hover:from-blue-500/10 hover:via-purple-500/10 hover:to-forge-500/10 transition-all hover:scale-[1.01] hover:border-blue-500/40 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-forge-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow shrink-0">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-bold text-lg">Curso Oficial de Anthropic</h3>
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-semibold uppercase tracking-wider">Gratis</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              20 cursos oficiales de Anthropic con certificacion gratuita. API, prompting, MCP, Claude Code, agentes, skills y mas.
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-gold-400" /> Con certificado</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> 20 cursos</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Self-paced</span>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
        </div>
      </Link>

      {/* Expand all button */}
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

      {/* Footer */}
      <div className="mt-12 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-center">
        <p className="text-zinc-400 text-sm">
          Curso inspirado en la <strong className="text-zinc-300">Guia Completa de Claude</strong> de Cafe Camaleonico (marzo 2026).
          <br />
          Potenciado y mejorado para <strong className="text-forge-400">La Forja de Skills</strong> por SalgadoIA.
        </p>
        <p className="text-zinc-600 text-xs mt-3">
          La informacion evoluciona al ritmo de Anthropic — mantente al dia con las actualizaciones.
        </p>
      </div>
    </div>
  );
}
