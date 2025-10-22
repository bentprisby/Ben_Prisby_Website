'use client'

import { motion } from 'framer-motion'
import { Trophy, Flame, MapPin, Plane, GraduationCap, BookOpen, Briefcase, Heart, Calendar } from 'lucide-react'

export default function Goals() {
  const goals = [
    {
      icon: <Trophy className="w-6 h-6" />,
      category: "Athletics",
      title: "Become an Olympian",
      description: "Train and compete at Olympic trials by 2028",
      progress: 10,
      deadline: "2028",
      current: "Training",
      target: "Compete",
      unit: ""
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      category: "Financial",
      title: "Save $10K for Business Purchase",
      description: "Set aside $10,000 in liquid capital to acquire a business opportunity",
      progress: 0,
      deadline: "2026",
      current: 0,
      target: 10000,
      unit: "$"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      category: "Lifestyle",
      title: "Move to a New State",
      description: "Research, visit, and relocate to a new state for fresh opportunities",
      progress: 20,
      deadline: "2026",
      current: "Planning",
      target: "Complete",
      unit: ""
    },
    {
      icon: <Plane className="w-6 h-6" />,
      category: "Travel",
      title: "International Trip",
      description: "Plan and complete 1 international trip in Spring 2026",
      progress: 0,
      deadline: "Spring 2026",
      current: 0,
      target: 1,
      unit: "trip"
    },
    {
      icon: <Plane className="w-6 h-6" />,
      category: "Travel",
      title: "5 US Trips",
      description: "Visit 5 different US destinations by end of 2026",
      progress: 0,
      deadline: "Dec 2026",
      current: 0,
      target: 5,
      unit: "trips"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      category: "Education",
      title: "Graduate School Applications",
      description: "Apply to Master's programs at UT Austin, U of M, Georgia Tech, MIT, Stanford",
      progress: 5,
      deadline: "2026",
      current: "Researching",
      target: "5 Apps",
      unit: ""
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      category: "Education",
      title: "Linear Algebra Course",
      description: "Complete comprehensive linear algebra course with certification",
      progress: 0,
      deadline: "2026",
      current: "Not Started",
      target: "Complete",
      unit: ""
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      category: "Education",
      title: "Finish CS50X",
      description: "Complete all problem sets and final project for Harvard CS50X",
      progress: 30,
      deadline: "2026",
      current: "In Progress",
      target: "Complete",
      unit: ""
    },
    {
      icon: <Heart className="w-6 h-6" />,
      category: "Impact",
      title: "Weekly Acts of Kindness",
      description: "Perform 1 meaningful random act of kindness every week",
      progress: 0,
      deadline: "Ongoing",
      current: "Starting",
      target: "52/year",
      unit: ""
    }
  ]

  return (
    <section id="goals" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">SMART Goals</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Specific, Measurable, Achievable, Relevant, and Time-bound objectives across athletics, education, career, and personal growth
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group venmo-card card-hover p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg group-hover:scale-110 transition-all ${
                    index % 10 === 0 ? 'bg-blue-100 text-blue-600' :
                    index % 10 === 1 ? 'bg-orange-100 text-orange-600' :
                    index % 10 === 2 ? 'bg-purple-100 text-purple-600' :
                    index % 10 === 3 ? 'bg-cyan-100 text-cyan-600' :
                    index % 10 === 4 ? 'bg-emerald-100 text-emerald-600' :
                    index % 10 === 5 ? 'bg-indigo-100 text-indigo-600' :
                    index % 10 === 6 ? 'bg-amber-100 text-amber-600' :
                    index % 10 === 7 ? 'bg-teal-100 text-teal-600' :
                    index % 10 === 8 ? 'bg-pink-100 text-pink-600' :
                    'bg-rose-100 text-rose-600'
                  }`}>
                    {goal.icon}
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {goal.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {goal.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {goal.description}
                </p>

                {/* Deadline Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Target: {goal.deadline}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-semibold text-primary">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${goal.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className={`h-full rounded-full ${
                        index % 10 === 0 ? 'bg-blue-500' :
                        index % 10 === 1 ? 'bg-orange-500' :
                        index % 10 === 2 ? 'bg-purple-500' :
                        index % 10 === 3 ? 'bg-cyan-500' :
                        index % 10 === 4 ? 'bg-emerald-500' :
                        index % 10 === 5 ? 'bg-indigo-500' :
                        index % 10 === 6 ? 'bg-amber-500' :
                        index % 10 === 7 ? 'bg-teal-500' :
                        index % 10 === 8 ? 'bg-pink-500' :
                        'bg-rose-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Current/Target Display */}
                {goal.unit && typeof goal.current === 'number' && typeof goal.target === 'number' ? (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Current: <span className="font-semibold text-foreground">{goal.current} {goal.unit}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Target: <span className="font-semibold text-foreground">{goal.target} {goal.unit}</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="px-3 py-1 bg-muted text-foreground rounded-full text-xs font-medium">
                      {goal.current}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

