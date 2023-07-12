import xyTailwindConfig from 'xy-tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  ...xyTailwindConfig,
  theme: {
    container: xyTailwindConfig.theme.container,
    extend: {
      ...xyTailwindConfig.theme.extend,
      fontFamily: {
        sans: ['NTDapper'],
        mono: ['var(--font-firamono)'],
      },
    },
  },
};
