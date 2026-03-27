// Course nodes with all content for La Forja de Skills
export const courseNodes = [
  {
    id: 'que-es-un-skill',
    orden: 1,
    titulo: 'Que es un Skill',
    tipo: 'teoria',
    zona: 'Plaza del Aprendiz',
    xp: 25,
    icon: 'BookOpen',
    color: 'forge',
    explicacion: 'Un skill de Claude Code es un conjunto de instrucciones empaquetadas en un archivo SKILL.md que le dicen a Claude como realizar una tarea especifica. A diferencia de un command (que es un atajo invocable por el usuario) o un agent (que es un subproceso autonomo), un skill es el contenedor principal que puede orquestar commands y agents. Piensa en el skill como la receta completa de un plato: incluye ingredientes (references), tecnicas (agents), y pasos para el comensal (commands).\n\nLos skills son multi-plataforma y funcionan en distintos entornos de desarrollo:\n- Claude Code: ~/.claude/skills/\n- Cursor: .cursor/skills/\n- VS Code / Copilot: .github/skills/\n- Goose: ~/.config/goose/skills/\n- Gemini CLI: directorio especifico de la plataforma\n\nCada plataforma busca los skills en su directorio correspondiente, pero el formato SKILL.md es compatible entre todas. Esto significa que puedes crear un skill una vez y reutilizarlo en multiples herramientas de IA.\n\nPara instalar un skill tienes dos metodos principales:\n- Metodo GUI (Claude Desktop): Settings > Capabilities > Skills > Upload\n- Metodo CLI: cp -r nombre-del-skill ~/.claude/skills/\n- Verificacion: ls ~/.claude/skills/ para confirmar que se instalo correctamente',
    metafora: 'Un skill es como una receta de cocina profesional. El SKILL.md es la ficha de la receta que cuelgas en la pared de la cocina. Los commands son los pasos que sigue el cocinero. Los agents son los ayudantes especializados (uno para salsas, otro para masas). Y las references son el libro de tecnicas que consultas cuando necesitas recordar algo.',
    ejemplo: `# Estructura minima de un skill
~/.claude/skills/mi-skill/
├── SKILL.md          # Archivo principal (obligatorio)
├── commands/         # Comandos invocables (opcional)
├── agents/           # Subagentes (opcional)
├── references/       # Documentacion (opcional)
└── templates/        # Plantillas (opcional)

# Directorio de skills por plataforma
# ┌──────────────────┬──────────────────────────────┐
# │ Plataforma       │ Directorio                   │
# ├──────────────────┼──────────────────────────────┤
# │ Claude Code      │ ~/.claude/skills/            │
# │ Cursor           │ .cursor/skills/              │
# │ VS Code/Copilot  │ .github/skills/              │
# │ Goose            │ ~/.config/goose/skills/      │
# │ Gemini CLI       │ plataforma-especifica        │
# └──────────────────┴──────────────────────────────┘

# Instalacion rapida via CLI
cp -r mi-skill ~/.claude/skills/
ls ~/.claude/skills/  # verificar instalacion`,
    miniReto: {
      titulo: 'Identifica los componentes',
      descripcion: 'Dado un skill que genera APIs REST, identifica que seria: el SKILL.md, un command, un agent, y una reference.',
      criterios: ['Identificar SKILL.md como el archivo principal con instrucciones', 'Identificar /generate como command del usuario', 'Identificar api-validator como agent especializado', 'Identificar openapi-spec como reference']
    },
    glosario: [
      { termino: 'Skill', definicion: 'Conjunto de instrucciones en SKILL.md que define una capacidad de Claude Code. Compatible con multiples plataformas (Claude Code, Cursor, VS Code, Goose, Gemini CLI)' },
      { termino: 'Command', definicion: 'Atajo invocable por el usuario con /nombre, definido en commands/' },
      { termino: 'Agent', definicion: 'Subproceso autonomo para tareas complejas, definido en agents/' },
      { termino: 'SKILL.md', definicion: 'Archivo principal de un skill con frontmatter YAML y body Markdown' },
      { termino: 'Multi-plataforma', definicion: 'Los skills funcionan en Claude Code, Cursor, VS Code/Copilot, Goose y Gemini CLI, cada uno con su directorio propio' }
    ]
  },
  {
    id: 'anatomia-skill-md',
    orden: 2,
    titulo: 'Anatomia de SKILL.md',
    tipo: 'teoria',
    zona: 'Plaza del Aprendiz',
    xp: 30,
    icon: 'FileCode',
    color: 'forge',
    explicacion: 'SKILL.md tiene 2 partes: el frontmatter YAML (entre ---) con metadata como name, description, author y version; y el body Markdown con las instrucciones. El frontmatter es lo primero que lee Claude para decidir si activar el skill. El body contiene la logica: proposito, flujo, reglas, y referencias.\n\nRecuerda que la instalacion del skill puede hacerse de varias formas:\n- Via GUI en Claude Desktop: Settings > Capabilities > Skills > Upload (ideal para principiantes)\n- Via CLI: cp -r mi-skill ~/.claude/skills/ (ideal para desarrolladores)\n- Verificar instalacion: ls ~/.claude/skills/ para ver tus skills disponibles\n\nUna vez instalado, Claude detecta automaticamente el skill por su frontmatter y lo activa cuando es relevante.',
    metafora: 'El SKILL.md es como un pasaporte. El frontmatter es la pagina de datos (nombre, foto, nacionalidad) que el agente de aduanas lee rapido para decidir si te deja pasar. El body es el resto del pasaporte con visados, sellos y permisos detallados.',
    ejemplo: `---
name: mi-skill
description: |
  Genera componentes React tipados.
  USAR cuando: "crear componente", "generar React".
author: SalgadoIA
version: 1.0.0
---

# Mi Skill

## Proposito
Genera componentes React con TypeScript.

## Instrucciones
1. Preguntar nombre del componente
2. Generar archivo .tsx
3. Incluir props tipadas

# Instalacion del skill
# Metodo 1 (GUI): Settings > Capabilities > Skills > Upload
# Metodo 2 (CLI): cp -r mi-skill ~/.claude/skills/
# Verificar: ls ~/.claude/skills/`,
    miniReto: {
      titulo: 'Escribe un frontmatter',
      descripcion: 'Escribe el frontmatter completo para un skill que genera archivos Docker.',
      criterios: ['name en kebab-case', 'description con triggers', 'author y version presentes']
    },
    glosario: [
      { termino: 'Frontmatter', definicion: 'Bloque YAML entre --- al inicio del SKILL.md con metadata' },
      { termino: 'Body', definicion: 'Contenido Markdown despues del frontmatter con instrucciones' },
      { termino: 'Description', definicion: 'Campo del frontmatter que define cuando se activa el skill' },
      { termino: 'Instalacion GUI', definicion: 'Metodo de instalacion visual: Claude Desktop > Settings > Capabilities > Skills > Upload' },
      { termino: 'Instalacion CLI', definicion: 'Metodo de instalacion por terminal: cp -r skill ~/.claude/skills/' }
    ]
  },
  {
    id: 'frontmatter-y-triggers',
    orden: 3,
    titulo: 'Frontmatter y Triggers',
    tipo: 'practica',
    zona: 'Taller de Forja',
    xp: 40,
    icon: 'Zap',
    color: 'steel',
    explicacion: 'Los triggers son las frases en el campo description que hacen que Claude active tu skill. Un trigger preciso evita falsos positivos (activarse cuando no debe) y falsos negativos (no activarse cuando debe). La clave es incluir frases literales que el usuario diria, variantes en espanol e ingles, y exclusiones explicitas con "NO usar cuando".\n\nExisten dos tipos de invocacion de skills:\n- Automatica: Claude carga el skill cuando detecta que es relevante para la conversacion. El frontmatter (description y triggers) determina cuando se activa automaticamente.\n- Manual: El usuario escribe /nombre-del-skill explicitamente para invocar el skill. Esto siempre funciona independientemente de los triggers.\n\nPor eso los triggers son tan importantes: determinan la calidad de la invocacion automatica. Con buenos triggers, el usuario no necesita recordar el nombre del skill \u2014 simplemente describe lo que quiere y Claude activa el skill correcto.',
    metafora: 'Los triggers son como las palabras clave que activan a un asistente de voz. Si dices "Hey Siri, pon musica", Siri sabe que debe abrir la app de musica. Pero si tus triggers son vagos como "hazme algo", se activara en momentos incorrectos.',
    ejemplo: `# Triggers MALOS vs BUENOS

# MAL - vago, muchos falsos positivos
description: Genera codigo

# BIEN - especifico, con exclusiones
description: |
  Genera componentes React con TypeScript y Tailwind.
  USAR cuando: "crear componente React", "generar componente",
  "React con TypeScript", "componente Tailwind".
  NO usar para: Vue, Angular, Svelte, ni CSS puro.

# Tipos de invocacion:
# AUTOMATICA: Claude detecta relevancia por los triggers
#   Usuario: "Necesito un componente React para login"
#   Claude: (activa react-component-gen automaticamente)
#
# MANUAL: Usuario invoca explicitamente
#   Usuario: /react-component-gen
#   Claude: (activa el skill directamente)`,
    miniReto: {
      titulo: 'Optimiza estos triggers',
      descripcion: 'Mejora esta description: "description: genera documentacion". Hazla especifica con 5+ triggers y 2+ exclusiones.',
      criterios: ['5+ frases literales de trigger', '2+ exclusiones con NO usar', 'Variantes en espanol', 'Sin ambiguedades']
    },
    glosario: [
      { termino: 'Trigger', definicion: 'Frase en description que activa el skill cuando el usuario la dice' },
      { termino: 'Falso positivo', definicion: 'El skill se activa cuando NO deberia' },
      { termino: 'Falso negativo', definicion: 'El skill NO se activa cuando deberia' },
      { termino: 'Invocacion automatica', definicion: 'Claude carga el skill cuando detecta relevancia en la conversacion, basandose en el frontmatter' },
      { termino: 'Invocacion manual', definicion: 'El usuario escribe /nombre-del-skill explicitamente para activar el skill' }
    ]
  },
  {
    id: 'progressive-disclosure',
    orden: 4,
    titulo: 'Progressive Disclosure',
    tipo: 'teoria',
    zona: 'Plaza del Aprendiz',
    xp: 30,
    icon: 'Layers',
    color: 'forge',
    explicacion: 'Claude Code carga los skills en 3 niveles progresivos para optimizar el uso de contexto y tokens:\n\nNivel 1 \u2014 YAML Frontmatter: Siempre se carga en el system prompt. Claude lee name, description y triggers de TODOS los skills instalados para decidir cual activar. Es la capa mas ligera (~10-20 lineas). Por eso el frontmatter debe ser conciso y descriptivo.\n\nNivel 2 \u2014 Contenido del SKILL.md (body): Se carga solo cuando el skill es relevante para la conversacion actual. Contiene las instrucciones principales, flujo de trabajo, reglas y comandos disponibles. Debe mantenerse bajo ~500 lineas para no saturar el contexto.\n\nNivel 3 \u2014 Scripts y referencias (bundled resources): Se ejecutan o cargan SOLO cuando se necesitan explicitamente. Incluye archivos en references/ (documentacion extensa), agents/ (subagentes), templates/ (plantillas), y scripts/ (codigo determinista). Nunca se cargan preventivamente.\n\nEsta arquitectura de 3 niveles es la clave para que Claude pueda manejar cientos de skills instalados sin saturar su ventana de contexto. Si pusieras toda la documentacion en el SKILL.md, un solo skill consumiria demasiados tokens.',
    metafora: 'Es como entrar a un restaurante. Nivel 1: lees el cartel exterior (nombre y tipo de comida = frontmatter). Nivel 2: te sientas y lees el menu (las opciones principales = body). Nivel 3: solo cuando pides un plato especifico, el camarero te trae los ingredientes y la preparacion detallada (references y agents).',
    ejemplo: `# 3 niveles de carga progresiva

# Nivel 1: Frontmatter (SIEMPRE en system prompt)
# Se lee de TODOS los skills instalados
---
name: mi-skill
description: triggers aqui
---
# ~10-20 lineas, siempre cargado

# Nivel 2: Body (se lee SOLO si el skill se activa)
# Mi Skill
## Proposito (breve)
## Comandos (tabla)
## Flujo (resumen)
# ~100-500 lineas, cargado bajo demanda

# Nivel 3: Bundled (se ejecuta/lee SOLO cuando se necesita)
# references/api-docs.md  -> documentacion extensa
# agents/validator.md     -> logica de subagente
# templates/component.md  -> plantilla de generacion
# scripts/validate.py     -> codigo determinista
# Sin limite, cargado solo al ser referenciado`,
    miniReto: {
      titulo: 'Reorganiza este skill',
      descripcion: 'Un SKILL.md tiene 800 lineas con documentacion de API incluida. Reorganizalo usando progressive disclosure.',
      criterios: ['Body reducido a <500 lineas', 'Documentacion API movida a references/', 'Plantillas movidas a templates/']
    },
    glosario: [
      { termino: 'Progressive Disclosure', definicion: 'Patron de carga en 3 niveles: frontmatter (siempre) -> body (si relevante) -> bundled (bajo demanda)' },
      { termino: 'Nivel 1 - Frontmatter', definicion: 'YAML siempre cargado en el system prompt de Claude para todos los skills instalados' },
      { termino: 'Nivel 2 - Body', definicion: 'Contenido Markdown del SKILL.md, cargado solo cuando el skill se activa por relevancia' },
      { termino: 'Nivel 3 - Bundled', definicion: 'Scripts, references, agents y templates que se ejecutan o cargan unicamente cuando se necesitan' },
      { termino: 'Bundled resources', definicion: 'Archivos en references/, templates/, agents/ y scripts/ que se cargan bajo demanda en el Nivel 3' }
    ]
  },
  {
    id: 'agents-y-subagents',
    orden: 5,
    titulo: 'Agents y Subagents',
    tipo: 'practica',
    zona: 'Taller de Forja',
    xp: 40,
    icon: 'Bot',
    color: 'steel',
    explicacion: 'Un agent es un subproceso autonomo que ejecuta una tarea compleja dentro de un skill. Se define en agents/nombre.md y Claude lo lanza como un subagente con contexto aislado. Usa agents cuando la tarea requiere multiples pasos complejos, procesamiento extenso, o aislamiento de contexto.',
    metafora: 'Los agents son como empleados especializados en una empresa. El SKILL.md es el gerente que decide que trabajo hacer. Cuando llega una tarea compleja, el gerente no la hace el \u2014 la delega a un especialista (agent) que trabaja de forma autonoma y devuelve el resultado.',
    ejemplo: `# agents/api-validator.md

# Agente: API Validator

## Input esperado
- Archivos generados en routes/, controllers/
- Schema de la API

## Proceso
1. Leer cada archivo de ruta
2. Verificar que todos los endpoints tienen validacion
3. Verificar que los controllers manejan errores
4. Generar reporte de validacion

## Output
- Lista de issues encontrados
- Sugerencias de mejora
- Score de calidad (0-100)`,
    miniReto: {
      titulo: 'Disena un agent',
      descripcion: 'Disena un agent que analice un componente React y genere tests unitarios para el.',
      criterios: ['Input y output documentados', 'Proceso paso a paso', '3+ pasos de analisis']
    },
    glosario: [
      { termino: 'Agent', definicion: 'Subproceso autonomo definido en agents/nombre.md para tareas complejas' },
      { termino: 'Subagente', definicion: 'Instancia de Claude que ejecuta un agent con contexto propio' },
      { termino: 'Contexto aislado', definicion: 'El subagente no comparte contexto con la conversacion principal' }
    ]
  },
  {
    id: 'scripts-y-references',
    orden: 6,
    titulo: 'Scripts y References',
    tipo: 'practica',
    zona: 'Taller de Forja',
    xp: 35,
    icon: 'FolderOpen',
    color: 'steel',
    explicacion: 'scripts/ contiene codigo determinista (Python, Bash) para tareas que no necesitan IA: parsear JSON, agregar metricas, validar schemas. references/ contiene documentacion extensa que el skill consulta bajo demanda: APIs, patrones, taxonomias. templates/ contiene plantillas parametrizables para generar archivos.',
    metafora: 'En una cocina profesional, los scripts son las maquinas (robot de cocina, horno programable): hacen tareas repetitivas sin pensar. Las references son los libros de recetas en la estanteria: los consultas cuando necesitas tecnica. Y los templates son los moldes: les echas la masa y salen galletas con forma.',
    ejemplo: `# scripts/validate.py \u2014 Determinista, no IA
import json
def validate_skill(path):
    with open(f"{path}/SKILL.md") as f:
        content = f.read()
    checks = {
        'has_frontmatter': '---' in content,
        'has_name': 'name:' in content,
        'under_500_lines': len(content.split('\\n')) < 500
    }
    return checks

# references/api-docs.md \u2014 Documentacion extensa
# Solo se carga cuando el agent la necesita

# templates/component.md \u2014 Plantilla parametrizable
# {{COMPONENT_NAME}}, {{PROPS_INTERFACE}}, {{IMPORTS}}`,
    miniReto: {
      titulo: 'Clasifica estos archivos',
      descripcion: 'Tienes: un validador de JSON Schema, documentacion de la API de Stripe, y una plantilla de componente React. Donde va cada uno?',
      criterios: ['JSON Schema validator \u2192 scripts/', 'Stripe API docs \u2192 references/', 'React template \u2192 templates/']
    },
    glosario: [
      { termino: 'Scripts', definicion: 'Codigo determinista en scripts/ para tareas sin IA (parsear, validar, agregar)' },
      { termino: 'References', definicion: 'Documentacion extensa en references/ cargada bajo demanda' },
      { termino: 'Templates', definicion: 'Plantillas parametrizables en templates/ para generar archivos' }
    ]
  },
  {
    id: 'micro-skills',
    orden: 7,
    titulo: 'Micro-Skills',
    tipo: 'practica',
    zona: 'Taller de Forja',
    xp: 40,
    icon: 'Sparkles',
    color: 'gold',
    explicacion: 'Un micro-skill es una skill ultraligera: un solo SKILL.md de <100 lineas, sin subdirectorios, sin agents ni commands. Ideal para tareas atomicas que se repiten frecuentemente. La regla de oro: si necesitas mas de 100 lineas o un agente, no es micro.',
    metafora: 'Si un skill completo es una navaja suiza, un micro-skill es un destornillador. Hace una sola cosa, la hace rapido, y siempre sabes donde encontrarlo. No necesitas desplegar 12 herramientas para apretar un tornillo.',
    ejemplo: `---
name: gitignore-gen
description: |
  Genera .gitignore segun stack detectado.
  USAR cuando: "generar gitignore", "crear .gitignore".
author: SalgadoIA
version: 1.0.0
---

# Gitignore Generator

## Proposito
Detecta el stack del proyecto y genera .gitignore apropiado.

## Instrucciones
1. Buscar package.json, requirements.txt, Cargo.toml, etc.
2. Identificar el stack (Node, Python, Rust, etc.)
3. Generar .gitignore con reglas estandar del stack
4. Si hay multiples stacks, combinar reglas

## Reglas
- Siempre incluir .env y *.log
- No duplicar reglas
- Ordenar por secciones con comentarios`,
    miniReto: {
      titulo: 'Crea un micro-skill',
      descripcion: 'Crea un micro-skill que genere un archivo .editorconfig apropiado al proyecto.',
      criterios: ['Solo SKILL.md, <100 lineas', 'Triggers especificos', 'Instrucciones en 3-5 pasos', 'Una sola responsabilidad']
    },
    glosario: [
      { termino: 'Micro-skill', definicion: 'Skill ultraligera de <100 lineas con un solo archivo y proposito atomico' },
      { termino: 'Tarea atomica', definicion: 'Tarea que no se puede descomponer en subtareas independientes' }
    ]
  },
  {
    id: 'crear-skill-desde-cero',
    orden: 8,
    titulo: 'Crear Skill desde Cero',
    tipo: 'reto',
    zona: 'Laboratorio de Creacion',
    xp: 60,
    icon: 'Hammer',
    color: 'ember',
    explicacion: 'El pipeline completo tiene 7 pasos: captura de intent, clasificacion (micro vs completa), generacion del SKILL.md y archivos, validacion con rubrica (0-100 pts), testing opcional, catalogacion en catalog.json, y almacenamiento en el directorio correcto.\n\nLos skills pueden cubrir una enorme variedad de casos de uso. Aqui algunas areas de inspiracion:\n\n- Creacion de documentos: Generar Word, PowerPoint, aplicaciones completas, branding y assets visuales.\n- Automatizacion empresarial: Integraciones con 1000+ aplicaciones, workflows automatizados, Slack bots, automatizacion de email y tareas repetitivas.\n- Desarrollo de software: Code review automatizado, debugging asistido, generacion de tests, auditorias de seguridad, scaffolding de proyectos.\n\nAntes de crear un skill, preguntate: que tarea repito frecuentemente? Esa es tu mejor candidata para convertirse en skill.',
    metafora: 'Crear un skill es como fabricar un producto: entiendes al cliente (intent), decides si es artesanal o industrial (clasificacion), lo fabricas (generacion), pasas control de calidad (validacion), lo pruebas en condiciones reales (testing), le pones etiqueta (catalogacion), y lo colocas en la estanteria (almacenamiento).',
    ejemplo: `# Pipeline: /skill-create "genera APIs REST con Express"

# 1. Intent: generar APIs REST con Express y TypeScript
# 2. Clasificacion: skill completa (necesita agents y templates)
# 3. Generacion:
#    - SKILL.md con frontmatter + instrucciones
#    - agents/api-validator.md
#    - templates/route.md
# 4. Validacion: Score 82/100
# 5. Testing: evals con skill-creator plugin (opcional)
# 6. Catalogacion: catalog.json -> categoria "desarrollo-web"
# 7. Almacenamiento: created-skills/desarrollo-web/express-api-gen/

# Ideas de skills por area:
# Documentos: word-gen, pptx-gen, branding-kit, invoice-gen
# Automatizacion: slack-bot, email-auto, workflow-1000apps
# Desarrollo: code-review, debug-assist, test-gen, security-audit`,
    miniReto: {
      titulo: 'Crea un skill completo',
      descripcion: 'Crea un skill que genere configuraciones ESLint para TypeScript + React con SKILL.md, un template y una reference.',
      criterios: ['SKILL.md con 5+ triggers', 'Template parametrizado', 'Reference con docs', '5+ pasos imperativos']
    },
    glosario: [
      { termino: 'Intent', definicion: 'Descripcion funcional de lo que debe hacer el skill, capturada del usuario' },
      { termino: 'Pipeline de creacion', definicion: 'Secuencia de 7 pasos: intent -> clasificacion -> generacion -> validacion -> testing -> catalogacion -> almacenamiento' },
      { termino: 'Quality Score', definicion: 'Puntuacion 0-100 basada en rubrica de 4 dimensiones' },
      { termino: 'Casos de uso', definicion: 'Areas donde crear skills: documentos (Word, PPT), automatizacion (1000+ apps, Slack, email), desarrollo (code review, debugging, testing, seguridad)' }
    ]
  },
  {
    id: 'testing-y-evaluacion',
    orden: 9,
    titulo: 'Testing y Evaluacion',
    tipo: 'practica',
    zona: 'Laboratorio de Creacion',
    xp: 45,
    icon: 'FlaskConical',
    color: 'emerald',
    explicacion: 'El skill-creator plugin ofrece un pipeline de evaluacion: defines test cases (prompts que deberian activar el skill), un grader evalua la calidad del output, y un benchmark agrega resultados. El resultado es un pass rate, metricas de tokens/tiempo, y un viewer HTML.',
    metafora: 'Testear un skill es como hacer una cata de vinos. No metes el vino en una maquina \u2014 necesitas un catador experto (grader) que pruebe el output y evalue aroma, sabor, cuerpo (assertions). La ficha de cata (viewer HTML) registra las notas.',
    ejemplo: `# evals.json \u2014 Test cases
{
  "cases": [
    {
      "id": "basic-crud",
      "prompt": "Genera API REST para usuarios",
      "assertions": [
        {"type": "file_exists", "path": "routes/users.ts"},
        {"type": "content_contains", "text": "router.get"}
      ]
    }
  ]
}
# Resultado: pass_rate: 0.85, avg_tokens: 1200`,
    miniReto: {
      titulo: 'Disena test cases',
      descripcion: 'Disena 4 test cases para un skill gitignore-gen con prompts, assertions, y un caso edge.',
      criterios: ['4 test cases', 'Assertions especificas', 'Caso edge (sin stack)', 'Prompts realistas']
    },
    glosario: [
      { termino: 'Test case', definicion: 'Caso de prueba con prompt, comportamiento esperado y assertions' },
      { termino: 'Grader', definicion: 'Evaluador que verifica assertions contra el output real' },
      { termino: 'Pass rate', definicion: 'Porcentaje de test cases que pasan (0.0-1.0)' }
    ]
  },
  {
    id: 'mejora-iterativa',
    orden: 10,
    titulo: 'Mejora Iterativa',
    tipo: 'practica',
    zona: 'Laboratorio de Creacion',
    xp: 45,
    icon: 'RefreshCw',
    color: 'emerald',
    explicacion: 'El comando /skill-improve analiza un skill contra la rubrica (frontmatter, contenido, estructura, reutilizacion), consulta instincts de Sinapsis, y propone mejoras con impacto estimado. La comparacion ciega compara output de la version vieja vs nueva sin sesgo.\n\nTips y mejores practicas para crear skills de alta calidad:\n\n1. Triggers descriptivos: Usa frases que Claude entienda facilmente. Piensa en como el usuario pediria la tarea naturalmente.\n2. Instrucciones claras: Se especifico sobre el comportamiento esperado. Evita ambiguedades y define exactamente que debe hacer el skill en cada paso.\n3. Ejemplos de input: Muestra como debe comportarse el skill con ejemplos concretos de entrada y salida esperada.\n4. Manejo de errores: Incluye instrucciones para situaciones inesperadas (archivos faltantes, formatos invalidos, inputs vacios).\n5. Buena documentacion: Mantiene el skill bien documentado para la comunidad. Otros usuarios deberian entender que hace y como usarlo.\n6. Combinar skills: Usa multiples skills juntos para tareas complejas. Un skill puede delegar a otros o componerse con ellos para flujos avanzados.',
    metafora: 'La mejora iterativa es como afinar un instrumento. No lo afinas una vez y listo \u2014 afinas, tocas, escuchas, ajustas. La rubrica es tu oido entrenado. Los instincts son la experiencia acumulada de miles de afinaciones.',
    ejemplo: `# Score ANTES: 62/100
# - Frontmatter: 12/25 (triggers vagos)
# - Reutilizacion: 12/25 (no delega)

# Mejora 1: Triggers especificos (+8 pts)
# ANTES: description: Genera APIs
# DESPUES: description: |
#   Genera APIs REST con Express.
#   USAR cuando: "generar API REST", "Express API".

# Score DESPUES: 78/100 (+16 pts)

# Checklist de mejores practicas:
# [x] Triggers descriptivos y naturales
# [x] Instrucciones claras y especificas
# [x] Ejemplos de input/output incluidos
# [x] Manejo de errores documentado
# [x] Documentacion para la comunidad
# [ ] Composicion con otros skills`,
    miniReto: {
      titulo: 'Mejora este frontmatter',
      descripcion: 'Analiza: name: DocGen, description: genera documentacion, version: 1.0. Propon 3 mejoras con impacto.',
      criterios: ['name \u2192 doc-gen (kebab-case)', 'description con 3+ triggers', 'Anadir author', 'version \u2192 1.0.0']
    },
    glosario: [
      { termino: 'Rubrica', definicion: 'Sistema de puntuacion 0-100 en 4 dimensiones para evaluar skills' },
      { termino: 'Comparacion ciega', definicion: 'Evaluacion de dos versiones sin saber cual es nueva y cual antigua' },
      { termino: 'Description optimization', definicion: 'Proceso iterativo para mejorar precision de triggers' },
      { termino: 'Triggers descriptivos', definicion: 'Frases naturales que Claude entiende facilmente, escritas como el usuario pediria la tarea' },
      { termino: 'Composicion de skills', definicion: 'Usar multiples skills juntos para resolver tareas complejas, delegando entre ellos' },
      { termino: 'Manejo de errores', definicion: 'Incluir instrucciones para situaciones inesperadas como archivos faltantes o inputs invalidos' }
    ]
  },
  {
    id: 'fusion-de-skills',
    orden: 11,
    titulo: 'Fusion de Skills',
    tipo: 'reto',
    zona: 'Laboratorio de Creacion',
    xp: 55,
    icon: 'GitMerge',
    color: 'ember',
    explicacion: '3 estrategias: Merge (unifica todo cuando solapamiento >50%), Compose (orquestador que delega a sub-skills independientes), Layer (skill base + extension). El fusion-engine analiza solapamiento funcional, detecta conflictos, y resuelve automaticamente.',
    metafora: 'Merge es fusionar dos panaderias en una con menu combinado. Compose es una alianza: panaderia y cafeteria bajo un mismo techo con recepcionista comun. Layer es expansion: la panaderia anade seccion de pasteleria.',
    ejemplo: `# Compose: react-component-gen + react-test-gen
# -> react-toolkit (orquestador)

---
name: react-toolkit
description: |
  Toolkit React: genera componentes Y tests.
  USAR cuando: "componente React", "test React".
---
# React Toolkit
## Flujo
1. Detectar: componente, test, o ambos
2. Componente -> agents/component-gen.md
3. Test -> agents/test-gen.md
4. Ambos -> paralelo`,
    miniReto: {
      titulo: 'Planifica una fusion',
      descripcion: 'Fusiona markdown-table-gen (micro, 60 lineas) + csv-to-markdown (completa, con agent). Elige estrategia y justifica.',
      criterios: ['Solapamiento identificado', 'Estrategia justificada', 'Estructura resultante descrita', '1+ conflicto resuelto']
    },
    glosario: [
      { termino: 'Merge', definicion: 'Unifica 2+ skills en una sola. Para solapamiento alto' },
      { termino: 'Compose', definicion: 'Orquestador que delega a sub-skills. Para independientes' },
      { termino: 'Layer', definicion: 'Base + extension. Para skills jerarquicas' }
    ]
  },
  {
    id: 'catalogar-y-organizar',
    orden: 12,
    titulo: 'Catalogar y Organizar',
    tipo: 'practica',
    zona: 'Foro del Maestro',
    xp: 40,
    icon: 'Library',
    color: 'steel',
    explicacion: 'El catalogo (catalog.json) organiza skills en 12 categorias con metadata completa: id, nombre, categoria, tipo, tags, quality_score, trazabilidad. /skill-catalog permite listar, buscar, ver estadisticas, y exportar.\n\nAdemas de tus skills propios, existen super-repositorios de la comunidad donde encontrar skills listos para usar:\n\n- antigravity: 1200+ skills universales, compatible con 10+ plataformas. El repositorio mas grande y diverso.\n- ComposioHQ: 150+ skills enfocados en automatizacion, con integraciones para 1000+ aplicaciones.\n- alirezarezvani: 192 skills production-ready con soporte para 17 agentes distintos.\n- VoltAgent: 200+ skills creativos, incluye skills oficiales de Anthropic.\n- anthropics/skills: 17 skills oficiales de Anthropic, la referencia de calidad.\n\nEstos repositorios son excelentes para aprender patrones, reutilizar soluciones existentes, y contribuir a la comunidad.',
    metafora: 'Es como el sistema de una biblioteca. Sin catalogo, tienes libros en el suelo. Con catalogo, cada libro tiene su ficha (metadata), estanteria (categoria), y descriptores (tags). El bibliotecario encuentra cualquier libro en segundos.',
    ejemplo: `{
  "skills": [
    {
      "id": "gitignore-gen",
      "name": "Gitignore Generator",
      "category": "productividad",
      "type": "micro-skill",
      "tags": ["git", "config"],
      "quality_score": 0.78
    },
    {
      "id": "react-toolkit",
      "category": "desarrollo-web",
      "type": "fused-skill",
      "parent_skills": ["react-component-gen", "react-test-gen"],
      "quality_score": 0.92
    }
  ]
}

# Super-repositorios de la comunidad:
# ┌─────────────────┬────────┬───────────────────────────┐
# │ Repositorio      │ Skills │ Enfoque                   │
# ├─────────────────┼────────┼───────────────────────────┤
# │ antigravity      │ 1200+  │ Universal, 10+ plataformas│
# │ ComposioHQ       │ 150+   │ Automatizacion, 1000+ apps│
# │ alirezarezvani   │ 192    │ Production-ready, 17 agents│
# │ VoltAgent        │ 200+   │ Creativos, Anthropic oficial│
# │ anthropics/skills│ 17     │ Referencia oficial        │
# └─────────────────┴────────┴───────────────────────────┘`,
    miniReto: {
      titulo: 'Cataloga 3 skills',
      descripcion: 'Escribe entradas de catalog.json para: un micro-skill de commit messages, un plugin WordPress, y una fusion de testing.',
      criterios: ['3 entradas completas', 'Categorias correctas', 'Tags relevantes', 'parent_skills solo en fusion']
    },
    glosario: [
      { termino: 'catalog.json', definicion: 'Registro centralizado de todas las skills con metadata' },
      { termino: 'Categoria', definicion: 'Una de 12 clasificaciones tematicas para organizar skills' },
      { termino: 'Tags', definicion: 'Etiquetas transversales para busqueda multi-dimensional' },
      { termino: 'Super-repositorio', definicion: 'Coleccion comunitaria de skills reutilizables: antigravity (1200+), ComposioHQ (150+), alirezarezvani (192), VoltAgent (200+), anthropics/skills (17 oficiales)' }
    ]
  },
  {
    id: 'plugins-claude-code',
    orden: 13,
    titulo: 'Plugins en Claude Code',
    tipo: 'teoria-practica',
    zona: 'Foro del Maestro',
    xp: 55,
    icon: 'Plug',
    color: 'gold',
    explicacion: 'Un plugin es un paquete distribuible con .claude-plugin/plugin.json + skills/. Se instala desde marketplaces (repos Git) y se invoca como plugin-name:skill-name. Puede incluir .mcp.json para servidores MCP.',
    metafora: 'Los plugins son como apps en una app store. Las skills locales son apps que compilas manualmente. Un plugin es una app publicada en la tienda (marketplace) para que cualquiera la instale. El plugin.json es la ficha de la app store.',
    ejemplo: `# Estructura de un plugin
mi-plugin/
├── .claude-plugin/
│   └── plugin.json    # {"name":"mi-plugin","description":"...","author":{...}}
├── .mcp.json          # Opcional: servidores MCP
└── skills/
    ├── skill-uno/
    │   └── SKILL.md
    └── skill-dos/
        └── SKILL.md

# Invocar: mi-plugin:skill-uno
# Instalar: clonar marketplace -> ~/.claude/plugins/marketplaces/`,
    miniReto: {
      titulo: 'Crea un plugin',
      descripcion: 'Crea la estructura de un plugin "dev-utils" con 2 micro-skills: editorconfig-gen y prettierrc-gen.',
      criterios: ['plugin.json completo', '2 SKILL.md validos', 'Triggers especificos', 'Estructura correcta']
    },
    glosario: [
      { termino: 'Plugin', definicion: 'Paquete distribuible con skills instalable via marketplace' },
      { termino: 'Marketplace', definicion: 'Repositorio Git que distribuye plugins' },
      { termino: 'plugin.json', definicion: 'Metadata obligatoria: name, description, author' },
      { termino: 'MCP', definicion: 'Model Context Protocol para servidores de contexto externo' }
    ]
  },
  // ═══════════ ZONA 5: Arena de los ARTgents ═══════════
  {
    id: 'superagentes-artgents',
    orden: 14,
    titulo: 'SuperAgentes y ARTgents',
    tipo: 'teoria',
    zona: 'Arena de los ARTgents',
    xp: 50,
    icon: 'Shield',
    color: 'purple',
    explicacion: 'Un SuperAgente es como un superheroe digital: le asignas SuperHabilidades (skills) y atributos (diseno, legal, marketing, etc.). Un ARTgent es un agente creado con arte, carino y codigo abierto. La filosofia: creART una nueva CREAlidART. Los agentes combinan multiples skills en un plugin coordinado.',
    metafora: 'Imagina que cada skill es un superpoder (volar, fuerza, velocidad). Un SuperAgente es un superheroe que tiene varios superpoderes asignados. BrandHero tiene los poderes de diseno, documentos y assets. LegalGuardian tiene los poderes de contratos, compliance y auditoria. Tu eres el creador de superheroes.',
    ejemplo: `# Estructura de un SuperAgente
brand-hero/
├── plugin.json           # Define el agente y sus skills
├── skills/
│   ├── brand-config/     # SuperHabilidad: Configurar marca
│   │   └── SKILL.md
│   ├── brand-docs/       # SuperHabilidad: Documentos con marca
│   │   └── SKILL.md
│   └── brand-assets/     # SuperHabilidad: Assets visuales
│       └── SKILL.md
└── agents/
    └── coordinator.md    # Cerebro del superagente

# Categorias de ARTgents:
# Diseno & Branding | Imagen & Visual | Video & Motion
# Legal & Compliance | Economico | Fiscal & Hacienda
# Marketing & Growth | Desarrollo & Tech`,
    miniReto: {
      titulo: 'Disena tu SuperAgente',
      descripcion: 'Crea el diseno de un SuperAgente con al menos 3 SuperHabilidades para tu area de trabajo.',
      criterios: ['Nombre de superheroe', '3+ skills definidas', 'plugin.json valido', 'Coordinador definido']
    },
    glosario: [
      { termino: 'SuperAgente', definicion: 'Plugin con multiples skills coordinadas, como un superheroe con superpoderes' },
      { termino: 'ARTgent', definicion: 'Agente creado con arte, carino y codigo abierto' },
      { termino: 'SuperHabilidad', definicion: 'Cada skill individual que potencia al agente' },
      { termino: 'Coordinador', definicion: 'Agent principal que orquesta las skills del superagente' }
    ]
  },
  {
    id: 'construir-superagente',
    orden: 15,
    titulo: 'Construir y Coordinar Agentes',
    tipo: 'practica',
    zona: 'Arena de los ARTgents',
    xp: 55,
    icon: 'Users',
    color: 'purple',
    explicacion: 'Un coordinador de agentes es un agente maestro que decide que SuperAgente maneja cada tarea. Estructura: Coordinator → Agent 1 (skills A,B), Agent 2 (skills C,D), Agent 3 (skills E,F). Cada agente se especializa en un dominio. El coordinador detecta la intencion del usuario y delega al agente correcto.',
    metafora: 'Es como Nick Fury en SHIELD: el no tiene todos los superpoderes, pero sabe a que heroe llamar para cada mision. Cuando llega una amenaza legal, llama a LegalGuardian. Cuando necesita diseno, llama a BrandHero. El coordinador es tu Nick Fury personal.',
    ejemplo: `# coordinator.md - Cerebro del sistema
---
name: coordinator
description: Orquesta multiples SuperAgentes
---

## Agentes disponibles
| Agente | Dominio | Skills |
|--------|---------|--------|
| BrandHero | Marca y diseno | brand-config, brand-docs |
| LegalGuardian | Legal y compliance | contracts, audit |
| DataForge | Datos y analytics | csv-transform, sql-gen |

## Reglas de delegacion
1. Analizar la intencion del usuario
2. Detectar el dominio (marca, legal, datos...)
3. Delegar al SuperAgente especializado
4. Combinar resultados si son multiples dominios`,
    miniReto: {
      titulo: 'Crea un coordinador',
      descripcion: 'Disena un coordinator.md que gestione 3 SuperAgentes con dominios diferentes.',
      criterios: ['Tabla de agentes', 'Reglas de delegacion claras', '3 agentes distintos', 'Flujo documentado']
    },
    glosario: [
      { termino: 'Coordinador', definicion: 'Agente maestro que orquesta otros agentes' },
      { termino: 'Delegacion', definicion: 'Proceso de asignar tareas al agente especializado' },
      { termino: 'Dominio', definicion: 'Area de especializacion de un agente' },
      { termino: 'Multi-agente', definicion: 'Sistema con varios agentes trabajando juntos' }
    ]
  },
  {
    id: 'sinapsis-evolucion',
    orden: 16,
    titulo: 'Sinapsis: Evolucion Continua',
    tipo: 'teoria-practica',
    zona: 'Arena de los ARTgents',
    xp: 60,
    icon: 'Brain',
    color: 'purple',
    explicacion: 'Sinapsis es el sistema de aprendizaje continuo: observa como usas skills, detecta patrones, los cristaliza como instincts y los evoluciona. Cuando creas skills superbuenas, Sinapsis aprende del proceso. El ciclo: Usar → Observar → Aprender → Mejorar → Evolucionar. Skills frecuentes se promueven, patrones se convierten en nuevas skills automaticamente.',
    metafora: 'Sinapsis es como el sistema de entrenamiento de un superheroe. Cada vez que luchas (usas una skill), tu cuerpo aprende (observa patrones). Despues de muchas batallas, desarrollas reflejos automaticos (instincts). Y los mejores reflejos evolucionan en nuevos superpoderes (skills evolucionadas).',
    ejemplo: `# Ciclo de evolucion con Sinapsis

## 1. Observar
/analyze  # Detecta patrones en tus sesiones

## 2. Aprender
/instinct-status  # Ver instincts aprendidos
/gotcha  # Capturar un error->fix como instinct

## 3. Mejorar
/evolve  # Clusteriza instincts en skills/commands
/promote  # Promueve instincts de proyecto a global

## 4. Evolucionar
/instinct-cloud  # Genera skill con todos los instincts
/instinct-export  # Exporta para compartir

## 5. Retroalimentar
# Cuando creas una skill superbuena, Sinapsis detecta:
# - Patrones en tu proceso de creacion
# - Mejores practicas recurrentes
# - Atajos que descubres
# Y los cristaliza para la proxima vez`,
    miniReto: {
      titulo: 'Activa tu ciclo Sinapsis',
      descripcion: 'Ejecuta /instinct-status, crea un instinct con /gotcha, y evoluciona con /evolve.',
      criterios: ['Instinct-status revisado', 'Al menos 1 gotcha creado', 'Evolve ejecutado', 'Entiendes el ciclo']
    },
    glosario: [
      { termino: 'Sinapsis', definicion: 'Sistema de aprendizaje continuo que observa, detecta y evoluciona' },
      { termino: 'Instinct', definicion: 'Patron detectado y cristalizado con confidence score' },
      { termino: 'Promote', definicion: 'Elevar un instinct de scope proyecto a global' },
      { termino: 'Evolve', definicion: 'Clusterizar instincts en skills, commands o agents' }
    ]
  }
];

