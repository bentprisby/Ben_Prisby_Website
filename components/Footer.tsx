'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-card">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">Ben Prisby</h3>
            <p className="text-muted-foreground mb-4">
              Industrial Engineering student passionate about leveraging technology to solve complex problems and drive innovation.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/bentprisby"
                target="_blank"
                className="p-2 rounded-xl border hover:bg-accent transition-colors"
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/prisbyb/"
                target="_blank"
                className="p-2 rounded-xl border hover:bg-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="https://instagram.com/benprisby"
                target="_blank"
                className="p-2 rounded-xl border hover:bg-accent transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:bentprisby@gmail.com"
                className="p-2 rounded-xl border hover:bg-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#tracking" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tracking
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>bentprisby@gmail.com</p>
              <p>East Lansing, Michigan</p>
              <p>Michigan State University</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t mt-8 pt-8 text-center text-muted-foreground"
        >
          <p className="flex items-center justify-center gap-2">
            © {currentYear} Ben Prisby. Made with{' '}
            <Heart className="w-4 h-4 text-red-500" />{' '}
            using Next.js & TypeScript.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
