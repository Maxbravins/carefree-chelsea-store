/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        chelsea: {
          blue: "#034694",
          light: "#6CABDD"
        }
      }
    }
  },
  plugins: []
}
