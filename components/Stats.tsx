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
