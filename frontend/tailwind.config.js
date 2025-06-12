module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // More accurate Outlook Web colors
        'outlook-blue': '#0078d4',
        'outlook-light-blue': '#106ebe',
        'outlook-dark-blue': '#005a9e',
        'outlook-gray': '#f3f2f1',
        'outlook-light-gray': '#faf9f8',
        'outlook-border': '#e1dfdd',
        'outlook-dark-border': '#d2d0ce',
        'outlook-text': '#323130',
        'outlook-text-secondary': '#605e5c',
        'outlook-hover': '#f3f2f1',
        'outlook-selected': '#deecf9',
        'outlook-sidebar': '#f8f8f8',
        'outlook-white': '#ffffff'
      },
      fontSize: {
        'xs': '11px',
        'sm': '12px',
        'base': '14px',
        'lg': '16px',
        'xl': '18px'
      },
      fontFamily: {
        'segoe': ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        'outlook': '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)',
        'outlook-strong': '0 6.4px 14.4px 0 rgba(0,0,0,0.132), 0 1.2px 3.6px 0 rgba(0,0,0,0.108)'
      }
    },
  },
  plugins: [],
}