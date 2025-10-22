'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { featuredProjects } from '@/lib/data/projects'
import { ANIMATION_DURATION } from '@/lib/constants'

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_DURATION.NORMAL }}
        >
          <h2 id="projects-heading" className="text-3xl font-bold mb-12">
            Featured Projects
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: ANIMATION_DURATION.NORMAL, delay: index * 0.1 }}
                className="group relative overflow-hidden venmo-card card-hover"
              >
                <div className="aspect-video bg-muted flex items-center justify-center" aria-hidden="true">
                  <div className="text-4xl" role="img" aria-label="Rocket emoji">
                    🚀
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-xl text-sm"
                        role="listitem"
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
                      aria-label={`View source code for ${project.title} on GitHub`}
                    >
                      <Github className="w-4 h-4" aria-hidden="true" />
                      Code
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
