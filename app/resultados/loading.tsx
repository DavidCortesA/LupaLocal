export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center gap-4">
      <div
        className="w-14 h-14 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: '#00C897', borderTopColor: 'transparent' }}
      />
      <p className="text-gray-600 font-medium">Analizando tu sitio…</p>
      <p className="text-sm text-gray-400">Esto puede tomar unos minutos</p>
    </div>
  )
}
