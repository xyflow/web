export type ExampleCode = {
  files: Record<string, string>;
  dependencies: Record<string, string>;
};

export type CompiledMdx = {
  compiledSource: string;
  frontMatter: {
    [key: string]: any;
  };
};
