import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: {
    default: 'Ben Prisby - Applied Engineering & Operations',
    template: '%s | Ben Prisby',
  },
  description: 'Applied (Industrial) Engineering student at MSU. Founder of Onyx Detailing Solutions. Turning messy operations into measurable systems with data, automation, and clear processes.',
  keywords: [
    'Ben Prisby',
    'Applied Engineering',
    'Industrial Engineering',
    'MSU',
    'Onyx Detailing Solutions',
    'Operations',
    'Data Analytics',
    'Supply Chain',
    'Automation',
    'AI',
  ],
  authors: [{ name: 'Ben Prisby' }],
  creator: 'Ben Prisby',
  publisher: 'Ben Prisby',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bentprisby.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bentprisby.com',
    title: 'Ben Prisby - Applied Engineering & Operations',
    description: 'Applied (Industrial) Engineering student at MSU. Founder of Onyx Detailing Solutions. Turning messy operations into measurable systems.',
    siteName: 'Ben Prisby',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ben Prisby - Applied Engineering & Operations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ben Prisby - Applied Engineering & Operations',
    description: 'Applied (Industrial) Engineering student at MSU. Founder of Onyx Detailing Solutions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export function generateMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string
  description?: string
  path?: string
  image?: string
}): Metadata {
  const url = path ? `https://bentprisby.com${path}` : 'https://bentprisby.com'
  const imageUrl = image ? `https://bentprisby.com${image}` : '/og-image.png'
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: imageUrl }],
    },
    twitter: {
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

