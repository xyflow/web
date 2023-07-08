# xy-export-types

## What is this?

We needed a way to automate extracting the types from our public API so we could
use them in our documentation. Existing tools like TypeDoc weren't appropriate
beacuse we wanted greater control over the output so it could more easily be
integrated into the rest of our docs site.

This package then is a simple CLI utility that uses TypeScript's compiler API
to extract the types from a given file and output them as JSON that we can
consume in our mdx docs.

## What does it do?

Not much at the moment! It's heavily a work-in-progress but right now you should
be able to compile the project and run the CLI to print out _some_ of the types
to the console.

Running it against the example file in `example/example.ts` should output something
similar to:

```js
[
  {
    name: "UpdateNodeInternals",
    kind: "function",
    parameters: [{ name: "nodeId", type: "string | string[]" }],
    returnType: "void",
  },
  {
    name: "OnSelectionChangeParams",
    kind: "object",
    properties: [
      { name: "nodes", type: "Node[]" },
      { name: "edges", type: "Edge[]" },
    ],
  },
  {
    name: "OnSelectionChangeFunc",
    kind: "function",
    parameters: [{ name: "params", type: "OnSelectionChangeParams" }],
    returnType: "void",
  },
  {
    name: "PanelPosition",
    kind: "union",
    variants: [
      '"top-left"',
      '"top-center"',
      '"top-right"',
      '"bottom-left"',
      '"bottom-center"',
      '"bottom-right"',
    ],
  },
  {
    name: "ProOptions",
    kind: "object",
    properties: [
      { name: "account", type: "string", optional: true },
      { name: "hideAttribution", type: "boolean" },
    ],
  },
];
```

## What needs to be done?

- [ ] We need to come up with an actual strategy for how to get the _file_ we
      want to extract types from. Right now it's just relative paths but in practice
      that's gonna suck because we'll want to be using this util from somewhere
      deep in the docs source and the source for the xyflow package lives very
      far away.
- [ ] Support for intersection types.
- [ ] Support for generics.
- [ ] Support for exported functions/constants and not just types.
