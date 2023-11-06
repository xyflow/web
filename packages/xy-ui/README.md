![xyflow](https://github.com/xyflow/web/assets/2857535/36a86114-e925-4669-a2dd-d0ae35cce76d)

# @xyflow/xy-ui

This package is used internally at [xyflow.com](https://xyflow.com), [reactflow.dev](https://reactflow.dev) and [svelteflow.dev](https://svelteflow.dev) for UI components.

## Usage with Nextjs and Tailwind

The UI components are meant to be used within a nextjs app. You need to adjust the `next.config.js`, so that this package gets transpiled:

```js
...
transpilePackages: ['@xyflow/xy-ui']
...
```

You also need to adjust `tailwind.config.js`, so that tailwind handles the class names used in this package:

```js
content: {
  ...
  'node_modules/@xyflow/xy-ui/components/**/*.{js,ts,jsx,tsx,mdx}',
}
```
