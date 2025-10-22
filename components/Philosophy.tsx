'use client'

import { motion } from 'framer-motion'
import { Quote, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'

interface PhilosophyQuote {
  quote: string
  author: string
  era: string
  context: string
}

export default function Philosophy() {
  const [dailyQuote, setDailyQuote] = useState<PhilosophyQuote | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDailyQuote = async () => {
      try {
        const response = await fetch('/api/philosophy/daily-quote')
        if (response.ok) {
          const data = await response.json()
          setDailyQuote(data)
        }
      } catch (error) {
        console.error('Error fetching daily quote:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDailyQuote()
  }, [])

  if (isLoading) {
    return (
      <section id="philosophy" className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="venmo-card text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-2/3 mx-auto mb-8"></div>
              <div className="h-24 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!dailyQuote) {
    return null
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <section id="philosophy" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Daily Philosophy</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            A thought-provoking quote from history's greatest thinkers, updated daily
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="venmo-card card-hover relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0"></div>
            
            <div className="relative z-10">
              {/* Date Badge */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-medium">{today}</span>
              </div>

              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Quote className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-center mb-8">
                <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed mb-6">
                  "{dailyQuote.quote}"
                </p>
                
                <footer className="space-y-2">
                  <p className="text-lg font-semibold text-primary">
                    — {dailyQuote.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dailyQuote.era}
                  </p>
                </footer>
              </blockquote>

              {/* Context/Philosophy */}
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center italic">
                  {dailyQuote.context}
                </p>
              </div>

              {/* Reflection prompt */}
              <div className="mt-6 p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">
                  💭 Take a moment to reflect on this wisdom
                </p>
              </div>
            </div>
          </motion.div>

          {/* Additional philosophical note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-muted-foreground">
              Quote refreshes daily at midnight • Drawing from ancient to modern philosophy
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

