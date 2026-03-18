import type React from 'react';
import { useMDXComponents } from 'nextra-theme-docs';

const CSS_VARIABLES: { name: string; default: string }[] = [
  { name: '--xy-edge-stroke-default', default: '#b1b1b7' },
  { name: '--xy-edge-stroke-width-default', default: '1' },
  { name: '--xy-edge-stroke-selected-default', default: '#555' },
  { name: '--xy-connectionline-stroke-default', default: '#b1b1b7' },
  { name: '--xy-connectionline-stroke-width-default', default: '1' },
  { name: '--xy-attribution-background-color-default', default: 'rgba(255, 255, 255, 0.5)' },
  { name: '--xy-minimap-background-color-default', default: '#fff' },
  { name: '--xy-background-pattern-dots-color-default', default: '#91919a' },
  { name: '--xy-background-pattern-lines-color-default', default: '#eee' },
  { name: '--xy-background-pattern-cross-color-default', default: '#e2e2e2' },
  { name: '--xy-node-color-default', default: 'inherit' },
  { name: '--xy-node-border-default', default: '1px solid #1a192b' },
  { name: '--xy-node-background-color-default', default: '#fff' },
  { name: '--xy-node-group-background-color-default', default: 'rgba(240, 240, 240, 0.25)' },
  { name: '--xy-node-boxshadow-hover-default', default: '0 1px 4px 1px rgba(0, 0, 0, 0.08)' },
  { name: '--xy-node-boxshadow-selected-default', default: '0 0 0 0.5px #1a192b' },
  { name: '--xy-handle-background-color-default', default: '#1a192b' },
  { name: '--xy-handle-border-color-default', default: '#fff' },
  { name: '--xy-selection-background-color-default', default: 'rgba(0, 89, 220, 0.08)' },
  { name: '--xy-selection-border-default', default: '1px dotted rgba(0, 89, 220, 0.8)' },
  { name: '--xy-controls-button-background-color-default', default: '#fefefe' },
  { name: '--xy-controls-button-background-color-hover-default', default: '#f4f4f4' },
  { name: '--xy-controls-button-color-default', default: 'inherit' },
  { name: '--xy-controls-button-color-hover-default', default: 'inherit' },
  { name: '--xy-controls-button-border-color-default', default: '#eee' },
  { name: '--xy-controls-box-shadow-default', default: '0 0 2px 1px rgba(0, 0, 0, 0.08)' },
  { name: '--xy-resize-background-color-default', default: '#3367d9' },
];

export function ThemingCssVariables() {
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

  return (
    <Div className="nextra-scrollbar overflow-x-auto">
      <Table>
        <Thead>
          <Tr>
            <Th>Variable name</Th>
            <Th>Default</Th>
          </Tr>
        </Thead>
        <Tbody>
          {CSS_VARIABLES.map((row) => (
            <Tr key={row.name}>
              <Td>
                <Code>{row.name}</Code>
              </Td>
              <Td>
                <Code>{row.default}</Code>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Div>
  );
}
