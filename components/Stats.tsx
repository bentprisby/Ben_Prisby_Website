'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Briefcase, Globe, Target } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Stats() {
  const [milesRan, setMilesRan] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const businessesStarted = 2
  const businessesList = ["Onyx Detailing Solutions (Auto detailing company)"]
  const countriesVisited = 10
  const countriesList = ["USA", "Canada", "Mexico", "UK", "Montenegro", "Serbia", "Italy", "Hungary", "Austria", "France"]
  const longestFieldGoal = 40

  // Fetch miles ran data from Strava
  useEffect(() => {
    const fetchStravaData = async () => {
      try {
        // TODO: Replace with your actual Strava API endpoint
        // You'll need to set up Strava OAuth and store your access token
        const response = await fetch('/api/strava/stats')
        
        if (response.ok) {
          const data = await response.json()
          setMilesRan(data.totalMiles || 0)
        } else {
          // Fallback to placeholder value if API fails
          setMilesRan(1247)
        }
      } catch (error) {
        console.error('Error fetching Strava data:', error)
        // Fallback to placeholder value
        setMilesRan(1247)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStravaData()
  }, [])

  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: isLoading ? '...' : milesRan.toLocaleString(),
      label: "Miles Ran",
      description: "Total distance on Strava"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      value: businessesStarted.toString(),
      label: "Businesses Started",
      description: "Entrepreneurial ventures launched"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: countriesVisited.toString(),
      label: "Countries Visited",
      description: "Places explored worldwide"
    },
    {
      icon: <Target className="w-8 h-8" />,
      value: `${longestFieldGoal} yards`,
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
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group card-hover p-6 rounded-xl"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 group-hover:scale-110 transition-all ${
                  index === 0 ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' :
                  index === 1 ? 'bg-green-100 text-green-600 group-hover:bg-green-200' :
                  index === 2 ? 'bg-purple-100 text-purple-600 group-hover:bg-purple-200' :
                  'bg-orange-100 text-orange-600 group-hover:bg-orange-200'
                }`}>
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-primary">
                  {stat.value}
                </h3>
                <h4 className="font-semibold mb-2">{stat.label}</h4>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
