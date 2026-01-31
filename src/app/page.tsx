'use client'

import { useState, useEffect } from 'react'

export default function WeddingLanding() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      fetchCount()
    } catch (err) {
      setError('서버 연결에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-serif font-bold text-gray-900">웨딩한방</span>
          <span className="text-sm text-gold-500 font-medium">2026년 4월 출시</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-gold-50 to-white">
        <div className="max-w-3xl mx-auto text-center pt-20">
          <p className="text-gold-500 font-medium mb-6 tracking-widest text-sm">WEDDING PLANNER</p>

          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight text-gray-900">
            결혼준비의 모든 것,<br />
            <span className="text-gold-500">한방에.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            AI 24시간 플래너가 함께합니다
          </p>

          <p className="text-gray-500 mb-12 max-w-lg mx-auto">
            투명한 가격 · 업계 최저가 · 언제든 상담
          </p>

          {/* Email Form */}
          {!submitted ? (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '등록 중...' : '사전등록'}
                </button>
              </form>
              {error && (
                <p className="text-sm text-red-500 mt-4">{error}</p>
              )}
              <p className="text-sm text-gray-400 mt-6">
                {count !== null ? `${count.toLocaleString()}명이 사전등록했습니다` : ''}
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-lg border border-gold-100">
              <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-gray-900">등록이 완료되었습니다</h3>
              <p className="text-gray-500">출시되면 가장 먼저 알려드릴게요.</p>
              <p className="text-sm text-gray-400 mt-6">
                현재 {count !== null ? count.toLocaleString() : '...'}명이 함께하고 있습니다
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-28 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold-400 font-medium mb-4 tracking-widest text-sm">THE PROBLEM</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 max-w-xl leading-tight">
            결혼서비스 만족도,<br />
            40개 업종 중 최하위
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              { num: "20-30%", label: "평균 중개 수수료" },
              { num: "174만원", label: "평균 추가비용" },
              { num: "85%", label: "가격정보 불만족" },
              { num: "83%", label: "추가비용 경험" },
            ].map((stat, i) => (
              <div key={i} className="border-t border-gray-700 pt-6">
                <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">{stat.num}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold-500 font-medium mb-4 tracking-widest text-sm">OUR SOLUTION</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-gray-900">
            웨딩한방이 다릅니다
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "투명한 가격",
                desc: "숨겨진 비용 없이 모든 추가비용을 미리 확인하세요."
              },
              {
                title: "AI 24시간 플래너",
                desc: "밤에도 새벽에도 AI가 즉시 답변. 일정, 예산, 업체 추천까지."
              },
              {
                title: "업계 최저가",
                desc: "높은 중개 수수료 없이 업체와 직접 연결해 드립니다."
              },
            ].map((item, i) => (
              <div key={i} className="bg-gold-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Remind Section */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold-500 font-medium mb-4 tracking-widest text-sm">AI REMIND</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-900">
            결혼의 처음부터 끝까지,<br />
            AI가 먼저 알려드립니다
          </h2>
          <p className="text-gray-500 mb-12 max-w-2xl text-lg">
            "지금 이 시점에 뭘 해야하지?" "내가 다 챙겼나?"<br />
            더 이상 고민하지 마세요. 필요한 타이밍에, 필요한 말로 AI가 먼저 리마인드해 드립니다.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "상견례", desc: "장소 예약부터 선물 준비까지" },
              { title: "청첩장", desc: "모바일/실물 청첩장 발송 타이밍" },
              { title: "예단/예물", desc: "예단 품목 체크리스트 관리" },
              { title: "스드메", desc: "촬영 일정과 준비물 안내" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 mt-10 text-sm">
            + 함, 이바지, 폐백, 허니문 등 30개 이상의 웨딩 체크포인트 지원
          </p>
        </div>
      </section>

      {/* Early Bird Section */}
      <section className="py-28 bg-gold-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold-600 font-medium mb-4 tracking-widest text-sm">EARLY BIRD</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight text-gray-900">
                지금 등록하시면<br />
                특별한 혜택을 드립니다
              </h2>
            </div>

            <div className="space-y-5">
              {[
                "프리미엄 기능 3개월 무료",
                "얼리버드 전용 추가 할인",
                "웨딩 체크리스트 제공",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 text-lg">
                  <div className="w-2 h-2 bg-gold-500 rounded-full" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-900">
            결혼준비, 쉬워져야 합니다
          </h2>
          <p className="text-gray-500 mb-10 text-lg">
            2026년 4월, 웨딩한방과 함께 시작하세요.
          </p>

          {!submitted && (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-400 text-gray-900 placeholder:text-gray-400"
                required
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all disabled:opacity-50"
              >
                {loading ? '등록 중...' : '사전등록'}
              </button>
            </form>
          )}
          {error && (
            <p className="text-sm text-red-500 mt-4">{error}</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span className="text-lg font-serif font-bold">웨딩한방</span>
            <span className="text-gray-400 text-sm">weddinghanbang@gmail.com</span>
            <span className="text-gray-400 text-sm">© 2026 웨딩한방</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
