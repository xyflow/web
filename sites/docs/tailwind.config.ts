import xyTailwindConfig from 'xy-tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  ...xyTailwindConfig,
  theme: {
    ...xyTailwindConfig.theme,
    extend: {
      ...xyTailwindConfig.theme.extend,
      backgroundImage: {
        'reactflow-gradient': "url('/img/bg-reactflow.jpg')",
        'svelteflow-gradient': "url('/img/bg-svelteflow.jpg')",
      },
    },
  },
};
