import type { Metadata } from 'next'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { defaultMetadata } from '@/lib/seo'

export const metadata: Metadata = defaultMetadata

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto py-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}


