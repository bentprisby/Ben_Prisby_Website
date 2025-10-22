'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, Dumbbell, BookOpen, Heart, Activity, CheckCircle } from 'lucide-react'
import {
  MUSCLE_GROUPS,
  ACTIVITY_TABS,
  DEFAULT_ROWING_DISTANCE,
  SUCCESS_MESSAGE_DURATION,
  ANIMATION_DURATION,
} from '@/lib/constants'
import { getTrackingData, upsertTrackingEntry } from '@/lib/storage'
import type { TrackingData, ActivityTab } from '@/lib/types'

interface RealTimeDataEntryProps {
  onDataUpdate: (data: TrackingData) => void
}

export default function RealTimeDataEntry({ onDataUpdate }: RealTimeDataEntryProps) {
  const [activeTab, setActiveTab] = useState<ActivityTab>(ACTIVITY_TABS.STUDY)
  const [showSuccess, setShowSuccess] = useState(false)

  // Form states
  const [studyHours, setStudyHours] = useState('')
  const [gymWent, setGymWent] = useState(false)
  const [muscleGroup, setMuscleGroup] = useState('')
  const [yogaDid, setYogaDid] = useState(false)
  const [rowingTime, setRowingTime] = useState('')
  const [rowingMeters, setRowingMeters] = useState(String(DEFAULT_ROWING_DISTANCE))
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const loadExistingData = useCallback(() => {
    const data = getTrackingData()
    onDataUpdate(data)
  }, [onDataUpdate])

  useEffect(() => {
    loadExistingData()
  }, [loadExistingData])

  const showSuccessMessage = useCallback(() => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), SUCCESS_MESSAGE_DURATION)
  }, [])

  const addStudyHours = useCallback(() => {
    if (!studyHours || parseFloat(studyHours) <= 0) return

    const newData = upsertTrackingEntry(
      'studyHours',
      { date: selectedDate, hours: parseFloat(studyHours) },
      selectedDate
    )

    onDataUpdate(newData)
    setStudyHours('')
    showSuccessMessage()
  }, [studyHours, selectedDate, onDataUpdate, showSuccessMessage])

  const addGymSession = useCallback(() => {
    const newData = upsertTrackingEntry(
      'gymSessions',
      {
        date: selectedDate,
        went: gymWent,
        muscleGroup: gymWent ? muscleGroup : undefined,
      },
      selectedDate
    )

    onDataUpdate(newData)
    setGymWent(false)
    setMuscleGroup('')
    showSuccessMessage()
  }, [gymWent, muscleGroup, selectedDate, onDataUpdate, showSuccessMessage])

  const addYogaSession = useCallback(() => {
    const newData = upsertTrackingEntry(
      'yogaSessions',
      { date: selectedDate, didYoga: yogaDid },
      selectedDate
    )

    onDataUpdate(newData)
    setYogaDid(false)
    showSuccessMessage()
  }, [yogaDid, selectedDate, onDataUpdate, showSuccessMessage])

  const addRowingTime = useCallback(() => {
    if (!rowingTime || !rowingMeters) return

    const newData = upsertTrackingEntry(
      'rowingTimes',
      {
        date: selectedDate,
        time: rowingTime,
        meters: parseInt(rowingMeters, 10),
      },
      selectedDate
    )

    onDataUpdate(newData)
    setRowingTime('')
    setRowingMeters(String(DEFAULT_ROWING_DISTANCE))
    showSuccessMessage()
  }, [rowingTime, rowingMeters, selectedDate, onDataUpdate, showSuccessMessage])

  const tabs = [
    {
      id: ACTIVITY_TABS.STUDY,
      label: 'Study Hours',
      icon: <BookOpen className="w-4 h-4" />,
      color: 'text-green-600',
    },
    {
      id: ACTIVITY_TABS.GYM,
      label: 'Gym Session',
      icon: <Dumbbell className="w-4 h-4" />,
      color: 'text-blue-600',
    },
    {
      id: ACTIVITY_TABS.YOGA,
      label: 'Yoga Practice',
      icon: <Heart className="w-4 h-4" />,
      color: 'text-pink-600',
    },
    {
      id: ACTIVITY_TABS.ROWING,
      label: 'Rowing Time',
      icon: <Activity className="w-4 h-4" />,
      color: 'text-orange-600',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATION.NORMAL }}
      className="venmo-card mb-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <Plus className="w-5 h-5 text-primary" aria-hidden="true" />
        <h3 className="text-xl font-semibold">Add New Entry</h3>
      </div>

      {/* Date Selector */}
      <div className="mb-6">
        <label htmlFor="entry-date" className="block text-sm font-medium mb-2">
          Date
        </label>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="date"
            id="entry-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Select date for entry"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Activity types">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <span className={tab.color} aria-hidden="true">
              {tab.icon}
            </span>
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
          className="flex items-center gap-2 text-green-600 mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
          role="alert"
          aria-live="polite"
        >
          <CheckCircle className="w-4 h-4" aria-hidden="true" />
          <span>Entry added successfully! Chart updated.</span>
        </motion.div>
      )}

      {/* Study Hours Form */}
      {activeTab === ACTIVITY_TABS.STUDY && (
        <div className="space-y-4" role="tabpanel" id="study-panel">
          <div>
            <label htmlFor="study-hours" className="block text-sm font-medium mb-2">
              Study Hours
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="study-hours"
                step="0.5"
                min="0"
                max="24"
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value)}
                placeholder="e.g., 2.5"
                className="flex-1 px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                aria-describedby="study-hours-description"
              />
              <button
                onClick={addStudyHours}
                className="venmo-button flex items-center gap-2"
                disabled={!studyHours || parseFloat(studyHours) <= 0}
                aria-label="Add study hours entry"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                Add
              </button>
            </div>
            <p id="study-hours-description" className="sr-only">
              Enter study hours between 0 and 24, with 0.5 hour increments
            </p>
          </div>
        </div>
      )}

      {/* Gym Session Form */}
      {activeTab === ACTIVITY_TABS.GYM && (
        <div className="space-y-4" role="tabpanel" id="gym-panel">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={gymWent}
                onChange={(e) => setGymWent(e.target.checked)}
                className="w-4 h-4 text-primary"
                aria-label="Went to gym today"
              />
              <span className="font-medium">Went to gym today</span>
            </label>
          </div>

          {gymWent && (
            <div>
              <label htmlFor="muscle-group" className="block text-sm font-medium mb-2">
                Muscle Group Worked
              </label>
              <select
                id="muscle-group"
                value={muscleGroup}
                onChange={(e) => setMuscleGroup(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Select muscle group"
              >
                <option value="">Select muscle group</option>
                {MUSCLE_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={addGymSession}
            className="venmo-button flex items-center gap-2"
            aria-label="Add gym session entry"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add Session
          </button>
        </div>
      )}

      {/* Yoga Session Form */}
      {activeTab === ACTIVITY_TABS.YOGA && (
        <div className="space-y-4" role="tabpanel" id="yoga-panel">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={yogaDid}
                onChange={(e) => setYogaDid(e.target.checked)}
                className="w-4 h-4 text-primary"
                aria-label="Did yoga today"
              />
              <span className="font-medium">Did yoga today</span>
            </label>
          </div>

          <button
            onClick={addYogaSession}
            className="venmo-button flex items-center gap-2"
            aria-label="Add yoga session entry"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add Session
          </button>
        </div>
      )}

      {/* Rowing Time Form */}
      {activeTab === ACTIVITY_TABS.ROWING && (
        <div className="space-y-4" role="tabpanel" id="rowing-panel">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rowing-time" className="block text-sm font-medium mb-2">
                Time (MM:SS)
              </label>
              <input
                type="text"
                id="rowing-time"
                value={rowingTime}
                onChange={(e) => setRowingTime(e.target.value)}
                placeholder="e.g., 7:45"
                pattern="[0-9]{1,2}:[0-5][0-9]"
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                aria-describedby="rowing-time-description"
              />
              <p id="rowing-time-description" className="sr-only">
                Enter time in minutes and seconds format (MM:SS)
              </p>
            </div>
            <div>
              <label htmlFor="rowing-meters" className="block text-sm font-medium mb-2">
                Distance (meters)
              </label>
              <input
                type="number"
                id="rowing-meters"
                value={rowingMeters}
                onChange={(e) => setRowingMeters(e.target.value)}
                min="100"
                step="100"
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Rowing distance in meters"
              />
            </div>
          </div>

          <button
            onClick={addRowingTime}
            className="venmo-button flex items-center gap-2"
            disabled={!rowingTime || !rowingMeters}
            aria-label="Add rowing time entry"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add Time
          </button>
        </div>
      )}
    </motion.div>
  )
}
