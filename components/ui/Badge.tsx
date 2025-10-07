import React from 'react'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'accent' | 'muted' | 'sky'
}

export default function Badge({ children, variant = 'accent' }: BadgeProps) {
  const variants: Record<string, string> = {
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground',
    sky: 'bg-sky text-sky-foreground',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}


