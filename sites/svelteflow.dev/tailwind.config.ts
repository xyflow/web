import { Config } from 'tailwindcss';
import xyTailwindConfig from 'xy-tailwind-config';

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
