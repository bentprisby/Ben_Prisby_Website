'use client'

import { motion } from 'framer-motion'
import { Code2, Terminal, Database, Brain } from 'lucide-react'

export default function Skills() {
  const proficientLanguages = [
    { name: "Python", icon: "🐍", category: "Programming" },
    { name: "C", icon: "⚡", category: "Programming" },
    { name: "SQL", icon: "🗄️", category: "Database" },
    { name: "MATLAB", icon: "📊", category: "Scientific" },
    { name: "R", icon: "📈", category: "Statistical" }
  ]

  const learningLanguages = [
    { name: "C++", icon: "⚙️", category: "Programming" },
    { name: "Java", icon: "☕", category: "Programming" },
    { name: "JavaScript", icon: "🌐", category: "Web" },
    { name: "PyTorch", icon: "🔥", category: "ML/AI" },
    { name: "C#", icon: "🎮", category: "Programming" }
  ]

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Technical Skills</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Programming languages and technologies I work with and continue to learn
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Proficient Languages */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="venmo-card card-hover"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold">Proficient</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {proficientLanguages.map((lang, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="group relative p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all hover:scale-105 cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.icon}</span>
                      <div>
                        <p className="font-semibold text-foreground">{lang.name}</p>
                        <p className="text-xs text-muted-foreground">{lang.category}</p>
                      </div>
                    </div>
                    {/* Skill level indicator */}
                    <div className="mt-3 h-1.5 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Currently Learning */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="venmo-card card-hover"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold">Currently Learning</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {learningLanguages.map((lang, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="group relative p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all hover:scale-105 cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.icon}</span>
                      <div>
                        <p className="font-semibold text-foreground">{lang.name}</p>
                        <p className="text-xs text-muted-foreground">{lang.category}</p>
                      </div>
                    </div>
                    {/* Skill level indicator */}
                    <div className="mt-3 h-1.5 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${40 + index * 10}%` }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Optional: Tech Stack Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex flex-wrap gap-2 justify-center">
              {[...proficientLanguages, ...learningLanguages].map((lang, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {lang.name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

