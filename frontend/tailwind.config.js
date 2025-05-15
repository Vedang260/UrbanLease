const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F3E8D2', // Cream
          DEFAULT: '#D4B483', // Warm beige
          dark: '#A07855',   // Earth brown
        },
        secondary: {
          light: '#6E7F80',  // Slate
          DEFAULT: '#3B4B4C', // Dark slate
          dark: '#1E2929',   // Charcoal
        },
        accent: {
          DEFAULT: '#C17C74', // Terracotta
          dark: '#8C5E58',    // Deep terracotta
        },
        neutral: colors.stone
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
