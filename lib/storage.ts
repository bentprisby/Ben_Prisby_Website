/**
 * Centralized localStorage utilities with type safety
 */

import type { TrackingData } from './types'
import { STORAGE_KEYS, DEFAULT_TRACKING_DATA } from './constants'

/**
 * Safely parse JSON with error handling
 */
function safeJSONParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json)
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return fallback
  }
}

/**
 * Validate that data has the correct structure
 */
function isValidTrackingData(data: unknown): data is TrackingData {
  if (!data || typeof data !== 'object') return false

  const d = data as Record<string, unknown>

  return (
    Array.isArray(d.gymSessions) &&
    Array.isArray(d.studyHours) &&
    Array.isArray(d.yogaSessions) &&
    Array.isArray(d.rowingTimes)
  )
}

/**
 * Get tracking data from localStorage
 */
export function getTrackingData(): TrackingData {
  if (typeof window === 'undefined') return DEFAULT_TRACKING_DATA

  const stored = localStorage.getItem(STORAGE_KEYS.TRACKING_DATA)

  if (!stored) return DEFAULT_TRACKING_DATA

  const parsed = safeJSONParse(stored, DEFAULT_TRACKING_DATA)

  return isValidTrackingData(parsed) ? parsed : DEFAULT_TRACKING_DATA
}

/**
 * Save tracking data to localStorage
 */
export function saveTrackingData(data: TrackingData): boolean {
  if (typeof window === 'undefined') return false

  try {
    if (!isValidTrackingData(data)) {
      console.error('Invalid tracking data structure')
      return false
    }

    localStorage.setItem(STORAGE_KEYS.TRACKING_DATA, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving tracking data:', error)
    return false
  }
}

/**
 * Update a specific field in tracking data
 */
export function updateTrackingData<K extends keyof TrackingData>(
  key: K,
  data: TrackingData[K]
): TrackingData {
  const currentData = getTrackingData()
  const newData = {
    ...currentData,
    [key]: data,
  }
  saveTrackingData(newData)
  return newData
}

/**
 * Clear all tracking data
 */
export function clearTrackingData(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.TRACKING_DATA)
}

/**
 * Add or update an entry in tracking data by date
 */
export function upsertTrackingEntry<K extends keyof TrackingData>(
  key: K,
  newEntry: TrackingData[K][number],
  date: string
): TrackingData {
  const currentData = getTrackingData()
  const currentArray = currentData[key]

  // Remove existing entry for this date
  const filteredArray = currentArray.filter(
    (item) => (item as { date: string }).date !== date
  )

  // Add new entry
  const newData = {
    ...currentData,
    [key]: [...filteredArray, newEntry],
  }

  saveTrackingData(newData)
  return newData
}
