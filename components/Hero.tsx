'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Instagram, Mail, ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div className="max-w-6xl mx-auto w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ben
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
              Industrial Engineer at MSU
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Kaizen • Iteration • Philosophy
            </p>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              Passionate about building innovative solutions at the intersection of 
              engineering and technology. Currently exploring AI-driven automation 
              and supply chain optimization.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="https://github.com/bentprisby"
                target="_blank"
                className="p-3 border rounded-lg hover:bg-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/prisbyb/"
                target="_blank"
                className="p-3 border rounded-lg hover:bg-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com/benprisby"
                target="_blank"
                className="p-3 border rounded-lg hover:bg-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:prisbybe@msu.edu"
                className="p-3 border rounded-lg hover:bg-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-float"></div>
              <Image
                src="/profile.jpg"
                alt="Ben Prisby"
                width={400}
                height={400}
                className="relative rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="w-6 h-6 animate-bounce text-muted-foreground" />
      </motion.div>
    </section>
  )
}
