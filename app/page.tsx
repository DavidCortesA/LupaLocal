import SearchInput from '@/components/search-input'
import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'
import { ScanSearch, TrendingUp, Clock, ShieldCheck, Zap, BarChart3, Search } from 'lucide-react'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lupalocal.vercel.app'}/#website`,
        url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lupalocal.vercel.app',
        name: 'LupaLocal',
        description: 'Auditoría Web Inteligente para Negocios Locales',
        inLanguage: 'es-MX',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lupalocal.vercel.app'}/resultados?url={url}`,
          },
          'query-input': 'required name=url',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'LupaLocal',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'MXN' },
        description: 'Herramienta gratuita de auditoría web para negocios locales. Analiza velocidad, SEO y seguridad en segundos.',
        url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lupalocal.vercel.app',
      },
      {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lupalocal.vercel.app'}/#organization`,
        name: 'LupaLocal',
        url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lupalocal.vercel.app',
        logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lupalocal.vercel.app'}/icon.svg`,
        contactPoint: { '@type': 'ContactPoint', email: 'hola@lupalocal.com', contactType: 'customer service' },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white dark:bg-brand-dark transition-colors flex flex-col relative overflow-hidden">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 py-4 z-10 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
              <ScanSearch className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-brand-dark dark:text-white text-lg tracking-tight">LupaLocal</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/servicios" className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-green transition-colors">
              Planes
            </Link>
            <ModeToggle />
          </div>
        </nav>

        {/* Background decoration — visible in both modes */}
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] dark:opacity-[0.04]" aria-hidden>
          <TrendingUp className="w-[420px] h-[420px] text-brand-dark dark:text-white" strokeWidth={1} />
        </div>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 z-10 pb-16 pt-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-green/10 dark:bg-white/10 text-brand-green text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-brand-green/30">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            Análisis gratuito · Sin registro
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-brand-dark dark:text-white leading-[1.1] mb-4 max-w-xl">
            ¿Tu Web Local<br />Atrae Clientes<br />o los Espanta?
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300 mb-8 max-w-sm leading-relaxed">
            Análisis gratuito de velocidad y SEO local en segundos.
          </p>

          <SearchInput />

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon: Clock, text: 'Velocidad de carga' },
              { icon: TrendingUp, text: 'Posicionamiento SEO' },
              { icon: ShieldCheck, text: 'Seguridad HTTPS' },
              { icon: Zap, text: 'Core Web Vitals' },
              { icon: BarChart3, text: 'Score Google' },
              { icon: Search, text: 'SEO Local' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10"
              >
                <Icon className="w-3.5 h-3.5 text-brand-green" />
                {text}
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-gray-400 dark:text-gray-500 flex items-center gap-2">
            <ScanSearch className="w-4 h-4 text-brand-green/60" />
            Sin tecnicismos. Resultados claros.
          </p>
        </div>
      </main>
    </>
  )
}
