/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#e8edff",
          500: "#4257d6",
          600: "#3346bc",
          700: "#2a3aa0",
        },
      },
      boxShadow: {
        soft: "0 12px 30px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
}

