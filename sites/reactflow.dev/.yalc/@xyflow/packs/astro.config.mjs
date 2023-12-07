import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.
  integrations: [
    react({ include: ["**/*.tsx"] }),
    svelte({ include: ["**/*.svelte"] }),
    tailwind(),
  ],
});
