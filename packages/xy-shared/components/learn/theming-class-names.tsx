import type React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMDXComponents } from 'nextra-theme-docs';
import { Framework } from '../../types';
import { getFramework } from '../../lib/get-framework';

// This component contains a table of all the CSS class names used by nodes,
// edges, handles, and other flow components.
// It will be displayed on the "Theming" page of the documentation for each framework.
type Row = {
  // This is appended after the framework class nameprefix, such as `.react-flow` or `.svelte-flow`.
  suffix: string;
  description: string;
  // Only show the row if the framework is the one specified.
  // If not specified, show the row for all frameworks.
  onlyIn?: Framework;
};

const rows: Row[] = [
  { suffix: '', description: 'The outermost container' },
  {
    suffix: '__renderer',
    description: 'The inner container for zooming and panning (renderer pane)',
  },
  { suffix: '__selection', description: 'User selection' },
  { suffix: '__edges', description: 'The element containing all edges in the flow' },
  {
    suffix: '__edge',
    description: `Applied to each [Edge](/api-reference/types/edge) in the flow`,
  },
  {
    suffix: '__edge.selected',
    description: `Added to an [Edge](/api-reference/types/edge) when selected`,
  },
  {
    suffix: '__edge.animated',
    description: `Added to an [Edge](/api-reference/types/edge) when its \`animated\` prop is \`true\``,
  },
  {
    suffix: '__edge.updating',
    description: `Added to an [Edge](/api-reference/types/edge) while it gets updated via \`onReconnect\``,
    onlyIn: 'react',
  },
  {
    suffix: '__edge-path',
    description: `The SVG \`<path />\` element of an [Edge](/api-reference/types/edge)`,
  },
  {
    suffix: '__edge-text',
    description: `The SVG \`<text />\` element of an [Edge](/api-reference/types/edge) label`,
    onlyIn: 'react',
  },
  {
    suffix: '__edge-textbg',
    description: `The SVG \`<text />\` element behind an [Edge](/api-reference/types/edge) label`,
    onlyIn: 'react',
  },
  {
    suffix: '__edge-label',
    description: 'The edge label',
    onlyIn: 'svelte',
  },
  {
    suffix: '__connection',
    description: 'Applied to the current connection line',
  },
  {
    suffix: '__connection-path',
    description: 'The SVG `<path />` of a connection line',
  },
  {
    suffix: '__nodes',
    description: 'The element containing all nodes in the flow',
  },
  {
    suffix: '__node',
    description: `Applied to each [Node](/api-reference/types/node) in the flow`,
  },
  {
    suffix: '__node.selected',
    description: `Added to a [Node](/api-reference/types/node) when selected.`,
  },
  {
    suffix: '__node-default',
    description: `Added when [Node](/api-reference/types/node) type is \`"default"\``,
  },
  {
    suffix: '__node-input',
    description: `Added when [Node](/api-reference/types/node) type is \`"input"\``,
  },
  {
    suffix: '__node-output',
    description: `Added when [Node](/api-reference/types/node) type is \`"output"\``,
  },
  {
    suffix: '__node-group',
    description: `Added when [Node](/api-reference/types/node) type is \`"group"\``,
  },
  {
    suffix: '__nodesselection',
    description: 'Nodes selection',
  },
  {
    suffix: '__nodesselection-rect',
    description: 'Nodes selection rect',
  },
  {
    suffix: '__handle',
    description: `Applied to each [\`<Handle />\`](/api-reference/components/handle) component`,
  },
  {
    suffix: '__handle-top',
    description: `Applied when a handle's [Position](/api-reference/types/position) is set to \`"top"\``,
  },
  {
    suffix: '__handle-right',
    description: `Applied when a handle's [Position](/api-reference/types/position) is set to \`"right"\``,
  },
  {
    suffix: '__handle-bottom',
    description: `Applied when a handle's [Position](/api-reference/types/position) is set to \`"bottom"\``,
  },
  {
    suffix: '__handle-left',
    description: `Applied when a handle's [Position](/api-reference/types/position) is set to \`"left"\``,
  },
  {
    suffix: '__handle.connectingfrom',
    description: 'Added to a Handle when a connection is being drawn from this handle.',
  },
  {
    suffix: '__handle.connectingto',
    description: 'Added to a Handle when a connection line is above this handle.',
  },
  {
    suffix: '__handle.valid',
    description:
      'Added to a Handle when a connection line is above a handle **and** the connection is valid.',
  },
  {
    suffix: '__handle.connectionindicator',
    description:
      'Applied when the handle can start or end a connection (connectable state).',
  },
  {
    suffix: '__background',
    description: `Applied to the [\`<Background />\`](/api-reference/components/background) component`,
  },
  {
    suffix: '__minimap',
    description: `Applied to the [\`<MiniMap />\`](/api-reference/components/minimap) component`,
  },
  {
    suffix: '__controls',
    description: `Applied to the [\`<Controls />\`](/api-reference/components/controls) component`,
  },
];

export function ThemingClassNames() {
  const { framework } = getFramework();
  const mdxComponents = useMDXComponents() as unknown as Record<
    string,
    React.ComponentType<Record<string, unknown>> | undefined
  >;
  const Table = mdxComponents.table ?? 'table';
  const Thead = mdxComponents.thead ?? 'thead';
  const Tbody = mdxComponents.tbody ?? 'tbody';
  const Tr = mdxComponents.tr ?? 'tr';
  const Th = mdxComponents.th ?? 'th';
  const Td = mdxComponents.td ?? 'td';
  const Code = mdxComponents.code ?? 'code';
  const Div = mdxComponents.div ?? 'div';

  const markdownComponents = {
    a: mdxComponents.a ?? 'a',
    code: mdxComponents.code ?? 'code',
    strong: mdxComponents.strong ?? 'strong',
    p: mdxComponents.p ?? 'p',
  } as React.ComponentProps<typeof Markdown>['components'];

  const filtered = rows.filter(
    (row) => row.onlyIn === undefined || row.onlyIn === framework,
  );

  return (
    <Div className="nextra-scrollbar overflow-x-auto">
      <Table>
        <Thead>
          <Tr>
            <Th>Class name</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filtered.map((row) => {
            const className = `.${framework}-flow${row.suffix}`;
            return (
              <Tr key={className}>
                <Td>
                  <Code>{className}</Code>
                </Td>
                <Td>
                  <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {row.description}
                  </Markdown>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Div>
  );
}
