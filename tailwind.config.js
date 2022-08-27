/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8d98f2',
          dark: '#25408e',
          DEFAULT: '#5b6abf'
        },
        secondary: {
          light: '#ffffa4',
          dark: '#bda345',
          DEFAULT: '#f2d474'
        },
        background: '#ffffff',
        surface: '#ffffff',
        error: '#ef5350',
        'on-primary': '#ffffff',
        'on-secondary': '#000000',
        'on-background': '#000000',
        'on-surface': '#000000',
        'on-error': '#ffffff'
      },
    },
  },
  plugins: [],
}
