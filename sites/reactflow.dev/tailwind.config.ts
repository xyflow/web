import xyTailwindConfig from 'xy-tailwind-config';
import { Config } from 'tailwindcss';

export default {
  ...xyTailwindConfig,
  content: [
    ...xyTailwindConfig.content,
    // This package will be released, until use local version
    './node_modules/@nextra/typescript/src/ui/**/*.{ts,tsx}'
  ],
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
