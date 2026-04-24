<div align="center">

# 🔍 LupaLocal

### Auditoría Web Inteligente para Negocios Locales

**¿Tu web atrae clientes o los espanta?**  
Analiza gratis la velocidad, el SEO y la seguridad de tu sitio en segundos.  
Sin tecnicismos. Resultados claros.

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

</div>

---

## ✨ ¿Qué es LupaLocal?

LupaLocal es una herramienta **SaaS** que convierte las métricas técnicas de tu web en un lenguaje claro y accionable, pensado para dueños de negocios locales que quieren **vender más** a través de su presencia digital.

---

## 🚀 Características

| | Funcionalidad |
|---|---|
| ⚡ | **Score Global** de rendimiento con gauge visual circular |
| 📊 | **Core Web Vitals** completos: FCP, LCP, CLS, TBT, TTI, Speed Index |
| 🔍 | **Scores individuales** de SEO, Accesibilidad y Buenas Prácticas |
| 🚦 | **Semáforo de Tareas** con 8 puntos de auditoría y descripciones en español |
| 🔒 | **Vista PRO** desbloqueada con Plan de Acción + Análisis de Competencia |
| 📄 | **Descarga PDF** del reporte generado en el cliente con `jsPDF` |
| 🌙 | **Dark / Light mode** con toggle y soporte a preferencia del sistema |
| 🗺️ | **SEO completo**: Open Graph, Twitter Card, JSON-LD, sitemap, robots.txt |

---

## 🖼️ Pantallas

| 🏠 Landing | 📊 Dashboard | 💼 Servicios |
|:-----------:|:------------:|:------------:|
| Hero con análisis gratuito | Score + Semáforo + Core Web Vitals | 3 planes de mejora con CTA |

---

## ⚙️ Cómo funciona

```
Usuario ingresa URL
      ↓
Google PageSpeed Insights API (mobile)
      ↓
Server Component procesa la respuesta
      ↓
Dashboard con Score · Vitals · Semáforo
      ↓
Vista PRO  →  Plan de Acción personalizado
      ↓
Exportar reporte en PDF
```

---

## 🛠️ Stack Tecnológico

- **Framework** — Next.js 16 (App Router, Server Components)
- **UI** — shadcn/ui · Radix UI · Tailwind CSS v4
- **Iconos** — Lucide React
- **Temas** — next-themes (dark / light / system)
- **PDF** — jsPDF (generación client-side)
- **API** — Google PageSpeed Insights v5
- **Deploy** — Vercel

---

## 🏃 Correr en local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/lupalocal.git
cd lupalocal

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tu API key de Google PageSpeed

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔑 Variables de Entorno

```env
# API key de Google PageSpeed Insights
NEXT_PUBLIC_API_TOKEN=tu_api_key_aqui

# URL de tu sitio desplegado (para SEO y sitemap)
NEXT_PUBLIC_SITE_URL=https://lupa-local.vercel.app/
```

> **Obtén tu API key gratis** en [Google Cloud Console](https://console.cloud.google.com/) habilitando la API de *PageSpeed Insights*.

---

## 🔍 Vista PRO (demo)

Para ver la experiencia completa desbloqueada, agrega `&version=PRO` a cualquier resultado:

```
/resultados?url=https://tupyme.com&version=PRO
```

Desbloquea el **Plan de Acción Personalizado** y el **Análisis de Competencia Local** 🏆

---

## 📁 Estructura del Proyecto

```
app/
├── page.tsx              # 🏠 Landing page
├── resultados/page.tsx   # 📊 Dashboard de auditoría
├── servicios/page.tsx    # 💼 Página de planes
├── api/audit/route.ts    # 🔌 Proxy a PageSpeed API
├── sitemap.ts            # 🗺️ Sitemap automático
└── robots.ts             # 🤖 robots.txt

components/
├── search-input.tsx      # 🔍 Formulario de búsqueda
├── score-gauge.tsx       # ⭕ Gauge SVG circular
├── download-pdf-button.tsx # 📄 Generador de PDF
└── mode-toggle.tsx       # 🌙 Toggle dark/light

lib/
└── audit.ts              # 🧠 Lógica de auditoría PageSpeed
```

---

## 🚢 Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Importa el repositorio en Vercel
2. Agrega las variables de entorno en **Settings → Environment Variables**
3. Deploy 🎉

---

<div align="center">

Hecho con ❤️ para impulsar los negocios locales

</div>