export const gamification = {
  tema: 'La Forja de Skills',
  niveles: [
    { id: 1, nombre: 'Aprendiz de Herrero', xpMin: 0, xpMax: 100, emoji: '\uD83D\uDD25', color: 'from-zinc-600 to-zinc-500' },
    { id: 2, nombre: 'Herrero de Micro-Skills', xpMin: 101, xpMax: 250, emoji: '\uD83D\uDD28', color: 'from-forge-700 to-forge-600' },
    { id: 3, nombre: 'Forjador de Skills', xpMin: 251, xpMax: 450, emoji: '\u2694\uFE0F', color: 'from-forge-600 to-forge-500' },
    { id: 4, nombre: 'Maestro Fundidor', xpMin: 451, xpMax: 650, emoji: '\uD83D\uDEE1\uFE0F', color: 'from-steel-600 to-steel-500' },
    { id: 5, nombre: 'Arquitecto de Plugins', xpMin: 651, xpMax: 850, emoji: '\uD83C\uDFDB\uFE0F', color: 'from-steel-500 to-forge-500' },
    { id: 6, nombre: 'Gran Maestro de la Forja', xpMin: 851, xpMax: 999, emoji: '\uD83D\uDC51', color: 'from-gold-500 to-forge-500' }
  ],
  badges: [
    { id: 'primera-chispa', nombre: 'Primera Chispa', emoji: '\uD83D\uDD25', condicion: 'Completa tu primera leccion' },
    { id: 'primer-skill', nombre: 'Primer Skill', emoji: '\uD83D\uDD28', condicion: 'Crea tu primer micro-skill' },
    { id: 'anatomista', nombre: 'Anatomista', emoji: '\uD83D\uDD2C', condicion: 'Completa lecciones 2-6' },
    { id: 'fundidor', nombre: 'Fundidor', emoji: '\uD83D\uDD25', condicion: 'Completa el reto de fusion' },
    { id: 'catalogador', nombre: 'Catalogador', emoji: '\uD83D\uDCDA', condicion: 'Completa catalogacion' },
    { id: 'plugin-master', nombre: 'Plugin Master', emoji: '\uD83D\uDD0C', condicion: 'Completa plugins' },
    { id: 'ciclo-completo', nombre: 'Ciclo Completo', emoji: '\uD83C\uDFC6', condicion: 'Completa las 13 lecciones base' },
    { id: 'superheroe', nombre: 'SuperHéroe', emoji: '\uD83E\uDDB8', condicion: 'Completa la Arena de los ARTgents' },
    { id: 'sinapsis-master', nombre: 'Sinapsis Master', emoji: '\uD83E\uDDE0', condicion: 'Activa el ciclo Sinapsis completo' },
    { id: 'forjador-perfecto', nombre: 'Forjador Perfecto', emoji: '\u2B50', condicion: 'Todos los retos al primer intento' }
  ],
  totalXp: 705
};

