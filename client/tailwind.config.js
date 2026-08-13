/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C6CEC',
        'primary-dark': '#253C98',
        'primary-light': '#E0E6FC',
        'danger-bg': '#FDDCDD',
        'danger-icon': '#E5484D',
        track: '#DADAFF',
        'page-bg': '#EFEFEF',
        surface: '#FFFFFF',
        'text-primary': '#000000',
        'text-secondary': '#6B6B70',
        'text-muted': '#9B9B9B',
        border: '#E5E5E5',
      },
      borderRadius: {
        card: '18px',
        input: '12px',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
