# Prompts de Infografia — La Forja de Skills

## 1. Que es un Skill
**Descripcion**: Diagrama de 3 columnas comparando Command vs Agent vs Skill. Columna izquierda: Command (icono de terminal, simple, /nombre). Centro: Agent (icono de robot, autonomo, subproceso). Derecha: Skill (icono de libro abierto con engranajes, completo, auto-activacion). Flechas mostrando que un Skill puede contener Commands y Agents.
**Estilo**: flat design, colores azul-naranja-verde, fondo oscuro, tipografia moderna
**Plataforma**: 1200x800px, formato curso online

## 2. Anatomia de SKILL.md
**Descripcion**: Diagrama vertical de un archivo SKILL.md desglosado en 3 capas con colores distintos. Capa 1 (azul, arriba): Frontmatter YAML con name, description, author. Capa 2 (verde, centro): Body Markdown con proposito, instrucciones, reglas. Capa 3 (naranja, abajo): Recursos bundled con iconos de carpetas commands/, agents/, references/, templates/. Flecha lateral indicando 'Progressive Disclosure: se carga de arriba a abajo segun necesidad'.
**Estilo**: flat design, capas apiladas, fondo oscuro, bordes redondeados
**Plataforma**: 1200x900px, formato curso online

## 3. Frontmatter y Triggers
**Descripcion**: Comparacion lado a lado de un frontmatter malo vs bueno. Izquierda (rojo): frontmatter con description de 1 linea vaga, sin exclusiones. Derecha (verde): frontmatter con description multi-linea, 4 triggers, 2 exclusiones, todos los campos. Flechas rojas senalando problemas a la izquierda, checks verdes a la derecha.
**Estilo**: split screen, rojo vs verde, iconos de error/check, fondo oscuro
**Plataforma**: 1200x800px, formato curso online

## 4. Progressive Disclosure
**Descripcion**: Piramide de 3 niveles representando progressive disclosure. Base (gris): Nivel 1 - Frontmatter, siempre cargado, ~100 palabras, icono de catalogo. Medio (azul): Nivel 2 - Body SKILL.md, al activar, 200-500 lineas, icono de libro abierto. Cima (dorado): Nivel 3 - Recursos, bajo demanda, sin limite, iconos de carpetas. Flecha lateral: 'Contexto usado' de poco (base) a mucho (cima).
**Estilo**: piramide isometrica, degradado gris-azul-dorado, fondo oscuro
**Plataforma**: 1200x800px, formato curso online

## 5. Agents y Subagents
**Descripcion**: Diagrama de flujo mostrando SKILL.md en el centro enviando tareas a 3 agentes en paralelo. SKILL.md (cuadro verde) con flechas hacia: Agent 1 - Analyzer (cuadro azul), Agent 2 - Generator (cuadro naranja), Agent 3 - Tester (cuadro morado). Cada agente tiene su burbuja de contexto aislada. Flechas de retorno con resultados hacia SKILL.md.
**Estilo**: flow diagram, burbujas de contexto, colores diferenciados por agente, fondo oscuro
**Plataforma**: 1200x800px, formato curso online

## 6. Scripts y References
**Descripcion**: Grid 2x2 mostrando los 4 tipos de recursos. Top-left (azul): references/ con icono de libro - 'Documentacion pasiva, Claude lee'. Top-right (verde): scripts/ con icono de engranaje - 'Codigo activo, resultado exacto'. Bottom-left (naranja): templates/ con icono de formulario - 'Plantillas con {{placeholders}}'. Bottom-right (morado): agents/ con icono de robot - 'Subprocesos autonomos'. Centro: SKILL.md coordinando todo.
**Estilo**: grid 2x2, iconos grandes, colores por tipo, fondo oscuro
**Plataforma**: 1200x800px, formato curso online