export const categories = [
  { id: 'desarrollo-web', nombre: 'Desarrollo Web', emoji: '\uD83C\uDF10', color: 'from-blue-500 to-cyan-500' },
  { id: 'desarrollo-ia', nombre: 'Desarrollo IA', emoji: '\uD83E\uDD16', color: 'from-purple-500 to-pink-500' },
  { id: 'automatizacion', nombre: 'Automatizacion', emoji: '\u2699\uFE0F', color: 'from-gray-500 to-zinc-400' },
  { id: 'documentacion', nombre: 'Documentacion', emoji: '\uD83D\uDCDD', color: 'from-green-500 to-emerald-500' },
  { id: 'testing', nombre: 'Testing', emoji: '\uD83E\uDDEA', color: 'from-yellow-500 to-amber-500' },
  { id: 'seguridad', nombre: 'Seguridad', emoji: '\uD83D\uDD12', color: 'from-red-500 to-rose-500' },
  { id: 'datos', nombre: 'Datos', emoji: '\uD83D\uDCCA', color: 'from-indigo-500 to-blue-500' },
  { id: 'productividad', nombre: 'Productividad', emoji: '\uD83D\uDE80', color: 'from-orange-500 to-amber-500' },
  { id: 'educacion', nombre: 'Educacion', emoji: '\uD83C\uDF93', color: 'from-teal-500 to-cyan-500' },
  { id: 'blockchain', nombre: 'Blockchain', emoji: '\u26D3\uFE0F', color: 'from-violet-500 to-purple-500' },
  { id: 'cms', nombre: 'CMS', emoji: '\uD83D\uDCF0', color: 'from-sky-500 to-blue-500' },
  { id: 'meta-skill', nombre: 'Meta-Skill', emoji: '\uD83D\uDD2E', color: 'from-fuchsia-500 to-pink-500' }
];

export const zonas = [
  { id: 'Plaza del Aprendiz', emoji: '\uD83C\uDFDB\uFE0F', color: 'forge', nodos: [1, 2, 4] },
  { id: 'Taller de Forja', emoji: '\uD83D\uDD28', color: 'steel', nodos: [3, 5, 6, 7] },
  { id: 'Laboratorio de Creacion', emoji: '\uD83E\uDDEA', color: 'emerald', nodos: [8, 9, 10, 11] },
  { id: 'Foro del Maestro', emoji: '\uD83C\uDFDB\uFE0F', color: 'gold', nodos: [12, 13] },
  { id: 'Arena de los ARTgents', emoji: '\uD83E\uDDB8', color: 'purple', nodos: [14, 15, 16] }
];
