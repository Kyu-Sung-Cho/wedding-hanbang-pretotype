import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || '')

    // Use service role key to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    )
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '유효한 이메일을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이메일 중복 체크
    const { data: existing } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: '이미 등록된 이메일입니다.' },
        { status: 400 }
      )
    }

    // 이메일 저장
    const { data: insertData, error } = await supabase
      .from('subscribers')
      .insert([{ email, created_at: new Date().toISOString() }])
      .select()

    console.log('Insert result:', { insertData, error, email })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: '등록 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    if (!insertData || insertData.length === 0) {
      console.error('Insert returned no data - possible RLS issue')
      return NextResponse.json(
        { error: '등록 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    // 확인 이메일 발송
    try {
      await resend.emails.send({
        from: '웨딩한방 <onboarding@resend.dev>',
        to: email,
        subject: '웨딩한방 얼리버드 등록 완료!',
        html: `
          <div style="font-family: 'Apple SD Gothic Neo', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #1e293b; font-size: 24px; margin-bottom: 20px;">환영합니다!</h1>

            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              웨딩한방 얼리버드에 등록해주셔서 감사합니다.
            </p>

            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              서비스 출시 시 <strong>가장 먼저</strong> 알려드릴게요.<br/>
              얼리버드만을 위한 특별한 혜택도 준비하고 있으니 기대해주세요!
            </p>

            <div style="background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%); padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="color: #1e293b; font-size: 14px; margin: 0; font-weight: bold;">
                얼리버드 혜택 예정
              </p>
              <ul style="color: #1e293b; font-size: 14px; margin: 10px 0 0 0; padding-left: 20px;">
                <li>출시 전 베타 테스트 우선 초대</li>
                <li>정식 출시 후 프리미엄 기능 무료 이용</li>
              </ul>
            </div>

            <p style="color: #94a3b8; font-size: 14px; margin-top: 40px;">
              - 웨딩한방 팀 드림
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Email send error:', emailError)
      // 이메일 발송 실패해도 등록은 성공으로 처리
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
