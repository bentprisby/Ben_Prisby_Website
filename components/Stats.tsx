'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Code, Users, Award } from 'lucide-react'

export default function Stats() {
  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "$20M+",
      label: "Cost Savings Generated",
      description: "Through supply chain optimizations"
    },
    {
      icon: <Code className="w-8 h-8" />,
      value: "3,000+",
      label: "Automated Workflows",
      description: "Weekly client inquiries processed"
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "3",
      label: "Team Members Led",
      description: "In business operations"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "387%",
      label: "Efficiency Improvement",
      description: "Energy consumption reduction"
    }
  ]

  return (
    <section id="stats" className="py-20 px-4 bg-muted/30">
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
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
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
