/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "highlight-box": "rgb(107, 188, 248)",
        "tooltip-bg": "rgb(211, 237, 255)",
        tooltip: "rgb(82, 150, 203)",
      },
      keyframes: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        "fade-in-delayed": "fade 150ms 350ms cubic-bezier(0.4, 0, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};
