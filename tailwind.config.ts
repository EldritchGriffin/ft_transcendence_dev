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
        'accent_red': '#F05454',
        'accent_red_hover': '#F46C6C',
        'accent_blue': '#30475E',
        'darkblue': '#222831',
        'primary_white': '#DDDDDD',
        },
    },
  },
  plugins: [],
}
export default config
