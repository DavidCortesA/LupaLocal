import type { Metadata, Viewport } from 'next'
import { Outfit, Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  fallback: ['monospace'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lupalocal.vercel.app'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#2D3436' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'LupaLocal — Auditoría Web Gratis para Negocios Locales',
    template: '%s | LupaLocal',
  },
  description:
    'Analiza gratis la velocidad, el SEO y la seguridad de tu sitio web en segundos. Descubre por qué tus clientes se van y cómo atraer más con tu web local.',
  keywords: [
    'auditoría web gratis',
    'análisis SEO local',
    'velocidad web negocio',
    'Google PageSpeed',
    'Core Web Vitals',
    'optimizar web negocio local',
    'SEO para pequeñas empresas',
    'análisis web México',
  ],
  authors: [{ name: 'LupaLocal', url: SITE_URL }],
  creator: 'LupaLocal',
  publisher: 'LupaLocal',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: 'LupaLocal',
    title: 'LupaLocal — Auditoría Web Gratis para Negocios Locales',
    description:
      '¿Tu web atrae clientes o los espanta? Analiza gratis la velocidad, SEO y seguridad de tu sitio en segundos. Sin tecnicismos. Resultados claros.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LupaLocal — Auditoría Web para Negocios Locales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LupaLocal — Auditoría Web Gratis para Negocios Locales',
    description:
      '¿Tu web atrae clientes o los espanta? Analiza gratis en segundos.',
    images: ['/og-image.png'],
    creator: '@lupalocal',
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={cn(outfit.variable, inter.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
