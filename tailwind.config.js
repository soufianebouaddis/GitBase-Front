/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gitbase: {
          dark: '#0d1117',
          secondary: '#161b22',
          border: '#30363d',
          primary: '#238636',
          accent: '#58a6ff',
        }
      }
    },
  },
  plugins: [],
}

