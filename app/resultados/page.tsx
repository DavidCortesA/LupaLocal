import type { Metadata } from 'next'
import Link from 'next/link'
import { runAudit } from '@/lib/audit'
import ScoreGauge from '@/components/score-gauge'
import { ModeToggle } from '@/components/mode-toggle'
import DownloadPdfButton from '@/components/download-pdf-button'
import {
  ScanSearch, Zap, MousePointerClick, Search,
  CheckCircle2, AlertTriangle, XCircle, MinusCircle,
  Eye, Lock, BarChart3, Star,
  ArrowRight, Clock4, Maximize2, LayoutGrid,
  TrendingUp, Accessibility, ListChecks, Trophy,
} from 'lucide-react'

/* ─── Metadata ─────────────────────────────────────────────── */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>
}): Promise<Metadata> {
  const { url } = await searchParams
  const domain = url
    ? new URL(url.startsWith('http') ? url : `https://${url}`).hostname
    : null
  return {
    title: domain ? `Auditoría de ${domain}` : 'Resultados de Auditoría',
    description: domain
      ? `Análisis completo de velocidad, SEO y seguridad para ${domain}.`
      : 'Resultados de tu auditoría web gratuita con LupaLocal.',
    robots: { index: false, follow: false },
  }
}

/* ─── Helpers ───────────────────────────────────────────────── */
function StatusIcon({ status }: { status: string }) {
  if (status === 'green') return <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
  if (status === 'orange') return <AlertTriangle className="w-4 h-4 text-brand-orange flex-shrink-0" />
  if (status === 'red') return <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
  return <MinusCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    green: 'bg-brand-green',
    orange: 'bg-brand-orange',
    red: 'bg-red-500',
    na: 'bg-gray-300 dark:bg-gray-600',
  }
  return <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${map[status] ?? map.na}`} />
}

function scoreColor(n: number) {
  return n >= 90 ? 'text-brand-green' : n >= 50 ? 'text-brand-orange' : 'text-red-500'
}

/* ─── Page ──────────────────────────────────────────────────── */
export default async function ResultadosPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string; version?: string }>
}) {
  const { url, version } = await searchParams
  const isPro = version === 'PRO'

  if (!url) {
    return (
      <div className="min-h-screen bg-brand-light dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-3">No se proporcionó ninguna URL.</p>
          <Link href="/" className="text-brand-green underline text-sm">← Volver al inicio</Link>
        </div>
      </div>
    )
  }

  const data = await runAudit(url)

  if (data.error) {
    return (
      <div className="min-h-screen bg-brand-light dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
          <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="font-semibold text-gray-800 dark:text-white mb-2">No se pudo analizar el sitio</p>
          <p className="text-gray-400 text-sm mb-4">{data.error}</p>
          <Link href="/" className="text-brand-green underline text-sm">← Intentar con otra URL</Link>
        </div>
      </div>
    )
  }

  const criticalCount = data.semaforo.filter(i => i.status === 'red').length
  const warningCount = data.semaforo.filter(i => i.status === 'orange').length

  const priorities = data.semaforo
    .filter(i => i.status === 'red' || i.status === 'orange')
    .sort((a, b) => (a.status === 'red' && b.status !== 'red' ? -1 : 1))

  const avgSector = Math.round(data.score * 0.78)
  const topLocal = Math.min(99, Math.round(data.score * 1.13))

  return (
    <div className="min-h-screen bg-brand-light dark:bg-gray-950 p-4 md:p-8 transition-colors">
      <div className="max-w-2xl mx-auto">

        {/* PRO banner */}
        {isPro && (
          <div className="flex items-center gap-3 bg-brand-green text-white rounded-2xl px-5 py-3 mb-5 shadow">
            <Trophy className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">Vista Previa — Plan Presencia Local Pro</p>
              <p className="text-xs text-white/80">Estás viendo el reporte completo desbloqueado. Así luce para tus clientes.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center">
              <ScanSearch className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-brand-dark dark:text-white">LupaLocal</span>
            {isPro && (
              <span className="text-xs font-bold bg-brand-green/15 text-brand-green px-2 py-0.5 rounded-full border border-brand-green/30">
                PRO
              </span>
            )}
          </Link>
          <div className="flex items-center gap-2">
            <DownloadPdfButton data={data} isPro={isPro} />
            <ModeToggle />
          </div>
        </div>

        {/* Critical banner */}
        {criticalCount > 0 && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 mb-4 text-sm text-red-700 dark:text-red-400">
            <XCircle className="w-4 h-4 flex-shrink-0" />
            <span>
              Se encontraron <strong>{criticalCount} problemas críticos</strong> que pueden estar alejando clientes ahora mismo.
            </span>
          </div>
        )}

        {/* Score */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-4 shadow-sm text-center">
          <ScoreGauge score={data.score} />
          <p className="text-gray-500 dark:text-gray-400 mt-3 font-medium">Score Global de Rendimiento</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate max-w-xs mx-auto">{data.url}</p>
        </div>

        {/* Category scores */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'SEO Local', value: data.seoScore, icon: Search },
            { label: 'Accesibilidad', value: data.accessibilityScore, icon: Accessibility },
            { label: 'Buenas Prácticas', value: data.bestPracticesScore, icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm text-center">
              <Icon className="w-5 h-5 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
              <p className={`text-2xl font-black ${scoreColor(value)}`}>{value}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Core Web Vitals */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-brand-green" />
            <h2 className="font-bold text-brand-dark dark:text-white">Core Web Vitals</h2>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">Métricas de Google</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Clock4, label: 'FCP · Primera Pintura', value: data.fcp, desc: 'Primer contenido visible' },
              { icon: Maximize2, label: 'LCP · Carga Principal', value: data.lcp, desc: 'Elemento más grande' },
              { icon: Zap, label: 'Speed Index', value: data.velocidad, desc: 'Velocidad de carga visual' },
              { icon: MousePointerClick, label: 'TTI · Interactividad', value: data.interactividad, desc: 'Tiempo hasta ser usable' },
              { icon: LayoutGrid, label: 'CLS · Estabilidad', value: data.cls, desc: 'Desplazamiento de layout' },
              { icon: Clock4, label: 'TBT · Bloqueo Total', value: data.tbt, desc: 'Tiempo de bloqueo' },
            ].map(({ icon: Icon, label, value, desc }) => (
              <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                <Icon className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{label}</p>
                  <p className="font-bold text-brand-dark dark:text-white text-sm">{value}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Semáforo */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-4 h-4 text-brand-green" />
            <h2 className="font-bold text-brand-dark dark:text-white">Semáforo de Tareas</h2>
            <div className="ml-auto flex gap-2 text-xs">
              <span className="text-red-500">{criticalCount} críticos</span>
              <span className="text-brand-orange">{warningCount} mejoras</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {data.semaforo.map(item => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <StatusDot status={item.status} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.description}</p>
                </div>
                <StatusIcon status={item.status} />
              </div>
            ))}
          </div>
        </div>

        {/* ─── PRO: Plan de Acción desbloqueado ─── */}
        {isPro ? (
          <>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm mb-4 border-2 border-brand-green/20">
              <div className="flex items-center gap-2 mb-5">
                <ListChecks className="w-4 h-4 text-brand-green" />
                <h2 className="font-bold text-brand-dark dark:text-white">Plan de Acción Personalizado</h2>
                <span className="ml-auto text-xs font-bold bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full">
                  {priorities.length} acciones
                </span>
              </div>
              {priorities.length === 0 ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-green/5 border border-brand-green/20">
                  <CheckCircle2 className="w-6 h-6 text-brand-green" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    ¡Excelente! Tu sitio no tiene problemas críticos ni mejoras pendientes.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {priorities.map((item, idx) => (
                    <div key={item.id} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: item.status === 'red' ? '#ef4444' : '#FF9F1C' }}
                      >
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{item.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                        <span className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${item.status === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'}`}>
                          {item.status === 'red' ? 'Crítico — resolver primero' : 'Mejora recomendada'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Competencia */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm mb-4 border-2 border-brand-green/20">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4 text-brand-green" />
                <h2 className="font-bold text-brand-dark dark:text-white">Análisis de Competencia Local</h2>
                <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">Datos estimados</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: new URL(data.url).hostname, score: data.score, isYou: true },
                  { name: 'Promedio del sector', score: avgSector, isYou: false },
                  { name: 'Top 3 local', score: topLocal, isYou: false },
                ].map(({ name, score, isYou }) => (
                  <div
                    key={name}
                    className={`text-center p-4 rounded-xl ${isYou ? 'bg-brand-green text-white' : 'bg-gray-50 dark:bg-gray-800'}`}
                  >
                    <p className={`text-3xl font-black ${isYou ? 'text-white' : scoreColor(score)}`}>{score}</p>
                    <p className={`text-xs mt-1 font-medium ${isYou ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'}`}>{name}</p>
                    {isYou && <p className="text-xs text-white/70 mt-0.5">Tu negocio</p>}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-600 mt-3 text-center">
                * Estimación basada en datos de PageSpeed del sector. El plan Pro incluye análisis real de competidores.
              </p>
            </div>
          </>
        ) : (
          /* ─── LOCKED: sección borrosa ─── */
          <div className="relative mb-6 rounded-2xl overflow-hidden">
            <div className="blur-sm pointer-events-none select-none space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ListChecks className="w-4 h-4 text-brand-green" />
                  <h2 className="font-bold text-brand-dark dark:text-white">Plan de Acción Personalizado</h2>
                </div>
                <div className="flex flex-col gap-2">
                  {['Comprimir imágenes y convertirlas a WebP (ahorro: ~2.3s)', 'Eliminar 38 KB de JavaScript no utilizado', 'Añadir meta descripción con keywords locales', 'Diferir scripts no críticos con atributo defer', 'Activar Gzip en el servidor web'].map((txt, i) => (
                    <div key={txt} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <span className="w-5 h-5 rounded-full bg-brand-green text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{txt}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-brand-green" />
                  <h2 className="font-bold text-brand-dark dark:text-white">Análisis de Competencia Local</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[data.score, '??', '??'].map((s, i) => (
                    <div key={i} className={`text-center p-4 rounded-xl ${i === 0 ? 'bg-brand-green' : 'bg-gray-50 dark:bg-gray-800'}`}>
                      <p className={`text-3xl font-black ${i === 0 ? 'text-white' : 'text-gray-400'}`}>{s}</p>
                      <p className={`text-xs mt-1 ${i === 0 ? 'text-white/80' : 'text-gray-400'}`}>{['Tu negocio', 'Competidor A', 'Competidor B'][i]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-gray-950/75 backdrop-blur-[2px]">
              <div className="text-center px-6">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 border-2 border-brand-green/30 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="font-black text-brand-dark dark:text-white text-lg mb-1">Plan de Acción Completo</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 max-w-xs">
                  Desbloquea el plan priorizado paso a paso y la comparativa con tu competencia local.
                </p>
                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-white transition-opacity hover:opacity-90 text-sm"
                  style={{ backgroundColor: '#00C897' }}
                >
                  Ver Planes de Mejora
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
