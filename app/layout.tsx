import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ben Prisby',
  description: 'Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-neutral-900 text-gray-200 antialiased">
        {children}
      </body>
    </html>
  )
}


