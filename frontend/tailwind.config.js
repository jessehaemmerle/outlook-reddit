module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'outlook-blue': '#0078d4',
        'outlook-light-blue': '#106ebe',
        'outlook-gray': '#f3f2f1',
        'outlook-border': '#e1dfdd',
        'outlook-text': '#323130',
        'outlook-hover': '#f3f2f1'
      },
      fontSize: {
        'xs': '11px',
        'sm': '12px',
        'base': '14px',
        'lg': '16px'
      }
    },
  },
  plugins: [],
}