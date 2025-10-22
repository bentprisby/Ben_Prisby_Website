'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Target, Brain, Rocket } from 'lucide-react'

export default function About() {
  const items = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Education",
      description: "B.S. Industrial Engineering, concentrating in Supply Chain Management at Michigan State University (2021-2025)"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Focus Areas",
      description: "AI/ML, Supply Chain Optimization, Process Engineering, Workflow Automation"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Philosophy",
      description: "Continuous improvement through Kaizen principles and iterative development"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Current Project",
      description: "Building this portfolio while exploring advanced engineering applications"
    }
  ]

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            Industrial Engineering student with a passion for leveraging technology to solve complex problems. 
            I combine engineering principles with modern software development to create innovative solutions 
            that drive efficiency and impact.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="venmo-card flex gap-4 card-hover"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  index === 0 ? 'bg-blue-100 text-blue-600' :
                  index === 1 ? 'bg-green-100 text-green-600' :
                  index === 2 ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
