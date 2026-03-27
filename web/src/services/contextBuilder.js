import { courseNodes, gamification, zonas, categories } from '../data/courseData';
import { appSections, forjitoPersonality, conceptDefinitions } from '../data/assistantKnowledge';

export function buildUserContext(progress, level) {
  const completedSet = new Set(progress.completedNodes);
  const nextNode = courseNodes.find(n => !completedSet.has(n.id));

  return {
    completedCount: progress.completedNodes.length,
    totalLessons: courseNodes.length,
    currentXp: progress.currentXp,
    totalXp: gamification.totalXp,
    levelName: level.nombre,
    levelEmoji: level.emoji,
    levelId: level.id,
    earnedBadges: progress.earnedBadges,
    completedNodes: progress.completedNodes,
    nextLesson: nextNode ? { id: nextNode.id, titulo: nextNode.titulo, zona: nextNode.zona, xp: nextNode.xp } : null,
    currentZone: nextNode ? nextNode.zona : 'Completado',
    completionPercent: Math.round((progress.completedNodes.length / courseNodes.length) * 100),
    route: progress.route,
    hasStarted: !!progress.startedAt,
  };
}

export function findLessonByTopic(topic) {
  const lower = topic.toLowerCase();
  return courseNodes.find(n =>
    n.titulo.toLowerCase().includes(lower) ||
    n.id.includes(lower) ||
    (n.glosario && n.glosario.some(g => g.termino.toLowerCase().includes(lower)))
  );
}

export function getLessonsUntil(completedNodes, targetId) {
  const completedSet = new Set(completedNodes);
  const targetNode = courseNodes.find(n => n.id === targetId);
  if (!targetNode) return -1;
  let count = 0;
  for (const node of courseNodes) {
    if (node.id === targetId) break;
    if (!completedSet.has(node.id)) count++;
  }
  return count;
}

export function buildSystemPrompt(userContext) {
  const lessonList = courseNodes.map((n, i) => {
    const done = userContext.completedNodes.includes(n.id);
    return `  ${i + 1}. [${done ? 'X' : ' '}] ${n.titulo} (${n.zona}, ${n.xp} XP)`;
  }).join('\n');

  const zoneList = zonas.map(z => `  - ${z.emoji} ${z.id}`).join('\n');

  const sectionList = Object.entries(appSections).map(([key, s]) => {
    return `  - ${s.name} (${s.path}): ${s.description}`;
  }).join('\n');

  const conceptList = Object.entries(conceptDefinitions).map(([key, def]) => {
    return `  - ${key}: ${def}`;
  }).join('\n');

  const categoryList = categories.map(c => `  - ${c.emoji} ${c.nombre}`).join('\n');

  const badgeList = gamification.badges.map(b => {
    const earned = userContext.earnedBadges.includes(b.id);
    return `  - ${b.emoji} ${b.nombre}: ${b.condicion} ${earned ? '[OBTENIDO]' : ''}`;
  }).join('\n');

  const levelList = gamification.niveles.map(l => {
    const current = l.id === userContext.levelId;
    return `  - ${l.emoji} ${l.nombre} (${l.xpMin}-${l.xpMax} XP)${current ? ' <-- NIVEL ACTUAL' : ''}`;
  }).join('\n');

  return `Eres Forjito, el asistente de "La Forja de Skills" (SuperSkill). Eres amigable, entusiasta y experto en Claude Code skills.

## Tu personalidad
- Hablas en espanol informal pero claro
- Usas metaforas de forja y herreria
- Eres animoso y motivador
- Das respuestas concisas pero utiles (max 3-4 oraciones normalmente)
- Cuando el usuario logra algo, lo celebras

## Estado del usuario
- Nivel: ${userContext.levelEmoji} ${userContext.levelName} (Nivel ${userContext.levelId})
- XP: ${userContext.currentXp} / ${userContext.totalXp}
- Lecciones completadas: ${userContext.completedCount} / ${userContext.totalLessons} (${userContext.completionPercent}%)
- Zona actual: ${userContext.currentZone}
- Ruta: ${userContext.route}
- Ha empezado: ${userContext.hasStarted ? 'Si' : 'No'}
- Siguiente leccion: ${userContext.nextLesson ? userContext.nextLesson.titulo + ' (' + userContext.nextLesson.zona + ')' : 'Curso completado!'}
- Badges obtenidos: ${userContext.earnedBadges.length > 0 ? userContext.earnedBadges.join(', ') : 'Ninguno aun'}

## Niveles del sistema
${levelList}

## Badges disponibles
${badgeList}

## Lecciones del curso
${lessonList}

## Zonas
${zoneList}

## Secciones de la app
${sectionList}

## Categorias de skills
${categoryList}

## Conceptos clave
${conceptList}

## Reglas de respuesta
1. Responde SIEMPRE en espanol
2. Se conciso: max 3-4 oraciones para preguntas simples
3. Si el usuario pregunta algo de navegacion, sugiere la seccion correcta con su ruta
4. Si pregunta por su progreso, dale datos concretos (XP, nivel, lecciones, %)
5. Si pregunta que hacer despues, sugiere la siguiente leccion pendiente
6. Si no sabes algo, admitelo con humor y sugiere alternativas
7. Nunca inventes datos sobre el progreso del usuario - usa los datos proporcionados
8. Cuando el usuario completa algo, celebralo con entusiasmo
9. Si preguntan por conceptos tecnicos, usa las definiciones de conceptos clave
10. Sugiere siempre 1-2 acciones de seguimiento al final de tu respuesta`;
}
