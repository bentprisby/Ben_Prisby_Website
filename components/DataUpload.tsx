'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'

interface UploadedData {
  gymSessions: Array<{ date: string; went: boolean; muscleGroup?: string }>
  studyHours: Array<{ date: string; hours: number }>
  yogaSessions: Array<{ date: string; didYoga: boolean }>
  rowingTimes: Array<{ date: string; time: string; meters: number }>
}

export default function DataUpload() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadedData, setUploadedData] = useState<UploadedData | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadStatus('uploading')

    try {
      const text = await file.text()
      const data = JSON.parse(text)
      
      // Validate data structure
      if (data.gymSessions && data.studyHours && data.yogaSessions && data.rowingTimes) {
        setUploadedData(data)
        setUploadStatus('success')
        
        // Store in localStorage for persistence
        localStorage.setItem('trackingData', JSON.stringify(data))
      } else {
        throw new Error('Invalid data format')
      }
    } catch (error) {
      console.error('Error parsing data:', error)
      setUploadStatus('error')
    }
  }

  const downloadTemplate = () => {
    const template = {
      gymSessions: [
        { date: "2024-01-01", went: true, muscleGroup: "Chest" },
        { date: "2024-01-02", went: false, muscleGroup: "" },
        { date: "2024-01-03", went: true, muscleGroup: "Back" }
      ],
      studyHours: [
        { date: "2024-01-01", hours: 6 },
        { date: "2024-01-02", hours: 4 },
        { date: "2024-01-03", hours: 8 }
      ],
      yogaSessions: [
        { date: "2024-01-01", didYoga: true },
        { date: "2024-01-02", didYoga: false },
        { date: "2024-01-03", didYoga: true }
      ],
      rowingTimes: [
        { date: "2024-01-01", time: "7:45", meters: 2000 },
        { date: "2024-01-15", time: "7:32", meters: 2000 },
        { date: "2024-01-30", time: "7:28", meters: 2000 }
      ]
    }

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tracking-data-template.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="venmo-card mb-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <Upload className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-semibold">Upload Your Data</h3>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={downloadTemplate}
            className="venmo-button-secondary flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Download Template
          </button>
          
          <label className="venmo-button flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload Data
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {uploadStatus === 'uploading' && (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Uploading and processing data...</span>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>Data uploaded successfully! Charts will update automatically.</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>Error uploading data. Please check the format and try again.</span>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p><strong>Data Format:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Gym Sessions:</strong> Daily yes/no with muscle group worked</li>
            <li><strong>Study Hours:</strong> Daily study hours</li>
            <li><strong>Yoga Sessions:</strong> Daily yes/no for yoga practice</li>
            <li><strong>Rowing Times:</strong> 2K row times with dates</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}


