'use client'

import { motion } from 'framer-motion'
import { Building, Calendar, ArrowRight } from 'lucide-react'

export default function Experience() {
  const experiences = [
    {
      company: "Personalized Workflow Solutions",
      role: "Co-Founder & CEO",
      period: "2025 - Present",
      description: [
        "Co-founded startup creating AI-driven workflow automations for niche businesses",
        "Developed Python-based lead generation platform automating 3,000+ client inquiries weekly",
        "Engineered autonomous marketing workflows using Python, Cursor, & Docker"
      ],
      tech: ["Python", "Docker", "AI/ML", "Automation"]
    },
    {
      company: "Rivian",
      role: "Supply Chain Engineering Intern",
      period: "2025",
      description: [
        "Built full-stack application in Hex, Python, and SQL leveraging Databricks",
        "Collaborated across teams to drive $20M in annual cost savings",
        "Pioneered MCP integration enabling natural language queries on data warehouse"
      ],
      tech: ["Python", "SQL", "Databricks", "Oracle OTM"]
    },
    {
      company: "Onyx Detailing Solutions",
      role: "Business Owner",
      period: "2024 - 2025",
      description: [
        "Founded and scaled auto detailing business to 3 employees",
        "Generated $20,000+ in revenue serving East Lansing and Metro Detroit",
        "Constructed MCP tool with Claude LLM to automate customer service"
      ],
      tech: ["Business Strategy", "AI Integration", "Operations"]
    },
    {
      company: "Home Chef",
      role: "Operations Engineering Intern",
      period: "2024",
      description: [
        "Restructured backend logistics databases, reducing energy consumption by 387%",
        "Analyzed Customer Lifetime Value to boost retention and growth"
      ],
      tech: ["SQL", "Python", "Data Analysis"]
    }
  ]

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-12">Experience</h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="venmo-card relative pl-8 border-l-4 border-primary card-hover"
              >
                <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full border-2 border-background ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-green-500' :
                  index === 2 ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    {exp.company}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>{exp.role}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-xl text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
