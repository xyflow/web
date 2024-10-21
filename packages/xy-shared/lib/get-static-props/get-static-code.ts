import { Framework } from '@xyflow/xy-ui';
import { compileCodeSnippet } from './compile-code-snippet';

type ExampleCode = {
  files: Record<string, string>;
  dependencies: Record<string, string>;
};

type CodeSnippet = {
  compiledSource: string;
  frontMatter: {
    [key: string]: any;
  };
};

export function getStaticCode(routes: string[], framework?: Framework) {
  return async () => {
    const _framework =
      framework ?? process.env.NEXT_PUBLIC_FRAMEWORK ?? 'react';
    const codeSnippets: Record<string, Record<string, CodeSnippet>> = {};

    for (const route of routes) {
      const files: Record<string, CodeSnippet> = {};
      const url = `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${_framework}/${route}/source.json`;
      const res = await fetch(url);
      const json: ExampleCode = await res.json();

      if (!('files' in json) || !('dependencies' in json)) {
        continue;
      }

      for (const [filename, file] of Object.entries(json.files)) {
        const filetype = filename.split('.').pop();
        const compiledSnippet = await compileCodeSnippet(file, { filetype });
        files[filename] = compiledSnippet;
      }

      codeSnippets[route] = files;
    }

    return {
      props: {
        codeSnippets,
      },
    };
  };
}
