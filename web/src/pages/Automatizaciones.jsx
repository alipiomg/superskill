import { useState } from 'react';
import { Timer, Monitor, Rocket, Shield, Database, Bell, BarChart3, Wrench, ChevronDown, ChevronRight, Terminal, Clock, Globe, Zap, CheckCircle, AlertTriangle, Copy } from 'lucide-react';

const sections = [
  {
    id: 'programaciones',
    icon: Timer,
    title: 'Tareas Programadas (Cron)',
    color: 'forge',
    description: 'Automatiza tareas recurrentes: backups, reportes, limpieza, sincronización',
    content: {
      intro: 'Las tareas programadas son el corazón de cualquier sistema de automatización. Con Claude Code puedes crear skills que se ejecuten automáticamente en intervalos definidos.',
      items: [
        {
          title: 'Cron Jobs con Claude Code',
          description: 'Usa el comando /schedule para crear tareas programadas directamente desde Claude Code. Se ejecutan en segundo plano.',
          code: '# Cada 6 horas: backup de base de datos\n/schedule "0 */6 * * *" "Backup DB producción"\n\n# Cada lunes a las 9am: reporte semanal\n/schedule "0 9 * * 1" "Genera reporte semanal de métricas"\n\n# Cada noche a las 3am: limpieza de logs\n/schedule "0 3 * * *" "Limpia logs mayores a 30 días"',
        },
        {
          title: 'Cron del Sistema (Linux/Mac)',
          description: 'Para servidores en producción, usa crontab del sistema operativo para máxima fiabilidad.',
          code: '# Editar crontab\ncrontab -e\n\n# Backup diario a las 2am\n0 2 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1\n\n# Health check cada 5 minutos\n*/5 * * * * curl -sf https://tudominio.com/health || /usr/local/bin/alert.sh\n\n# Renovar SSL cada mes\n0 0 1 * * certbot renew --quiet\n\n# Limpiar caché cada domingo\n0 4 * * 0 redis-cli FLUSHDB',
        },
        {
          title: 'GitHub Actions Programadas',
          description: 'Para proyectos en GitHub, usa workflows con schedule para CI/CD automático.',
          code: '# .github/workflows/scheduled.yml\nname: Tareas Programadas\non:\n  schedule:\n    - cron: "0 9 * * 1"  # Lunes 9am\n  workflow_dispatch:  # También manual\n\njobs:\n  weekly-report:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm run generate-report\n      - run: npm run send-email-report',
        },
      ],
    },
  },
  {
    id: 'monitorizacion',
    icon: Monitor,
    title: 'Monitorización y Health Checks',
    color: 'green',
    description: 'Vigila que tus webs estén online, rápidas y sin errores 24/7',
    content: {
      intro: 'Monitorizar tus webs en producción es crítico. Un sistema de health checks detecta problemas antes de que tus usuarios los noten.',
      items: [
        {
          title: 'Health Check Endpoint',
          description: 'Crea un endpoint /health en cada web que verifique el estado de todos los servicios.',
          code: '// api/health.js (Next.js / Express)\nexport default async function handler(req, res) {\n  const checks = {\n    server: "ok",\n    database: await checkDB(),\n    cache: await checkRedis(),\n    disk: checkDiskSpace(),\n    memory: process.memoryUsage().heapUsed < 500_000_000 ? "ok" : "warning",\n    uptime: process.uptime() + "s",\n  };\n\n  const allOk = Object.values(checks).every(\n    v => v === "ok" || typeof v === "string"\n  );\n\n  res.status(allOk ? 200 : 503).json({\n    status: allOk ? "healthy" : "degraded",\n    timestamp: new Date().toISOString(),\n    checks,\n  });\n}',
        },
        {
          title: 'Script de Monitorización',
          description: 'Un script que verifica múltiples webs y te alerta si alguna cae.',
          code: '#!/bin/bash\n# monitor.sh — Ejecutar cada 5 min con cron\n\nSITES=(\n  "https://mitienda.com"\n  "https://api.mitienda.com/health"\n  "https://admin.mitienda.com"\n)\n\nfor site in "${SITES[@]}"; do\n  status=$(curl -o /dev/null -s -w "%{http_code}" --max-time 10 "$site")\n  if [ "$status" != "200" ]; then\n    echo "[ALERTA] $site respondió $status" | \\\n      mail -s "⚠️ Web caída: $site" tu@email.com\n    # O enviar a Slack/Telegram\n    curl -X POST "$SLACK_WEBHOOK" \\\n      -d "{\\\"text\\\": \\\"🚨 $site está caída (HTTP $status)\\\"}" \n  fi\ndone',
        },
        {
          title: 'Herramientas de Monitorización',
          description: 'Servicios que puedes usar para monitorizar sin mantener infraestructura propia.',
          list: [
            { name: 'UptimeRobot', desc: 'Gratis hasta 50 monitores. Checks cada 5 min. Alertas por email/Slack/SMS.' },
            { name: 'Better Stack', desc: 'Monitorización + gestión de incidentes + status pages. Plan gratis generoso.' },
            { name: 'Grafana Cloud', desc: 'Dashboards de métricas. Integra con Prometheus, Loki, Tempo. Gratis hasta 10k métricas.' },
            { name: 'Sentry', desc: 'Tracking de errores en frontend y backend. Imprescindible para producción.' },
            { name: 'Vercel/Netlify Analytics', desc: 'Si usas estos hostings, ya tienes analytics y monitorización incluida.' },
          ],
        },
      ],
    },
  },
  {
    id: 'deploys',
    icon: Rocket,
    title: 'Deploys Automáticos (CI/CD)',
    color: 'blue',
    description: 'Push to deploy: que cada commit vaya a producción de forma segura',
    content: {
      intro: 'Un pipeline de CI/CD bien configurado te permite hacer deploy con confianza: tests automáticos, build, preview y producción.',
      items: [
        {
          title: 'Pipeline Básico con GitHub Actions',
          description: 'Test → Build → Deploy en cada push a main. Con preview en PRs.',
          code: '# .github/workflows/deploy.yml\nname: Deploy\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n\n  deploy:\n    needs: test\n    if: github.ref == \'refs/heads/main\'\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm run build\n      - name: Deploy to production\n        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}',
        },
        {
          title: 'Estrategias de Deploy',
          description: 'Diferentes formas de desplegar según tu nivel de riesgo.',
          list: [
            { name: 'Deploy directo', desc: 'Push → producción. Simple pero arriesgado. Ideal para proyectos pequeños.' },
            { name: 'Preview deploys', desc: 'Cada PR genera una URL de preview. Verificas antes de mergear. Vercel/Netlify lo hacen automático.' },
            { name: 'Blue-Green', desc: 'Dos entornos idénticos. Cambias tráfico de uno a otro. Rollback instantáneo.' },
            { name: 'Canary', desc: 'Nuevo deploy al 5% de usuarios. Si no hay errores, subes al 100% gradualmente.' },
            { name: 'Feature flags', desc: 'Deploy código desactivado. Activas features remotamente sin redeploy.' },
          ],
        },
        {
          title: 'Rollback Rápido',
          description: 'Siempre ten un plan de rollback. En Vercel/Netlify es un click.',
          code: '# Rollback con Vercel\nvercel rollback\n\n# Rollback con git\ngit revert HEAD --no-edit\ngit push origin main\n\n# Rollback con Docker\ndocker service update --rollback mi-servicio\n\n# Script de rollback automático\n#!/bin/bash\nHEALTH=$(curl -s -o /dev/null -w "%{http_code}" https://miweb.com/health)\nif [ "$HEALTH" != "200" ]; then\n  echo "Deploy fallido, haciendo rollback..."\n  vercel rollback --token=$VERCEL_TOKEN\n  curl -X POST "$SLACK_WEBHOOK" -d \'{"text":"🔄 Rollback automático ejecutado"}\'\nfi',
        },
      ],
    },
  },
  {
    id: 'backups',
    icon: Database,
    title: 'Backups Automáticos',
    color: 'purple',
    description: 'Copias de seguridad automáticas de bases de datos, archivos y configuraciones',
    content: {
      intro: 'La regla 3-2-1: 3 copias, en 2 medios diferentes, 1 fuera del sitio. Automatízalo para no depender de tu memoria.',
      items: [
        {
          title: 'Backup de Base de Datos',
          description: 'Script para backup automático de PostgreSQL/MySQL con rotación.',
          code: '#!/bin/bash\n# backup-db.sh — Ejecutar diariamente con cron\n\nDATE=$(date +%Y%m%d_%H%M)\nBACKUP_DIR="/backups/db"\nRETENTION=30  # días\n\n# PostgreSQL\npg_dump -h localhost -U usuario mi_db | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"\n\n# MySQL\n# mysqldump -u usuario -p mi_db | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"\n\n# Subir a S3\naws s3 cp "$BACKUP_DIR/db_$DATE.sql.gz" s3://mi-bucket-backups/db/\n\n# Limpiar backups viejos\nfind "$BACKUP_DIR" -type f -mtime +$RETENTION -delete\n\necho "[$(date)] Backup completado: db_$DATE.sql.gz"',
        },
        {
          title: 'Backup de Archivos y Código',
          description: 'Git ya es un backup de código, pero necesitas backup de uploads, env files y configs.',
          code: '#!/bin/bash\n# backup-files.sh\n\nDATE=$(date +%Y%m%d)\n\n# Archivos que NO están en git\ntar -czf "/backups/uploads_$DATE.tar.gz" \\\n  /var/www/mi-web/uploads/ \\\n  /var/www/mi-web/.env \\\n  /etc/nginx/sites-available/ \\\n  /etc/letsencrypt/\n\n# Subir a almacenamiento externo\nrclone copy "/backups/uploads_$DATE.tar.gz" gdrive:backups/\n\n# Verificar integridad\ntar -tzf "/backups/uploads_$DATE.tar.gz" > /dev/null 2>&1\nif [ $? -eq 0 ]; then\n  echo "✅ Backup verificado"\nelse\n  echo "❌ Backup corrupto" | mail -s "Error backup" tu@email.com\nfi',
        },
        {
          title: 'Servicios de Backup Gestionados',
          description: 'Si no quieres mantener scripts propios.',
          list: [
            { name: 'PlanetScale/Supabase', desc: 'Backups automáticos de DB incluidos. Point-in-time recovery.' },
            { name: 'AWS S3 + Lifecycle', desc: 'Almacenamiento barato con reglas de retención automática. Glacier para largo plazo.' },
            { name: 'Restic / Borg', desc: 'Herramientas de backup incrementales, encriptadas y deduplicadas. Open source.' },
            { name: 'GitHub/GitLab', desc: 'Tu código ya tiene backup con cada push. Activa branch protection.' },
          ],
        },
      ],
    },
  },
  {
    id: 'alertas',
    icon: Bell,
    title: 'Sistema de Alertas',
    color: 'red',
    description: 'Notificaciones instantáneas cuando algo falla: Slack, Telegram, email, SMS',
    content: {
      intro: 'De nada sirve monitorizar si no te enteras cuando algo falla. Configura alertas en los canales que realmente mires.',
      items: [
        {
          title: 'Alertas a Slack',
          description: 'Webhook de Slack para notificaciones del equipo.',
          code: '// utils/alert.js\nconst SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;\n\nexport async function alertSlack(message, level = "warning") {\n  const emoji = { error: "🚨", warning: "⚠️", info: "ℹ️", success: "✅" };\n\n  await fetch(SLACK_WEBHOOK, {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({\n      text: `${emoji[level] || "📢"} ${message}`,\n      username: "AutoPilot",\n    }),\n  });\n}\n\n// Uso\nalertSlack("Deploy v2.3.1 completado", "success");\nalertSlack("CPU al 95% en servidor principal", "error");',
        },
        {
          title: 'Alertas a Telegram',
          description: 'Bot de Telegram para alertas personales (más rápido que email).',
          code: '// alert-telegram.js\nconst BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;\nconst CHAT_ID = process.env.TELEGRAM_CHAT_ID;\n\nexport async function alertTelegram(message) {\n  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;\n  await fetch(url, {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({\n      chat_id: CHAT_ID,\n      text: message,\n      parse_mode: "Markdown",\n    }),\n  });\n}\n\n// Cómo crear el bot:\n// 1. Habla con @BotFather en Telegram\n// 2. /newbot → nombre → recibes el TOKEN\n// 3. Envía un mensaje al bot\n// 4. Visita: api.telegram.org/bot<TOKEN>/getUpdates\n// 5. Copia el chat_id de la respuesta',
        },
        {
          title: 'Niveles de Alerta',
          description: 'No todas las alertas son iguales. Define niveles para no saturarte.',
          list: [
            { name: '🔴 Crítica (P0)', desc: 'Web caída o datos perdidos. Alerta inmediata: SMS + llamada + Slack. Requiere acción en < 15 min.' },
            { name: '🟠 Alta (P1)', desc: 'Errores frecuentes o rendimiento degradado. Slack + email. Acción en < 1 hora.' },
            { name: '🟡 Media (P2)', desc: 'Warnings, disco al 80%, SSL a punto de expirar. Email. Acción en < 24 horas.' },
            { name: '🟢 Info (P3)', desc: 'Deploy completado, backup exitoso, reporte generado. Log + Slack opcional.' },
          ],
        },
      ],
    },
  },
  {
    id: 'seguridad',
    icon: Shield,
    title: 'Seguridad Automatizada',
    color: 'yellow',
    description: 'Escaneos de vulnerabilidades, SSL, dependencias y accesos',
    content: {
      intro: 'La seguridad no es un evento, es un proceso continuo. Automatiza los checks más comunes para no olvidarlos.',
      items: [
        {
          title: 'Auditoría de Dependencias',
          description: 'Detecta vulnerabilidades en paquetes npm/pip automáticamente.',
          code: '# npm audit automático (GitHub Actions)\nname: Security Audit\non:\n  schedule:\n    - cron: "0 8 * * 1"  # Cada lunes\n  push:\n    branches: [main]\n\njobs:\n  audit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm audit --audit-level=high\n      - name: Dependabot alternatives\n        run: npx better-npm-audit audit',
        },
        {
          title: 'Checklist de Seguridad para Producción',
          description: 'Verifica estos puntos antes de cada deploy.',
          list: [
            { name: 'HTTPS obligatorio', desc: 'Redirige HTTP → HTTPS. Usa HSTS. Certbot para SSL gratis con Let\'s Encrypt.' },
            { name: 'Headers de seguridad', desc: 'CSP, X-Frame-Options, X-Content-Type-Options. Usa securityheaders.com para verificar.' },
            { name: 'Variables de entorno', desc: 'Nunca secrets en código. Usa .env + vault. Rota keys periódicamente.' },
            { name: 'Rate limiting', desc: 'Limita peticiones por IP. Protege login, API y formularios.' },
            { name: 'Backups encriptados', desc: 'Encripta backups con GPG o AES-256. Prueba restaurar periódicamente.' },
            { name: 'Logs de acceso', desc: 'Registra quién accede a qué. Detecta patrones sospechosos.' },
          ],
        },
      ],
    },
  },
  {
    id: 'seo-analytics',
    icon: BarChart3,
    title: 'SEO y Analytics Automáticos',
    color: 'cyan',
    description: 'Reportes automáticos de rendimiento, posicionamiento y tráfico',
    content: {
      intro: 'Automatiza los reportes de SEO y analytics para tomar decisiones basadas en datos sin revisar dashboards manualmente.',
      items: [
        {
          title: 'Auditoría SEO Automática',
          description: 'Ejecuta Lighthouse automáticamente y alerta si baja el score.',
          code: '# .github/workflows/lighthouse.yml\nname: Lighthouse Audit\non:\n  schedule:\n    - cron: "0 6 * * 1"  # Lunes 6am\n\njobs:\n  audit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Run Lighthouse\n        uses: treosh/lighthouse-ci-action@v11\n        with:\n          urls: |\n            https://tudominio.com\n            https://tudominio.com/productos\n          budgetPath: ./lighthouse-budget.json\n      - name: Alert if score drops\n        if: failure()\n        run: |\n          curl -X POST "$SLACK_WEBHOOK" \\\n            -d \'{"text":"⚠️ Lighthouse score bajó en tudominio.com"}\'',
        },
        {
          title: 'Monitorización de Keywords',
          description: 'Herramientas para trackear tu posición en Google automáticamente.',
          list: [
            { name: 'Google Search Console', desc: 'Gratis. Datos reales de Google: impresiones, clicks, posición media. API disponible.' },
            { name: 'Ahrefs/SEMrush', desc: 'Tracking de keywords, backlinks, competencia. Reportes automáticos por email.' },
            { name: 'Screaming Frog', desc: 'Crawl automático para detectar errores técnicos de SEO. Programa escaneos.' },
            { name: 'Core Web Vitals', desc: 'PageSpeed Insights API para monitorizar LCP, FID, CLS automáticamente.' },
          ],
        },
      ],
    },
  },
  {
    id: 'mantenimiento',
    icon: Wrench,
    title: 'Mantenimiento Automático',
    color: 'zinc',
    description: 'Actualizaciones de dependencias, limpieza, renovaciones y optimización',
    content: {
      intro: 'El mantenimiento regular previene problemas graves. Automatiza las tareas rutinarias para que no se acumulen.',
      items: [
        {
          title: 'Actualización de Dependencias',
          description: 'Mantén tus paquetes actualizados sin riesgo.',
          code: '# Renovate Bot (alternativa a Dependabot)\n// renovate.json en la raíz del proyecto\n{\n  "$schema": "https://docs.renovatebot.com/renovate-schema.json",\n  "extends": ["config:recommended"],\n  "schedule": ["every weekend"],\n  "automerge": true,\n  "automergeType": "branch",\n  "packageRules": [\n    {\n      "matchUpdateTypes": ["patch"],\n      "automerge": true\n    },\n    {\n      "matchUpdateTypes": ["major"],\n      "automerge": false,\n      "labels": ["major-update"]\n    }\n  ]\n}',
        },
        {
          title: 'Checklist de Mantenimiento Mensual',
          description: 'Tareas que deberías hacer cada mes.',
          list: [
            { name: 'Actualizar dependencias', desc: 'npm update / npm audit fix. Revisa changelogs de majors.' },
            { name: 'Renovar SSL', desc: 'Certbot auto-renew. Verifica fecha de expiración.' },
            { name: 'Limpiar logs y caché', desc: 'Logs viejos, builds antiguos, caché expirada, imágenes huérfanas.' },
            { name: 'Revisar costes', desc: 'Revisa la factura de hosting/cloud. Elimina recursos no usados.' },
            { name: 'Test de restauración', desc: 'Prueba restaurar un backup. Si no lo pruebas, no tienes backup.' },
            { name: 'Revisar accesos', desc: 'Revoca tokens/keys que no se usan. Rota los críticos.' },
            { name: 'Performance audit', desc: 'Lighthouse + Core Web Vitals. Compara con el mes anterior.' },
          ],
        },
      ],
    },
  },
];

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
    <div className="relative group">
      <pre className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 overflow-x-auto font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
      >
        {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

function Section({ section }) {
  const [open, setOpen] = useState(false);
  const Icon = section.icon;

  const colorMap = {
    forge: 'from-forge-500/15 to-ember-500/10 border-forge-500/20',
    green: 'from-green-500/15 to-emerald-500/10 border-green-500/20',
    blue: 'from-blue-500/15 to-cyan-500/10 border-blue-500/20',
    purple: 'from-purple-500/15 to-violet-500/10 border-purple-500/20',
    red: 'from-red-500/15 to-rose-500/10 border-red-500/20',
    yellow: 'from-yellow-500/15 to-amber-500/10 border-yellow-500/20',
    cyan: 'from-cyan-500/15 to-teal-500/10 border-cyan-500/20',
    zinc: 'from-zinc-500/15 to-zinc-400/10 border-zinc-500/20',
  };

  const iconColorMap = {
    forge: 'text-forge-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    red: 'text-red-400',
    yellow: 'text-yellow-400',
    cyan: 'text-cyan-400',
    zinc: 'text-zinc-400',
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${colorMap[section.color]} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left cursor-pointer hover:bg-white/5 transition-colors"
      >
        <div className={`w-12 h-12 rounded-xl bg-zinc-900/50 flex items-center justify-center shrink-0 ${iconColorMap[section.color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-white">{section.title}</h3>
          <p className="text-sm text-zinc-400 mt-0.5">{section.description}</p>
        </div>
        {open ? <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" /> : <ChevronRight className="w-5 h-5 text-zinc-500 shrink-0" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5">
          <p className="text-sm text-zinc-300 leading-relaxed">{section.content.intro}</p>

          {section.content.items.map((item, i) => (
            <div key={i} className="space-y-2">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Zap className={`w-3.5 h-3.5 ${iconColorMap[section.color]}`} />
                {item.title}
              </h4>
              <p className="text-sm text-zinc-400">{item.description}</p>

              {item.code && <CodeBlock code={item.code} />}

              {item.list && (
                <div className="space-y-2 mt-2">
                  {item.list.map((li, j) => (
                    <div key={j} className="flex gap-3 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/50">
                      <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${iconColorMap[section.color]}`} />
                      <div>
                        <span className="text-sm font-medium text-white">{li.name}</span>
                        <span className="text-sm text-zinc-400"> — {li.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Automatizaciones() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forge-500/10 border border-forge-500/20 text-forge-400 text-sm font-medium mb-4">
          <Timer className="w-4 h-4" />
          AutoPilot System
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
          Automatizaciones
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Monta tu sistema de automatizaciones para webs en producción. Tareas programadas, monitorización, deploys, backups, alertas y mantenimiento — todo en piloto automático.
        </p>
      </div>

      {/* Quick overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {[
          { icon: Clock, label: 'Cron Jobs', desc: 'Tareas recurrentes' },
          { icon: Globe, label: 'Health Checks', desc: 'Webs 24/7 online' },
          { icon: Rocket, label: 'CI/CD', desc: 'Deploy automático' },
          { icon: Bell, label: 'Alertas', desc: 'Notificaciones' },
        ].map(({ icon: I, label, desc }) => (
          <div key={label} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
            <I className="w-6 h-6 text-forge-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="text-xs text-zinc-500">{desc}</p>
          </div>
        ))}
      </div>

      {/* Warning box */}
      <div className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 mb-8">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-300">Antes de automatizar</p>
          <p className="text-sm text-zinc-400">Hazlo manual primero. Solo automatiza lo que ya sabes hacer bien. Una automatización mal configurada puede causar más daño que hacerlo a mano.</p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>

      {/* Workflow diagram */}
      <div className="mt-12 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-forge-400" />
          Workflow Recomendado
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          {[
            { step: '1. Código', desc: 'Push a GitHub' },
            { step: '2. CI/CD', desc: 'Tests + Build' },
            { step: '3. Deploy', desc: 'Producción' },
            { step: '4. Monitor', desc: 'Health checks' },
            { step: '5. Alertas', desc: 'Si algo falla' },
            { step: '6. Backup', desc: 'Diario auto' },
          ].map(({ step, desc }, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700">
                <p className="font-semibold text-white">{step}</p>
                <p className="text-xs text-zinc-500">{desc}</p>
              </div>
              {i < 5 && <span className="text-zinc-600">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-500">
          Cada sección incluye código copiable listo para usar. Adapta los scripts a tu stack y necesidades.
        </p>
      </div>
    </div>
  );
}
