/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    fontSize: {
      'sm': 'var(--sm)',
      'base': 'var(--base)',
      'lg': 'var(--lg)',
      'xl': 'var(--xl)',
      '2xl': 'var(--xxl)'
    },
    container: {
      width: '100%',
      padding: '1.5rem',
      margin: 'auto'
    },
    extend: {
      colors: {
        DEFAULT: 'var(--foreground)',
        'background': 'var(--background)',
        'primary': 'var(--primary)',
        'title': 'var(--header-title)',
        'border': 'var(--border)'
      }
    },
  },
  plugins: [],
}

