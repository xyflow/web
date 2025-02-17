import xyTailwindConfig from 'xy-tailwind-config';
import { Config } from 'tailwindcss';

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
} satisfies Config;
