export type ExampleCode = {
  files: Record<string, string>;
  dependencies: Record<string, string>;
};

// TODO: remove this type after Nextra 4 migration
export type CompiledMdx = {
  compiledSource: string;
  frontMatter: {
    [key: string]: any;
  };
};
