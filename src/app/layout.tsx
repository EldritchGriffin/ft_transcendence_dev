import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'

const Font = Press_Start_2P({
  subsets:['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'PingPong Transcendence',
  description: 'Made by abelahce absela hchahid ysakine aelyakou',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={Font.className +' bg-darkblue'}>{children}</body>
    </html>
  )
}
