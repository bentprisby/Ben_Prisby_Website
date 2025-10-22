'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, PieChart, Pie, Cell } from 'recharts'
import { Dumbbell, BookOpen, Heart, Activity, TrendingUp, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import DataUpload from './DataUpload'

interface TrackingData {
  gymSessions: Array<{ date: string; went: boolean; muscleGroup?: string }>
  studyHours: Array<{ date: string; hours: number }>
  yogaSessions: Array<{ date: string; didYoga: boolean }>
  rowingTimes: Array<{ date: string; time: string; meters: number }>
}

export default function TrackingDashboard() {
  const [data, setData] = useState<TrackingData | null>(null)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('trackingData')
    if (savedData) {
      try {
        setData(JSON.parse(savedData))
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  // Process data for charts
  const processGymData = () => {
    if (!data?.gymSessions) return []
    
    const weeklyData: { [key: string]: { sessions: number; muscleGroups: string[] } } = {}
    
    data.gymSessions.forEach(session => {
      const date = new Date(session.date)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      const weekKey = weekStart.toISOString().split('T')[0]
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = { sessions: 0, muscleGroups: [] }
      }
      
      if (session.went) {
        weeklyData[weekKey].sessions++
        if (session.muscleGroup) {
          weeklyData[weekKey].muscleGroups.push(session.muscleGroup)
        }
      }
    })
    
    return Object.entries(weeklyData).map(([week, data]) => ({
      week: new Date(week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sessions: data.sessions,
      muscleGroups: [...new Set(data.muscleGroups)].join(', ')
    }))
  }

  const processStudyData = () => {
    if (!data?.studyHours) return []
    
    return data.studyHours.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      hours: item.hours
    }))
  }

  const processYogaData = () => {
    if (!data?.yogaSessions) return []
    
    const dailyData: { [key: string]: number } = {}
    data.yogaSessions.forEach(session => {
      const date = new Date(session.date)
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' })
      dailyData[dayKey] = (dailyData[dayKey] || 0) + (session.didYoga ? 1 : 0)
    })
    
    return Object.entries(dailyData).map(([day, sessions]) => ({
      day,
      sessions
    }))
  }

  const processRowingData = () => {
    if (!data?.rowingTimes) return []
    
    return data.rowingTimes.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: item.time,
      meters: item.meters
    }))
  }

  const gymData = processGymData()
  const studyData = processStudyData()
  const yogaData = processYogaData()
  const rowingData = processRowingData()

  // Calculate current stats
  const currentStats = [
    { 
      label: 'Gym Sessions This Week', 
      value: gymData.length > 0 ? gymData[gymData.length - 1]?.sessions || 0 : 0, 
      icon: <Dumbbell className="w-6 h-6" />, 
      color: 'text-blue-600' 
    },
    { 
      label: 'Study Hours Today', 
      value: studyData.length > 0 ? studyData[studyData.length - 1]?.hours || 0 : 0, 
      icon: <BookOpen className="w-6 h-6" />, 
      color: 'text-green-600' 
    },
    { 
      label: 'Yoga This Week', 
      value: yogaData.reduce((sum, day) => sum + day.sessions, 0), 
      icon: <Heart className="w-6 h-6" />, 
      color: 'text-pink-600' 
    },
    { 
      label: 'Best 2K Row Time', 
      value: rowingData.length > 0 ? rowingData[rowingData.length - 1]?.time || 'N/A' : 'N/A', 
      icon: <Activity className="w-6 h-6" />, 
      color: 'text-orange-600' 
    }
  ]


  return (
    <section id="tracking" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Personal Tracking Dashboard</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Tracking my fitness, study habits, and personal development metrics
          </p>

          <DataUpload />

          {/* Current Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {currentStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="venmo-card text-center card-hover"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Gym Sessions Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="venmo-card card-hover"
            >
              <div className="flex items-center gap-2 mb-6">
                <Dumbbell className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-semibold">Gym Sessions by Week</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gymData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value, name, props) => [
                    value, 
                    name === 'sessions' ? 'Sessions' : name,
                    props.payload.muscleGroups ? `Muscle Groups: ${props.payload.muscleGroups}` : ''
                  ]} />
                  <Bar dataKey="sessions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Study Hours Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="venmo-card card-hover"
            >
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-semibold">Study Hours by Day</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={studyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="hours" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Yoga Sessions Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="venmo-card card-hover"
            >
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-5 h-5 text-pink-600" />
                <h3 className="text-xl font-semibold">Yoga Sessions by Day</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yogaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Rowing Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="venmo-card card-hover"
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-orange-600" />
                <h3 className="text-xl font-semibold">2K Row Time Progress</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rowingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="time" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Motivation Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="venmo-card max-w-2xl mx-auto">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-4" />
              <blockquote className="text-lg italic text-muted-foreground mb-2">
                "What gets measured gets managed."
              </blockquote>
              <p className="text-sm text-muted-foreground">- Peter Drucker</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
