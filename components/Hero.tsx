'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Instagram, Mail, ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 hero-gradient">
      <div className="max-w-6xl mx-auto w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-primary">
                Ben Prisby
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
              Industrial Engineer who can code
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Philosophy • Building • Design • Music
            </p>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              I enjoy philosophy, the gym, building things, hunting, skiing, surfing, 
              running, design, fixing things, and music. Passionate about creating 
              innovative solutions at the intersection of engineering and technology.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="https://github.com/bentprisby"
                target="_blank"
                className="venmo-button-secondary flex items-center gap-2"
              >
                <Github className="w-4 h-4 github-icon" />
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/prisbyb/"
                target="_blank"
                className="venmo-button-secondary flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4 linkedin-icon" />
                LinkedIn
              </Link>
              <Link
                href="https://instagram.com/benprisby"
                target="_blank"
                className="venmo-button-secondary flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 instagram-icon" />
                Instagram
              </Link>
              <Link
                href="mailto:bentprisby@gmail.com"
                className="venmo-button-secondary flex items-center gap-2"
              >
                <Mail className="w-4 h-4 email-icon" />
                Email
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
              <Image
                src="/profile.jpeg"
                alt="Ben Prisby"
                width={400}
                height={400}
                className="relative rounded-2xl shadow-lg border border-border"
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
