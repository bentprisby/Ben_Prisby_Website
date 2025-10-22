'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Briefcase, Globe, Target } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getColorScheme, colorSchemes } from '@/lib/utils'

interface StravaStatsResponse {
  totalMiles?: number
  error?: string
}

const FALLBACK_MILES = 1247
const BUSINESSES_STARTED = 2
const COUNTRIES_VISITED = 10
const LONGEST_FIELD_GOAL = 40

export default function Stats() {
  const [milesRan, setMilesRan] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch miles ran data from Strava
  useEffect(() => {
    const fetchStravaData = async () => {
      try {
        const response = await fetch('/api/strava/stats')

        if (response.ok) {
          const data: StravaStatsResponse = await response.json()
          setMilesRan(data.totalMiles || FALLBACK_MILES)
        } else {
          setMilesRan(FALLBACK_MILES)
        }
      } catch (error) {
        console.error('Error fetching Strava data:', error)
        setMilesRan(FALLBACK_MILES)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStravaData()
  }, [])

  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8" aria-hidden="true" />,
      value: isLoading ? '...' : milesRan.toLocaleString(),
      label: "Miles Ran",
      description: "Total distance on Strava"
    },
    {
      icon: <Briefcase className="w-8 h-8" aria-hidden="true" />,
      value: BUSINESSES_STARTED.toString(),
      label: "Businesses Started",
      description: "Entrepreneurial ventures launched"
    },
    {
      icon: <Globe className="w-8 h-8" aria-hidden="true" />,
      value: COUNTRIES_VISITED.toString(),
      label: "Countries Visited",
      description: "Places explored worldwide"
    },
    {
      icon: <Target className="w-8 h-8" aria-hidden="true" />,
      value: `${LONGEST_FIELD_GOAL} yards`,
      label: "Longest Field Goal Kicked",
      description: "Personal best distance"
    }
  ]

  return (
    <section id="stats" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Impact & Achievements</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Quantifying the real-world impact of engineering solutions and business initiatives
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const colorScheme = colorSchemes[getColorScheme(index)]

              return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group card-hover p-6 rounded-xl"
                role="article"
                aria-label={`${stat.label}: ${stat.value}`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 group-hover:scale-110 transition-all ${colorScheme.bg} ${colorScheme.text} ${colorScheme.bgHover}`}>
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-primary">
                  {stat.value}
                </h3>
                <h4 className="font-semibold mb-2">{stat.label}</h4>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
