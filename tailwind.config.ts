import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Noto Serif KR', 'serif'],
      },
      colors: {
        gold: {
          50: '#FBF7F0',
          100: '#F5EBD9',
          200: '#E8D4B0',
          300: '#D9BA82',
          400: '#C9A962',
          500: '#B8954A',
          600: '#9A7A3C',
          700: '#7A6030',
          800: '#5C4824',
          900: '#3D3018',
        },
      },
    },
  },
  plugins: [],
}
export default config
