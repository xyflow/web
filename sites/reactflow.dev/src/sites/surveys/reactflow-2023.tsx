import { Emoji, Link, Text } from '@xyflow/xy-ui';
import { useEffect, useState } from 'react';
import ReactFlow, { Background, Node, ReactFlowProvider } from 'reactflow';
import { FocusParams, useFocus } from './flow/hooks';
import { nodeTypes, section, project, action } from './flow/nodes';
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { BarChart } from '@/components/bar-chart';

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
    ...projects.map((name, i) =>
      project({ id: `${id}-${i}`, position, label: name }),
    ),
    project({ id, isCategory: true, position, label: name }),
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
      position: { x: 0, y: 700 },
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
        content: 'Who responded?',
        onClick: () => focus({ id: 'respondents' }),
      },
    }),
    // WHO ARE OUR USERS -------------------------------------------------------
    section({
      id: 'respondents',
      position: { x: 0, y: 1400 },
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
      action: [
        {
          content: (
            <>
              <Text>Next</Text>
              <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </>
          ),
          onClick: () =>
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
        },
        {
          content: (
            <>
              <Text>More details</Text>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          ),
          onClick: () => focus({ id: 'respondents-expertise' }),
        },
      ],
    }),
    section({
      id: 'respondents-expertise',
      position: { x: 700, y: 1400 },
      content: (
        <>
          <Text size="lg">
            What is your role or{' '}
            <span className="font-bold">area of expertise</span>?
          </Text>
          <BarChart
            data={[
              { name: 'Full-stack', value: 54 },
              { name: 'Frontend', value: 44 },
              { name: 'Backend', value: 24 },
              { name: 'Design', value: 9 },
              { name: 'Product management', value: 8 },
              { name: 'Data science', value: 5 },
              { name: 'Other', value: 1 },
            ]}
          />
          <Text>
            We let folks select multiple options for this one, but we might have
            fumbled a bit by including a "full-stack" option when selecting both
            "frontend" and "backend" would have been made more sense.
          </Text>
          <Text>
            A total of eight respondents <span className="italic">didn't</span>{' '}
            choose one of "full-stack" or "frontend". It's hard to imagine
            someone unfamiliar with frontend getting stuck into a library like
            React Flow, talk about jumping in at the deep end!
          </Text>
        </>
      ),
    }),
    section({
      id: 'respondents-where',
      position: { x: 1400, y: 1400 },
      content: (
        <>
          <Text size="lg">
            <span className="font-bold">Where</span> are you using React Flow?
          </Text>
          <BarChart
            data={[
              { name: 'Small company (1–10 people)', value: 36 },
              { name: 'Personal project', value: 27 },
              { name: 'Large company (>100 people)', value: 18 },
              { name: 'Medium company (10–100 people)', value: 16 },
            ]}
          />
          <Text>
            As before, folks could choose multiple options if they were using
            React Flow in different contexts.
          </Text>
          <Text>
            The vast majority of respondents are using React FLow at work, but
            we were surprised to see how many people were using React Flow at
            work <span className="italic">and</span> on personal projects. A{' '}
            <span className="font-bold">quarter of respondents</span> using
            React Flow on personal projects were also using it at work!
          </Text>
        </>
      ),
    }),
    section({
      id: 'respondents-how-long',
      position: { x: 2100, y: 1400 },
      content: (
        <>
          <Text size="lg">
            <span className="font-bold">How long</span> have you been using
            React Flow?
          </Text>
          <BarChart
            sorted={false}
            data={[
              { name: '12 months or more', value: 18 },
              { name: '6-11 months', value: 18 },
              { name: '1-5 months', value: 38 },
              { name: 'Less than one month', value: 9 },
            ]}
          />
          <Text>So many newcomers, welcome to React Flow!</Text>
          <Text>
            We've been developing the library and also engaging with the
            community for so long now that it's easy to lose sight of what the
            experience is like for someone who's just getting started.
          </Text>
          <Text>
            We made moves last year to improve the onboarding experience for new
            folks, including revamping our quickstart guide, expanding our API
            reference, and providing{' '}
            <Link href="new.reactflow.dev" className="text-primary">
              new.reactflow.dev
            </Link>{' '}
            so folks can get started without having to install anything. We'll
            be looking for ways to improve this experience even more in 2024.
          </Text>
        </>
      ),
    }),
    action({
      id: 'respondents-back',
      position: { x: 2800, y: 1400 },
      content: <Text>Take me back!</Text>,
      action: () => focus({ id: 'respondents' }),
    }),
    // WHAT ARE THEY BUILDING --------------------------------------------------
    section({
      id: 'user-apps',
      isHero: true,
      position: { x: 0, y: 3000 },
      title: 'What are our users building?',
    }),
    action({
      id: 'user-apps-continue',
      position: { x: 700, y: 3080 },
      action: () => focus({ id: 'help' }),
      content: 'continue...',
    }),
    ...projectCategory({
      id: 'user-apps-whiteboard',
      position: { x: 500, y: 3250 },
      name: 'Whiteboard & Canvas',
      projects: [
        'Spatial canvas for ideas and thoughts',
        'Canvas-based editor to build legal automation tools',
        'Digital whiteboard for lawyers',
      ],
    }),
    ...projectCategory({
      id: 'user-apps-no-code',
      position: { x: 100, y: 3300 },
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
      position: { x: -300, y: 3200 },
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
      position: { x: -500, y: 2900 },
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
      position: { x: 0, y: 2800 },
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
      position: { x: 300, y: 2925 },
      name: 'DUNGEONS AND DRAGONS',
      projects: ['Game master screen'],
    }),
    // WHERE DO THEY GET HELP --------------------------------------------------
    section({
      id: 'help',
      position: { x: 2000, y: 3000 },
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
      position: { x: 1700, y: 3600 },
      content: (
        <>
          <Text>
            When you are having trouble with React Flow,
            <span className="font-bold">where do you go to get help?</span>
          </Text>
          <BarChart
            data={[
              { name: 'React Flow Docs', value: 75 },
              { name: 'Discord', value: 30 },
              { name: 'ChatGPT', value: 22 },
              { name: 'StackOverflow', value: 17 },
              { name: 'Friend or coworker', value: 5 },
              { name: 'Other (see below)', value: 6 },
            ]}
          />
          <Text>
            Eight people did <span className="underline">not</span> select docs.
          </Text>
          <Text>
            We think most of the survey's respondents came from our Discord
            community, and that might have skewed the number of folks mentioning
            Discord.
          </Text>
          <Text>
            On the other hand, we found it difficult to surface the survey to
            our users that primarily interact with us through GitHub issues.{' '}
            <span className="font-bold">
              All six of the "Other" responses mentioned GitHub
            </span>
            , and we suspect that number would be higher if we had more
            participants <span className="italic">coming</span> from GitHub.
          </Text>
          <hr className="mx-12 border" />
          <Text>
            We were really surprised, a little disheartened, and slightly
            concerned that ChatGPT was so popular. We're proud of the breadth
            and depth of our documentation that we provide for free, and think
            it's one of the main things that sets us apart from similar
            libraries. We don't have any official integrations with any LLMs so
            it's a bit of a bummer to know folks are turning to them instead of
            our docs for help.
          </Text>
        </>
      ),
    }),
    section({
      id: 'help-sections',
      position: { x: 2300, y: 3600 },
      content: (
        <>
          <Text>
            Which <span className="font-bold">section of the docs</span> do you
            use most often?
          </Text>
          <BarChart
            data={[
              { name: 'API Reference', value: 41 },
              { name: 'Examples', value: 28 },
              { name: 'Docs / Learn', value: 13 },
              { name: "I'm not sure", value: 2 },
            ]}
          />
          <Text>
            When looking at the data for this question, we considered how much
            experience someone had with the library. We found that folks newer
            to React Flow spend most of their time in the{' '}
            <span className="italic">learn</span>
            section of our docs: these are long-form guides. On the other hand,
            our most experienced users spent most of their time in the API
            reference.
          </Text>
          <Text>
            This insight might be useful to other open source maintainers who
            want to know where to focus their documentation efforts.
          </Text>
        </>
      ),
    }),
    // REACT FLOW PRO ----------------------------------------------------------
    section({
      id: 'pro',
      position: { x: 6000, y: 500 },
      title: 'Why do people subscribe to React Flow Pro?',
      content: (
        <>
          <div className="flex justify-center gap-2 text-xl">
            <Emoji content="💸" />
            <Emoji content="💸" />
            <Emoji content="💸" />
          </div>
          <Text>
            React Flow Pro is how we sustain ourselves as a business and can
            afford to work on React Flow while keeping it open source. It's
            important to us - and maybe other open source maintainers too - to
            understand why people are (or aren't) willing to pay for our Pro
            subscription.
          </Text>
          <Text>
            We asked about it, and got responses from{' '}
            <span className="font-bold">19</span> Pro subscribers.
          </Text>
        </>
      ),
    }),
    section({
      id: 'pro-who-knew',
      position: { x: 6000, y: 1100 },
      content: (
        <>
          <Text>
            Everyone who responded to the survey knew what React Flow Pro was!
            We've never put money into advertising or promotion, and now we know
            we don't need to start now! <Emoji content="💅🏻" />
          </Text>
        </>
      ),
    }),
    section({
      id: 'pro-why-tho',
      position: { x: 6000, y: 1400 },
      content: (
        <>
          <Text>
            Main reason that someone subscribed to React Flow Pro was to{' '}
            <span className="font-bold">access to Pro Examples</span>. This is
            consistent with a previous survey we did, and it's good to hear: we
            put a lot of effort into making those examples valuable!
          </Text>
          <Text>
            Most of those who subscribed said that they found the pricing fair.
            Some found it expensive, some didn't know how much their
            organization was paying. None found the price to be too low.{' '}
            <Emoji content="👁️" />
            <Emoji content="👁️" />
          </Text>
          <Text>
            One reason why folks might think the pricing is too high is that we
            currently don't offer{' '}
            <span className="italic">region-based pricing</span>. Our
            subscription is affordable to businesses in Europe or the US, but if
            you're in India or Brazil, it's significantly more expensive.
          </Text>
        </>
      ),
    }),
  ];
};

const initialEdges = [
  { source: 'title', target: 'intro' },
  { source: 'intro', target: 'respondents' },
  { source: 'respondents', target: 'respondents-expertise' },
  { source: 'respondents-expertise', target: 'respondents-where' },
  { source: 'respondents-where', target: 'respondents-how-long' },
  { source: 'respondents-how-long', target: 'respondents-back' },
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
