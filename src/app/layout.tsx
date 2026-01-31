import type { Metadata } from 'next'
import { Noto_Serif_KR } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: '웨딩한방 - 결혼준비의 모든 것, 한방에',
  description: 'AI 24시간 플래너와 함께하는 스마트한 결혼준비. 투명한 가격, 업계 최저가.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className={`${notoSerif.variable} font-sans`}>{children}</body>
    </html>
  )
}
