// =============================================================================
// Forjito Assistant Knowledge Base
// Intent patterns, app sections, quick chips, personality, and concept definitions
// =============================================================================

export const intentPatterns = [
  // GREETING - highest priority for quick responses
  { intent: 'GREETING', patterns: ['hola', 'hey', 'buenas', 'buenos dias', 'buenos días', 'buenas tardes', 'buenas noches', 'que tal', 'qué tal', 'saludos', 'ey', 'hello', 'hi', 'ola', 'wena', 'ke tal', 'que onda', 'como estas', 'cómo estás'], priority: 10 },

  // PROGRESS - user checking their advancement
  { intent: 'PROGRESS', patterns: ['mi progreso', 'cuanto llevo', 'cuánto llevo', 'xp', 'nivel', 'level', 'experiencia', 'puntos', 'mis puntos', 'mi nivel', 'mi xp', 'como voy', 'cómo voy', 'mis badges', 'mis insignias', 'estadisticas', 'estadísticas', 'mi avance', 'cuantas lecciones', 'cuántas lecciones', 'cuantas me faltan', 'que llevo', 'puntuacion', 'mi puntuacion'], priority: 9 },

  // NEXT_LESSON - what to do next
  { intent: 'NEXT_LESSON', patterns: ['siguiente', 'next', 'que sigo', 'qué sigo', 'proxima leccion', 'próxima lección', 'que hago ahora', 'qué hago ahora', 'siguiente leccion', 'siguiente lección', 'continuar', 'que me falta', 'qué me falta', 'por donde voy', 'por dónde voy', 'que leccion toca', 'que toca ahora', 'que viene ahora'], priority: 8 },

  // HOW_TO - procedural questions (higher priority — catch "hacer/crear skill" before NAVIGATE)
  { intent: 'HOW_TO', patterns: [
    'como creo', 'cómo creo', 'como hago', 'cómo hago', 'como puedo', 'cómo puedo',
    'como se hace', 'cómo se hace', 'como se crea', 'cómo se crea',
    'como instalo', 'cómo instalo', 'como mejoro', 'cómo mejoro',
    'como fusiono', 'cómo fusiono', 'como catalogo', 'cómo catalogo',
    'como configuro', 'cómo configuro', 'como uso', 'cómo uso',
    'como empiezo', 'cómo empiezo', 'por donde empiezo', 'por dónde empiezo',
    'pasos para', 'tutorial', 'quiero hacer', 'quiero crear',
    'hacer una skill', 'hacer un skill', 'crear una skill', 'crear un skill',
    'poder hacer', 'poder crear', 'puedo hacer', 'puedo crear',
    'hacerme una skill', 'hacerme un skill', 'crearme una skill', 'crearme un skill',
    'necesito una skill', 'necesito un skill', 'necesito crear',
    'se puede hacer', 'se puede crear', 'quiero aprender',
    'como funciona el constructor', 'como uso el constructor',
    'hacer un plugin', 'crear un plugin', 'hacer un agente', 'crear un agente',
    'como instalar', 'como crear', 'como hacer', 'como mejorar', 'como fusionar',
  ], priority: 8 },

  // NAVIGATE - going to sections
  { intent: 'NAVIGATE', patterns: ['donde esta', 'dónde está', 'donde encuentro', 'como llego a', 'cómo llego a', 'ir a', 'abrir', 'llévame', 'llevame', 'navegar', 'ir al', 'mostrar', 'enséñame la seccion', 'muestrame', 'abre', 'curso claude', 'curso de claude', 'aprender claude'], priority: 7 },

  // WHAT_IS - concept definitions
  { intent: 'WHAT_IS', patterns: [
    'que es un skill', 'qué es un skill', 'que es una skill', 'qué es una skill',
    'que son triggers', 'qué son triggers', 'que es frontmatter', 'qué es frontmatter',
    'que es un plugin', 'qué es un plugin', 'que es un agente', 'qué es un agente',
    'que es sinapsis', 'qué es sinapsis', 'que es un micro-skill', 'qué es un micro-skill',
    'que es fusion', 'qué es fusión', 'que es', 'qué es', 'que son', 'qué son',
    'definicion de', 'definición de', 'que significa', 'qué significa',
    'que es un artgent', 'que es un superagente',
    'que es progressive-disclosure', 'que es el marketplace', 'que es el constructor',
    'que es rubrica', 'que es la rubrica', 'que es la forja',
    'a que te refieres con', 'que quiere decir',
  ], priority: 7 },

  // LESSON_INFO - asking about specific lessons or concepts
  { intent: 'LESSON_INFO', patterns: ['explicame', 'explícame', 'leccion sobre', 'lección sobre', 'leccion de', 'lección de', 'dime sobre', 'cuentame sobre', 'cuéntame sobre', 'informacion sobre', 'información sobre', 'tema de', 'detalle de', 'mas sobre', 'más sobre', 'profundiza', 'quiero saber de', 'enseñame', 'enséñame', 'habla de', 'hablame de', 'que trata'], priority: 5 },

  // SEARCH_SKILL - searching the skills database
  { intent: 'SEARCH_SKILL', patterns: ['buscar skill', 'hay skills de', 'skills para', 'encuentra', 'busca skill', 'skill de', 'skills de', 'skill para', 'tengo skills', 'existe un skill', 'hay algo de', 'hay algo para', 'recomienda skill', 'recomienda skills', 'buscar en marketplace', 'quiero un skill de', 'skills sobre', 'tienes skills'], priority: 5 },

  // HELP - what can Forjito do
  { intent: 'HELP', patterns: ['ayuda', 'help', 'que puedes hacer', 'qué puedes hacer', 'funciones', 'capacidades', 'opciones', 'menu', 'menú', 'comandos', 'que sabes', 'qué sabes', 'para que sirves', 'para qué sirves', 'que haces', 'qué haces', 'que puedo hacer', 'qué puedo hacer', 'como me ayudas', 'que ofreces'], priority: 4 },

  // EASTER_EGG - fun interactions
  { intent: 'EASTER_EGG', patterns: ['forja un chiste', 'joke', 'chiste', 'stats', 'rpg', 'ficha rpg', 'mi ficha', 'personaje', 'character', 'dame un chiste', 'cuentame un chiste', 'cuéntame un chiste', 'humor', 'jaja', 'divertido', 'gracioso'], priority: 3 },

  // CELEBRATE - internal, triggered by system events
  { intent: 'CELEBRATE', patterns: ['__celebrate__', '__level_up__', '__badge_earned__', '__course_complete__'], priority: 1 },
];

