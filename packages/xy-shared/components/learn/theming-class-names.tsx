import type React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMDXComponents } from 'nextra-theme-docs';

const API = '/api-reference';

type Prefix = 'react-flow' | 'svelte-flow';

type Row = {
  getClassName: (f: Prefix) => string | null;
  description: string;
  descriptionSvelte?: string;
};

const rows: Row[] = [
  { getClassName: (f) => `.${f}`, description: 'The outermost container' },
  { getClassName: (f) => `.${f}__renderer`, description: 'The inner container' },
  { getClassName: (f) => `.${f}__zoompane`, description: 'Zoom & pan pane' },
  { getClassName: (f) => `.${f}__selectionpane`, description: 'Selection pane' },
  { getClassName: (f) => `.${f}__selection`, description: 'User selection' },
  {
    getClassName: (f) => `.${f}__edges`,
    description: 'The element containing all edges in the flow',
  },
  {
    getClassName: (f) => `.${f}__edge`,
    description: `Applied to each [Edge](${API}/types/edge) in the flow`,
  },
  {
    getClassName: (f) => `.${f}__edge.selected`,
    description: `Added to an [Edge](${API}/types/edge) when selected`,
  },
  {
    getClassName: (f) => `.${f}__edge.animated`,
    description: `Added to an [Edge](${API}/types/edge) when its \`animated\` prop is \`true\``,
  },
  {
    getClassName: (f) => (f === 'react-flow' ? '.react-flow__edge.updating' : null),
    description: `Added to an [Edge](${API}/types/edge) while it gets updated via \`onReconnect\``,
  },
  {
    getClassName: (f) => `.${f}__edge-path`,
    description: `The SVG \`<path />\` element of an [Edge](${API}/types/edge)`,
  },
  {
    getClassName: (f) => (f === 'react-flow' ? '.react-flow__edge-text' : null),
    description: `The SVG \`<text />\` element of an [Edge](${API}/types/edge) label`,
  },
  {
    getClassName: (f) => (f === 'react-flow' ? '.react-flow__edge-textbg' : null),
    description: `The SVG \`<text />\` element behind an [Edge](${API}/types/edge) label`,
  },
  {
    getClassName: (f) => (f === 'svelte-flow' ? '.svelte-flow__edge-label' : null),
    description: 'The edge label',
  },
  {
    getClassName: (f) => `.${f}__connection`,
    description: 'Applied to the current connection line',
  },
  {
    getClassName: (f) => `.${f}__connection-path`,
    description: 'The SVG `<path />` of a connection line',
  },
  {
    getClassName: (f) => `.${f}__nodes`,
    description: 'The element containing all nodes in the flow',
  },
  {
    getClassName: (f) => `.${f}__node`,
    description: `Applied to each [Node](${API}/types/node) in the flow`,
  },
  {
    getClassName: (f) => `.${f}__node.selected`,
    description: `Added to a [Node](${API}/types/node) when selected.`,
  },
  {
    getClassName: (f) => `.${f}__node-default`,
    description: `Added when [Node](${API}/types/node) type is \`"default"\``,
  },
  {
    getClassName: (f) => `.${f}__node-input`,
    description: `Added when [Node](${API}/types/node) type is \`"input"\``,
  },
  {
    getClassName: (f) => `.${f}__node-output`,
    description: `Added when [Node](${API}/types/node) type is \`"output"\``,
  },
  {
    getClassName: (f) => (f === 'svelte-flow' ? '.svelte-flow__node-group' : null),
    description: `Added when [Node](${API}/types/node) type is \`"group"\``,
  },
  {
    getClassName: (f) => `.${f}__nodesselection`,
    description: 'Nodes selection',
  },
  {
    getClassName: (f) => `.${f}__nodesselection-rect`,
    description: 'Nodes selection rect',
  },
  {
    getClassName: (f) => `.${f}__handle`,
    description: `Applied to each [\`<Handle />\`](${API}/components/handle) component`,
  },
  {
    getClassName: (f) => `.${f}__handle-top`,
    description: `Applied when a handle's [Position](${API}/types/position) is set to \`"top"\``,
  },
  {
    getClassName: (f) => `.${f}__handle-right`,
    description: `Applied when a handle's [Position](${API}/types/position) is set to \`"right"\``,
  },
  {
    getClassName: (f) => `.${f}__handle-bottom`,
    description: `Applied when a handle's [Position](${API}/types/position) is set to \`"bottom"\``,
  },
  {
    getClassName: (f) => `.${f}__handle-left`,
    description: `Applied when a handle's [Position](${API}/types/position) is set to \`"left"\``,
  },
  {
    getClassName: () => '.connectingfrom',
    description: 'Added to a Handle when a connection is being drawn from this handle.',
  },
  {
    getClassName: () => '.connectingto',
    description: 'Added to a Handle when a connection line is above this handle.',
  },
  {
    getClassName: () => '.valid',
    description:
      'Added to a Handle when a connection line is above a handle **and** the connection is valid.',
  },
  {
    getClassName: (f) => (f === 'svelte-flow' ? '.connectionindicator' : null),
    description:
      'Applied when the handle can start or end a connection (connectable state).',
  },
  {
    getClassName: (f) => `.${f}__background`,
    description: `Applied to the [\`<Background />\`](${API}/components/background) component`,
  },
  {
    getClassName: (f) => `.${f}__minimap`,
    description: `Applied to the [\`<MiniMap />\`](${API}/components/minimap) component`,
    descriptionSvelte: `Applied to the [\`<MiniMap />\`](${API}/components/mini-map) component`,
  },
  {
    getClassName: (f) => `.${f}__controls`,
    description: `Applied to the [\`<Controls />\`](${API}/components/controls) component`,
  },
];

type ThemingClassNamesProps = {
  variant: 'react' | 'svelte';
};

export function ThemingClassNames({ variant }: ThemingClassNamesProps) {
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

  const prefix: Prefix = variant === 'react' ? 'react-flow' : 'svelte-flow';
  const filtered = rows.filter((row) => row.getClassName(prefix) != null);

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
            const className = row.getClassName(prefix)!;
            const description =
              row.descriptionSvelte && variant === 'svelte'
                ? row.descriptionSvelte
                : row.description;
            return (
              <Tr key={className}>
                <Td>
                  <Code>{className}</Code>
                </Td>
                <Td>
                  <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {description}
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
