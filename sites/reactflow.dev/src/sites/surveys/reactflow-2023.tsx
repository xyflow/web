import { Text } from '@xyflow/xy-ui';
import { useEffect, useState } from 'react';
import ReactFlow, { Background, Node, ReactFlowProvider } from 'reactflow';
import { FocusParams, useFocus } from './flow/hooks';
import { nodeTypes, section, project, action } from './flow/nodes';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function ReactFlow2023Survey() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

function Flow() {
  const [focus, setFocus] = useState<FocusParams>({
    id: 'title',
    duration: 2500,
  });
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    setNodes(
      initialNodes({ focus: setFocus, update: setNodes }).map(
        (node, i) => ((node.id ??= `${i}`), node),
      ),
    );
  }, []);

  useFocus(focus);

  return (
    <div className="w-full h-full">
      <ReactFlow
        fitView
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={initialEdges}
        nodesDraggable={false}
        nodesFocusable={false}
        defaultEdgeOptions={{
          type: 'straight',
        }}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

const initialNodes = ({
  focus,
  update,
}: {
  focus: (params: FocusParams) => void;
  update: React.Dispatch<React.SetStateAction<Node[]>>;
}) => {
  const reveal = (id: string) => {
    update((nodes) =>
      nodes.map((node) =>
        node.id.startsWith(id) ? { ...node, hidden: false } : node,
      ),
    );
  };

  const projectCategory = ({ id, name, position, projects }) => [
    project({ id, isCategory: true, position, label: name }),
    ...projects.map((name, i) =>
      project({ id: `${id}-${i}`, position, label: name }),
    ),
  ];

  return [
    // INTRO -------------------------------------------------------------------
    section({
      id: 'title',
      position: { x: 0, y: 0 },
      title: 'Developer Survey 2023',
      isHero: true,
      content: (
        <>
          <Text size="sm">
            We asked React Flow users about the React Flow users and the
            ecosystem of docs, support, and subscriptions around it to better
            understand our users' needs, and help guide the core team as we
            continue improving the library.
          </Text>
          <Text size="sm">Here's what we found ✌️</Text>
        </>
      ),
      links: [
        { text: 'See the survey', href: '' },
        { text: 'Read our write-up', href: '' },
      ],
      action: () => focus({ id: 'intro' }),
    }),
    section({
      id: 'intro',
      position: { x: -200, y: 800 },
      title: 'The survey',
      content: (
        <>
          <Text size="sm">
            The survey was focused on five important questions:
          </Text>
          <ol className="list-decimal space-y-2 ml-8">
            <li>Who are our users and what is their expertise?</li>
            <li>What are they building with React Flow?</li>
            <li>Where do our users go for help?</li>
            <li>
              What features do they find most difficult to use and what do they
              want to see added?
            </li>
            <li>What do our users think about React Flow Prop</li>
          </ol>
          <Text size="sm">
            The survey was at most 19 questions long, took an average of 8:44
            minutes, and had an 42.2% completion rate.
          </Text>
        </>
      ),
      action: {
        text: 'Who responded?',
        onClick: () => focus({ id: 'respondents' }),
      },
    }),
    // WHO ARE OUR USERS -------------------------------------------------------
    section({
      id: 'respondents',
      position: { x: 600, y: 1100 },
      title: 'Who responded?',
      content: (
        <>
          <Text size="sm">
            We had <span className="font-bold">83 complete responses</span>.
          </Text>
          <Text size="sm">
            Respondents were using React Flow in companies big and small, and
            from an even spread of how long they've been using React Flow. 21%
            of respondents have at some point been subscribed to React Flow Pro.
          </Text>
        </>
      ),
      action: () =>
        focus({
          id: 'user-apps',
          duration: 500,
          then: [
            [300, () => reveal('user-apps-whiteboard')],
            [250, () => reveal('user-apps-no-code')],
            [200, () => reveal('user-apps-engineering')],
            [150, () => reveal('user-apps-knowledge-graph')],
            [100, () => reveal('user-apps-internal-tools')],
            [100, () => reveal('user-apps-dnd')],
          ],
        }),
    }),
    // WHAT ARE THEY BUILDING --------------------------------------------------
    section({
      id: 'user-apps',
      isHero: true,
      position: { x: 200, y: 3000 },
      title: 'What are our users building?',
    }),
    action({
      id: 'user-apps-continue',
      position: { x: 900, y: 3000 },
      action: () => focus({ id: 'help' }),
      content: 'continue...',
    }),
    ...projectCategory({
      id: 'user-apps-whiteboard',
      position: { x: 900, y: 3100 },
      name: 'Whiteboard & Canvas',
      projects: [
        'Spatial canvas for ideas and thoughts',
        'Canvas-based editor to build legal automation tools',
        'Digital whiteboard for lawyers',
      ],
    }),
    ...projectCategory({
      id: 'user-apps-no-code',
      position: { x: 400, y: 3300 },
      name: 'No-code platforms',
      projects: [
        'No-code website builder',
        'No-code platform for Arduino',
        'A design token UI design tool',
        'A flowchart editor that teaches programming',
      ],
    }),
    ...projectCategory({
      id: 'user-apps-engineering',
      position: { x: 0, y: 3200 },
      name: 'Engineering tools',
      projects: [
        'A demo app for configuring machines in a plant',
        'A CAD tool',
        'A simulation system',
        'An interactive diagram for a pharmaceutical project',
      ],
    }),
    ...projectCategory({
      id: 'user-apps-knowledge-graph',
      position: { x: -200, y: 2900 },
      name: 'Knowledge graphs',
      projects: [
        'A flow chart to describe Journey Maps and API flows',
        'Auto diagramming for MBSE models',
        'A multiplayer entity relationship diagram',
        'Tournament bracket builder',
        'A visual knowledge management system',
        'Mindmapping',
        'Graph topology viewer',
        'Interactive lineage diagram',
      ],
    }),
    ...projectCategory({
      id: 'user-apps-internal-tools',
      position: { x: 300, y: 2800 },
      name: 'Internal tools',
      projects: [
        'Infrastructure data flow visualizer',
        'ETL pipelines',
        'SOP playbooks',
        'DMN and BPMN diagram editors',
        'Virtual network manager',
        'Content distribution visualizer',
      ],
    }),
    ...projectCategory({
      id: 'user-apps-dnd',
      position: { x: 600, y: 2925 },
      name: 'DUNGEONS AND DRAGONS',
      projects: ['Game master screen'],
    }),
    // WHERE DO THEY GET HELP --------------------------------------------------
    section({
      id: 'help',
      position: { x: 2000, y: 1700 },
      title: 'Where do people get help?',
      content: (
        <>
          <Text size="lg">
            <span className="font-bold">
              Our docs are the most common place for people to go for help.
            </span>
            <sup className="mx-1 italic">thank goodness</sup>
          </Text>
          <Text size="lg">More curiously though:</Text>
          <Text size="sm" className="p-2 border-black border-2 rounded">
            26% of people said they go to ChatGPT but only 6% would ask a friend
            or coworker.
          </Text>
          <Text size="lg">
            The <span className="font-bold">API reference</span> is the
            most-used section of our docs.
          </Text>
        </>
      ),
    }),
    section({
      id: 'help-sources',
      position: { x: 1700, y: 2300 },
      content: (
        <>
          <Text>
            When you are having trouble with React Flow,
            <span className="font-bold">where do you go to get help?</span>
          </Text>
        </>
      ),
    }),
    section({
      id: 'help-sections',
      position: { x: 2300, y: 2300 },
      content: (
        <>
          <Text>
            Which <span className="font-bold">section of the docs</span> do you
            use most often?
          </Text>
        </>
      ),
    }),
  ];
};

const initialEdges = [
  { source: 'title', target: 'intro' },
  { source: 'intro', target: 'respondents' },
  { source: 'respondents', target: 'user-apps' },
  { source: 'user-apps', target: 'user-apps-whiteboard' },
  { source: 'user-apps-whiteboard', target: 'user-apps-whiteboard-0' },
  { source: 'user-apps-whiteboard', target: 'user-apps-whiteboard-1' },
  { source: 'user-apps-whiteboard', target: 'user-apps-whiteboard-2' },
  { source: 'user-apps', target: 'user-apps-no-code' },
  { source: 'user-apps-no-code', target: 'user-apps-no-code-0' },
  { source: 'user-apps-no-code', target: 'user-apps-no-code-1' },
  { source: 'user-apps-no-code', target: 'user-apps-no-code-2' },
  { source: 'user-apps-no-code', target: 'user-apps-no-code-3' },
  { source: 'user-apps', target: 'user-apps-engineering' },
  { source: 'user-apps-engineering', target: 'user-apps-engineering-0' },
  { source: 'user-apps-engineering', target: 'user-apps-engineering-1' },
  { source: 'user-apps-engineering', target: 'user-apps-engineering-2' },
  { source: 'user-apps-engineering', target: 'user-apps-engineering-3' },
  { source: 'user-apps', target: 'user-apps-knowledge-graph' },
  {
    source: 'user-apps-knowledge-graph',
    target: 'user-apps-knowledge-graph-0',
  },
  {
    source: 'user-apps-knowledge-graph',
    target: 'user-apps-knowledge-graph-1',
  },
  {
    source: 'user-apps-knowledge-graph',
    target: 'user-apps-knowledge-graph-2',
  },
  {
    source: 'user-apps-knowledge-graph',
    target: 'user-apps-knowledge-graph-3',
  },
  {
    source: 'user-apps-knowledge-graph',
    target: 'user-apps-knowledge-graph-4',
  },
  {
    source: 'user-apps-knowledge-graph',
    target: 'user-apps-knowledge-graph-5',
  },
  {
    source: 'user-apps-knowledge-graph',
    target: 'user-apps-knowledge-graph-6',
  },
  {
    source: 'user-apps-knowledge-graph',
    target: 'user-apps-knowledge-graph-7',
  },
  { source: 'user-apps', target: 'user-apps-internal-tools' },
  { source: 'user-apps-internal-tools', target: 'user-apps-internal-tools-0' },
  { source: 'user-apps-internal-tools', target: 'user-apps-internal-tools-1' },
  { source: 'user-apps-internal-tools', target: 'user-apps-internal-tools-2' },
  { source: 'user-apps-internal-tools', target: 'user-apps-internal-tools-3' },
  { source: 'user-apps-internal-tools', target: 'user-apps-internal-tools-4' },
  { source: 'user-apps-internal-tools', target: 'user-apps-internal-tools-5' },
  { source: 'user-apps', target: 'user-apps-dnd' },
  { source: 'user-apps-dnd', target: 'user-apps-dnd-0' },
  { source: 'user-apps', target: 'user-apps-continue' },
  { source: 'user-apps-continue', target: 'help' },
  { source: 'help', target: 'help-sources' },
  { source: 'help', target: 'help-sections' },
].map((edge) => ({ ...edge, id: `${edge.source}->${edge.target}` }));