export const appSections = {
  home: { path: '/', name: 'Inicio', description: 'Pagina principal con tu progreso y acceso a todo', icon: 'Hammer' },
  guia: { path: '/guia', name: 'Guia de Uso', description: 'Explica todas las secciones y como usarlas', icon: 'Compass' },
  curso: { path: '/curso', name: 'Curso', description: '16 lecciones gamificadas con XP, badges y niveles', icon: 'GraduationCap' },
  constructor: { path: '/constructor', name: 'Constructor', description: '5 modos: SuperConstructor (IA), Crear, Micro-Skill, Mejorar, Fusionar', icon: 'Wrench' },
  catalogo: { path: '/catalogo', name: 'Catalogo', description: '12 categorias para organizar tus skills', icon: 'Library' },
  marketplace: { path: '/marketplace', name: 'Marketplace', description: '1800+ skills de 5 superrepositorios', icon: 'Store' },
  plugins: { path: '/plugins', name: 'Plugins', description: 'Crear plugins distribuibles para Claude Code', icon: 'Plug' },
  agentes: { path: '/agentes', name: 'ARTgents', description: 'SuperAgentes con SuperHabilidades', icon: 'Shield' },
  ejemploMarca: { path: '/ejemplo-marca', name: 'Ejemplo Marca', description: 'Crea tu plugin de branding personal', icon: 'Paintbrush' },
  automatizaciones: { path: '/automatizaciones', name: 'Automatizaciones', description: 'Tareas programadas, monitorización, deploys, backups, alertas y mantenimiento', icon: 'Timer' },
  cursoPaperclip: { path: '/curso-paperclip', name: 'Curso Paperclip', description: '10 lecciones sobre orquestacion de agentes de IA con Paperclip: arquitectura, instalacion, gestion y casos de uso', icon: 'Building2' },
  cursoClaude: { path: '/curso-claude', name: 'Curso Claude', description: '16 lecciones sobre el ecosistema Claude: modelos, Co-work, Skills, Agents, Code, integraciones', icon: 'Brain' },
  cursosOficiales: { path: '/cursos-oficiales', name: 'Cursos Oficiales Anthropic', description: '20 cursos oficiales gratuitos de Anthropic con certificacion: API, prompting, MCP, Claude Code, agentes', icon: 'GraduationCap' },
  configuracion: { path: '/configuracion', name: 'Configuracion', description: 'Configurar .claude, settings, hooks, repos', icon: 'Settings' },
};

