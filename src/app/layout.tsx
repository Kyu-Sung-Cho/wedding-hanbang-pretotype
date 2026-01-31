import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '웨딩한방 - 결혼준비의 모든 것, 한방에',
  description: '투명한 가격, 24시간 상담, 합리적인 수수료. 더 이상 복잡하고 비싼 결혼준비는 그만.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
