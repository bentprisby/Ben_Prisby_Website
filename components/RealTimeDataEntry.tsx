'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, Dumbbell, BookOpen, Heart, Activity, CheckCircle } from 'lucide-react'

interface TrackingData {
  gymSessions: Array<{ date: string; went: boolean; muscleGroup?: string }>
  studyHours: Array<{ date: string; hours: number }>
  yogaSessions: Array<{ date: string; didYoga: boolean }>
  rowingTimes: Array<{ date: string; time: string; meters: number }>
}

interface RealTimeDataEntryProps {
  onDataUpdate: (data: TrackingData) => void
}

export default function RealTimeDataEntry({ onDataUpdate }: RealTimeDataEntryProps) {
  const [activeTab, setActiveTab] = useState<'study' | 'gym' | 'yoga' | 'rowing'>('study')
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Form states
  const [studyHours, setStudyHours] = useState('')
  const [gymWent, setGymWent] = useState(false)
  const [muscleGroup, setMuscleGroup] = useState('')
  const [yogaDid, setYogaDid] = useState(false)
  const [rowingTime, setRowingTime] = useState('')
  const [rowingMeters, setRowingMeters] = useState('2000')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const muscleGroups = [
    'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Cardio', 'Full Body'
  ]

  const loadExistingData = () => {
    const savedData = localStorage.getItem('trackingData')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        onDataUpdate(data)
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }

  useEffect(() => {
    loadExistingData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showSuccessMessage = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const addStudyHours = () => {
    if (!studyHours || parseFloat(studyHours) <= 0) return

    const existingData = JSON.parse(localStorage.getItem('trackingData') || '{"gymSessions":[],"studyHours":[],"yogaSessions":[],"rowingTimes":[]}')
    
    // Remove existing entry for this date
    const filteredStudyHours = existingData.studyHours.filter((item: any) => item.date !== selectedDate)
    
    // Add new entry
    const newData = {
      ...existingData,
      studyHours: [...filteredStudyHours, { date: selectedDate, hours: parseFloat(studyHours) }]
    }
    
    localStorage.setItem('trackingData', JSON.stringify(newData))
    onDataUpdate(newData)
    setStudyHours('')
    showSuccessMessage()
  }

  const addGymSession = () => {
    const existingData = JSON.parse(localStorage.getItem('trackingData') || '{"gymSessions":[],"studyHours":[],"yogaSessions":[],"rowingTimes":[]}')
    
    // Remove existing entry for this date
    const filteredGymSessions = existingData.gymSessions.filter((item: any) => item.date !== selectedDate)
    
    // Add new entry
    const newData = {
      ...existingData,
      gymSessions: [...filteredGymSessions, { 
        date: selectedDate, 
        went: gymWent, 
        muscleGroup: gymWent ? muscleGroup : undefined 
      }]
    }
    
    localStorage.setItem('trackingData', JSON.stringify(newData))
    onDataUpdate(newData)
    setGymWent(false)
    setMuscleGroup('')
    showSuccessMessage()
  }

  const addYogaSession = () => {
    const existingData = JSON.parse(localStorage.getItem('trackingData') || '{"gymSessions":[],"studyHours":[],"yogaSessions":[],"rowingTimes":[]}')
    
    // Remove existing entry for this date
    const filteredYogaSessions = existingData.yogaSessions.filter((item: any) => item.date !== selectedDate)
    
    // Add new entry
    const newData = {
      ...existingData,
      yogaSessions: [...filteredYogaSessions, { date: selectedDate, didYoga: yogaDid }]
    }
    
    localStorage.setItem('trackingData', JSON.stringify(newData))
    onDataUpdate(newData)
    setYogaDid(false)
    showSuccessMessage()
  }

  const addRowingTime = () => {
    if (!rowingTime || !rowingMeters) return

    const existingData = JSON.parse(localStorage.getItem('trackingData') || '{"gymSessions":[],"studyHours":[],"yogaSessions":[],"rowingTimes":[]}')
    
    // Remove existing entry for this date
    const filteredRowingTimes = existingData.rowingTimes.filter((item: any) => item.date !== selectedDate)
    
    // Add new entry
    const newData = {
      ...existingData,
      rowingTimes: [...filteredRowingTimes, { 
        date: selectedDate, 
        time: rowingTime, 
        meters: parseInt(rowingMeters) 
      }]
    }
    
    localStorage.setItem('trackingData', JSON.stringify(newData))
    onDataUpdate(newData)
    setRowingTime('')
    setRowingMeters('2000')
    showSuccessMessage()
  }

  const tabs = [
    { id: 'study', label: 'Study Hours', icon: <BookOpen className="w-4 h-4" />, color: 'text-green-600' },
    { id: 'gym', label: 'Gym Session', icon: <Dumbbell className="w-4 h-4" />, color: 'text-blue-600' },
    { id: 'yoga', label: 'Yoga Practice', icon: <Heart className="w-4 h-4" />, color: 'text-pink-600' },
    { id: 'rowing', label: 'Rowing Time', icon: <Activity className="w-4 h-4" />, color: 'text-orange-600' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="venmo-card mb-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <Plus className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">Add New Entry</h3>
      </div>

      {/* Date Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Date</label>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <span className={tab.color}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex items-center gap-2 text-green-600 mb-4 p-3 bg-green-50 rounded-lg"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Entry added successfully! Chart updated.</span>
        </motion.div>
      )}

      {/* Study Hours Form */}
      {activeTab === 'study' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Study Hours</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value)}
                placeholder="e.g., 2.5"
                className="flex-1 px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={addStudyHours}
                className="venmo-button flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gym Session Form */}
      {activeTab === 'gym' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={gymWent}
                onChange={(e) => setGymWent(e.target.checked)}
                className="w-4 h-4 text-primary"
              />
              <span className="font-medium">Went to gym today</span>
            </label>
          </div>
          
          {gymWent && (
            <div>
              <label className="block text-sm font-medium mb-2">Muscle Group Worked</label>
              <select
                value={muscleGroup}
                onChange={(e) => setMuscleGroup(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select muscle group</option>
                {muscleGroups.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          )}
          
          <button
            onClick={addGymSession}
            className="venmo-button flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Session
          </button>
        </div>
      )}

      {/* Yoga Session Form */}
      {activeTab === 'yoga' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={yogaDid}
                onChange={(e) => setYogaDid(e.target.checked)}
                className="w-4 h-4 text-primary"
              />
              <span className="font-medium">Did yoga today</span>
            </label>
          </div>
          
          <button
            onClick={addYogaSession}
            className="venmo-button flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Session
          </button>
        </div>
      )}

      {/* Rowing Time Form */}
      {activeTab === 'rowing' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Time (MM:SS)</label>
              <input
                type="text"
                value={rowingTime}
                onChange={(e) => setRowingTime(e.target.value)}
                placeholder="e.g., 7:45"
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Distance (meters)</label>
              <input
                type="number"
                value={rowingMeters}
                onChange={(e) => setRowingMeters(e.target.value)}
                min="100"
                step="100"
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <button
            onClick={addRowingTime}
            className="venmo-button flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Time
          </button>
        </div>
      )}
    </motion.div>
  )
}
