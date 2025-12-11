# xy-shared/components/ui

The ui components defined in this directory are our smallest building blocks. They
represent single interactive elements like buttons and inputs, or basic containers for
content like cards and tabs.

## Adding new components from shadcn

Many of these components are vendored from the collection of components available at
[shadcn/ui](https://ui.shadcn.com). If you find you need a new input component or
something like a dialog or popover, looking there first is a good idea.

The easiest way to vendor a new component from the collection is to manually copy over the
source (each component has instructions how to do this) but there is also a handy npx
script that can do it for you. For example, to add a new `<Popover />` component, navigate
to the root of this project and run:

```sh
pnpm dlx shadcn-ui@latest add popover
```

There are two additional steps you need to take after adding a new component this way:

1. Update the import path for `cn` to `'../../lib/utils'`
2. Export the component from `index.ts`
