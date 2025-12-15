import Markdown from 'react-markdown';
import PrismLight from 'react-syntax-highlighter/dist/cjs/prism-light';
import { oneLight as prismTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import { Text } from '../../../ui/text';
import remarkGfm from 'remark-gfm';

PrismLight.registerLanguage('js', js);
PrismLight.registerLanguage('ts', ts);
PrismLight.registerLanguage('tsx', tsx);
PrismLight.registerLanguage('jsx', jsx);
PrismLight.registerLanguage('sh', bash);
PrismLight.registerLanguage('bash', bash);

const markdownComponents = {
  h1: (props) => (
    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900" {...props} />
  ),
  h2: (props) => (
    <h2
      className="font-black tracking-tight text-slate-900 mt-10 pb-1 text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-black tracking-tight text-slate-900 mt-10 pb-1 text-2xl"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="font-black tracking-tight text-slate-900 mt-10 pb-1 text-xl"
      {...props}
    />
  ),
  p: (props) => <Text className="mt-4 leading-7 first:mt-0" {...props} />,
  a: (props) => <a className="text-primary hover:underline" {...props} />,
  pre: (props) => (
    <PrismLight
      style={prismTheme}
      className="!text-sm !bg-slate-100 !rounded-md !border !border-slate-200 [&>code]:!bg-transparent !mt-4 !mb-2"
      language="ts"
    >
      {props.children?.props?.children}
    </PrismLight>
  ),
  code: (props) => (
    <code
      className="bg-slate-100 px-1 py-0.5 border border-slate-200 rounded-md"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside [&_ul]:ml-4 [&_ol]:ml-4" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside [&_ul]:ml-4 [&_ol]:ml-4" {...props} />
  ),
  // There's some gnarly destructuring here but we need to pull things out so we
  // can style the table with tailwind properly...
  table: ({ children, ...props }) => {
    const [
      {
        props: { children: theadChildren, ...thead },
      },
      {
        props: { children: tbodyChildren, ...tbody },
      },
    ] = children;

    return (
      <table className="mt-4" {...props}>
        <thead className="text-left border-b border-slate-100" {...thead}>
          <tr>
            {theadChildren.props.children.map((th, index) => {
              return (
                <th className="p-2" key={index}>
                  {th.props.children}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody {...tbody.props}>
          {tbodyChildren.map((tr, index) => {
            return (
              <tr className="border-b border-slate-100" key={index}>
                {tr.props.children.map((td, index) => {
                  return (
                    <td className="p-2" key={index}>
                      {td.props.children}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
};

function MarkdownTab({ markdown }: { markdown: string }) {
  return (
    <Markdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
      {markdown}
    </Markdown>
  );
}

export default MarkdownTab;
