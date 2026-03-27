import { intentPatterns, appSections, conceptDefinitions, forjitoPersonality, quickChips } from '../data/assistantKnowledge';
import { courseNodes, categories } from '../data/courseData';
import { searchSkills } from '../data/skillsDatabase';
import { findLessonByTopic, getLessonsUntil } from './contextBuilder';

// =============================================================================
// Main entry point
// =============================================================================

export function processMessage(message, userContext, currentPath) {
  const intent = detectIntent(message);
  const response = generateResponse(intent, message, userContext, currentPath);
  return response;
}

// =============================================================================
// Intent detection with accent normalization and scoring
// =============================================================================

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectIntent(message) {
  const normalized = normalizeText(message);
  const words = normalized.split(' ');

  let bestIntent = 'UNKNOWN';
  let bestScore = 0;

  for (const entry of intentPatterns) {
    let score = 0;

    for (const pattern of entry.patterns) {
      const normalizedPattern = normalizeText(pattern);
      const patternWords = normalizedPattern.split(' ');

      // Exact full match of pattern in message (strongest signal)
      if (normalized.includes(normalizedPattern)) {
        const patternWordCount = patternWords.length;
        score = Math.max(score, patternWordCount * 4 + entry.priority);
      }
      // Word overlap scoring — how many pattern words appear in the message
      else if (patternWords.length > 1) {
        const matchingWords = patternWords.filter(pw => words.includes(pw));
        const overlap = matchingWords.length / patternWords.length;
        if (overlap >= 0.5) {
          // At least half the pattern words match
          score = Math.max(score, overlap * patternWords.length * 2 + entry.priority * 0.7);
        }
      }
      // Single word pattern — exact word match
      else if (patternWords.length === 1 && words.includes(normalizedPattern)) {
        score = Math.max(score, 1 + entry.priority * 0.5);
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIntent = entry.intent;
    }
  }

  // Context-based fallback: if score is very low, try keyword heuristics
  if (bestScore < 3) {
    const keywordFallbacks = [
      { keywords: ['skill', 'crear', 'hacer', 'generar', 'construir'], intent: 'HOW_TO' },
      { keywords: ['skill', 'buscar', 'encontrar', 'hay'], intent: 'SEARCH_SKILL' },
      { keywords: ['leccion', 'curso', 'aprender', 'estudiar'], intent: 'NEXT_LESSON' },
      { keywords: ['progreso', 'xp', 'nivel', 'badge'], intent: 'PROGRESS' },
      { keywords: ['que', 'es', 'significa', 'son'], intent: 'WHAT_IS' },
      { keywords: ['constructor', 'marketplace', 'catalogo', 'plugins', 'agentes', 'configuracion'], intent: 'NAVIGATE' },
    ];

    for (const fb of keywordFallbacks) {
      const matchCount = fb.keywords.filter(kw => words.includes(kw)).length;
      if (matchCount >= 2 && matchCount > bestScore) {
        bestScore = matchCount;
        bestIntent = fb.intent;
      }
    }
  }

  return bestIntent;
}

// =============================================================================
// Response generation - routes to specific handlers
// =============================================================================

function generateResponse(intent, message, userContext, currentPath) {
  switch (intent) {
    case 'GREETING': return handleGreeting(userContext);
    case 'PROGRESS': return handleProgress(userContext);
    case 'NEXT_LESSON': return handleNextLesson(userContext);
    case 'LESSON_INFO': return handleLessonInfo(message, userContext);
    case 'NAVIGATE': return handleNavigate(message);
    case 'WHAT_IS': return handleWhatIs(message, userContext);
    case 'HOW_TO': return handleHowTo(message, userContext);
    case 'SEARCH_SKILL': return handleSearchSkill(message);
    case 'HELP': return handleHelp();
    case 'EASTER_EGG': return handleEasterEgg(message, userContext);
    case 'CELEBRATE': return handleCelebrate(message, userContext);
    default: return handleUnknown(currentPath);
  }
}

// =============================================================================
// Handler: GREETING
// =============================================================================

function handleGreeting(userContext) {
  if (!userContext.hasStarted) {
    return {
      text: forjitoPersonality.greetingNew,
      links: [
        { label: 'Empezar el curso', path: '/curso' },
        { label: 'Explorar el constructor', path: '/constructor' },
      ],
      chips: ['Empezar el curso', 'Que puedo hacer?', 'Que es un skill?'],
    };
  }

  return {
    text: forjitoPersonality.greeting(userContext.levelName, userContext.currentXp),
    links: [],
    chips: ['Mi progreso', 'Siguiente leccion', 'Que puedo hacer?'],
  };
}

// =============================================================================
// Handler: PROGRESS
// =============================================================================

function handleProgress(userContext) {
  const { completedCount, totalLessons, currentXp, totalXp, levelName, levelEmoji, completionPercent, earnedBadges, nextLesson, currentZone } = userContext;

  let text = `${levelEmoji} Tu ficha de forjador:\n\n`;
  text += `Nivel: ${levelName}\n`;
  text += `XP: ${currentXp} / ${totalXp}\n`;
  text += `Lecciones: ${completedCount} / ${totalLessons} (${completionPercent}%)\n`;
  text += `Zona actual: ${currentZone}\n`;

  if (earnedBadges.length > 0) {
    text += `Badges: ${earnedBadges.length} obtenidos\n`;
  } else {
    text += `Badges: Ninguno aun - completa lecciones para ganarlos!\n`;
  }

  if (nextLesson) {
    text += `\nSiguiente: "${nextLesson.titulo}" en ${nextLesson.zona} (+${nextLesson.xp} XP)`;
  } else {
    text += `\nHas completado todo el curso! Eres un verdadero maestro de la forja!`;
  }

  const links = nextLesson ? [{ label: `Ir a: ${nextLesson.titulo}`, path: `/curso/${nextLesson.id}` }] : [];
  const chips = nextLesson
    ? ['Siguiente leccion', 'Que zona me falta?', 'Buscar skills']
    : ['Explorar marketplace', 'Constructor', 'Mis badges'];

  return { text, links, chips };
}

// =============================================================================
// Handler: NEXT_LESSON
// =============================================================================

function handleNextLesson(userContext) {
  const { nextLesson, completedCount, totalLessons, currentZone } = userContext;

  if (!nextLesson) {
    return {
      text: 'Has completado todas las lecciones del curso! Eres un verdadero Gran Maestro de la Forja. Ahora puedes explorar el Marketplace, crear tus propios skills en el Constructor, o desafiar a los ARTgents.',
      links: [
        { label: 'Marketplace', path: '/marketplace' },
        { label: 'Constructor', path: '/constructor' },
        { label: 'ARTgents', path: '/agentes' },
      ],
      chips: ['Explorar marketplace', 'Crear un skill', 'Que son los ARTgents?'],
    };
  }

  if (!userContext.hasStarted) {
    return {
      text: `Aun no has empezado el curso! Tu primera leccion es "${nextLesson.titulo}" en la zona ${nextLesson.zona}. Vale ${nextLesson.xp} XP. Vamos a encender la forja!`,
      links: [{ label: `Empezar: ${nextLesson.titulo}`, path: `/curso/${nextLesson.id}` }],
      chips: ['Que es un skill?', 'Mi progreso', 'Guia de uso'],
    };
  }

  const remaining = totalLessons - completedCount;

  return {
    text: `Tu siguiente leccion es "${nextLesson.titulo}" en la zona ${nextLesson.zona}. Vale ${nextLesson.xp} XP. Te faltan ${remaining} lecciones para completar el curso. A darle con el martillo!`,
    links: [{ label: `Ir a: ${nextLesson.titulo}`, path: `/curso/${nextLesson.id}` }],
    chips: ['Mi progreso', 'Que es ' + nextLesson.titulo.split(' ').pop() + '?', 'Cuantas lecciones faltan?'],
  };
}

// =============================================================================
// Handler: LESSON_INFO
// =============================================================================

function handleLessonInfo(message, userContext) {
  // Extract the topic from the message
  const normalized = normalizeText(message);
  const prefixes = ['explicame', 'leccion sobre', 'leccion de', 'dime sobre', 'cuentame sobre', 'informacion sobre', 'tema de', 'detalle de', 'mas sobre', 'profundiza', 'quiero saber de', 'enseñame', 'ensename'];

  let topic = normalized;
  for (const prefix of prefixes) {
    const normalizedPrefix = normalizeText(prefix);
    if (normalized.includes(normalizedPrefix)) {
      topic = normalized.split(normalizedPrefix).pop().trim();
      break;
    }
  }

  const lesson = findLessonByTopic(topic);

  if (!lesson) {
    // Try concept definitions as fallback
    const concept = findConcept(topic);
    if (concept) {
      return {
        text: concept,
        links: [{ label: 'Ver curso completo', path: '/curso' }],
        chips: ['Siguiente leccion', 'Buscar skills de ' + topic, 'Mi progreso'],
      };
    }

    return {
      text: `No encontre una leccion especifica sobre "${topic}". Puedes explorar el curso completo o buscar en el marketplace. Tambien puedo explicarte conceptos como skill, trigger, frontmatter, plugin, fusion y mas.`,
      links: [
        { label: 'Ver curso', path: '/curso' },
        { label: 'Marketplace', path: '/marketplace' },
      ],
      chips: ['Que es un skill?', 'Ver curso', 'Buscar skills'],
    };
  }

  const isCompleted = userContext.completedNodes.includes(lesson.id);
  const statusTag = isCompleted ? ' (Ya completada!)' : '';
  let text = `"${lesson.titulo}"${statusTag} - Zona: ${lesson.zona} | ${lesson.xp} XP\n\n`;

  // Use the metafora as a short description since explicacion can be very long
  if (lesson.metafora) {
    text += `${lesson.metafora}\n\n`;
  }

  if (lesson.glosario && lesson.glosario.length > 0) {
    text += 'Conceptos clave: ' + lesson.glosario.map(g => g.termino).join(', ');
  }

  const links = [{ label: `Ir a la leccion`, path: `/curso/${lesson.id}` }];
  const chips = isCompleted
    ? ['Siguiente leccion', 'Mi progreso', 'Buscar skills']
    : ['Ir a esta leccion', 'Mi progreso', 'Que sigue despues?'];

  return { text, links, chips };
}

// =============================================================================
// Handler: NAVIGATE
// =============================================================================

function handleNavigate(message) {
  const normalized = normalizeText(message);

  // Map keywords to section keys
  const sectionKeywords = {
    home: ['inicio', 'home', 'principal', 'portada'],
    guia: ['guia', 'guia de uso', 'manual', 'instrucciones', 'como usar'],
    curso: ['curso', 'lecciones', 'aprender', 'leccion', 'estudiar'],
    constructor: ['constructor', 'crear skill', 'super constructor', 'superconstructor', 'crear', 'construir', 'generar skill'],
    catalogo: ['catalogo', 'categorias', 'organizar', 'clasificar'],
    marketplace: ['marketplace', 'tienda', 'repositorios', 'repos', 'instalar', 'descargar skills'],
    plugins: ['plugins', 'plugin', 'paquete', 'distribuir', 'empaquetar'],
    agentes: ['agentes', 'artgents', 'agente', 'superagentes', 'superagente', 'arena'],
    ejemploMarca: ['ejemplo marca', 'branding', 'marca personal', 'marca'],
    automatizaciones: ['automatizaciones', 'automatizar', 'autopilot', 'cron', 'programaciones', 'tareas programadas', 'monitorizar', 'monitorizacion', 'health check', 'deploys automaticos', 'ci cd'],
    cursoPaperclip: ['curso paperclip', 'paperclip', 'curso de paperclip', 'empresa de agentes', 'empresa sin humanos', 'heartbeats', 'org chart', 'clipmart', 'orquestacion agentes'],
    cursoClaude: ['curso claude', 'curso de claude', 'aprender claude', 'ecosistema claude', 'modelos claude', 'co-work', 'cowork', 'opus', 'sonnet', 'haiku', 'dispatch', 'channels', 'computer use'],
    cursosOficiales: ['cursos oficiales', 'anthropic academy', 'curso oficial', 'cursos anthropic', 'cursos gratis claude', 'cursos gratuitos', 'certificacion claude', 'certificado claude', 'skilljar'],
    configuracion: ['configuracion', 'config', 'settings', 'ajustes', 'hooks', 'repos recomendados', '.claude'],
  };

  let matchedSection = null;
  let bestMatchLength = 0;

  for (const [key, keywords] of Object.entries(sectionKeywords)) {
    for (const kw of keywords) {
      const normalizedKw = normalizeText(kw);
      if (normalized.includes(normalizedKw) && normalizedKw.length > bestMatchLength) {
        matchedSection = key;
        bestMatchLength = normalizedKw.length;
      }
    }
  }

  if (matchedSection) {
    const section = appSections[matchedSection];
    return {
      text: `${section.name}: ${section.description}. Te llevo ahi!`,
      links: [{ label: `Ir a ${section.name}`, path: section.path }],
      chips: getChipsForPath(section.path),
    };
  }

  // No specific section found - show all sections
  const sectionList = Object.values(appSections)
    .map(s => `- ${s.name}: ${s.description}`)
    .join('\n');

  return {
    text: `Estas son las secciones disponibles:\n\n${sectionList}\n\nA donde quieres ir?`,
    links: Object.values(appSections).map(s => ({ label: s.name, path: s.path })),
    chips: ['Curso', 'Constructor', 'Marketplace'],
  };
}

// =============================================================================
// Handler: WHAT_IS
// =============================================================================

function handleWhatIs(message, userContext) {
  const normalized = normalizeText(message);

  // Extract the concept from the message
  const prefixes = ['que es un', 'que es una', 'que es el', 'que es la', 'que es', 'que son los', 'que son las', 'que son', 'definicion de', 'que significa'];

  let conceptQuery = normalized;
  for (const prefix of prefixes) {
    const normalizedPrefix = normalizeText(prefix);
    if (normalized.includes(normalizedPrefix)) {
      conceptQuery = normalized.split(normalizedPrefix).pop().trim();
      break;
    }
  }

  const definition = findConcept(conceptQuery);

  if (definition) {
    // Try to find a related lesson
    const relatedLesson = findLessonByTopic(conceptQuery);
    const links = relatedLesson
      ? [{ label: `Leccion: ${relatedLesson.titulo}`, path: `/curso/${relatedLesson.id}` }]
      : [{ label: 'Ver curso completo', path: '/curso' }];

    return {
      text: definition,
      links,
      chips: ['Como creo uno?', 'Siguiente leccion', 'Buscar skills'],
    };
  }

  // Concept not found in definitions, try courseNodes
  const lesson = findLessonByTopic(conceptQuery);
  if (lesson && lesson.glosario) {
    const glossaryMatch = lesson.glosario.find(g =>
      normalizeText(g.termino).includes(conceptQuery) || conceptQuery.includes(normalizeText(g.termino))
    );
    if (glossaryMatch) {
      return {
        text: `${glossaryMatch.termino}: ${glossaryMatch.definicion}`,
        links: [{ label: `Leccion: ${lesson.titulo}`, path: `/curso/${lesson.id}` }],
        chips: ['Mas sobre esto', 'Siguiente leccion', 'Mi progreso'],
      };
    }
  }

  return {
    text: `No tengo una definicion para "${conceptQuery}" en mi base de conocimiento. Pero puedo explicarte sobre: skill, trigger, frontmatter, plugin, micro-skill, agente, ARTgent, fusion, sinapsis, progressive-disclosure, marketplace, constructor, rubrica y catalogo.`,
    links: [{ label: 'Ver glosario en el curso', path: '/curso' }],
    chips: ['Que es un skill?', 'Que es un trigger?', 'Que es un plugin?'],
  };
}

// =============================================================================
// Handler: HOW_TO
// =============================================================================

function handleHowTo(message, userContext) {
  const normalized = normalizeText(message);

  // Map common how-to queries to responses
  const howToResponses = {
    'hacer una skill': {
      text: 'Para crear un skill tienes 5 opciones en el Constructor:\n\n1. SuperConstructor: Describe lo que quieres en lenguaje natural y la IA genera el skill completo\n2. Crear Skill: Formulario guiado paso a paso\n3. Micro-Skill: Version ultra-ligera de menos de 100 lineas\n4. Mejorar: Toma un skill existente y lo optimiza\n5. Fusionar: Combina 2+ skills en uno superior\n\nTe recomiendo empezar con el SuperConstructor!',
      links: [{ label: 'Ir al Constructor', path: '/constructor' }],
      chips: ['SuperConstructor', 'Que es un micro-skill?', 'Como mejoro un skill?'],
    },
    'hacer un skill': {
      text: 'Para crear un skill tienes 5 opciones en el Constructor:\n\n1. SuperConstructor: Describe lo que quieres en lenguaje natural y la IA genera el skill completo\n2. Crear Skill: Formulario guiado paso a paso\n3. Micro-Skill: Version ultra-ligera de menos de 100 lineas\n4. Mejorar: Toma un skill existente y lo optimiza\n5. Fusionar: Combina 2+ skills en uno superior\n\nTe recomiendo empezar con el SuperConstructor!',
      links: [{ label: 'Ir al Constructor', path: '/constructor' }],
      chips: ['SuperConstructor', 'Que es un micro-skill?', 'Como mejoro un skill?'],
    },
    'creo un skill': {
      text: 'Para crear un skill tienes 5 opciones en el Constructor:\n\n1. SuperConstructor: Describe lo que quieres en lenguaje natural y la IA genera el skill completo\n2. Crear Skill: Formulario guiado paso a paso\n3. Micro-Skill: Version ultra-ligera de menos de 100 lineas\n4. Mejorar: Toma un skill existente y lo optimiza\n5. Fusionar: Combina 2+ skills en uno superior\n\nTe recomiendo empezar con el SuperConstructor!',
      links: [{ label: 'Ir al Constructor', path: '/constructor' }],
      chips: ['SuperConstructor', 'Que es un micro-skill?', 'Como mejoro un skill?'],
    },
    'instalo': {
      text: 'Para instalar skills desde el Marketplace:\n\n1. Ve al Marketplace y busca el skill que necesitas\n2. Haz click en "Instalar" para copiarlo a tu directorio ~/.claude/skills/\n3. Tambien puedes instalar manualmente: cp -r nombre-skill ~/.claude/skills/\n4. Verifica con: ls ~/.claude/skills/\n\nHay 1800+ skills disponibles de 5 superrepositorios!',
      links: [{ label: 'Ir al Marketplace', path: '/marketplace' }],
      chips: ['Buscar skills de React', 'Que repos hay?', 'Como creo un skill?'],
    },
    'mejoro': {
      text: 'Para mejorar un skill existente:\n\n1. Ve al Constructor > Modo Mejorar\n2. Pega el contenido de tu SKILL.md actual\n3. El sistema analiza calidad con la rubrica (frontmatter, contenido, estructura, reutilizacion)\n4. Recibiras sugerencias especificas y un skill mejorado\n\nLa rubrica evalua de 0 a 100 puntos!',
      links: [{ label: 'Ir al Constructor', path: '/constructor' }],
      chips: ['Que es la rubrica?', 'Como creo un skill?', 'Mi progreso'],
    },
    'fusiono': {
      text: 'Para fusionar skills:\n\n1. Ve al Constructor > Modo Fusionar\n2. Selecciona 2 o mas skills para combinar\n3. Elige estrategia:\n   - Merge: cuando hay alto solapamiento entre skills\n   - Compose: crea un orquestador que coordina sub-skills\n   - Layer: un skill base + extensiones\n4. El sistema genera el skill fusionado automaticamente',
      links: [{ label: 'Ir al Constructor', path: '/constructor' }],
      chips: ['Que es fusion?', 'Como creo un skill?', 'Buscar skills'],
    },
    'catalogo': {
      text: 'Para catalogar tus skills:\n\n1. Ve al Catalogo donde hay 12 categorias disponibles\n2. Cada skill se asigna a una categoria segun su funcion\n3. Las categorias son: Desarrollo Web, IA, Automatizacion, Documentacion, Testing, Seguridad, Datos, Productividad, Educacion, Blockchain, CMS y Meta-Skill\n4. Puedes buscar y filtrar por categoria',
      links: [{ label: 'Ir al Catalogo', path: '/catalogo' }],
      chips: ['Que categorias hay?', 'Buscar skill', 'Mi progreso'],
    },
    'configuro': {
      text: 'Para configurar tu entorno:\n\n1. Ve a Configuracion para gestionar tu setup de Claude Code\n2. Configura el directorio .claude/ con settings.json y hooks\n3. Define repos recomendados para tus skills\n4. Activa hooks personalizados para automatizar tareas\n5. La leccion de configuracion en el curso te guia paso a paso',
      links: [{ label: 'Ir a Configuracion', path: '/configuracion' }],
      chips: ['Que son los hooks?', 'Repos recomendados', 'Mi progreso'],
    },
    'automatizo': {
      text: 'Para montar tu sistema de automatizaciones:\n\n1. Tareas Programadas: Cron jobs para backups, limpieza, reportes\n2. Monitorización: Health checks cada 5 min con alertas\n3. CI/CD: Deploy automático con GitHub Actions\n4. Backups: Diarios de BD y archivos, subidos a la nube\n5. Alertas: Slack/Telegram cuando algo falla\n6. Seguridad: Auditorías automáticas de dependencias\n\nTodo está explicado paso a paso en la sección de Automatizaciones!',
      links: [{ label: 'Ir a Automatizaciones', path: '/automatizaciones' }],
      chips: ['Que es un cron?', 'Como monitorizo mi web?', 'Backups automaticos'],
    },
    'monitorizo': {
      text: 'Para monitorizar tus webs en producción:\n\n1. Crea un endpoint /health que verifique DB, caché y disco\n2. Usa UptimeRobot (gratis, 50 monitores) o Better Stack\n3. Configura alertas a Slack/Telegram si la web cae\n4. Añade Sentry para tracking de errores\n5. Lighthouse CI para auditar rendimiento automáticamente\n\nEn la sección de Automatizaciones tienes todo el código!',
      links: [{ label: 'Ir a Automatizaciones', path: '/automatizaciones' }],
      chips: ['Como configuro alertas?', 'Que es un health check?', 'Backups'],
    },
    'empiezo': {
      text: 'Para empezar con La Forja de Skills te recomiendo:\n\n1. Haz el Curso: 16 lecciones gamificadas que te ensenan todo\n2. La primera leccion explica que es un skill\n3. Ganaras XP, subiras de nivel y obtendras badges\n4. Cuando domines la teoria, pasa al Constructor para crear los tuyos\n\nCada leccion tiene teoria, ejemplo practico y un mini-reto!',
      links: [{ label: 'Empezar el curso', path: '/curso' }],
      chips: ['Que es un skill?', 'Mi progreso', 'Guia de uso'],
    },
    'creo un agente': {
      text: 'Para crear un agente (agent):\n\n1. Un agente vive dentro de un skill, en la carpeta agents/\n2. Es un subproceso especializado que el skill puede invocar\n3. En la seccion de ARTgents puedes aprender a crear SuperAgentes\n4. Un SuperAgente tiene multiples SuperHabilidades asignadas\n5. La filosofia ARTgent: creART una nueva CREAlidART',
      links: [{ label: 'Ir a ARTgents', path: '/agentes' }],
      chips: ['Que es un ARTgent?', 'Que es un superagente?', 'Mi progreso'],
    },
    'creo un plugin': {
      text: 'Para crear un plugin distribuible:\n\n1. Ve a la seccion de Plugins\n2. Un plugin empaqueta multiples skills en un solo paquete\n3. Se organiza en .claude-plugin/ con su propio package.json\n4. Se puede distribuir via GitHub para que otros lo instalen\n5. El ejemplo de Marca Personal te muestra como crear uno desde cero',
      links: [
        { label: 'Ir a Plugins', path: '/plugins' },
        { label: 'Ejemplo Marca', path: '/ejemplo-marca' },
      ],
      chips: ['Que es un plugin?', 'Ejemplo marca', 'Marketplace'],
    },
  };

  // Find best matching how-to
  let bestMatch = null;
  let bestMatchLength = 0;

  for (const [key, response] of Object.entries(howToResponses)) {
    const normalizedKey = normalizeText(key);
    if (normalized.includes(normalizedKey) && normalizedKey.length > bestMatchLength) {
      bestMatch = response;
      bestMatchLength = normalizedKey.length;
    }
  }

  if (bestMatch) {
    return bestMatch;
  }

  // Smart fallback: if message mentions "skill" with any action word, show skill creation
  const actionWords = ['hacer', 'crear', 'generar', 'construir', 'armar', 'disenar', 'montar', 'fabricar', 'forjar', 'programar', 'desarrollar', 'escribir'];
  const hasSkill = normalized.includes('skill');
  const hasAction = actionWords.some(w => normalized.includes(w));

  if (hasSkill && hasAction) {
    return howToResponses['creo un skill'];
  }

  // If mentions plugin/agente with action
  const hasPlugin = normalized.includes('plugin');
  const hasAgente = normalized.includes('agente') || normalized.includes('artgent');

  if (hasPlugin && hasAction) {
    return howToResponses['creo un plugin'];
  }
  if (hasAgente && hasAction) {
    return howToResponses['creo un agente'];
  }

  // Generic how-to response
  return {
    text: 'Puedo ayudarte con instrucciones para:\n\n- Crear un skill (5 modos en el Constructor)\n- Instalar skills del Marketplace\n- Mejorar skills existentes\n- Fusionar skills\n- Catalogar skills\n- Configurar tu entorno\n- Crear plugins\n- Crear agentes\n\nQue quieres aprender a hacer?',
    links: [
      { label: 'Constructor', path: '/constructor' },
      { label: 'Curso', path: '/curso' },
    ],
    chips: ['Como creo un skill?', 'Como instalo skills?', 'Como empiezo?'],
  };
}

// =============================================================================
// Handler: SEARCH_SKILL
// =============================================================================

function handleSearchSkill(message) {
  const normalized = normalizeText(message);

  // Extract the search query
  const prefixes = ['buscar skill', 'buscar skills', 'hay skills de', 'skills para', 'skill de', 'skills de', 'skill para', 'encuentra', 'busca', 'buscar en marketplace', 'hay algo de', 'hay algo para', 'recomienda skill', 'recomienda skills'];

  let query = normalized;
  for (const prefix of prefixes) {
    const normalizedPrefix = normalizeText(prefix);
    if (normalized.includes(normalizedPrefix)) {
      query = normalized.split(normalizedPrefix).pop().trim();
      break;
    }
  }

  if (!query || query.length < 2) {
    return {
      text: 'Que tipo de skill estas buscando? Puedes buscar por tecnologia (React, Python, Docker), por funcion (testing, documentacion, API) o por categoria.',
      links: [{ label: 'Ver Marketplace', path: '/marketplace' }],
      chips: ['Skills de React', 'Skills de testing', 'Skills de API'],
    };
  }

  const results = searchSkills(query, 5);

  if (results.length === 0) {
    return {
      text: `No encontre skills que coincidan con "${query}". Prueba con otras palabras clave o explora el Marketplace completo. Tambien puedes crear tu propio skill en el Constructor!`,
      links: [
        { label: 'Marketplace', path: '/marketplace' },
        { label: 'Constructor', path: '/constructor' },
      ],
      chips: ['Buscar otra cosa', 'Ver marketplace', 'Crear un skill'],
    };
  }

  let text = `Encontre ${results.length} skill${results.length > 1 ? 's' : ''} para "${query}":\n\n`;
  results.forEach((skill, i) => {
    text += `${i + 1}. ${skill.name} - ${skill.description} [${skill.category}]\n`;
  });
  text += '\nPuedes ver mas detalles en el Marketplace!';

  return {
    text,
    links: [{ label: 'Ver en Marketplace', path: '/marketplace' }],
    chips: ['Instalar skill', 'Buscar otra cosa', 'Como creo un skill?'],
  };
}

// =============================================================================
// Handler: HELP
// =============================================================================

function handleHelp() {
  return {
    text: `Soy Forjito, tu asistente de La Forja de Skills! Puedo ayudarte con:\n\n- Tu progreso: XP, nivel, badges, lecciones completadas\n- Siguiente leccion: que hacer ahora en el curso\n- Navegacion: ir a cualquier seccion de la app\n- Conceptos: explicar que es un skill, trigger, plugin, etc.\n- Instrucciones: como crear, instalar, mejorar o fusionar skills\n- Buscar skills: encontrar skills en la base de datos\n- Diversión: chistes de forja y tu ficha RPG\n\nPreguntame lo que quieras!`,
    links: [
      { label: 'Curso', path: '/curso' },
      { label: 'Constructor', path: '/constructor' },
      { label: 'Guia de Uso', path: '/guia' },
    ],
    chips: ['Mi progreso', 'Siguiente leccion', 'Que es un skill?'],
  };
}

// =============================================================================
// Handler: EASTER_EGG
// =============================================================================

function handleEasterEgg(message, userContext) {
  const normalized = normalizeText(message);

  // RPG Stats
  if (normalized.includes('stats') || normalized.includes('rpg') || normalized.includes('ficha') || normalized.includes('personaje') || normalized.includes('character')) {
    const { levelName, levelEmoji, currentXp, completedCount, totalLessons, earnedBadges } = userContext;

    const str = Math.min(20, Math.round(currentXp / 50) + 3);
    const int = Math.min(20, completedCount + 2);
    const wis = Math.min(20, earnedBadges.length * 3 + 5);
    const cha = Math.min(20, Math.round(completedCount / 2) + 4);
    const dex = Math.min(20, userContext.levelId * 3 + 2);
    const con = Math.min(20, 10 + Math.round(currentXp / 100));

    let text = `${levelEmoji} FICHA DE PERSONAJE RPG ${levelEmoji}\n\n`;
    text += `Nombre: Forjador/a Anonimo/a\n`;
    text += `Clase: ${levelName}\n`;
    text += `Nivel: ${userContext.levelId}\n`;
    text += `XP: ${currentXp}\n\n`;
    text += `--- ATRIBUTOS ---\n`;
    text += `FUE (Fuerza de Codigo): ${str}\n`;
    text += `INT (Inteligencia Skill): ${int}\n`;
    text += `SAB (Sabiduria de Forja): ${wis}\n`;
    text += `CAR (Carisma de Plugin): ${cha}\n`;
    text += `DES (Destreza de Merge): ${dex}\n`;
    text += `CON (Constitucion Debug): ${con}\n\n`;
    text += `Misiones completadas: ${completedCount}/${totalLessons}\n`;
    text += `Logros: ${earnedBadges.length} badges`;

    return {
      text,
      links: [],
      chips: ['Mi progreso', 'Siguiente leccion', 'Cuentame un chiste'],
    };
  }

  // Jokes
  const jokes = forjitoPersonality.jokes;
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  return {
    text: randomJoke,
    links: [],
    chips: ['Otro chiste!', 'Mi ficha RPG', 'Mi progreso'],
  };
}

// =============================================================================
// Handler: CELEBRATE (internal, system-triggered)
// =============================================================================

function handleCelebrate(message, userContext) {
  const normalized = normalizeText(message);

  if (normalized.includes('level_up')) {
    return {
      text: `SUBISTE DE NIVEL! Ahora eres ${userContext.levelEmoji} ${userContext.levelName}! El metal se calienta, el martillo golpea mas fuerte. Sigue forjando!`,
      links: [],
      chips: ['Mi progreso', 'Siguiente leccion', 'Mi ficha RPG'],
    };
  }

  if (normalized.includes('badge_earned')) {
    return {
      text: `NUEVO BADGE DESBLOQUEADO! Tu coleccion de insignias crece. Cada badge es una marca en tu armadura de forjador. Sigue adelante!`,
      links: [{ label: 'Ver mis badges', path: '/curso' }],
      chips: ['Mi progreso', 'Siguiente leccion', 'Mis badges'],
    };
  }

  if (normalized.includes('course_complete')) {
    return {
      text: `HAS COMPLETADO EL CURSO COMPLETO! Eres oficialmente un Gran Maestro de la Forja! Has dominado los 16 niveles, forjado tu conocimiento y templado tu habilidad. Ahora el mundo de los skills es tuyo. Que vas a crear?`,
      links: [
        { label: 'Constructor', path: '/constructor' },
        { label: 'Marketplace', path: '/marketplace' },
        { label: 'ARTgents', path: '/agentes' },
      ],
      chips: ['Crear un skill', 'Explorar marketplace', 'Mi ficha RPG'],
    };
  }

  return {
    text: `Bien hecho! Cada paso en la forja te hace mas fuerte. Sigue asi!`,
    links: [],
    chips: ['Mi progreso', 'Siguiente leccion'],
  };
}

// =============================================================================
// Handler: UNKNOWN
// =============================================================================

function handleUnknown(currentPath) {
  return {
    text: forjitoPersonality.notUnderstood,
    links: [
      { label: 'Curso', path: '/curso' },
      { label: 'Guia de Uso', path: '/guia' },
    ],
    chips: getChipsForPath(currentPath),
    isUnknown: true,
  };
}

// =============================================================================
// Utility functions
// =============================================================================

function findConcept(query) {
  const normalized = normalizeText(query);

  // Direct match
  for (const [key, definition] of Object.entries(conceptDefinitions)) {
    if (normalizeText(key) === normalized || normalized === normalizeText(key)) {
      return definition;
    }
  }

  // Partial match
  for (const [key, definition] of Object.entries(conceptDefinitions)) {
    if (normalized.includes(normalizeText(key)) || normalizeText(key).includes(normalized)) {
      return definition;
    }
  }

  return null;
}

function getChipsForPath(path) {
  if (!path) return quickChips.default;
  // Try exact match first, then prefix match
  if (quickChips[path]) return quickChips[path];
  for (const [key, chips] of Object.entries(quickChips)) {
    if (key !== 'default' && path.startsWith(key)) return chips;
  }
  return quickChips.default;
}
