/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    fontSize: {
      'xs': 'var(--xs)',
      'sm': 'var(--sm)',
      'base': 'var(--base)',
      'lg': 'var(--lg)',
      'xl': 'var(--xl)',
      '2xl': 'var(--xxl)',
    },
    container: {
      width: '100%',
      padding: '1.5rem',
      margin: 'auto',
      maxWidth: '1440px'
    },
    extend: {
      colors: {
        DEFAULT: 'var(--foreground)',
        'background': 'var(--background)',
        'primary': 'var(--primary)',
        'border': 'var(--border)',
        'inventory-card-background': 'var(--inventory-cards-background)',
        table: {
          background: 'var(--table-background)',
          'title': 'var(--header-title)',
          'popup-background': 'var(--popup-background)'
        },
      }
    },
  },
  plugins: [],
}

