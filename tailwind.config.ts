import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: 'hsl(220, 13%, 8%)',
          muted: 'hsl(220, 13%, 16%)',
          darker: 'hsl(220, 13%, 4%)',
        },
        'over-dark': 'hsl(0, 0%, 98%)',
        'over-muted': 'hsl(0, 0%, 90%)',
        neutral: {
          DEFAULT: 'hsl(0, 0%, 75%)',
          hover: 'hsl(0, 0%, 85%)',
        },
        accent: {
          blue: 'hsl(212, 100%, 60%)',
          purple: 'hsl(272, 100%, 65%)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
