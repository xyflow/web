// | Library                                            | Dynamic node sizes | Sub-flow layouting | Edge routing | Bundle size                                                                                                                                   |
// | -------------------------------------------------- | ------------------ | ------------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
// | [Dagre](https://github.com/dagrejs/dagre)          | Yes                | Yes¹               | No           | <a href="https://pkg-size.dev/@dagrejs/dagre"><img src="https://pkg-size.dev/badge/bundle/39882" title="Bundle size for @dagrejs/dagre"/></a> |
// | [D3-Hierarchy](https://github.com/d3/d3-hierarchy) | No                 | No                 | No           | <a href="https://pkg-size.dev/d3-hierarchy"><img src="https://pkg-size.dev/badge/bundle/14697" title="Bundle size for d3-hierarchy"/></a>     |
// | [D3-Force](https://github.com/d3/d3-force)         | Yes                | No                 | No           | <a href="https://pkg-size.dev/d3-force"><img src="https://pkg-size.dev/badge/bundle/15623" title="Bundle size for d3-force"/></a>             |
// | [ELK](https://github.com/kieler/elkjs)             | Yes                | Yes                | Yes          | <a href="https://pkg-size.dev/elkjs"><img src="https://pkg-size.dev/badge/bundle/1455420" title="Bundle size for elkjs"/></a>                 |

import { useMDXComponents } from 'nextra-theme-docs';

const LAYOUTING_LIBRARIES = [
  {
    name: 'Dagre',
    url: 'https://github.com/dagrejs/dagre',
    dynamicNodeSizes: 'Yes',
    subFlowLayouting: 'Yes¹',
    edgeRouting: 'No',
    bundleSize: { pkgName: '@dagrejs/dagre', bundleID: '39882' },
  },
  {
    name: 'D3-Hierarchy',
    url: 'https://github.com/d3/d3-hierarchy',
    dynamicNodeSizes: 'No',
    subFlowLayouting: 'No',
    edgeRouting: 'No',
    bundleSize: { pkgName: 'd3-hierarchy', bundleID: '14697' },
  },
  {
    name: 'D3-Force',
    url: 'https://github.com/d3/d3-force',
    dynamicNodeSizes: 'Yes',
    subFlowLayouting: 'No',
    edgeRouting: 'No',
    bundleSize: { pkgName: 'd3-force', bundleID: '15623' },
  },
  {
    name: 'ELK',
    url: 'https://github.com/kieler/elkjs',
    dynamicNodeSizes: 'Yes',
    subFlowLayouting: 'Yes',
    edgeRouting: 'Yes',
    bundleSize: { pkgName: 'elkjs', bundleID: '1455420' },
  },
];

export function LayoutingLibrariesTable() {
  const mdxComponents = useMDXComponents();

  const Table = mdxComponents.table ?? 'table';
  const Tr = mdxComponents.tr ?? 'tr';
  const Th = mdxComponents.th ?? 'th';
  const Td = mdxComponents.td ?? 'td';
  const A = mdxComponents.a ?? 'a';

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Library</Th>
          <Th>Dynamic node sizes</Th>
          <Th>Sub-flow layouting</Th>
          <Th>Edge routing</Th>
          <Th>Bundle size</Th>
        </Tr>
      </thead>
      <tbody>
        {LAYOUTING_LIBRARIES.map((library) => (
          <Tr key={library.name}>
            <Td>
              <A href={library.url}>{library.name}</A>
            </Td>
            <Td>{library.dynamicNodeSizes}</Td>
            <Td>{library.subFlowLayouting}</Td>
            <Td>{library.edgeRouting}</Td>
            <Td>
              <A href={`https://pkg-size.dev/${library.bundleSize.pkgName}`}>
                <img
                  src={`https://pkg-size.dev/badge/bundle/${library.bundleSize.bundleID}`}
                  title={`Bundle size for ${library.bundleSize.pkgName}`}
                />
              </A>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
