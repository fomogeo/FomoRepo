/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fg-blue': '#1E88E5',
        'fg-blue-hover': '#1565C0',
        'fg-orange': '#FB8C00',
        'fg-orange-hover': '#E65100',
        'fg-green': '#43A047',
        'fg-green-hover': '#2E7D32',
        'fg-heading': '#1A237E',
        'fg-body': '#455A64',
        'fg-muted': '#90A4AE',
      },
      backgroundImage: {
        'sky-gradient': 'linear-gradient(135deg, #E6F7FF 0%, #FFFFFF 100%)',
        'warm-gradient': 'linear-gradient(135deg, #FFF7E6 0%, #FFFFFF 100%)',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
