/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
        colors: {
            primary: 'hsla(var(--primary))'
        }
    },
  },
  plugins: [],
}
