/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ntdapper)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [],
};
