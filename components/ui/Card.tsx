import React from 'react'

type CardProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`rounded-2xl border border-secondary shadow-soft bg-primary ${className || ''}`.trim()}>
      {children}
    </div>
  )
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 pt-5">
      {children}
    </div>
  )
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 pb-5">
      {children}
    </div>
  )
}


