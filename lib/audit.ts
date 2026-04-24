const PAGESPEED_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

export type SemaforoItem = {
  id: string
  label: string
  description: string
  score: number | null
  status: 'green' | 'orange' | 'red' | 'na'
}

export type AuditResult = {
  score: number
  seoScore: number
  accessibilityScore: number
  bestPracticesScore: number
  seoLabel: string
  velocidad: string
  interactividad: string
  fcp: string
  lcp: string
  cls: string
  tbt: string
  semaforo: SemaforoItem[]
  url: string
  error?: string
}

function scoreToStatus(score: number | null): SemaforoItem['status'] {
  if (score === null || score === undefined) return 'na'
  if (score >= 0.9) return 'green'
  if (score >= 0.5) return 'orange'
  return 'red'
}

export async function runAudit(url: string): Promise<AuditResult> {
  const apiKey = process.env.NEXT_PUBLIC_API_TOKEN
  const apiUrl = `${PAGESPEED_URL}?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`

  let res: Response
  try {
    res = await fetch(apiUrl, { cache: 'no-store' })
  } catch {
    return empty(url, 'No se pudo conectar con el servidor de análisis.')
  }

  if (!res.ok) return empty(url, 'Error al analizar el sitio. Verifica que la URL sea correcta.')

  const data = await res.json()
  const lhr = data.lighthouseResult
  if (!lhr) return empty(url, 'No se pudo obtener datos del sitio.')

  const score = Math.round((lhr.categories?.performance?.score ?? 0) * 100)
  const seoScore = Math.round((lhr.categories?.seo?.score ?? 0) * 100)
  const accessibilityScore = Math.round((lhr.categories?.accessibility?.score ?? 0) * 100)
  const bestPracticesScore = Math.round((lhr.categories?.['best-practices']?.score ?? 0) * 100)
  const a = lhr.audits ?? {}

  const seoLabel = seoScore >= 90 ? 'Excelente' : seoScore >= 50 ? 'Mejorable' : 'Deficiente'

  const semaforo: SemaforoItem[] = [
    {
      id: 'uses-optimized-images',
      label: 'Optimizar Imágenes',
      description: 'Las imágenes sin comprimir ralentizan la carga y espantan clientes.',
      score: a['uses-optimized-images']?.score ?? null,
    },
    {
      id: 'render-blocking-resources',
      label: 'Recursos Bloqueantes',
      description: 'Scripts y estilos que impiden que tu web se muestre rápido.',
      score: a['render-blocking-resources']?.score ?? null,
    },
    {
      id: 'unused-javascript',
      label: 'Reducir JavaScript',
      description: 'Código JS que se carga pero no se usa, penalizando la velocidad.',
      score: a['unused-javascript']?.score ?? null,
    },
    {
      id: 'unused-css-rules',
      label: 'Reducir CSS innecesario',
      description: 'Hojas de estilo con reglas que nunca se aplican en tu sitio.',
      score: a['unused-css-rules']?.score ?? null,
    },
    {
      id: 'uses-text-compression',
      label: 'Compresión de Texto',
      description: 'Habilitar Gzip/Brotli reduce el peso del HTML/CSS/JS hasta un 70%.',
      score: a['uses-text-compression']?.score ?? null,
    },
    {
      id: 'is-on-https',
      label: 'Seguridad HTTPS',
      description: 'Sin HTTPS, Google penaliza tu web y los clientes ven advertencias.',
      score: a['is-on-https']?.score ?? null,
    },
    {
      id: 'no-vulnerable-libraries',
      label: 'Librerías Seguras',
      description: 'Dependencias con vulnerabilidades conocidas que pueden ser explotadas.',
      score: a['no-vulnerable-libraries']?.score ?? null,
    },
    {
      id: 'meta-description',
      label: 'Meta Descripción SEO',
      description: 'La descripción que ve Google en los resultados de búsqueda.',
      score: a['meta-description']?.score ?? null,
    },
  ].map(item => ({ ...item, status: scoreToStatus(item.score) }))

  return {
    score,
    seoScore,
    accessibilityScore,
    bestPracticesScore,
    seoLabel,
    velocidad: a['speed-index']?.displayValue ?? 'N/A',
    interactividad: a['interactive']?.displayValue ?? 'N/A',
    fcp: a['first-contentful-paint']?.displayValue ?? 'N/A',
    lcp: a['largest-contentful-paint']?.displayValue ?? 'N/A',
    cls: a['cumulative-layout-shift']?.displayValue ?? 'N/A',
    tbt: a['total-blocking-time']?.displayValue ?? 'N/A',
    semaforo,
    url,
  }
}

function empty(url: string, error: string): AuditResult {
  return {
    score: 0, seoScore: 0, accessibilityScore: 0, bestPracticesScore: 0,
    seoLabel: '', velocidad: '', interactividad: '',
    fcp: '', lcp: '', cls: '', tbt: '',
    semaforo: [], url, error,
  }
}
