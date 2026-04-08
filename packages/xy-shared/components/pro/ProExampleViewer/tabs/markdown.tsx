import Markdown from 'react-markdown';
import PrismLight from 'react-syntax-highlighter/dist/esm/prism-light';
import { oneLight as prismTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import { Text } from '../../../ui/text';
import remarkGfm from 'remark-gfm';

PrismLight.registerLanguage('js', js);
PrismLight.registerLanguage('ts', ts);
PrismLight.registerLanguage('tsx', tsx);
PrismLight.registerLanguage('jsx', jsx);
PrismLight.registerLanguage('sh', bash);
PrismLight.registerLanguage('bash', bash);

const markdownComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 pb-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-10 pb-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mt-10 pb-1 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <Text className="mt-4 leading-7 first:mt-0" {...props} />
  ),
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <PrismLight
      style={prismTheme}
      className="!dark:bg-slate-800 !mb-2 !mt-4 !rounded-md !bg-slate-100 !text-sm [&>code]:!bg-transparent"
      language="ts"
    >
      {/* @ts-expect-error - not sure how to type this */}
      {props.children?.props?.children}
    </PrismLight>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded-md bg-slate-100 px-1 py-0.5 dark:bg-slate-800" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-inside list-disc [&_ol]:ml-4 [&_ul]:ml-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-inside list-decimal [&_ol]:ml-4 [&_ul]:ml-4" {...props} />
  ),
  // There's some gnarly destructuring here but we need to pull things out so we
  // can style the table with tailwind properly...
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => {
    const [
      {
        props: { children: theadChildren, ...thead },
      },
      {
        props: { children: tbodyChildren, ...tbody },
      },
    ] = children as [
      {
        props: { children: React.ReactNode };
      },
      {
        props: { children: React.ReactNode };
      },
    ];

    return (
      <table className="mt-4" {...props}>
        <thead className="border-b border-slate-100 text-left" {...thead}>
          <tr>
            {/* @ts-expect-error - complex table structure */}
            {theadChildren?.props.children.map((th, index) => {
              return (
                <th className="p-2" key={index}>
                  {th.props.children}
                </th>
              );
            })}
          </tr>
        </thead>
        {/* @ts-expect-error - complex table structure */}
        <tbody {...tbody?.props}>
          {/* @ts-expect-error - complex table structure */}
          {tbodyChildren?.map((tr, index) => {
            return (
              <tr className="border-b border-slate-100" key={index}>
                {tr.props.children.map(
                  (
                    td: React.ReactElement<{ children: React.ReactNode }>,
                    index: number,
                  ) => {
                    return (
                      <td className="p-2" key={index}>
                        {td.props.children}
                      </td>
                    );
                  },
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
} as const;

function MarkdownTab({ markdown }: { markdown: string }) {
  return (
    <Markdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
      {markdown}
    </Markdown>
  );
}

export default MarkdownTab;
