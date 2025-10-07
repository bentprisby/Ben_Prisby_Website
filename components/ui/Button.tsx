import React from 'react'
import Link from 'next/link'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

export default function Button({ children, href, onClick, variant = 'primary', className }: ButtonProps) {
  const variants: Record<string, string> = {
    primary: 'bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] border border-transparent',
    secondary: 'border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]',
    ghost: 'hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] border border-transparent',
  }

  const classes = `rounded-full transition-colors inline-flex items-center justify-center font-medium text-sm h-10 px-4 ${variants[variant]} ${className || ''}`.trim()

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}


