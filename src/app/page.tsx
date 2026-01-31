'use client'

import { useState, useEffect } from 'react'

export default function WeddingLanding() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 페이지 로드 시 참여자 수 가져오기
  useEffect(() => {
    fetchCount()
  }, [])

  const fetchCount = async () => {
    try {
      const res = await fetch('/api/count')
      const data = await res.json()
      setCount(data.count)
    } catch (err) {
      console.error('Failed to fetch count:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '등록 중 오류가 발생했습니다.')
        setLoading(false)
        return
      }

      setSubmitted(true)
      // 등록 성공 후 카운트 업데이트
      fetchCount()
    } catch (err) {
      setError('서버 연결에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">W</span>
            </div>
            <span className="font-semibold text-slate-800 tracking-tight">웨딩한방</span>
          </div>
          <div className="text-sm text-slate-500">2025년 4월 출시 예정</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span>사전등록 진행중</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-light text-slate-900 mb-6 leading-tight tracking-tight">
            결혼준비의 모든 것,<br />
            <span className="font-semibold">한방에.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            투명한 가격, 24시간 상담, 합리적인 수수료.<br />
            더 이상 복잡하고 비싼 결혼준비는 그만.
          </p>

          {/* Email Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-4 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 placeholder:text-slate-400"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '등록 중...' : '사전등록'}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-500 mt-3">{error}</p>
              )}
              <p className="text-sm text-slate-400 mt-4">
                {count !== null ? `${count.toLocaleString()}명의 예비부부가 함께하고 있습니다` : '참여자 수를 불러오는 중...'}
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">등록이 완료되었습니다</h3>
              <p className="text-slate-500">출시 소식과 얼리버드 혜택을 보내드릴게요.</p>
              <p className="text-sm text-slate-400 mt-4">
                현재 {count !== null ? count.toLocaleString() : '...'}명이 함께하고 있습니다
              </p>
            </div>
          )}

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-amber-400 font-medium mb-4 tracking-wide text-sm">THE PROBLEM</p>
            <h2 className="text-3xl md:text-4xl font-light mb-6 leading-tight">
              결혼서비스 만족도,<br />
              <span className="font-semibold">40개 업종 중 최하위.</span>
            </h2>
            <p className="text-slate-400 text-lg font-light">
              한국소비자원 조사 결과, 결혼서비스는 소비자 만족도 50.4점으로 최하위를 기록했습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {[
              { num: "20-30%", label: "평균 중개 수수료", desc: "업체가 받는 금액 중 상당 부분" },
              { num: "174만원", label: "평균 추가비용", desc: "계약 후 발생하는 예상 외 비용" },
              { num: "85%", label: "가격정보 불만족", desc: "가격 정보 획득이 어렵다고 응답" },
              { num: "83%", label: "추가비용 경험", desc: "예상 외 추가비용을 경험한 비율" },
            ].map((stat, i) => (
              <div key={i} className="border-t border-slate-700 pt-6">
                <div className="text-3xl md:text-4xl font-light text-white mb-2">{stat.num}</div>
                <div className="text-amber-400 font-medium text-sm mb-1">{stat.label}</div>
                <div className="text-slate-500 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-600 font-medium mb-4 tracking-wide text-sm">OUR SOLUTION</p>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900">
              웨딩한방이 <span className="font-semibold">다르게</span> 합니다
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "투명한 가격",
                desc: "숨겨진 비용 없이 모든 추가비용을 미리 확인하세요. 계약 전 총 비용을 정확히 알 수 있습니다."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "24시간 상담",
                desc: "밤에도 새벽에도 궁금한 것이 생기면 바로 물어보세요. 언제든 답변을 받을 수 있습니다."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "합리적 수수료",
                desc: "업계 최저 수준의 수수료로 업체도 고객도 모두 만족할 수 있는 구조를 만들었습니다."
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Bird Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-amber-400/10 to-amber-600/10 rounded-3xl p-12 md:p-16 border border-amber-400/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-amber-400 font-medium mb-4 tracking-wide text-sm">EARLY BIRD</p>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                  지금 등록하시면<br />
                  <span className="font-semibold">특별한 혜택</span>을 드립니다
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { icon: "✦", text: "첫 매칭 수수료 0원" },
                  { icon: "✦", text: "프리미엄 기능 3개월 무료" },
                  { icon: "✦", text: "선착순 500명 추가 혜택" },
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-white">
                    <span className="text-amber-400">{benefit.icon}</span>
                    <span className="font-light">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">
            결혼준비, <span className="font-semibold">쉬워져야 합니다</span>
          </h2>
          <p className="text-slate-500 mb-10 text-lg font-light">
            2025년 4월, 웨딩한방과 함께<br />
            새로운 결혼준비를 경험하세요.
          </p>

          {!submitted && (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-4 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '등록 중...' : '사전등록'}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-500 mt-3">{error}</p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">W</span>
              </div>
              <span className="font-medium text-slate-700">웨딩한방</span>
            </div>
            <div className="text-sm text-slate-400">
              문의: contact@weddinghanban.com
            </div>
            <div className="text-sm text-slate-400">
              © 2025 웨딩한방. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