export const quickChips = {
  default: ['Mi progreso', 'Siguiente leccion', 'Que puedo hacer?'],
  '/curso': ['Mi progreso', 'Siguiente leccion', 'Que zona me falta?'],
  '/constructor': ['Como creo un skill?', 'SuperConstructor', 'Que es un micro-skill?'],
  '/marketplace': ['Como instalo skills?', 'Buscar skills de React', 'Que repos hay?'],
  '/catalogo': ['Que categorias hay?', 'Buscar skill', 'Como catalogo?'],
  '/agentes': ['Que es un ARTgent?', 'Como creo un agente?', 'SuperAgentes'],
  '/plugins': ['Que es un plugin?', 'Como creo uno?', 'Marketplace'],
  '/automatizaciones': ['Que es un cron job?', 'Como monitorizo mi web?', 'Backups automaticos'],
  '/curso-paperclip': ['Que es Paperclip?', 'Como instalo Paperclip?', 'Que son los heartbeats?'],
  '/curso-claude': ['Que modelos de Claude hay?', 'Que es Co-work?', 'Cursos oficiales Anthropic'],
  '/cursos-oficiales': ['Donde esta Anthropic Academy?', 'Cursos gratuitos de Claude', 'Que rutas hay?'],
  '/configuracion': ['Como configuro .claude?', 'Repos recomendados', 'Hooks'],
};

export const forjitoPersonality = {
  name: 'Forjito',
  greeting: (levelName, xp) => `Hola! Soy Forjito, tu ayudante de la forja. Eres ${levelName} con ${xp} XP. En que te ayudo?`,
  greetingNew: 'Bienvenido a La Forja de Skills! Soy Forjito, tu guia. Quieres empezar el curso o explorar el constructor?',
  thinking: 'Calentando el metal de tu pregunta...',
  notUnderstood: 'Hmm, no he forjado una respuesta para eso todavia. Puedo ayudarte con tu progreso, las lecciones, o navegar por la app. Que prefieres?',
  jokes: [
    'Por que el programador dejo su trabajo? Porque no tenia arrays de crecimiento.',
    'Que dice un skill a otro? Nos vemos en el merge!',
    'Un bug entro en la forja... y salio como feature.',
    'Por que los forjadores son buenos programadores? Porque saben templar el codigo.',
    'Mi skill favorito es el que no tiene bugs... ah espera, ese no existe.',
    'Que le dijo el frontmatter al body? Sin mi, no eres nada.',
    'Cuantos programadores se necesitan para cambiar un foco? Ninguno, eso es un problema de hardware.',
    'Por que los skills van al gimnasio? Para tener mas peso en el contexto.',
  ],
};

