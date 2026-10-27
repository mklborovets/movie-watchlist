module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#E50914',
          secondary: '#F5C518',
        },
        dark: {
          background: '#0B0D13',
          card: '#161922',
          border: '#232733',
          text: '#F3F4F6',
          muted: '#9CA3AF',
        },
        light: {
          background: '#F9FAFB',
          card: '#FFFFFF',
          border: '#E5E7EB',
          text: '#111827',
          muted: '#6B7280',
        },
      },
    },
  },
  plugins: [],
};
