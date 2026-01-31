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
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">웨딩한방</span>
          <span className="text-sm text-gray-400">2026년 4월 출시</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center pt-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            결혼준비,<br />
            한방에 끝내세요
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-6 font-medium">
            AI 24시간 플래너가 함께합니다
          </p>

          <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
            투명한 가격 · 업계 최저가 · 언제든 상담
          </p>

          {/* Email Form */}
          {!submitted ? (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="이메일 주소 입력"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 bg-white text-black rounded-full focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-500"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '등록 중...' : '사전등록'}
                </button>
              </form>
              {error && (
                <p className="text-sm text-red-400 mt-4">{error}</p>
              )}
              <p className="text-sm text-gray-500 mt-6">
                {count !== null ? `${count.toLocaleString()}명이 사전등록했습니다` : ''}
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white text-black rounded-3xl p-10">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">등록 완료</h3>
              <p className="text-gray-600">출시되면 가장 먼저 알려드릴게요.</p>
              <p className="text-sm text-gray-400 mt-6">
                현재 {count !== null ? count.toLocaleString() : '...'}명이 함께하고 있습니다
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-medium text-gray-500 mb-4 tracking-widest">WHY</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-20 max-w-2xl leading-tight">
            결혼서비스 만족도,<br />
            40개 업종 중 최하위
          </h2>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              { num: "20-30%", label: "평균 중개 수수료" },
              { num: "174만원", label: "평균 추가비용" },
              { num: "85%", label: "가격정보 불만족" },
              { num: "83%", label: "추가비용 경험" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl md:text-6xl font-bold mb-3">{stat.num}</div>
                <div className="text-gray-500 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50 text-black">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-medium text-gray-500 mb-4 tracking-widest">SOLUTION</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-20">
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
              <div key={i} className="bg-white rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Bird Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-4 tracking-widest">EARLY BIRD</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                지금 등록하면<br />
                특별한 혜택
              </h2>
            </div>

            <div className="space-y-6">
              {[
                "프리미엄 기능 3개월 무료",
                "얼리버드 전용 추가 할인",
                "웨딩 체크리스트 제공",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 text-xl">
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white text-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            결혼준비, 쉬워져야 합니다
          </h2>
          <p className="text-xl text-gray-500 mb-12">
            2026년 4월, 웨딩한방과 함께 시작하세요.
          </p>

          {!submitted && (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="이메일 주소 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-gray-100 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500"
                required
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all disabled:opacity-50"
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
      <footer className="py-12 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span className="text-xl font-bold">웨딩한방</span>
            <span className="text-gray-500">weddinghanbang@gmail.com</span>
            <span className="text-gray-500">© 2026 웨딩한방</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
