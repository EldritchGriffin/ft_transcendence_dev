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
        'bg_gray': '#50514F',
        'accent_red': '#F25F5C',
        'primary_blue': '#247BA0',
        },
    },
  },
  plugins: [],
}
export default config
