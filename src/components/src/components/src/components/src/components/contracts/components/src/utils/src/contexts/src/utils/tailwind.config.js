module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'trust-blue': '#1e40af',
        'invest-green': '#065f46',
        'staking-dark': '#0f172a'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
