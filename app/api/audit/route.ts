import { NextRequest } from 'next/server'
import { runAudit } from '@/lib/audit'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) return Response.json({ error: 'URL requerida' }, { status: 400 })
  const result = await runAudit(url)
  if (result.error) return Response.json(result, { status: 502 })
  return Response.json(result)
}
