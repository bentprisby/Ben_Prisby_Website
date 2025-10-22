/**
 * Custom hook for managing tracking data
 */

import { useState, useEffect, useCallback } from 'react'
import type { TrackingData } from '../types'
import { getTrackingData, saveTrackingData, upsertTrackingEntry } from '../storage'

export function useTrackingData() {
  const [data, setData] = useState<TrackingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load data on mount
  useEffect(() => {
    try {
      const trackingData = getTrackingData()
      setData(trackingData)
      setError(null)
    } catch (err) {
      setError('Failed to load tracking data')
      console.error('Error loading tracking data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update data and localStorage
  const updateData = useCallback((newData: TrackingData) => {
    try {
      const success = saveTrackingData(newData)
      if (success) {
        setData(newData)
        setError(null)
        return true
      } else {
        setError('Failed to save tracking data')
        return false
      }
    } catch (err) {
      setError('Failed to update tracking data')
      console.error('Error updating tracking data:', err)
      return false
    }
  }, [])

  // Add or update a specific entry
  const upsertEntry = useCallback(
    <K extends keyof TrackingData>(
      key: K,
      entry: TrackingData[K][number],
      date: string
    ) => {
      try {
        const newData = upsertTrackingEntry(key, entry, date)
        setData(newData)
        setError(null)
        return true
      } catch (err) {
        setError('Failed to update entry')
        console.error('Error updating entry:', err)
        return false
      }
    },
    []
  )

  return {
    data,
    isLoading,
    error,
    updateData,
    upsertEntry,
  }
}