## 7. Micro-Skills
**Descripcion**: Comparacion visual de micro-skill vs skill completa. Izquierda: caja pequena y compacta 'Micro-Skill' con un solo archivo SKILL.md, flecha '<=100 lineas', iconos de destornillador (una herramienta). Derecha: caja grande 'Skill Completa' con arbol de carpetas, flecha '100-500 lineas', icono de cuchillo suizo. Linea punteada entre ambos con etiqueta 'Promover cuando crece'.
**Estilo**: comparacion side-by-side, tamanos proporcionales, fondo oscuro
**Plataforma**: 1200x800px, formato curso online

## 8. Crear Skill desde Cero
**Descripcion**: Pipeline horizontal de 7 pasos representados como estaciones de una linea de produccion. Cada estacion tiene un icono y nombre: 1-Intent (microfono), 2-Clasificacion (balanza), 3-Generacion (engranaje), 4-Validacion (check), 5-Testing (probeta), 6-Catalogacion (etiqueta), 7-Almacenamiento (caja). Flechas conectando estaciones. Debajo de cada una, una linea describiendo la accion.
**Estilo**: linea de produccion horizontal, iconos industriales, colores progresivos azul a verde
**Plataforma**: 1400x600px, formato curso online panoramico

## 9. Testing y Evaluacion
**Descripcion**: Pipeline de testing en 4 fases horizontales. Fase 1: evals.json (icono de lista) con test cases. Fase 2: Runner (icono de play) ejecutando con subagentes. Fase 3: Grader (icono de lupa) evaluando assertions. Fase 4: Benchmark (icono de grafico) con pass rate y metricas. Debajo: screenshot del viewer HTML mostrando resultados verdes/rojos.
**Estilo**: pipeline horizontal, iconos de laboratorio, verde para pass / rojo para fail
**Plataforma**: 1400x700px, formato curso online

## 10. Mejora Iterativa
**Descripcion**: Ciclo de mejora continua en forma de espiral ascendente. En la base: 'v1.0 Score: 62'. Primer giro: 'Analisis con rubrica' → 'Propuesta de mejoras' → 'Aplicacion'. Segundo nivel: 'v1.1 Score: 78'. Segundo giro: 'Testing con evals' → 'Description optimization' → 'Comparacion ciega'. Tercer nivel: 'v2.0 Score: 91'. En el centro de la espiral: icono de sinapsis alimentando instincts.
**Estilo**: espiral ascendente 3D, numeros de score grandes, colores progresivos rojo→amarillo→verde
**Plataforma**: 1200x900px, formato curso online

## 11. Fusion de Skills
**Descripcion**: 3 paneles mostrando las 3 estrategias de fusion. Panel 1 'Merge': dos circulos solapados que se funden en uno (diagrama Venn). Panel 2 'Compose': dos circulos separados conectados por un cuadro central 'Orquestador'. Panel 3 'Layer': un circulo grande (base) con un circulo mas pequeno encima (extension). Debajo de cada panel: cuando usar, ejemplo.
**Estilo**: 3 paneles horizontales, diagramas de conjuntos, colores azul-naranja-verde
**Plataforma**: 1400x600px, formato curso online panoramico

## 12. Catalogar y Organizar
**Descripcion**: Dashboard visual del catalogo. Arriba: barra de busqueda con /skill-catalog --search. Centro: grid de 12 categorias como tarjetas con icono, nombre y conteo. Derecha: panel de estadisticas (total skills, distribucion por tipo, quality promedio). Abajo: ejemplo de entrada expandida con todos los campos.
**Estilo**: dashboard UI, tarjetas con sombra, iconos por categoria, fondo oscuro tipo IDE
**Plataforma**: 1400x900px, formato curso online

## 13. Plugins en Claude Code
**Descripcion**: Diagrama de ecosistema de plugins con 3 zonas. Zona Creador (izquierda): estructura del plugin con .claude-plugin/ y skills/. Zona Marketplace (centro): repo Git con marketplace.json e indice de plugins. Zona Usuario (derecha): ~/.claude/plugins/ con marketplaces clonados. Flechas: Creador→push→Marketplace→clone→Usuario. Debajo: ejemplo de invocacion 'mi-plugin:mi-skill'.
**Estilo**: diagrama de ecosistema, 3 zonas con colores distintos, flechas de flujo, fondo oscuro
**Plataforma**: 1400x800px, formato curso online
