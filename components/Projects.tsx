'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: "AI-Powered Workflow Automation Platform",
      description: "Full-stack application using Python, React, and Docker to automate business workflows with AI integration.",
      image: "/project1.jpg",
      tech: ["Python", "React", "Docker", "AI/ML"],
      github: "https://github.com/bentprisby/workflow-automation",
      live: "https://workflow-automation.vercel.app",
      featured: true
    },
    {
      title: "Supply Chain Optimization Dashboard",
      description: "Real-time analytics dashboard for supply chain management with predictive modeling capabilities.",
      image: "/project2.jpg",
      tech: ["Next.js", "TypeScript", "Python", "SQL"],
      github: "https://github.com/bentprisby/supply-chain-dashboard",
      live: "https://supply-chain-dash.vercel.app",
      featured: true
    },
    {
      title: "Personal Portfolio Website",
      description: "Modern, responsive portfolio built with Next.js 14, TypeScript, and Tailwind CSS.",
      image: "/project3.jpg",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/bentprisby/portfolio",
      live: "https://benprisby.com",
      featured: false
    },
    {
      title: "Automated Lead Generation System",
      description: "Python-based system that automates lead generation and customer outreach for businesses.",
      image: "/project4.jpg",
      tech: ["Python", "Selenium", "PostgreSQL", "APIs"],
      github: "https://github.com/bentprisby/lead-gen-automation",
      live: null,
      featured: false
    }
  ]

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden venmo-card card-hover"
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-4xl">🚀</div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-xl text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
