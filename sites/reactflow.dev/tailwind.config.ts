import xyTailwindConfig from 'xy-tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  ...xyTailwindConfig,
  theme: {
    ...xyTailwindConfig.theme,
    extend: {
      ...xyTailwindConfig.theme.extend,
      backgroundImage: {
        gradient: "url('/img/bg-gradient.jpg')",
      },
    },
  },
};
