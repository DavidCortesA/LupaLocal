'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function SearchInput() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return
    setLoading(true)
    const clean = trimmed.replace(/^https?:\/\//, '').replace(/\/$/, '')
    router.push(`/resultados?url=https://${clean}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg gap-2">
      <Input
        placeholder="tupyme.com"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="flex-1 bg-white text-gray-900 placeholder:text-gray-400 h-12 text-base border-0 rounded-xl"
      />
      <Button
        type="submit"
        disabled={loading || !url.trim()}
        style={{ backgroundColor: loading || !url.trim() ? undefined : '#FF9F1C' }}
        className="h-12 px-5 font-semibold whitespace-nowrap rounded-xl text-white disabled:opacity-50"
      >
        {loading ? 'Analizando…' : 'Analizar Mi Negocio'}
      </Button>
    </form>
  )
}
