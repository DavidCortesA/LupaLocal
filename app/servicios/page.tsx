import type { Metadata } from 'next'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'

export const metadata: Metadata = {
  title: 'Planes y Servicios',
  description:
    'Impulsa tu negocio local con nuestros planes de optimización web: Básico, Presencia Local Pro y Mantenimiento Mensual. SEO local, velocidad y seguridad.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lupa-local.vercel.app/'}/servicios`,
  },
  openGraph: {
    title: 'Planes para Impulsar Tu Negocio Local | LupaLocal',
    description: 'Optimización web, SEO local y mantenimiento para negocios locales. Convierte tu diagnóstico en resultados reales.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lupa-local.vercel.app/'}/servicios`,
  },
}
import { ScanSearch, Rocket, Monitor, RefreshCw, CheckCircle2, ArrowLeft, Mail } from 'lucide-react'

const services = [
  {
    icon: Rocket,
    iconBg: 'bg-brand-orange/10',
    iconColor: 'text-brand-orange',
    title: 'Optimización Básica',
    subtitle: 'Ideal para empezar',
    description: 'Fijamos los errores críticos que frenan tu negocio: velocidad, imágenes optimizadas y SEO on-page.',
    items: [
      'Compresión y optimización de imágenes',
      'Corrección de errores críticos de velocidad',
      'SEO on-page básico (títulos, metas, headings)',
      'Reporte de resultados antes/después',
    ],
  },
  {
    icon: Monitor,
    iconBg: 'bg-brand-green/10',
    iconColor: 'text-brand-green',
    title: 'Presencia Local Pro',
    subtitle: 'El más popular',
    description: 'SEO local, Google Business optimizado y estrategia de contenido para dominar tu ciudad.',
    items: [
      'Todo lo incluido en Optimización Básica',
      'Google Business Profile optimizado',
      'Estrategia de keywords locales',
      'Creación de contenido SEO mensual',
      'Seguimiento de posiciones en Google',
    ],
    featured: true,
  },
  {
    icon: RefreshCw,
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-gray-500 dark:text-gray-400',
    title: 'Mantenimiento Mensual',
    subtitle: 'Tranquilidad total',
    description: 'Monitoreo continuo de rendimiento, seguridad y reportes para que tu web siga creciendo.',
    items: [
      'Monitoreo de rendimiento 24/7',
      'Actualizaciones de seguridad',
      'Reporte mensual detallado',
      'Soporte prioritario por WhatsApp',
    ],
  },
]

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-brand-light dark:bg-gray-950 p-4 md:p-8 transition-colors">
      <div className="max-w-2xl mx-auto">

        {/* Nav */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center">
              <ScanSearch className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-brand-dark dark:text-white">LupaLocal</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-green transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Analizar mi web
            </Link>
            <ModeToggle />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-brand-dark dark:text-white mb-2">
            Impulsa Tu Negocio Local
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Convertimos tu diagnóstico en resultados reales.
          </p>
        </div>

        {/* Service cards */}
        <div className="flex flex-col gap-4 mb-8">
          {services.map(svc => {
            const Icon = svc.icon
            return (
              <div
                key={svc.title}
                className={`bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border-2 transition-all ${
                  svc.featured
                    ? 'border-brand-green shadow-brand-green/10'
                    : 'border-transparent hover:border-brand-green/30'
                }`}
              >
                {svc.featured && (
                  <div className="inline-flex items-center gap-1.5 bg-brand-green/10 text-brand-green text-xs font-bold px-2.5 py-1 rounded-full mb-4">
                    <CheckCircle2 className="w-3 h-3" />
                    Más popular
                  </div>
                )}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-11 h-11 rounded-xl ${svc.iconBg} ${svc.iconColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-0.5">{svc.subtitle}</p>
                    <h3 className="font-black text-brand-dark dark:text-white text-lg">{svc.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{svc.description}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {svc.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="font-black text-brand-dark dark:text-white text-xl mb-2">
            Hablemos de Tu Éxito
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
            Cuéntanos el resultado de tu diagnóstico y te recomendamos el plan ideal sin compromiso.
          </p>
          <a
            href="mailto:hola@lupalocal.com"
            className="inline-flex items-center gap-2 font-semibold px-8 py-3 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#00C897' }}
          >
            <Mail className="w-4 h-4" />
            Contactar ahora
          </a>
        </div>

      </div>
    </div>
  )
}
