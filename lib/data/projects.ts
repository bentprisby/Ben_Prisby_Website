/**
 * Projects data for the portfolio
 */

import type { Project } from '../types'

export const projects: Project[] = [
  {
    title: 'AI-Powered Workflow Automation Platform',
    description:
      'Full-stack application using Python, React, and Docker to automate business workflows with AI integration.',
    image: '/project1.jpg',
    tech: ['Python', 'React', 'Docker', 'AI/ML'],
    github: 'https://github.com/bentprisby/workflow-automation',
    live: 'https://workflow-automation.vercel.app',
    featured: true,
  },
  {
    title: 'Supply Chain Optimization Dashboard',
    description:
      'Real-time analytics dashboard for supply chain management with predictive modeling capabilities.',
    image: '/project2.jpg',
    tech: ['Next.js', 'TypeScript', 'Python', 'SQL'],
    github: 'https://github.com/bentprisby/supply-chain-dashboard',
    live: 'https://supply-chain-dash.vercel.app',
    featured: true,
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'Modern, responsive portfolio built with Next.js 14, TypeScript, and Tailwind CSS.',
    image: '/project3.jpg',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/bentprisby/portfolio',
    live: 'https://benprisby.com',
    featured: false,
  },
  {
    title: 'Automated Lead Generation System',
    description:
      'Python-based system that automates lead generation and customer outreach for businesses.',
    image: '/project4.jpg',
    tech: ['Python', 'Selenium', 'PostgreSQL', 'APIs'],
    github: 'https://github.com/bentprisby/lead-gen-automation',
    live: null,
    featured: false,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
