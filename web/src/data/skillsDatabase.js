// =============================================================================
// SuperConstructor Skills Database
// A comprehensive catalog of 50+ skills for fuzzy matching and prompt analysis.
// =============================================================================

export const skillsDatabase = [
  // ===========================================================================
  // DESARROLLO-WEB (10 skills)
  // ===========================================================================
  {
    id: 'react-component-gen',
    name: 'React Component Generator',
    description: 'Genera componentes React con TypeScript, props tipadas y Tailwind CSS',
    category: 'desarrollo-web',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['react', 'componente', 'component', 'typescript', 'tsx', 'tailwind', 'frontend', 'ui', 'jsx', 'props', 'hook', 'estado', 'state'],
    commands: ['/generate-component'],
    agents: ['component-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar nombre del componente\n2. Detectar si el proyecto usa TypeScript\n3. Generar archivo .tsx con props interface\n4. Incluir estilos Tailwind\n5. Exportar por defecto'
  },
  {
    id: 'nextjs-page-gen',
    name: 'Next.js Page & API Generator',
    description: 'Genera paginas, layouts y API routes para Next.js App Router o Pages Router',
    category: 'desarrollo-web',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['next', 'nextjs', 'next.js', 'page', 'pagina', 'api', 'route', 'app-router', 'pages-router', 'ssr', 'ssg', 'server-component', 'layout', 'middleware'],
    commands: ['/generate-page', '/generate-api-route'],
    agents: ['nextjs-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Detectar version de Next.js (App Router vs Pages Router)\n2. Preguntar tipo: page, layout, API route, middleware\n3. Generar archivo en la ruta correcta\n4. Incluir metadata/head si es pagina\n5. Agregar tipos TypeScript si aplica\n6. Incluir loading/error boundaries si es App Router'
  },
  {
    id: 'rest-api-express',
    name: 'REST API Generator (Express)',
    description: 'Genera endpoints REST completos con Express, validacion y manejo de errores',
    category: 'desarrollo-web',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['rest', 'api', 'express', 'endpoint', 'crud', 'router', 'middleware', 'node', 'nodejs', 'http', 'get', 'post', 'put', 'delete', 'servidor', 'server', 'backend'],
    commands: ['/generate-api', '/generate-endpoint'],
    agents: ['api-tester'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar recurso/entidad a exponer\n2. Generar rutas CRUD (GET, POST, PUT, DELETE)\n3. Incluir validacion con Zod o Joi\n4. Agregar manejo de errores centralizado\n5. Documentar con comentarios JSDoc\n6. Incluir ejemplo de request/response'
  },
  {
    id: 'graphql-schema-gen',
    name: 'GraphQL Schema Generator',
    description: 'Genera schemas GraphQL con types, queries, mutations y resolvers',
    category: 'desarrollo-web',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['graphql', 'schema', 'type', 'query', 'mutation', 'resolver', 'apollo', 'subscription', 'gql', 'typedefs', 'input', 'enum', 'api-graphql'],
    commands: ['/generate-schema', '/generate-resolver'],
    agents: ['schema-validator'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar entidades del dominio\n2. Generar type definitions (SDL)\n3. Crear queries y mutations correspondientes\n4. Generar resolvers con DataLoader para N+1\n5. Incluir input types para mutations\n6. Agregar validacion de argumentos'
  },
  {
    id: 'tailwind-utility-gen',
    name: 'CSS / Tailwind Utility Generator',
    description: 'Genera clases utilitarias, componentes CSS y configuraciones Tailwind personalizadas',
    category: 'desarrollo-web',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['css', 'tailwind', 'estilo', 'style', 'clase', 'class', 'utility', 'responsive', 'dark-mode', 'theme', 'color', 'animacion', 'animation', 'grid', 'flexbox'],
    commands: ['/generate-styles'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Preguntar tipo de utilidad o componente visual\n2. Generar clases Tailwind o CSS custom\n3. Incluir variantes responsive\n4. Agregar soporte dark mode\n5. Documentar uso con ejemplos'
  },
  {
    id: 'html-email-template',
    name: 'HTML Email Template Generator',
    description: 'Genera templates de email HTML compatibles con los principales clientes de correo',
    category: 'desarrollo-web',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['email', 'correo', 'template', 'plantilla', 'html', 'newsletter', 'marketing', 'transaccional', 'responsive', 'outlook', 'gmail', 'mjml', 'inlining'],
    commands: ['/generate-email'],
    agents: ['email-preview-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar tipo de email (transaccional, marketing, notificacion)\n2. Generar estructura table-based para compatibilidad\n3. Incluir estilos inline\n4. Agregar responsive con media queries\n5. Incluir texto alternativo plain-text\n6. Validar contra reglas de clientes populares'
  },
  {
    id: 'vue-component-gen',
    name: 'Vue Component Generator',
    description: 'Genera componentes Vue 3 con Composition API, TypeScript y estilos scoped',
    category: 'desarrollo-web',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['vue', 'vuejs', 'vue3', 'componente', 'component', 'composition-api', 'script-setup', 'pinia', 'vuex', 'template', 'scoped', 'sfc', 'single-file'],
    commands: ['/generate-vue-component'],
    agents: ['vue-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar nombre del componente\n2. Detectar Vue 2 (Options API) o Vue 3 (Composition API)\n3. Generar SFC con script setup si es Vue 3\n4. Incluir props con defineProps y tipos\n5. Agregar estilos scoped\n6. Incluir emits tipados'
  },
  {
    id: 'svelte-component-gen',
    name: 'Svelte Component Generator',
    description: 'Genera componentes Svelte con reactividad, stores y transiciones',
    category: 'desarrollo-web',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['svelte', 'sveltekit', 'componente', 'component', 'reactive', 'store', 'transition', 'action', 'slot', 'binding', 'runes', 'svelte5'],
    commands: ['/generate-svelte-component'],
    agents: ['svelte-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar nombre del componente\n2. Detectar Svelte 4 o Svelte 5 (runes)\n3. Generar archivo .svelte con script, markup y style\n4. Incluir props exportadas y tipos\n5. Agregar transiciones si aplica\n6. Incluir reactive statements'
  },
  {
    id: 'astro-page-gen',
    name: 'Astro Page & Component Generator',
    description: 'Genera paginas y componentes Astro con islands architecture y content collections',
    category: 'desarrollo-web',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['astro', 'page', 'island', 'component', 'static', 'ssg', 'content-collection', 'markdown', 'mdx', 'partial-hydration', 'frontend'],
    commands: ['/generate-astro-page'],
    agents: [],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar tipo: pagina estatica, componente, layout\n2. Generar archivo .astro con frontmatter\n3. Configurar client directives si necesita interactividad\n4. Incluir content collections si aplica\n5. Agregar SEO metadata'
  },
  {
    id: 'websocket-server-gen',
    name: 'WebSocket Server Generator',
    description: 'Genera servidores WebSocket con rooms, autenticacion y manejo de eventos',
    category: 'desarrollo-web',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['websocket', 'ws', 'socket', 'socket.io', 'realtime', 'tiempo-real', 'chat', 'evento', 'event', 'room', 'broadcast', 'bidirectional'],
    commands: ['/generate-websocket'],
    agents: ['connection-tester'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar libreria (ws, socket.io, uWebSockets)\n2. Generar servidor con manejo de conexiones\n3. Implementar sistema de rooms/canales\n4. Agregar autenticacion de handshake\n5. Incluir heartbeat/ping-pong\n6. Manejar reconexion del cliente'
  },

  // ===========================================================================
  // DESARROLLO-IA (7 skills)
  // ===========================================================================
  {
    id: 'prompt-engineer',
    name: 'Prompt Engineer / Optimizer',
    description: 'Optimiza y estructura prompts para modelos de lenguaje con tecnicas avanzadas',
    category: 'desarrollo-ia',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['prompt', 'engineering', 'llm', 'gpt', 'claude', 'optimizar', 'optimize', 'few-shot', 'chain-of-thought', 'system-prompt', 'instruccion', 'instruction', 'template', 'ia', 'ai'],
    commands: ['/optimize-prompt', '/analyze-prompt'],
    agents: ['prompt-evaluator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Recibir el prompt original del usuario\n2. Analizar estructura, claridad y especificidad\n3. Aplicar tecnicas: few-shot, chain-of-thought, role-play\n4. Reestructurar con secciones claras\n5. Agregar restricciones y formato de salida\n6. Proveer variantes A/B para testing'
  },
  {
    id: 'llm-chain-builder',
    name: 'LLM Chain Builder',
    description: 'Construye cadenas de prompts y flujos multi-paso con LangChain o similar',
    category: 'desarrollo-ia',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['langchain', 'chain', 'cadena', 'llm', 'pipeline', 'flujo', 'flow', 'multi-step', 'agent', 'tool', 'herramienta', 'orchestration', 'ia', 'ai', 'openai'],
    commands: ['/build-chain'],
    agents: ['chain-debugger'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar objetivo del pipeline\n2. Disenar pasos de la cadena\n3. Generar codigo LangChain/LlamaIndex\n4. Configurar memory y state management\n5. Agregar error handling entre pasos\n6. Incluir logging y observabilidad'
  },
  {
    id: 'rag-pipeline-gen',
    name: 'RAG Pipeline Generator',
    description: 'Genera pipelines de Retrieval-Augmented Generation con embeddings y vector stores',
    category: 'desarrollo-ia',
    type: 'skill',
    difficulty: 'expert',
    keywords: ['rag', 'retrieval', 'augmented', 'generation', 'embedding', 'vector', 'vectorstore', 'pinecone', 'chroma', 'weaviate', 'chunk', 'document', 'knowledge-base', 'ia', 'ai', 'semantic-search'],
    commands: ['/generate-rag'],
    agents: ['rag-evaluator', 'retrieval-tester'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar fuente de datos (docs, PDF, web)\n2. Configurar chunking strategy\n3. Generar pipeline de embeddings\n4. Configurar vector store (Pinecone, Chroma, etc.)\n5. Implementar retrieval con reranking\n6. Conectar con LLM para generacion'
  },
  {
    id: 'ai-agent-builder',
    name: 'AI Agent Builder',
    description: 'Construye agentes de IA autonomos con tools, memoria y razonamiento',
    category: 'desarrollo-ia',
    type: 'skill',
    difficulty: 'expert',
    keywords: ['agent', 'agente', 'autonomo', 'autonomous', 'tool-use', 'function-calling', 'reasoning', 'memory', 'plan', 'react-agent', 'autogpt', 'crew', 'ia', 'ai', 'multi-agent'],
    commands: ['/build-agent'],
    agents: ['agent-tester', 'safety-checker'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Definir objetivo y alcance del agente\n2. Disenar tools/funciones disponibles\n3. Configurar sistema de memoria (corto y largo plazo)\n4. Implementar loop de razonamiento (ReAct, CoT)\n5. Agregar guardrails y limites de seguridad\n6. Incluir logging de decisiones'
  },
  {
    id: 'model-eval-framework',
    name: 'Model Evaluation Framework',
    description: 'Genera framework de evaluacion para modelos de IA con metricas y benchmarks',
    category: 'desarrollo-ia',
    type: 'skill',
    difficulty: 'expert',
    keywords: ['evaluacion', 'evaluation', 'eval', 'benchmark', 'metrica', 'metric', 'accuracy', 'precision', 'recall', 'f1', 'modelo', 'model', 'test', 'dataset', 'ia', 'ai'],
    commands: ['/generate-eval'],
    agents: ['eval-runner'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar tipo de modelo y tarea\n2. Seleccionar metricas apropiadas\n3. Generar dataset de evaluacion\n4. Implementar pipeline de eval automatizado\n5. Generar reportes con visualizaciones\n6. Comparar contra baselines'
  },
  {
    id: 'embeddings-pipeline',
    name: 'Embeddings Pipeline',
    description: 'Genera pipelines de embeddings para busqueda semantica y clustering',
    category: 'desarrollo-ia',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['embedding', 'embeddings', 'vector', 'semantic', 'similarity', 'cosine', 'clustering', 'openai', 'sentence-transformer', 'encode', 'dimension', 'ia', 'ai'],
    commands: ['/generate-embeddings'],
    agents: ['embedding-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar fuente de datos a embeber\n2. Seleccionar modelo de embeddings\n3. Implementar preprocesamiento de texto\n4. Generar y almacenar embeddings\n5. Implementar busqueda por similaridad\n6. Optimizar batch processing'
  },
  {
    id: 'fine-tuning-pipeline',
    name: 'Fine-Tuning Pipeline',
    description: 'Genera pipelines de fine-tuning para modelos de lenguaje con datasets personalizados',
    category: 'desarrollo-ia',
    type: 'skill',
    difficulty: 'expert',
    keywords: ['fine-tuning', 'finetune', 'training', 'entrenamiento', 'lora', 'qlora', 'peft', 'dataset', 'huggingface', 'transformers', 'modelo', 'model', 'ia', 'ai'],
    commands: ['/generate-finetune'],
    agents: ['training-monitor'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar modelo base y tarea objetivo\n2. Preparar dataset en formato correcto\n3. Configurar hiperparametros de entrenamiento\n4. Implementar LoRA/QLoRA si aplica\n5. Configurar evaluacion durante entrenamiento\n6. Exportar modelo entrenado'
  },

  // ===========================================================================
  // AUTOMATIZACION (7 skills)
  // ===========================================================================
  {
    id: 'github-actions-gen',
    name: 'GitHub Actions Workflow Generator',
    description: 'Genera workflows de GitHub Actions para CI/CD, testing y despliegue',
    category: 'automatizacion',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['github', 'actions', 'workflow', 'ci', 'cd', 'pipeline', 'yaml', 'deploy', 'despliegue', 'build', 'test', 'automatizacion', 'automation', 'runner'],
    commands: ['/generate-workflow'],
    agents: ['workflow-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar tipo de workflow (CI, CD, release, scheduled)\n2. Detectar lenguaje/framework del proyecto\n3. Generar archivo .github/workflows/*.yml\n4. Configurar triggers (push, PR, schedule)\n5. Agregar caching de dependencias\n6. Incluir notificaciones de estado'
  },
  {
    id: 'cicd-pipeline-gen',
    name: 'CI/CD Pipeline Generator',
    description: 'Genera pipelines CI/CD para GitLab CI, Jenkins, CircleCI u otras plataformas',
    category: 'automatizacion',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['cicd', 'ci', 'cd', 'pipeline', 'jenkins', 'gitlab', 'circleci', 'travis', 'deploy', 'build', 'stage', 'artifact', 'automatizacion', 'automation', 'continuous'],
    commands: ['/generate-pipeline'],
    agents: ['pipeline-validator'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar plataforma CI/CD objetivo\n2. Definir stages (build, test, deploy)\n3. Generar archivo de configuracion\n4. Configurar ambientes (staging, production)\n5. Agregar rollback strategy\n6. Incluir secrets management'
  },
  {
    id: 'docker-compose-gen',
    name: 'Docker Compose Generator',
    description: 'Genera archivos docker-compose.yml con servicios, redes y volumenes',
    category: 'automatizacion',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['docker', 'compose', 'contenedor', 'container', 'servicio', 'service', 'volumen', 'volume', 'red', 'network', 'imagen', 'image', 'dockerfile', 'yaml', 'orquestacion'],
    commands: ['/generate-docker-compose'],
    agents: ['docker-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar servicios necesarios (app, db, cache, etc.)\n2. Generar docker-compose.yml con servicios\n3. Configurar redes internas\n4. Agregar volumenes persistentes\n5. Incluir healthchecks\n6. Configurar variables de entorno'
  },
  {
    id: 'cron-job-manager',
    name: 'Cron Job Manager',
    description: 'Genera y gestiona tareas cron con logging, error handling y notificaciones',
    category: 'automatizacion',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['cron', 'crontab', 'schedule', 'tarea', 'task', 'programada', 'scheduled', 'job', 'periodico', 'periodic', 'timer', 'automatizacion'],
    commands: ['/generate-cron'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Preguntar frecuencia y tarea a ejecutar\n2. Generar expresion cron correcta\n3. Crear script wrapper con logging\n4. Agregar manejo de errores\n5. Incluir notificacion de fallos'
  },
  {
    id: 'shell-script-gen',
    name: 'Shell Script Generator',
    description: 'Genera scripts de shell (bash/zsh) con validacion, logging y manejo de errores',
    category: 'automatizacion',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['shell', 'bash', 'zsh', 'script', 'sh', 'terminal', 'consola', 'console', 'comando', 'command', 'cli', 'automatizacion', 'automation', 'unix', 'linux'],
    commands: ['/generate-script'],
    agents: ['shellcheck-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar objetivo del script\n2. Generar script con shebang y set -euo pipefail\n3. Incluir parsing de argumentos\n4. Agregar funciones de logging con colores\n5. Implementar manejo de errores y cleanup traps\n6. Incluir help/usage message'
  },
  {
    id: 'makefile-gen',
    name: 'Makefile Generator',
    description: 'Genera Makefiles con targets para build, test, lint, deploy y mas',
    category: 'automatizacion',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['make', 'makefile', 'target', 'build', 'compile', 'task-runner', 'phony', 'recipe', 'automatizacion', 'automation', 'gnu'],
    commands: ['/generate-makefile'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Detectar tipo de proyecto\n2. Generar Makefile con targets comunes\n3. Incluir .PHONY declarations\n4. Agregar variables configurables\n5. Incluir help target autodocumentado'
  },
  {
    id: 'terraform-infra-gen',
    name: 'Terraform Infrastructure Generator',
    description: 'Genera configuraciones Terraform para infraestructura cloud (AWS, GCP, Azure)',
    category: 'automatizacion',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['terraform', 'infrastructure', 'iac', 'aws', 'gcp', 'azure', 'cloud', 'provision', 'hcl', 'module', 'state', 'plan', 'apply', 'infra'],
    commands: ['/generate-terraform'],
    agents: ['terraform-validator'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar proveedor cloud y recursos necesarios\n2. Generar archivos .tf con modulos\n3. Configurar variables y outputs\n4. Incluir backend de estado remoto\n5. Agregar tags y naming conventions\n6. Generar terraform.tfvars de ejemplo'
  },

  // ===========================================================================
  // DOCUMENTACION (5 skills)
  // ===========================================================================
  {
    id: 'readme-gen',
    name: 'README Generator',
    description: 'Genera archivos README.md completos con badges, instalacion, uso y contribucion',
    category: 'documentacion',
    type: 'skill',
    difficulty: 'initiate',
    keywords: ['readme', 'documentacion', 'documentation', 'markdown', 'md', 'badge', 'instalacion', 'installation', 'uso', 'usage', 'contribucion', 'contributing', 'licencia', 'license'],
    commands: ['/generate-readme'],
    agents: ['readme-quality-checker'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Analizar proyecto (package.json, estructura)\n2. Generar titulo con badges\n3. Escribir descripcion y features principales\n4. Incluir instrucciones de instalacion\n5. Agregar ejemplos de uso con codigo\n6. Incluir seccion de contribucion y licencia'
  },
  {
    id: 'openapi-docs-gen',
    name: 'API Docs Generator (OpenAPI/Swagger)',
    description: 'Genera documentacion OpenAPI/Swagger a partir de codigo o especificaciones',
    category: 'documentacion',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['openapi', 'swagger', 'api', 'documentacion', 'documentation', 'spec', 'specification', 'endpoint', 'schema', 'yaml', 'json', 'rest', 'redoc'],
    commands: ['/generate-api-docs'],
    agents: ['openapi-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Analizar endpoints existentes o preguntar especificacion\n2. Generar archivo openapi.yaml/json\n3. Incluir schemas de request/response\n4. Agregar ejemplos para cada endpoint\n5. Configurar autenticacion (Bearer, API Key)\n6. Incluir descripciones detalladas'
  },
  {
    id: 'jsdoc-gen',
    name: 'JSDoc / TSDoc Generator',
    description: 'Genera documentacion inline JSDoc o TSDoc para funciones, clases y modulos',
    category: 'documentacion',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['jsdoc', 'tsdoc', 'documentacion', 'documentation', 'comentario', 'comment', 'param', 'return', 'typedef', 'ejemplo', 'example', 'typescript', 'javascript', 'inline'],
    commands: ['/generate-jsdoc'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Analizar funcion/clase/modulo target\n2. Generar bloque JSDoc/TSDoc\n3. Incluir @param con tipos y descripciones\n4. Agregar @returns y @throws\n5. Incluir @example con codigo funcional'
  },
  {
    id: 'changelog-gen',
    name: 'Changelog Generator',
    description: 'Genera changelogs automaticos basados en commits y convenciones de versionado',
    category: 'documentacion',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['changelog', 'cambios', 'changes', 'version', 'release', 'semver', 'conventional-commits', 'keep-a-changelog', 'historial', 'history', 'notas', 'notes'],
    commands: ['/generate-changelog'],
    agents: ['commit-analyzer'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Leer historial de commits del repositorio\n2. Parsear mensajes con conventional commits\n3. Agrupar por tipo (feat, fix, breaking, etc.)\n4. Generar CHANGELOG.md formateado\n5. Incluir links a PRs y issues\n6. Sugerir proximo numero de version'
  },
  {
    id: 'tech-spec-writer',
    name: 'Technical Spec Writer',
    description: 'Genera documentos de especificacion tecnica (RFC, ADR, design docs)',
    category: 'documentacion',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['spec', 'especificacion', 'specification', 'rfc', 'adr', 'design-doc', 'arquitectura', 'architecture', 'tecnico', 'technical', 'decision', 'propuesta', 'proposal'],
    commands: ['/generate-spec', '/generate-adr'],
    agents: ['spec-reviewer'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar contexto y problema a resolver\n2. Generar estructura: contexto, propuesta, alternativas\n3. Incluir diagramas (mermaid) si aplica\n4. Detallar trade-offs y riesgos\n5. Agregar criterios de exito\n6. Incluir plan de implementacion'
  },

  // ===========================================================================
  // TESTING (6 skills)
  // ===========================================================================
  {
    id: 'unit-test-gen',
    name: 'Unit Test Generator (Jest/Vitest)',
    description: 'Genera tests unitarios con Jest o Vitest incluyendo mocks y assertions',
    category: 'testing',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['test', 'unit', 'unitario', 'jest', 'vitest', 'describe', 'it', 'expect', 'mock', 'spy', 'assertion', 'coverage', 'tdd', 'testing', 'prueba'],
    commands: ['/generate-test', '/generate-unit-test'],
    agents: ['test-runner', 'coverage-analyzer'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Analizar funcion/modulo a testear\n2. Identificar casos: happy path, edge cases, errores\n3. Generar describe/it blocks\n4. Incluir mocks para dependencias externas\n5. Agregar assertions claras y descriptivas\n6. Verificar coverage minimo'
  },
  {
    id: 'e2e-test-gen',
    name: 'E2E Test Generator (Playwright/Cypress)',
    description: 'Genera tests end-to-end con Playwright o Cypress para flujos de usuario',
    category: 'testing',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['e2e', 'end-to-end', 'playwright', 'cypress', 'selenium', 'browser', 'navegador', 'flujo', 'flow', 'usuario', 'user', 'integracion', 'integration', 'testing', 'prueba', 'ui-test'],
    commands: ['/generate-e2e-test'],
    agents: ['e2e-runner'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar flujo de usuario a testear\n2. Generar Page Object Model si aplica\n3. Crear test con pasos del flujo\n4. Incluir assertions visuales y funcionales\n5. Agregar setup/teardown de datos\n6. Configurar retries y timeouts'
  },
  {
    id: 'api-test-gen',
    name: 'API Test Generator',
    description: 'Genera tests de API con supertest, httpie o herramientas similares',
    category: 'testing',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['api', 'test', 'supertest', 'request', 'endpoint', 'http', 'response', 'status', 'integracion', 'integration', 'postman', 'insomnia', 'testing', 'prueba'],
    commands: ['/generate-api-test'],
    agents: ['api-test-runner'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Analizar endpoints a testear\n2. Generar tests para cada metodo HTTP\n3. Incluir validacion de status codes\n4. Verificar estructura de response body\n5. Testear casos de error (400, 401, 404, 500)\n6. Incluir tests de autenticacion'
  },
  {
    id: 'test-data-faker',
    name: 'Test Data Faker',
    description: 'Genera datos falsos realistas para testing con Faker.js o similar',
    category: 'testing',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['faker', 'datos', 'data', 'mock', 'seed', 'factory', 'fixture', 'fake', 'random', 'generador', 'generator', 'testing', 'prueba', 'sample'],
    commands: ['/generate-test-data'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Preguntar tipo de entidad y campos\n2. Generar factory con Faker.js\n3. Incluir funciones para generar N registros\n4. Agregar seeds para reproducibilidad\n5. Exportar como fixtures JSON'
  },
  {
    id: 'coverage-reporter',
    name: 'Coverage Reporter',
    description: 'Configura y genera reportes de cobertura de tests con umbrales personalizados',
    category: 'testing',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['coverage', 'cobertura', 'reporte', 'report', 'istanbul', 'c8', 'nyc', 'threshold', 'umbral', 'porcentaje', 'percentage', 'testing'],
    commands: ['/configure-coverage'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Detectar test runner en uso\n2. Configurar herramienta de coverage\n3. Establecer umbrales minimos\n4. Generar reporte HTML y texto\n5. Configurar CI para verificar umbrales'
  },
  {
    id: 'snapshot-test-gen',
    name: 'Snapshot Test Generator',
    description: 'Genera tests de snapshot para componentes UI con actualizacion automatica',
    category: 'testing',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['snapshot', 'captura', 'visual', 'regression', 'regresion', 'componente', 'component', 'render', 'tree', 'testing', 'prueba', 'storybook'],
    commands: ['/generate-snapshot-test'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Identificar componentes a capturar\n2. Generar test con render y toMatchSnapshot\n3. Incluir variantes con diferentes props\n4. Configurar serializers custom si necesario\n5. Documentar proceso de actualizacion'
  },

  // ===========================================================================
  // SEGURIDAD (5 skills)
  // ===========================================================================
  {
    id: 'security-audit',
    name: 'Security Audit Scanner',
    description: 'Escanea proyecto en busca de vulnerabilidades comunes y malas practicas de seguridad',
    category: 'seguridad',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['seguridad', 'security', 'vulnerabilidad', 'vulnerability', 'audit', 'auditoria', 'scan', 'escaneo', 'owasp', 'xss', 'sql-injection', 'csrf', 'cve', 'dependencia', 'dependency'],
    commands: ['/audit-security', '/scan-vulnerabilities'],
    agents: ['vulnerability-scanner', 'dependency-checker'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Escanear dependencias con npm audit / snyk\n2. Buscar patrones inseguros en codigo (eval, innerHTML)\n3. Verificar headers de seguridad\n4. Revisar configuracion de CORS\n5. Generar reporte con severidad y remediation\n6. Priorizar por impacto'
  },
  {
    id: 'env-validator',
    name: '.env Validator',
    description: 'Valida archivos .env, detecta secretos expuestos y genera .env.example',
    category: 'seguridad',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['env', 'environment', 'variable', 'secreto', 'secret', 'api-key', 'token', 'config', 'configuracion', 'dotenv', 'seguridad', 'security', 'gitignore', 'expose'],
    commands: ['/validate-env'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Leer archivo .env existente\n2. Verificar que .env esta en .gitignore\n3. Detectar secretos con patrones (API keys, tokens)\n4. Generar .env.example sin valores sensibles\n5. Validar que todas las variables requeridas existen'
  },
  {
    id: 'auth-flow-gen',
    name: 'Auth Flow Generator (JWT/OAuth)',
    description: 'Genera flujos de autenticacion completos con JWT, OAuth 2.0 o session-based',
    category: 'seguridad',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['auth', 'autenticacion', 'authentication', 'jwt', 'oauth', 'token', 'session', 'login', 'registro', 'register', 'password', 'hash', 'bcrypt', 'seguridad', 'security', 'middleware'],
    commands: ['/generate-auth'],
    agents: ['auth-tester'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar tipo de auth (JWT, OAuth, session)\n2. Generar middleware de autenticacion\n3. Implementar registro y login\n4. Configurar refresh tokens si es JWT\n5. Agregar rate limiting y proteccion brute force\n6. Incluir manejo de roles/permisos'
  },
  {
    id: 'cors-configurator',
    name: 'CORS Configurator',
    description: 'Configura politicas CORS correctas para APIs y aplicaciones web',
    category: 'seguridad',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['cors', 'cross-origin', 'origin', 'header', 'preflight', 'options', 'allow', 'access-control', 'seguridad', 'security', 'api', 'browser', 'navegador'],
    commands: ['/configure-cors'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Preguntar origenes permitidos\n2. Configurar metodos y headers permitidos\n3. Generar middleware CORS\n4. Manejar preflight requests\n5. Documentar politica aplicada'
  },
  {
    id: 'csp-generator',
    name: 'Content Security Policy Generator',
    description: 'Genera politicas CSP para proteger contra XSS y ataques de inyeccion',
    category: 'seguridad',
    type: 'micro-skill',
    difficulty: 'apprentice',
    keywords: ['csp', 'content-security-policy', 'header', 'xss', 'inyeccion', 'injection', 'nonce', 'hash', 'directive', 'seguridad', 'security', 'policy', 'script-src'],
    commands: ['/generate-csp'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Analizar recursos del proyecto (scripts, estilos, imagenes)\n2. Generar directivas CSP apropiadas\n3. Configurar report-uri para monitoreo\n4. Testear con Content-Security-Policy-Report-Only\n5. Documentar cada directiva'
  },

  // ===========================================================================
  // DATOS (5 skills)
  // ===========================================================================
  {
    id: 'csv-json-transformer',
    name: 'CSV/JSON Transformer',
    description: 'Transforma datos entre formatos CSV, JSON, XML y otros con mapeo de campos',
    category: 'datos',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['csv', 'json', 'xml', 'transformar', 'transform', 'convertir', 'convert', 'parser', 'formato', 'format', 'mapeo', 'mapping', 'datos', 'data', 'etl'],
    commands: ['/transform-data'],
    agents: ['data-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar formato de entrada y salida\n2. Analizar estructura de datos fuente\n3. Definir mapeo de campos\n4. Generar script de transformacion\n5. Incluir validacion y manejo de errores\n6. Soportar streaming para archivos grandes'
  },
  {
    id: 'db-migration-gen',
    name: 'Database Migration Generator',
    description: 'Genera migraciones de base de datos con Prisma, Knex, TypeORM o SQL puro',
    category: 'datos',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['migracion', 'migration', 'database', 'base-de-datos', 'schema', 'tabla', 'table', 'columna', 'column', 'prisma', 'knex', 'typeorm', 'sequelize', 'sql', 'alter'],
    commands: ['/generate-migration'],
    agents: ['migration-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar ORM/herramienta en uso\n2. Definir cambios de schema deseados\n3. Generar archivo de migracion (up y down)\n4. Incluir seed data si aplica\n5. Validar que la migracion es reversible\n6. Documentar cambios'
  },
  {
    id: 'sql-query-builder',
    name: 'SQL Query Builder',
    description: 'Genera queries SQL optimizadas para consultas complejas con joins y agregaciones',
    category: 'datos',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['sql', 'query', 'consulta', 'select', 'join', 'where', 'group', 'aggregate', 'subquery', 'index', 'optimize', 'database', 'base-de-datos', 'postgres', 'mysql'],
    commands: ['/generate-query', '/optimize-query'],
    agents: ['query-optimizer'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar tablas y relaciones involucradas\n2. Definir filtros y condiciones\n3. Generar query SQL optimizada\n4. Incluir indices recomendados\n5. Explicar plan de ejecucion\n6. Proveer variante con query builder (Knex/Prisma)'
  },
  {
    id: 'data-validation-schema',
    name: 'Data Validation Schema',
    description: 'Genera schemas de validacion con Zod, Joi, Yup o JSON Schema',
    category: 'datos',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['validacion', 'validation', 'schema', 'zod', 'joi', 'yup', 'ajv', 'json-schema', 'tipo', 'type', 'constraint', 'datos', 'data', 'input', 'sanitize'],
    commands: ['/generate-schema', '/generate-validation'],
    agents: ['schema-tester'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar libreria de validacion preferida\n2. Definir estructura de datos a validar\n3. Generar schema con tipos y constraints\n4. Incluir mensajes de error personalizados\n5. Agregar transformaciones (trim, lowercase)\n6. Exportar tipos TypeScript inferidos'
  },
  {
    id: 'prisma-schema-gen',
    name: 'Prisma Schema Generator',
    description: 'Genera schemas Prisma con modelos, relaciones y configuracion de base de datos',
    category: 'datos',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['prisma', 'schema', 'modelo', 'model', 'relacion', 'relation', 'database', 'base-de-datos', 'orm', 'query', 'migrate', 'generator', 'datasource'],
    commands: ['/generate-prisma-schema'],
    agents: ['prisma-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar entidades del dominio\n2. Generar modelos Prisma con campos tipados\n3. Definir relaciones (1:1, 1:N, N:M)\n4. Incluir indices y constraints\n5. Configurar datasource y generator\n6. Generar seed script'
  },

  // ===========================================================================
  // PRODUCTIVIDAD (5 skills)
  // ===========================================================================
  {
    id: 'commit-message-gen',
    name: 'Git Commit Message Generator',
    description: 'Genera mensajes de commit siguiendo conventional commits con scope y body',
    category: 'productividad',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['git', 'commit', 'mensaje', 'message', 'conventional', 'feat', 'fix', 'chore', 'scope', 'breaking', 'semantic', 'versionado', 'versioning'],
    commands: ['/generate-commit'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Analizar cambios staged (git diff)\n2. Clasificar tipo (feat, fix, refactor, etc.)\n3. Detectar scope desde archivos cambiados\n4. Generar mensaje con formato conventional commits\n5. Incluir body descriptivo si es necesario'
  },
  {
    id: 'gitignore-gen',
    name: '.gitignore Generator',
    description: 'Genera archivos .gitignore personalizados segun lenguaje, framework y entorno',
    category: 'productividad',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['gitignore', 'git', 'ignorar', 'ignore', 'archivo', 'file', 'node_modules', 'build', 'dist', 'env', 'cache', 'temp', 'ide'],
    commands: ['/generate-gitignore'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Detectar lenguajes y frameworks del proyecto\n2. Generar reglas de exclusion apropiadas\n3. Incluir patrones para IDEs comunes\n4. Agregar exclusion de archivos sensibles (.env)\n5. Documentar cada seccion con comentarios'
  },
  {
    id: 'editorconfig-gen',
    name: '.editorconfig Generator',
    description: 'Genera archivo .editorconfig para mantener consistencia de estilo entre editores',
    category: 'productividad',
    type: 'micro-skill',
    difficulty: 'initiate',
    keywords: ['editorconfig', 'editor', 'formato', 'format', 'indent', 'tab', 'space', 'encoding', 'eol', 'consistencia', 'consistency', 'estilo', 'style'],
    commands: ['/generate-editorconfig'],
    agents: [],
    source: 'antigravity',
    complexity: 'micro',
    templateSnippet: '## Instrucciones\n1. Detectar convenciones del proyecto existente\n2. Generar .editorconfig con root = true\n3. Configurar indent_style y indent_size por tipo de archivo\n4. Establecer charset y end_of_line\n5. Agregar reglas especificas por extension'
  },
  {
    id: 'package-json-init',
    name: 'Package.json Initializer',
    description: 'Inicializa package.json con scripts, dependencias y configuracion optima',
    category: 'productividad',
    type: 'skill',
    difficulty: 'initiate',
    keywords: ['package', 'package.json', 'npm', 'yarn', 'pnpm', 'init', 'inicializar', 'initialize', 'script', 'dependencia', 'dependency', 'node', 'proyecto', 'project'],
    commands: ['/init-package'],
    agents: [],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar nombre y tipo de proyecto\n2. Generar package.json con metadata\n3. Incluir scripts utiles (dev, build, test, lint)\n4. Configurar type: module si aplica\n5. Agregar engines y files fields\n6. Sugerir dependencias comunes para el tipo de proyecto'
  },
  {
    id: 'eslint-prettier-config',
    name: 'ESLint & Prettier Config Generator',
    description: 'Genera configuracion de ESLint y Prettier compatible para el proyecto',
    category: 'productividad',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['eslint', 'prettier', 'lint', 'formato', 'format', 'regla', 'rule', 'config', 'configuracion', 'style', 'estilo', 'code-quality', 'calidad'],
    commands: ['/generate-lint-config'],
    agents: ['config-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Detectar framework y lenguaje del proyecto\n2. Generar eslint.config.js (flat config)\n3. Generar .prettierrc con reglas complementarias\n4. Resolver conflictos ESLint/Prettier\n5. Agregar scripts lint y format al package.json\n6. Incluir .eslintignore y .prettierignore'
  },

  // ===========================================================================
  // EDUCACION (3 skills)
  // ===========================================================================
  {
    id: 'course-content-gen',
    name: 'Course Content Generator',
    description: 'Genera contenido de cursos con modulos, lecciones y material complementario',
    category: 'educacion',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['curso', 'course', 'leccion', 'lesson', 'modulo', 'module', 'contenido', 'content', 'educacion', 'education', 'aprendizaje', 'learning', 'plan', 'syllabus', 'curriculum'],
    commands: ['/generate-course'],
    agents: ['content-reviewer'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar tema y nivel del publico objetivo\n2. Disenar estructura de modulos y lecciones\n3. Generar contenido con explicaciones progresivas\n4. Incluir ejemplos practicos por leccion\n5. Agregar recursos adicionales y lecturas\n6. Crear evaluaciones por modulo'
  },
  {
    id: 'quiz-exercise-gen',
    name: 'Quiz / Exercise Generator',
    description: 'Genera quizzes interactivos y ejercicios practicos de programacion',
    category: 'educacion',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['quiz', 'ejercicio', 'exercise', 'pregunta', 'question', 'respuesta', 'answer', 'practica', 'practice', 'challenge', 'reto', 'opcion-multiple', 'educacion', 'education'],
    commands: ['/generate-quiz', '/generate-exercise'],
    agents: ['answer-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar tema y dificultad\n2. Generar preguntas variadas (multiple choice, codigo, abierta)\n3. Incluir respuestas correctas y explicaciones\n4. Agregar hints progresivos\n5. Incluir rubrica de evaluacion'
  },
  {
    id: 'tutorial-creator',
    name: 'Tutorial Step-by-Step Creator',
    description: 'Genera tutoriales paso a paso con codigo funcional y explicaciones detalladas',
    category: 'educacion',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['tutorial', 'guia', 'guide', 'paso-a-paso', 'step-by-step', 'howto', 'como', 'how-to', 'ejemplo', 'example', 'educacion', 'education', 'walkthrough', 'beginner', 'principiante'],
    commands: ['/generate-tutorial'],
    agents: ['code-verifier'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar tema y prerrequisitos\n2. Dividir en pasos claros y secuenciales\n3. Incluir codigo funcional en cada paso\n4. Agregar explicaciones de cada bloque\n5. Incluir screenshots/diagramas si aplica\n6. Agregar seccion de troubleshooting'
  },

  // ===========================================================================
  // BLOCKCHAIN (3 skills)
  // ===========================================================================
  {
    id: 'smart-contract-gen',
    name: 'Smart Contract Generator (Solidity)',
    description: 'Genera smart contracts en Solidity con patrones de seguridad y testing',
    category: 'blockchain',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['solidity', 'smart-contract', 'contrato', 'contract', 'ethereum', 'evm', 'erc20', 'erc721', 'nft', 'token', 'blockchain', 'web3', 'hardhat', 'foundry', 'openzeppelin'],
    commands: ['/generate-contract'],
    agents: ['contract-auditor'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar tipo de contrato (ERC20, ERC721, custom)\n2. Generar contrato con patrones OpenZeppelin\n3. Incluir modifiers y access control\n4. Agregar eventos para transparencia\n5. Generar tests con Hardhat/Foundry\n6. Incluir script de deploy'
  },
  {
    id: 'dapp-frontend-gen',
    name: 'DApp Frontend Generator',
    description: 'Genera frontend de aplicaciones descentralizadas con conexion a blockchain',
    category: 'blockchain',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['dapp', 'frontend', 'blockchain', 'web3', 'ethers', 'wagmi', 'rainbowkit', 'metamask', 'wallet', 'connect', 'transaction', 'react', 'descentralizada'],
    commands: ['/generate-dapp-frontend'],
    agents: ['web3-validator'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar framework frontend (React, Next.js)\n2. Configurar wagmi/ethers para conexion\n3. Generar componente de conectar wallet\n4. Implementar lectura de datos on-chain\n5. Agregar funciones de escritura (transacciones)\n6. Manejar estados de transaccion'
  },
  {
    id: 'web3-wallet-integration',
    name: 'Web3 Wallet Integration',
    description: 'Integra wallets Web3 (MetaMask, WalletConnect) en aplicaciones web',
    category: 'blockchain',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['wallet', 'metamask', 'walletconnect', 'web3', 'conectar', 'connect', 'provider', 'signer', 'cuenta', 'account', 'balance', 'blockchain', 'chain', 'network'],
    commands: ['/integrate-wallet'],
    agents: ['wallet-tester'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar wallets a soportar\n2. Configurar Web3Modal o RainbowKit\n3. Generar hook de conexion\n4. Implementar deteccion de red/chain\n5. Manejar desconexion y cambio de cuenta\n6. Incluir UI de estado de conexion'
  },

  // ===========================================================================
  // CMS (3 skills)
  // ===========================================================================
  {
    id: 'wordpress-theme-gen',
    name: 'WordPress Theme Generator',
    description: 'Genera temas de WordPress con templates, funciones y soporte de Gutenberg',
    category: 'cms',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['wordpress', 'tema', 'theme', 'php', 'template', 'functions', 'gutenberg', 'block', 'bloque', 'cms', 'wp', 'loop', 'hook', 'filter', 'action'],
    commands: ['/generate-wp-theme'],
    agents: ['wp-validator'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar tipo de sitio (blog, corporativo, ecommerce)\n2. Generar estructura base del tema\n3. Crear templates principales (header, footer, single, archive)\n4. Incluir functions.php con hooks y filtros\n5. Agregar soporte de bloques Gutenberg\n6. Incluir theme.json para estilos globales'
  },
  {
    id: 'wordpress-plugin-gen',
    name: 'WordPress Plugin Generator',
    description: 'Genera plugins de WordPress con admin pages, shortcodes y REST API',
    category: 'cms',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['wordpress', 'plugin', 'extension', 'php', 'shortcode', 'admin', 'panel', 'settings', 'cms', 'wp', 'hook', 'filter', 'action', 'rest-api', 'widget'],
    commands: ['/generate-wp-plugin'],
    agents: ['wp-plugin-validator'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Preguntar funcionalidad del plugin\n2. Generar estructura de archivos del plugin\n3. Crear clase principal con hooks de activacion/desactivacion\n4. Incluir pagina de admin con settings API\n5. Agregar shortcodes si aplica\n6. Implementar REST API endpoints propios'
  },
  {
    id: 'headless-cms-integration',
    name: 'Headless CMS Integration',
    description: 'Integra CMS headless (Strapi, Contentful, Sanity) con frontend frameworks',
    category: 'cms',
    type: 'skill',
    difficulty: 'apprentice',
    keywords: ['headless', 'cms', 'strapi', 'contentful', 'sanity', 'api', 'contenido', 'content', 'integracion', 'integration', 'graphql', 'rest', 'frontend'],
    commands: ['/integrate-cms'],
    agents: ['cms-validator'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar CMS headless en uso\n2. Configurar cliente API (REST o GraphQL)\n3. Generar funciones de fetching tipadas\n4. Implementar preview mode / draft\n5. Agregar webhooks para revalidacion\n6. Incluir manejo de imagenes y assets'
  },

  // ===========================================================================
  // META-SKILL (3 skills)
  // ===========================================================================
  {
    id: 'skill-creator-meta',
    name: 'Skill Creator (Meta)',
    description: 'Genera nuevos skills para el SuperConstructor con estructura completa',
    category: 'meta-skill',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['skill', 'habilidad', 'crear', 'create', 'meta', 'constructor', 'generar', 'generate', 'template', 'plantilla', 'nuevo', 'new', 'superskill', 'claude'],
    commands: ['/create-skill'],
    agents: ['skill-validator', 'template-tester'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Preguntar descripcion del skill deseado\n2. Analizar complejidad y categoria\n3. Generar archivo SKILL.md con frontmatter YAML\n4. Incluir instrucciones detalladas\n5. Definir triggers y comandos\n6. Agregar ejemplos de uso'
  },
  {
    id: 'skill-analyzer',
    name: 'Skill Analyzer / Improver',
    description: 'Analiza skills existentes y sugiere mejoras en instrucciones, triggers y estructura',
    category: 'meta-skill',
    type: 'skill',
    difficulty: 'journeyman',
    keywords: ['analizar', 'analyze', 'mejorar', 'improve', 'optimizar', 'optimize', 'skill', 'habilidad', 'revision', 'review', 'calidad', 'quality', 'feedback', 'sugerencia', 'suggestion'],
    commands: ['/analyze-skill', '/improve-skill'],
    agents: ['quality-scorer'],
    source: 'antigravity',
    complexity: 'standard',
    templateSnippet: '## Instrucciones\n1. Leer skill existente (SKILL.md)\n2. Evaluar claridad de instrucciones\n3. Verificar completitud de triggers y comandos\n4. Analizar cobertura de edge cases\n5. Sugerir mejoras concretas\n6. Generar version mejorada'
  },
  {
    id: 'skill-combiner',
    name: 'Skill Combiner / Orchestrator',
    description: 'Combina multiples skills en flujos orquestados de mayor complejidad',
    category: 'meta-skill',
    type: 'skill',
    difficulty: 'expert',
    keywords: ['combinar', 'combine', 'orquestar', 'orchestrate', 'flujo', 'flow', 'pipeline', 'multi-skill', 'componer', 'compose', 'chain', 'cadena', 'workflow', 'meta'],
    commands: ['/combine-skills'],
    agents: ['orchestration-planner'],
    source: 'antigravity',
    complexity: 'complex',
    templateSnippet: '## Instrucciones\n1. Seleccionar skills a combinar\n2. Definir orden de ejecucion y dependencias\n3. Generar skill orquestador con pasos\n4. Configurar paso de datos entre skills\n5. Agregar manejo de errores entre pasos\n6. Incluir rollback strategy'
  }
];

// =============================================================================
// CATEGORIES REFERENCE
// =============================================================================

export const CATEGORIES = {
  'desarrollo-web': { label: 'Desarrollo Web', icon: 'globe' },
  'desarrollo-ia': { label: 'Desarrollo IA', icon: 'brain' },
  'automatizacion': { label: 'Automatizacion', icon: 'cog' },
  'documentacion': { label: 'Documentacion', icon: 'book' },
  'testing': { label: 'Testing', icon: 'flask' },
  'seguridad': { label: 'Seguridad', icon: 'shield' },
  'datos': { label: 'Datos', icon: 'database' },
  'productividad': { label: 'Productividad', icon: 'rocket' },
  'educacion': { label: 'Educacion', icon: 'graduation-cap' },
  'blockchain': { label: 'Blockchain', icon: 'link' },
  'cms': { label: 'CMS', icon: 'layout' },
  'meta-skill': { label: 'Meta-Skill', icon: 'layers' }
};

// =============================================================================
// SEARCH HELPERS
// =============================================================================

/**
 * Search the skills database using fuzzy keyword matching.
 *
 * Normalizes the query to lowercase, splits into individual words, and scores
 * each skill by how many of its keywords, name tokens, or description tokens
 * partially match any query word. Returns the top `limit` results sorted by
 * descending score, only including results above a 15% threshold.
 *
 * @param {string} query - The search query string.
 * @param {number} [limit=5] - Maximum number of results to return.
 * @returns {Array<Object>} Matching skills with an added `score` property (0-100).
 */
export function searchSkills(query, limit = 5) {
  if (!query || typeof query !== 'string') return [];

  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery.length === 0) return [];

  const queryWords = normalizedQuery
    .split(/\s+/)
    .filter((w) => w.length > 1);

  if (queryWords.length === 0) return [];

  const scored = skillsDatabase.map((skill) => {
    let matchedWords = 0;

    for (const qWord of queryWords) {
      // Check keywords (partial match)
      const keywordMatch = skill.keywords.some((kw) => kw.includes(qWord) || qWord.includes(kw));

      // Check name tokens (partial match)
      const nameTokens = skill.name.toLowerCase().split(/\s+/);
      const nameMatch = nameTokens.some((nt) => nt.includes(qWord) || qWord.includes(nt));

      // Check description tokens (partial match)
      const descTokens = skill.description.toLowerCase().split(/\s+/);
      const descMatch = descTokens.some((dt) => dt.includes(qWord) || qWord.includes(dt));

      // Check category
      const categoryMatch = skill.category.includes(qWord) || qWord.includes(skill.category);

      if (keywordMatch || nameMatch || descMatch || categoryMatch) {
        matchedWords++;
      }
    }

    const score = (matchedWords / queryWords.length) * 100;

    return { ...skill, score };
  });

  return scored
    .filter((s) => s.score > 15)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// =============================================================================
// PROMPT ANALYZER
// =============================================================================

/**
 * Analyze a user prompt and extract structured suggestions for skill creation.
 *
 * Performs keyword detection to suggest a category, type, difficulty, triggers,
 * commands, tags, and platforms. Useful for the SuperConstructor to pre-fill
 * skill metadata based on a natural-language description.
 *
 * @param {string} prompt - The user's natural language description.
 * @returns {Object} An object containing all suggestions.
 */
export function analyzePrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return {
      suggestedName: '',
      suggestedCategory: 'desarrollo-web',
      suggestedType: 'skill',
      suggestedDifficulty: 'apprentice',
      suggestedTriggers: [],
      suggestedCommands: [],
      needsAgents: false,
      suggestedPlatforms: ['claude-code'],
      suggestedTags: []
    };
  }

  const lower = prompt.toLowerCase();
  const words = lower.split(/\s+/).filter((w) => w.length > 1);

  // ---------------------------------------------------------------------------
  // Category detection
  // ---------------------------------------------------------------------------
  const categoryKeywords = {
    'desarrollo-web': ['react', 'vue', 'svelte', 'next', 'nextjs', 'express', 'api', 'rest', 'graphql', 'html', 'css', 'tailwind', 'frontend', 'backend', 'web', 'componente', 'component', 'pagina', 'page', 'endpoint', 'server', 'servidor', 'website', 'sitio'],
    'desarrollo-ia': ['ia', 'ai', 'llm', 'gpt', 'claude', 'prompt', 'embedding', 'rag', 'agent', 'agente', 'modelo', 'model', 'chain', 'langchain', 'fine-tune', 'finetune', 'neural', 'machine-learning', 'ml', 'deep-learning'],
    'automatizacion': ['github-actions', 'workflow', 'ci', 'cd', 'cicd', 'docker', 'pipeline', 'cron', 'script', 'shell', 'bash', 'makefile', 'terraform', 'deploy', 'despliegue', 'automation', 'automatizar', 'automatizacion'],
    'documentacion': ['readme', 'documentacion', 'documentation', 'docs', 'jsdoc', 'tsdoc', 'swagger', 'openapi', 'changelog', 'spec', 'especificacion', 'adr', 'rfc'],
    'testing': ['test', 'testing', 'prueba', 'jest', 'vitest', 'playwright', 'cypress', 'e2e', 'unitario', 'unit', 'coverage', 'cobertura', 'mock', 'snapshot', 'tdd'],
    'seguridad': ['seguridad', 'security', 'auth', 'autenticacion', 'jwt', 'oauth', 'cors', 'csrf', 'xss', 'vulnerabilidad', 'audit', 'csp', 'encryption', 'cifrado'],
    'datos': ['csv', 'json', 'xml', 'database', 'base-de-datos', 'sql', 'migracion', 'migration', 'prisma', 'schema', 'validacion', 'validation', 'datos', 'data', 'etl', 'transform'],
    'productividad': ['git', 'commit', 'gitignore', 'editorconfig', 'package.json', 'npm', 'eslint', 'prettier', 'lint', 'formato', 'format', 'config', 'setup', 'inicializar', 'init'],
    'educacion': ['curso', 'course', 'leccion', 'lesson', 'tutorial', 'quiz', 'ejercicio', 'exercise', 'educacion', 'education', 'aprendizaje', 'learning', 'ensenar', 'teach'],
    'blockchain': ['blockchain', 'solidity', 'smart-contract', 'contrato', 'ethereum', 'web3', 'nft', 'token', 'erc20', 'erc721', 'wallet', 'dapp', 'descentralizada'],
    'cms': ['wordpress', 'wp', 'cms', 'tema', 'theme', 'plugin', 'strapi', 'contentful', 'sanity', 'headless', 'gutenberg'],
    'meta-skill': ['skill', 'meta', 'constructor', 'crear-skill', 'analizar-skill', 'combinar', 'orquestar']
  };

  const categoryScores = {};
  for (const [cat, kws] of Object.entries(categoryKeywords)) {
    categoryScores[cat] = 0;
    for (const kw of kws) {
      if (lower.includes(kw)) {
        categoryScores[cat]++;
      }
    }
  }
  const suggestedCategory = Object.entries(categoryScores)
    .sort(([, a], [, b]) => b - a)[0][1] > 0
    ? Object.entries(categoryScores).sort(([, a], [, b]) => b - a)[0][0]
    : 'desarrollo-web';

  // ---------------------------------------------------------------------------
  // Type / complexity detection
  // ---------------------------------------------------------------------------
  const microWords = ['simple', 'sencillo', 'basico', 'basic', 'rapido', 'quick', 'micro', 'pequeno', 'small', 'mini', 'unico', 'single'];
  const complexWords = ['complejo', 'complex', 'pipeline', 'avanzado', 'advanced', 'multi', 'orquestar', 'orchestrate', 'enterprise', 'full', 'completo', 'integrar', 'integrate', 'sistema', 'system'];

  let suggestedType = 'skill';
  const hasMicro = microWords.some((w) => lower.includes(w));
  const hasComplex = complexWords.some((w) => lower.includes(w));

  if (hasMicro && !hasComplex) {
    suggestedType = 'micro-skill';
  } else if (lower.includes('plugin')) {
    suggestedType = 'plugin';
  }

  // ---------------------------------------------------------------------------
  // Difficulty detection
  // ---------------------------------------------------------------------------
  let suggestedDifficulty = 'apprentice';
  if (hasMicro) {
    suggestedDifficulty = 'initiate';
  } else if (hasComplex) {
    suggestedDifficulty = 'journeyman';
  }
  const expertWords = ['experto', 'expert', 'profesional', 'professional', 'enterprise', 'produccion', 'production'];
  if (expertWords.some((w) => lower.includes(w))) {
    suggestedDifficulty = 'expert';
  }

  // ---------------------------------------------------------------------------
  // Name generation (kebab-case from key nouns)
  // ---------------------------------------------------------------------------
  const stopWords = new Set([
    'un', 'una', 'el', 'la', 'los', 'las', 'de', 'del', 'en', 'con', 'para',
    'por', 'que', 'se', 'y', 'o', 'a', 'al', 'es', 'son', 'como', 'the',
    'a', 'an', 'of', 'in', 'with', 'for', 'and', 'or', 'to', 'is', 'are',
    'this', 'that', 'it', 'its', 'my', 'me', 'i', 'you', 'we', 'they',
    'do', 'does', 'did', 'be', 'been', 'being', 'have', 'has', 'had',
    'will', 'would', 'could', 'should', 'can', 'may', 'might', 'shall',
    'quiero', 'necesito', 'crear', 'crea', 'haz', 'hazme', 'genera', 'generar',
    'skill', 'una', 'uno', 'sea', 'pueda', 'tenga', 'haga', 'detecte', 'siga',
    'sus', 'las', 'los', 'del', 'proyecto', 'actual',
    'want', 'need', 'create', 'make', 'build', 'generate', 'should', 'also'
  ]);

  const keyNouns = words
    .map((w) => w.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9-]/g, ''))
    .filter((w) => w.length > 2 && !stopWords.has(w))
    .slice(0, 5);
  const suggestedName = keyNouns.join('-') || 'custom-skill';

  // ---------------------------------------------------------------------------
  // Triggers extraction
  // ---------------------------------------------------------------------------
  const triggerPatterns = [
    /(?:cuando|when)\s+(.+?)(?:\.|,|$)/gi,
    /(?:si|if)\s+(.+?)(?:\.|,|$)/gi,
    /(?:cada vez que|every time)\s+(.+?)(?:\.|,|$)/gi
  ];
  const suggestedTriggers = [];
  for (const pattern of triggerPatterns) {
    let match;
    while ((match = pattern.exec(lower)) !== null) {
      suggestedTriggers.push(match[1].trim());
    }
  }

  // ---------------------------------------------------------------------------
  // Commands extraction (from action verbs)
  // ---------------------------------------------------------------------------
  const verbToCommand = {
    'genera': '/generate',
    'generar': '/generate',
    'generate': '/generate',
    'crea': '/create',
    'crear': '/create',
    'create': '/create',
    'analiza': '/analyze',
    'analizar': '/analyze',
    'analyze': '/analyze',
    'convierte': '/convert',
    'convertir': '/convert',
    'convert': '/convert',
    'transforma': '/transform',
    'transformar': '/transform',
    'transform': '/transform',
    'valida': '/validate',
    'validar': '/validate',
    'validate': '/validate',
    'optimiza': '/optimize',
    'optimizar': '/optimize',
    'optimize': '/optimize',
    'escanea': '/scan',
    'escanear': '/scan',
    'scan': '/scan',
    'configura': '/configure',
    'configurar': '/configure',
    'configure': '/configure',
    'deploy': '/deploy',
    'desplegar': '/deploy',
    'despliega': '/deploy',
    'build': '/build',
    'construir': '/build',
    'construye': '/build',
    'test': '/test',
    'testear': '/test',
    'prueba': '/test',
    'migra': '/migrate',
    'migrar': '/migrate',
    'migrate': '/migrate',
    'documenta': '/document',
    'documentar': '/document',
    'document': '/document',
    'lint': '/lint',
    'format': '/format',
    'formatear': '/format',
    'refactorizar': '/refactor',
    'refactor': '/refactor'
  };

  const suggestedCommands = [];
  const seenCommands = new Set();
  for (const word of words) {
    const cleaned = word.replace(/[^a-z]/g, '');
    if (verbToCommand[cleaned] && !seenCommands.has(verbToCommand[cleaned])) {
      seenCommands.add(verbToCommand[cleaned]);
      suggestedCommands.push(verbToCommand[cleaned]);
    }
  }
  if (suggestedCommands.length === 0) {
    suggestedCommands.push('/run');
  }

  // ---------------------------------------------------------------------------
  // Agents detection
  // ---------------------------------------------------------------------------
  const agentIndicators = ['validar', 'validate', 'verificar', 'verify', 'review', 'revisar', 'multi', 'pipeline', 'chain', 'orchestrate', 'orquestar', 'agent', 'agente', 'complex', 'complejo'];
  const needsAgents = agentIndicators.some((w) => lower.includes(w));

  // ---------------------------------------------------------------------------
  // Platform detection
  // ---------------------------------------------------------------------------
  const suggestedPlatforms = ['claude-code'];
  if (lower.includes('vscode') || lower.includes('vs code') || lower.includes('visual studio')) {
    suggestedPlatforms.push('vscode');
  }
  if (lower.includes('cursor')) {
    suggestedPlatforms.push('cursor');
  }
  if (lower.includes('terminal') || lower.includes('cli') || lower.includes('consola')) {
    suggestedPlatforms.push('cli');
  }
  if (lower.includes('web') || lower.includes('browser') || lower.includes('navegador')) {
    suggestedPlatforms.push('web');
  }

  // ---------------------------------------------------------------------------
  // Tags extraction
  // ---------------------------------------------------------------------------
  const allKnownTags = [
    'react', 'vue', 'svelte', 'next', 'express', 'node', 'typescript', 'javascript',
    'python', 'rust', 'go', 'java', 'php', 'ruby', 'swift', 'kotlin',
    'docker', 'kubernetes', 'aws', 'gcp', 'azure', 'vercel', 'netlify',
    'postgres', 'mysql', 'mongodb', 'redis', 'sqlite',
    'graphql', 'rest', 'grpc', 'websocket',
    'tailwind', 'sass', 'scss', 'css',
    'jest', 'vitest', 'playwright', 'cypress',
    'prisma', 'drizzle', 'typeorm', 'sequelize',
    'openai', 'anthropic', 'langchain', 'huggingface',
    'solidity', 'ethereum', 'web3',
    'wordpress', 'strapi', 'contentful', 'sanity'
  ];

  const suggestedTags = allKnownTags.filter((tag) => lower.includes(tag));

  return {
    suggestedName,
    suggestedCategory,
    suggestedType,
    suggestedDifficulty,
    suggestedTriggers,
    suggestedCommands,
    needsAgents,
    suggestedPlatforms,
    suggestedTags
  };
}
