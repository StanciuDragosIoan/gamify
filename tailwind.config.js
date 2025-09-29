/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // For App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // For components
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // If using src/ directory
  ],
  theme: {
    extend: {}, // Customize your theme here (optional)
  },
  plugins: [], // Add plugins here (optional)
};