import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || '')
  try {
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
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email, created_at: new Date().toISOString() }])

    if (error) {
      console.error('Supabase error:', error)
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
        subject: '웨딩한방 사전등록이 완료되었습니다',
        html: `
          <div style="font-family: 'Apple SD Gothic Neo', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="font-size: 24px; color: #1a1a1a; margin-bottom: 20px;">사전등록이 완료되었습니다</h1>
            <p style="font-size: 16px; color: #666; line-height: 1.6; margin-bottom: 30px;">
              웨딩한방에 관심을 가져주셔서 감사합니다.<br/>
              2026년 4월 출시되면 가장 먼저 알려드릴게요.
            </p>
            <div style="background: #f9f7f3; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <p style="font-size: 14px; color: #888; margin: 0;">얼리버드 혜택</p>
              <ul style="font-size: 15px; color: #333; margin: 10px 0 0 0; padding-left: 20px;">
                <li>프리미엄 기능 3개월 무료</li>
                <li>얼리버드 전용 추가 할인</li>
                <li>웨딩 체크리스트 제공</li>
              </ul>
            </div>
            <p style="font-size: 14px; color: #999;">
              문의: weddinghanbang@gmail.com
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
