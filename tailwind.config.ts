import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0b0d10',
        foreground: '#e5e7eb',
        primary: {
          DEFAULT: '#111315',
          foreground: '#e5e7eb',
        },
        secondary: {
          DEFAULT: '#1f2937',
          foreground: '#e5e7eb',
        },
        accent: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
        sky: {
          DEFAULT: '#38bdf8',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#374151',
          foreground: '#9ca3af',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1400px',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

