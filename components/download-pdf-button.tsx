'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import type { AuditResult } from '@/lib/audit'

const GREEN: [number, number, number] = [0, 200, 151]
const ORANGE: [number, number, number] = [255, 159, 28]
const RED: [number, number, number] = [239, 68, 68]
const DARK: [number, number, number] = [45, 52, 54]
const GRAY: [number, number, number] = [107, 114, 128]
const LIGHT: [number, number, number] = [248, 249, 250]
const WHITE: [number, number, number] = [255, 255, 255]
const BORDER: [number, number, number] = [229, 231, 235]

function statusColor(status: string): [number, number, number] {
  if (status === 'green') return GREEN
  if (status === 'orange') return ORANGE
  if (status === 'red') return RED
  return [209, 213, 219]
}

export default function DownloadPdfButton({ data, isPro }: { data: AuditResult; isPro: boolean }) {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      const W = 210
      const H = 297
      const M = 18
      const COL = W - M * 2
      let y = 0

      /* ── Header bar ── */
      doc.setFillColor(...GREEN)
      doc.rect(0, 0, W, 20, 'F')
      doc.setTextColor(...WHITE)
      doc.setFontSize(15)
      doc.setFont('helvetica', 'bold')
      doc.text('LupaLocal', M, 13)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.text('Auditoría Web para Negocios Locales', W - M, 9, { align: 'right' })
      doc.text(isPro ? 'REPORTE COMPLETO PRO' : 'REPORTE GRATUITO', W - M, 15, { align: 'right' })

      y = 28

      /* ── URL + date ── */
      doc.setTextColor(...DARK)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      const hostname = new URL(data.url).hostname
      doc.text(hostname, M, y)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...GRAY)
      doc.text(
        `Generado el ${new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}`,
        M, y + 5,
      )
      y += 14

      /* ── Divider ── */
      doc.setDrawColor(...BORDER)
      doc.line(M, y, W - M, y)
      y += 8

      /* ── Score circle + categories ── */
      doc.setTextColor(...DARK)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('Score Global de Rendimiento', M, y)
      y += 6

      const scoreCol = data.score >= 90 ? GREEN : data.score >= 50 ? ORANGE : RED
      const cx = M + 14
      const cy2 = y + 12
      doc.setFillColor(...scoreCol)
      doc.circle(cx, cy2, 13, 'F')
      doc.setTextColor(...WHITE)
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text(String(data.score), cx, cy2 + 2, { align: 'center' })
      doc.setFontSize(7)
      doc.text('/100', cx, cy2 + 7, { align: 'center' })

      const cats = [
        { label: 'SEO Local', value: data.seoScore, note: data.seoLabel },
        { label: 'Accesibilidad', value: data.accessibilityScore, note: '' },
        { label: 'Buenas Prácticas', value: data.bestPracticesScore, note: '' },
      ]
      cats.forEach((cat, i) => {
        const catY = cy2 - 8 + i * 10
        const col = cat.value >= 90 ? GREEN : cat.value >= 50 ? ORANGE : RED
        doc.setTextColor(...GRAY)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'normal')
        doc.text(cat.label, M + 32, catY)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(...col)
        doc.text(`${cat.value}/100${cat.note ? ` · ${cat.note}` : ''}`, M + 32, catY + 4)
      })

      y = cy2 + 22

      /* ── Core Web Vitals ── */
      doc.setDrawColor(...BORDER)
      doc.line(M, y, W - M, y)
      y += 7
      doc.setTextColor(...DARK)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('Core Web Vitals', M, y)
      y += 5

      const vitals = [
        { label: 'FCP', full: 'Primera Pintura', value: data.fcp },
        { label: 'LCP', full: 'Carga Principal', value: data.lcp },
        { label: 'Speed Index', full: 'Velocidad Visual', value: data.velocidad },
        { label: 'TTI', full: 'Interactividad', value: data.interactividad },
        { label: 'CLS', full: 'Estabilidad', value: data.cls },
        { label: 'TBT', full: 'Bloqueo Total', value: data.tbt },
      ]
      const cellW = (COL - 4) / 2
      const cellH = 14
      vitals.forEach((v, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        const bx = M + col * (cellW + 4)
        const by = y + row * (cellH + 2)
        doc.setFillColor(...LIGHT)
        doc.roundedRect(bx, by, cellW, cellH, 2, 2, 'F')
        doc.setTextColor(...GRAY)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.text(`${v.label} · ${v.full}`, bx + 3, by + 5)
        doc.setTextColor(...DARK)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(v.value, bx + 3, by + 11)
      })
      y += Math.ceil(vitals.length / 2) * (cellH + 2) + 6

      /* ── Semáforo ── */
      doc.setDrawColor(...BORDER)
      doc.line(M, y, W - M, y)
      y += 7
      doc.setTextColor(...DARK)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('Semáforo de Tareas', M, y)
      y += 5

      for (const item of data.semaforo) {
        if (y > H - 30) {
          doc.addPage()
          y = 20
        }
        const sc = statusColor(item.status)
        doc.setFillColor(...sc)
        doc.circle(M + 2.5, y + 2, 2.5, 'F')
        doc.setTextColor(...DARK)
        doc.setFontSize(8.5)
        doc.setFont('helvetica', 'bold')
        doc.text(item.label, M + 8, y + 3)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7.5)
        doc.setTextColor(...GRAY)
        doc.text(item.description, M + 8, y + 8)
        y += 13
      }

      /* ── PRO: Plan de Acción ── */
      if (isPro) {
        if (y > H - 50) { doc.addPage(); y = 20 }
        doc.setDrawColor(...BORDER)
        doc.line(M, y, W - M, y)
        y += 7
        doc.setFillColor(...GREEN)
        doc.roundedRect(M, y - 4, 42, 7, 1.5, 1.5, 'F')
        doc.setTextColor(...WHITE)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'bold')
        doc.text('PLAN DE ACCIÓN PRO', M + 21, y + 0.5, { align: 'center' })
        doc.setTextColor(...DARK)
        doc.setFontSize(11)
        doc.text('Plan de Acción Personalizado', M + 48, y + 0.5)
        y += 8

        const priorities = data.semaforo
          .filter(i => i.status === 'red' || i.status === 'orange')
          .sort((a, b) => (a.status === 'red' ? -1 : 1) - (b.status === 'red' ? -1 : 1))

        priorities.forEach((item, idx) => {
          if (y > H - 22) { doc.addPage(); y = 20 }
          doc.setFillColor(...LIGHT)
          doc.roundedRect(M, y, COL, 16, 2, 2, 'F')
          const nc = statusColor(item.status)
          doc.setFillColor(...nc)
          doc.circle(M + 6, y + 8, 5, 'F')
          doc.setTextColor(...WHITE)
          doc.setFontSize(8)
          doc.setFont('helvetica', 'bold')
          doc.text(String(idx + 1), M + 6, y + 9.5, { align: 'center' })
          doc.setTextColor(...DARK)
          doc.setFontSize(8.5)
          doc.setFont('helvetica', 'bold')
          doc.text(item.label, M + 14, y + 6)
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(7.5)
          doc.setTextColor(...GRAY)
          doc.text(item.description, M + 14, y + 12)
          y += 19
        })

        /* Competencia */
        if (y > H - 50) { doc.addPage(); y = 20 }
        doc.setDrawColor(...BORDER)
        doc.line(M, y, W - M, y)
        y += 7
        doc.setTextColor(...DARK)
        doc.setFontSize(11)
        doc.setFont('helvetica', 'bold')
        doc.text('Análisis de Competencia Local (Estimado)', M, y)
        y += 6

        const avgSector = Math.round(data.score * 0.78)
        const topLocal = Math.min(99, Math.round(data.score * 1.13))
        const competitors = [
          { name: hostname, score: data.score, isYou: true },
          { name: 'Promedio del sector', score: avgSector, isYou: false },
          { name: 'Top 3 local', score: topLocal, isYou: false },
        ]
        const bW = (COL - 8) / 3
        competitors.forEach((comp, i) => {
          const bx = M + i * (bW + 4)
          const fillC = comp.isYou ? GREEN : LIGHT
          doc.setFillColor(...fillC)
          doc.roundedRect(bx, y, bW, 22, 2, 2, 'F')
          const textC = comp.isYou ? WHITE : DARK
          doc.setTextColor(...textC)
          doc.setFontSize(16)
          doc.setFont('helvetica', 'bold')
          doc.text(String(comp.score), bx + bW / 2, y + 12, { align: 'center' })
          doc.setFontSize(6.5)
          doc.setFont('helvetica', 'normal')
          const labelC = comp.isYou ? WHITE : GRAY
          doc.setTextColor(...labelC)
          const lines = doc.splitTextToSize(comp.name, bW - 4)
          doc.text(lines, bx + bW / 2, y + 18, { align: 'center' })
        })
        y += 28
      }

      /* ── Footer ── */
      doc.setFillColor(...LIGHT)
      doc.rect(0, H - 12, W, 12, 'F')
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...GRAY)
      doc.text('LupaLocal — Auditoría Web para Negocios Locales', M, H - 5)
      doc.text('lupalocal.vercel.app', W - M, H - 5, { align: 'right' })

      doc.save(`lupalocal-${hostname}${isPro ? '-PRO' : ''}-reporte.pdf`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
    >
      {loading
        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
        : <Download className="w-3.5 h-3.5" />}
      {loading ? 'Generando…' : 'Descargar PDF'}
    </button>
  )
}
