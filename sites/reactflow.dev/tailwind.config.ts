import xyTailwindConfig from 'xy-tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  ...xyTailwindConfig,
  content: xyTailwindConfig.content.concat([
    './node_modules/@xyflow/packs/src/**/*.{js,ts,jsx,tsx}',
  ]),
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
