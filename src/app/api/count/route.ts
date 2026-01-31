import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL

  const keyType = serviceKey ? 'service_role' : 'anon'
  const hasUrl = !!url
  const keyLength = (serviceKey || anonKey || '').length
  const timestamp = new Date().toISOString()

  // Use service role key to bypass RLS
  const supabaseAdmin = createClient(
    url || '',
    serviceKey || anonKey || ''
  )

  try {
    const { count, error } = await supabaseAdmin
      .from('subscribers')
      .select('*', { count: 'exact', head: true })

    if (error) {
      return NextResponse.json({
        count: 0,
        error: error.message,
        debug: { keyType, hasUrl, keyLength, timestamp }
      })
    }

    return NextResponse.json(
      {
        count: count || 0,
        debug: { keyType, hasUrl, keyLength, timestamp }
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache'
        }
      }
    )
  } catch (error) {
    return NextResponse.json({
      count: 0,
      error: String(error),
      debug: { keyType, hasUrl, keyLength, timestamp }
    })
  }
}
