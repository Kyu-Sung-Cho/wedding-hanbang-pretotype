import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { count, error } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ count: 0 })
    }

    return NextResponse.json(
      { count: count || 0 },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    )
  } catch (error) {
    console.error('Count error:', error)
    return NextResponse.json({ count: 0 })
  }
}
