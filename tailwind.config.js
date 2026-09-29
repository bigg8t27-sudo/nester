/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // NESTA Design System
        background: '#F7F7F5',
        'text-primary': '#111111',
        'text-secondary': '#6B6B6B',
        border: '#E5E5E5',
        accent: '#B89B5E',
        'accent-light': '#D4BC8A',
        'accent-dark': '#9A7E44',
        white: '#FFFFFF',
        // Semantic shades
        surface: '#FFFFFF',
        'surface-secondary': '#F0F0ED',
        'surface-hover': '#EBEBEA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        // Explicit scale for visual hierarchy
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-sm': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '600' }],
        'heading-1': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        'heading-2': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        'heading-3': ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'heading-4': ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.005em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '8px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
        '2xl': '28px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card': '0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
        'modal': '0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)',
        'nav': '0 1px 0 rgba(0,0,0,0.06)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      backgroundImage: {
        'gradient-surface': 'linear-gradient(180deg, #FFFFFF 0%, #F7F7F5 100%)',
        'gradient-hero': 'linear-gradient(135deg, #111111 0%, #2A2A2A 100%)',
        'gradient-accent': 'linear-gradient(135deg, #B89B5E 0%, #9A7E44 100%)',
        'gradient-card-overlay': 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
