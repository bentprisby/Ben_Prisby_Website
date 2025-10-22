'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { saveTrackingData } from '@/lib/storage'
import { downloadJSON } from '@/lib/utils'
import { ANIMATION_DURATION, DEFAULT_ROWING_DISTANCE } from '@/lib/constants'
import type { TrackingData, UploadStatus } from '@/lib/types'

export default function DataUpload() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadStatus('uploading')

    try {
      const text = await file.text()
      const data: unknown = JSON.parse(text)

      // Validate data structure
      if (
        data &&
        typeof data === 'object' &&
        'gymSessions' in data &&
        'studyHours' in data &&
        'yogaSessions' in data &&
        'rowingTimes' in data
      ) {
        const success = saveTrackingData(data as TrackingData)
        if (success) {
          setUploadStatus('success')
          // Reload page to reflect changes
          setTimeout(() => window.location.reload(), 1500)
        } else {
          setUploadStatus('error')
        }
      } else {
        throw new Error('Invalid data format')
      }
    } catch (error) {
      console.error('Error parsing data:', error)
      setUploadStatus('error')
    }

    // Reset file input
    event.target.value = ''
  }, [])

  const downloadTemplate = useCallback(() => {
    const template: TrackingData = {
      gymSessions: [
        { date: '2024-01-01', went: true, muscleGroup: 'Chest' },
        { date: '2024-01-02', went: false },
        { date: '2024-01-03', went: true, muscleGroup: 'Back' },
      ],
      studyHours: [
        { date: '2024-01-01', hours: 6 },
        { date: '2024-01-02', hours: 4 },
        { date: '2024-01-03', hours: 8 },
      ],
      yogaSessions: [
        { date: '2024-01-01', didYoga: true },
        { date: '2024-01-02', didYoga: false },
        { date: '2024-01-03', didYoga: true },
      ],
      rowingTimes: [
        { date: '2024-01-01', time: '7:45', meters: DEFAULT_ROWING_DISTANCE },
        { date: '2024-01-15', time: '7:32', meters: DEFAULT_ROWING_DISTANCE },
        { date: '2024-01-30', time: '7:28', meters: DEFAULT_ROWING_DISTANCE },
      ],
    }

    downloadJSON(template, 'tracking-data-template.json')
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATION.NORMAL }}
      className="venmo-card mb-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <Upload className="w-5 h-5 text-blue-600" aria-hidden="true" />
        <h3 className="text-xl font-semibold">Upload Your Data</h3>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={downloadTemplate}
            className="venmo-button-secondary flex items-center justify-center gap-2"
            aria-label="Download JSON template file"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            Download Template
          </button>

          <label className="venmo-button flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" aria-hidden="true" />
            Upload Data
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileUpload}
              className="sr-only"
              aria-label="Upload tracking data JSON file"
            />
          </label>
        </div>

        {uploadStatus === 'uploading' && (
          <div className="flex items-center gap-2 text-blue-600" role="status" aria-live="polite">
            <div
              className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"
              aria-hidden="true"
            />
            <span>Uploading and processing data...</span>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="flex items-center gap-2 text-green-600" role="alert" aria-live="polite">
            <CheckCircle className="w-4 h-4" aria-hidden="true" />
            <span>Data uploaded successfully! Charts will update automatically.</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-600" role="alert" aria-live="assertive">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span>Error uploading data. Please check the format and try again.</span>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-semibold">Data Format:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Gym Sessions:</strong> Daily yes/no with muscle group worked
            </li>
            <li>
              <strong>Study Hours:</strong> Daily study hours
            </li>
            <li>
              <strong>Yoga Sessions:</strong> Daily yes/no for yoga practice
            </li>
            <li>
              <strong>Rowing Times:</strong> 2K row times with dates
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
