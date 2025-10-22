import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Color scheme utilities for consistent theming
export const colorSchemes = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    bgHover: 'group-hover:bg-blue-200',
    progressBar: 'bg-blue-500'
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    bgHover: 'group-hover:bg-orange-200',
    progressBar: 'bg-orange-500'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    bgHover: 'group-hover:bg-purple-200',
    progressBar: 'bg-purple-500'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    bgHover: 'group-hover:bg-green-200',
    progressBar: 'bg-green-500'
  },
  cyan: {
    bg: 'bg-cyan-100',
    text: 'text-cyan-600',
    bgHover: 'group-hover:bg-cyan-200',
    progressBar: 'bg-cyan-500'
  },
  emerald: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
    bgHover: 'group-hover:bg-emerald-200',
    progressBar: 'bg-emerald-500'
  },
  indigo: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-600',
    bgHover: 'group-hover:bg-indigo-200',
    progressBar: 'bg-indigo-500'
  },
  amber: {
    bg: 'bg-amber-100',
    text: 'text-amber-600',
    bgHover: 'group-hover:bg-amber-200',
    progressBar: 'bg-amber-500'
  },
  teal: {
    bg: 'bg-teal-100',
    text: 'text-teal-600',
    bgHover: 'group-hover:bg-teal-200',
    progressBar: 'bg-teal-500'
  },
  pink: {
    bg: 'bg-pink-100',
    text: 'text-pink-600',
    bgHover: 'group-hover:bg-pink-200',
    progressBar: 'bg-pink-500'
  },
  rose: {
    bg: 'bg-rose-100',
    text: 'text-rose-600',
    bgHover: 'group-hover:bg-rose-200',
    progressBar: 'bg-rose-500'
  }
} as const

export type ColorScheme = keyof typeof colorSchemes

export function getColorScheme(index: number): ColorScheme {
  const schemes: ColorScheme[] = ['blue', 'orange', 'purple', 'cyan', 'emerald', 'indigo', 'amber', 'teal', 'pink', 'rose']
  return schemes[index % schemes.length]
}
