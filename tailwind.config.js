/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F4A742", // 橘黃色 (from handoff/README)
        secondary: "#F5F0E8", // 米白色
        accent: "#6B4423", // 深棕色
      },
    },
  },
  plugins: [],
}
