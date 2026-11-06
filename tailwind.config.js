/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          bg: "#0B0F19",
          card: "#121826",
          border: "#1F293D",
          accent: "#38BDF8",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
          purple: "#8B5CF6",
          text: "#F3F4F6",
          muted: "#9CA3AF"
        }
      }
    },
  },
  plugins: [],
}
