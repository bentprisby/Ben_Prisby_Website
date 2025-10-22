/**
 * Application-wide constants
 */

import type { TrackingData } from './types'

// LocalStorage keys
export const STORAGE_KEYS = {
  TRACKING_DATA: 'trackingData',
} as const

// Default data structure
export const DEFAULT_TRACKING_DATA: TrackingData = {
  gymSessions: [],
  studyHours: [],
  yogaSessions: [],
  rowingTimes: [],
}

// Muscle groups for gym tracking
export const MUSCLE_GROUPS = [
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Core',
  'Cardio',
  'Full Body',
] as const

// Activity tabs
export const ACTIVITY_TABS = {
  STUDY: 'study',
  GYM: 'gym',
  YOGA: 'yoga',
  ROWING: 'rowing',
} as const

// Animation constants
export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
} as const

export const INTERSECTION_THRESHOLD = 0.1

// Success message duration
export const SUCCESS_MESSAGE_DURATION = 3000

// Default rowing distance
export const DEFAULT_ROWING_DISTANCE = 2000

// Chart colors
export const CHART_COLORS = {
  GYM: '#3b82f6',
  STUDY: '#10b981',
  YOGA: '#ec4899',
  ROWING: '#f97316',
} as const

// Social media links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/bentprisby',
  LINKEDIN: 'https://www.linkedin.com/in/prisbyb/',
  INSTAGRAM: 'https://instagram.com/benprisby',
  EMAIL: 'mailto:bentprisby@gmail.com',
} as const

// Navigation items
export const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#tracking', label: 'Tracking' },
  { href: '#stats', label: 'Stats' },
  { href: '#contact', label: 'Contact' },
] as const

// Contact information
export const CONTACT_INFO = {
  EMAIL: 'bentprisby@gmail.com',
  LOCATION: 'Metro Detroit, Michigan',
  PHONE: 'Available upon request',
} as const
