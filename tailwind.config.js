/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme Colors
        primary: '#294B29',
        secondary: '#50623A',
        accent: '#789461',
        background: '#DBE7C9',
        
        // Dark Theme Colors
        'primary-dark': '#1B2A1B',
        'secondary-dark': '#3A4830',
        'accent-dark': '#62754D',
        'background-dark': '#1A2016',
      },
    },
  },
  plugins: [],
};
