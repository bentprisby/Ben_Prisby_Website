import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Ben Prisby - Industrial Engineer',
  description: 'Industrial Engineering student at Michigan State University, passionate about Kaizen, iteration, and philosophy.',
  keywords: 'Ben Prisby, Industrial Engineering, Michigan State University, Supply Chain, AI, Automation',
  authors: [{ name: 'Ben Prisby' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://benprisby.com',
    title: 'Ben Prisby - Industrial Engineer',
    description: 'Industrial Engineering student at Michigan State University',
    siteName: 'Ben Prisby Portfolio',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