export const conceptDefinitions = {
  'skill': 'Un skill es un archivo SKILL.md con instrucciones que potencian a Claude con capacidades especificas. Tiene frontmatter YAML + cuerpo Markdown.',
  'trigger': 'Los triggers son frases que activan automaticamente un skill cuando Claude las detecta en tu mensaje. Se definen en la description del frontmatter.',
  'triggers': 'Los triggers son frases que activan automaticamente un skill cuando Claude las detecta en tu mensaje. Se definen en la description del frontmatter.',
  'frontmatter': 'El frontmatter es la cabecera YAML del SKILL.md (entre ---). Contiene name, description y otros metadatos como author y version.',
  'plugin': 'Un plugin es un paquete distribuible con multiples skills. Se instala desde GitHub y se organiza en .claude-plugin/.',
  'micro-skill': 'Un micro-skill es un skill ultra-ligero de menos de 100 lineas, enfocado en una sola tarea. Ideal para empezar.',
  'agente': 'Un agente (agent) es un subproceso especializado que un skill puede invocar para tareas complejas. Vive en agents/.',
  'artgent': 'Un ARTgent es un agente creado con arte, cariño y codigo abierto. La filosofia: creART una nueva CREAlidART.',
  'superagente': 'Un SuperAgente es como un superheroe digital: tiene multiples SuperHabilidades (skills) asignadas que puede usar segun la situacion.',
  'fusion': 'Fusionar skills combina 2+ skills en uno superior. Estrategias: merge (alto solapamiento), compose (orquestador) o layer (base + extension).',
  'sinapsis': 'Sinapsis es el sistema de aprendizaje continuo: observa, detecta patrones, cristaliza instincts y los evoluciona automaticamente.',
  'progressive-disclosure': 'Progressive disclosure carga skills en 3 niveles para optimizar contexto: Nivel 1 (SKILL.md), Nivel 2 (commands/), Nivel 3 (agents/).',
  'marketplace': 'El Marketplace tiene 1800+ skills de 5 superrepositorios comunitarios listos para instalar con un click.',
  'constructor': 'El Constructor tiene 5 modos: SuperConstructor (prompt libre con IA), Crear Skill, Micro-Skill, Mejorar y Fusionar.',
  'rubrica': 'La rubrica de calidad evalua skills de 0-100 en 4 dimensiones: frontmatter, contenido, estructura y reutilizacion.',
  'catalogo': 'El Catalogo organiza skills en 12 categorias: desarrollo web, IA, automatizacion, documentacion, testing, seguridad, datos, productividad, educacion, blockchain, CMS y meta-skill.',
  'automatizaciones': 'Las Automatizaciones cubren todo lo que necesitas para mantener webs en produccion: cron jobs, health checks, CI/CD, backups, alertas y mantenimiento. La seccion AutoPilot te enseña a configurarlo todo.',
  'cron': 'Un cron job es una tarea programada que se ejecuta automaticamente en intervalos definidos. Por ejemplo: backup cada noche, health check cada 5 minutos, reporte semanal cada lunes.',
  'health check': 'Un health check es un endpoint (/health) que verifica que tu web y sus servicios (DB, cache, disco) funcionan correctamente. Se consulta cada pocos minutos.',
  'ci/cd': 'CI/CD (Integracion Continua / Deploy Continuo) es un pipeline automatico: cada push ejecuta tests, build y deploy sin intervencion manual.',
  'deploy': 'Deploy es el proceso de publicar tu codigo en produccion. Con CI/CD se automatiza: push → tests → build → produccion.',
  'backup': 'Un backup es una copia de seguridad de tus datos. Regla 3-2-1: 3 copias, 2 medios diferentes, 1 fuera del sitio. Automatiza y prueba restaurar.',
  'monitoring': 'Monitorización es vigilar que tus webs esten online, rapidas y sin errores 24/7. Usa UptimeRobot, Grafana o scripts propios.',
  'co-work': 'Claude Co-work es la herramienta central del ecosistema Claude. Permite tareas complejas, proyectos multi-sesion, acceso a archivos locales, sub-agentes en paralelo y automatizaciones con skills.',
  'dispatch': 'Dispatch es un chat persistente y unificado entre todos tus dispositivos. Puede orquestar agentes de Co-work y Claude Code desde el movil.',
  'channels': 'Claude Code Channels permite controlar sesiones de Claude Code desde Telegram o Discord en tu movil. Incluye permission relay y voice mode.',
  'computer use': 'Computer Use permite a Claude tomar screenshots, controlar raton y teclado, y navegar apps de escritorio. Combinado con Dispatch y Scheduled Tasks es muy potente.',
  'evals': 'Los Evals son tests automaticos que Claude ejecuta sobre tus skills. Lanza variaciones en paralelo, las puntua segun criterios definidos y te da un informe.',
  'opus': 'Claude Opus 4.6 es el modelo mas potente: 1M tokens de contexto, 128K output, ideal para coding complejo y razonamiento profundo. ARC-AGI-2: 68.8%.',
  'sonnet': 'Claude Sonnet 4.6 es el modelo por defecto de claude.ai. 1M tokens, equilibrio rendimiento/coste. SWE-bench ~80%. 30-50% mas rapido que Sonnet 4.5.',
  'haiku': 'Claude Haiku 4.5 es el modelo mas rapido y barato. 200K tokens. Ideal para scheduled tasks, resumenes y tareas rapidas.',
  'paperclip': 'Paperclip es un servidor Node.js + React open-source (MIT, 32.200+ estrellas) que orquesta un equipo de agentes de IA para gestionar un negocio. Si Claude Code es el empleado, Paperclip es la empresa.',
  'heartbeat': 'Los heartbeats son intervalos programados (cada 4h, 8h, diariamente) en los que los agentes de Paperclip se despiertan, comprueban si hay trabajo pendiente, lo ejecutan y vuelven a dormir.',
  'heartbeats': 'Los heartbeats son intervalos programados (cada 4h, 8h, diariamente) en los que los agentes de Paperclip se despiertan, comprueban si hay trabajo pendiente, lo ejecutan y vuelven a dormir.',
  'clipmart': 'ClipMart sera el marketplace de Paperclip donde podras descargar empresas completas de IA pre-construidas con un click: Content Marketing Agency, Dev Agency, YouTube Factory, etc.',
  'org chart': 'El Org Chart de Paperclip es un organigrama real donde cada rol (CEO, CMO, CTO, etc.) esta ocupado por un agente de IA con titulo, jefe y subordinados.',
  'anthropic academy': 'Anthropic Academy (anthropic.skilljar.com) ofrece 15 cursos oficiales gratuitos con certificacion sobre Claude, API, MCP, Claude Code, agentes y prompting. Ve a /cursos-oficiales para ver el directorio completo.',
  'cursos oficiales': 'Anthropic ofrece 20 cursos gratuitos: 15 en Anthropic Academy (con certificado) y 5 en GitHub (Jupyter Notebooks). Desde fundamentos hasta agentes avanzados. Ve a /cursos-oficiales.',
};
