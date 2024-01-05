import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'orient': {  
          DEFAULT: '#00558C',
          50: '#BFE6FF',
          100: '#ABDEFF',
          200: '#82CEFF',
          300: '#59BEFF',
          400: '#30AEFF',
          500: '#079EFF',
          600: '#0087DE',
          700: '#006EB5',
          800: '#00558C',
          900: '#003354',
          950: '#002238'
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
