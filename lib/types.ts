/**
 * Shared TypeScript types for the application
 */

export interface GymSession {
  date: string
  went: boolean
  muscleGroup?: string
}

export interface StudyHour {
  date: string
  hours: number
}

export interface YogaSession {
  date: string
  didYoga: boolean
}

export interface RowingTime {
  date: string
  time: string
  meters: number
}

export interface TrackingData {
  gymSessions: GymSession[]
  studyHours: StudyHour[]
  yogaSessions: YogaSession[]
  rowingTimes: RowingTime[]
}

export interface Project {
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  live: string | null
  featured: boolean
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface StatCard {
  label: string
  value: string | number
  icon: React.ReactNode
  color: string
}

export type ActivityTab = 'study' | 'gym' | 'yoga' | 'rowing'

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'
