import xyTailwindConfig from 'xy-tailwind-config';
import { Config } from 'tailwindcss';

const config: Config = {
  ...xyTailwindConfig,
  theme: {
    ...xyTailwindConfig.theme,
    extend: {
      ...xyTailwindConfig.theme.extend,
      backgroundImage: {
        'reactflow-gradient': "url('/img/bg-reactflow.jpg')",
        'svelteflow-gradient': "url('/img/bg-svelteflow.jpg')",
        gradient: "url('/img/bg-gradient.jpg')",
      },
    },
  },
};

export default config;
