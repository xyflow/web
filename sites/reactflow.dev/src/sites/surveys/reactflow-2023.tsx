import { Button, Emoji, Link, Text } from '@xyflow/xy-ui';
import { useEffect, useState } from 'react';
import ReactFlow, { Background, Node, ReactFlowProvider } from 'reactflow';
import { FocusParams, useFocus } from './flow/hooks';
import { nodeTypes, section, project, action, chatBubble } from './flow/nodes';
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { BarChart } from '@/components/bar-chart';
import { edgeTypes, focusEdge } from './flow/edges';

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
      initialNodes({
        focus: setFocus,
        update: setNodes,
      }).map((node, i) => ((node.id ??= `${i}`), node)),
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
        edgeTypes={edgeTypes}
        nodesDraggable={false}
        nodesFocusable={false}
        minZoom={0.5}
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

  const projectCategory = ({ id, name, position, projects }) => {
    const radius = name.length * 12;
    const category = project({ id, isCategory: true, position, label: name });
    const children = projects.map((name: string, i: number) => {
      const offsetX = Math.random() * 30 - 15;
      const offsetY = Math.random() * 30 - 15;

      return project({
        id: `${id}-${i}`,
        label: name,
        position: {
          x:
            position.x +
            offsetX +
            radius * Math.cos((i / projects.length) * Math.PI * 2),
          y:
            position.y +
            offsetY +
            radius * Math.sin((i / projects.length) * Math.PI * 2),
        },
      });
    });

    return [...children, category];
  };

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
            understand our users&apos; needs, and help guide the core team as we
            continue improving the library.
          </Text>
          <Text size="sm">Here&apos;s what we found ✌️</Text>
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
            from an even spread of how long they&apos;ve been using React Flow.
            21% of respondents have at some point been subscribed to React Flow
            Pro.
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
              includeChildren: true,
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
      position: { x: 1000, y: 1400 },
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
            A total of eight respondents{' '}
            <span className="italic">didn&apos;t</span> choose one of
            "full-stack" or "frontend". it&apos;s hard to imagine someone
            unfamiliar with frontend getting stuck into a library like React
            Flow, talk about jumping in at the deep end!
          </Text>
        </>
      ),
    }),
    section({
      id: 'respondents-where',
      position: { x: 2000, y: 1400 },
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
      position: { x: 3000, y: 1400 },
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
            We&apos;ve been developing the library and also engaging with the
            community for so long now that it&apos;s easy to lose sight of what
            the experience is like for someone who&apos;s just getting started.
          </Text>
          <Text>
            We made moves last year to improve the onboarding experience for new
            folks, including revamping our quickstart guide, expanding our API
            reference, and providing{' '}
            <Link href="new.reactflow.dev" className="text-primary">
              new.reactflow.dev
            </Link>{' '}
            so folks can get started without having to install anything.
            We&apos;ll be looking for ways to improve this experience even more
            in 2024.
          </Text>
        </>
      ),
    }),
    action({
      id: 'respondents-back',
      position: { x: 3600, y: 1730 },
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
    ...projectCategory({
      id: 'user-apps-whiteboard',
      position: { x: 700, y: 3350 },
      name: 'Whiteboard & Canvas',
      projects: [
        'Spatial canvas for ideas and thoughts',
        'Canvas-based editor to build legal automation tools',
        'Digital whiteboard for lawyers',
      ],
    }),
    ...projectCategory({
      id: 'user-apps-no-code',
      position: { x: 100, y: 3500 },
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
      position: { x: -400, y: 2700 },
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
      position: { x: 400, y: 2600 },
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
      position: { x: 600, y: 3025 },
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
      action: [
        {
          content: (
            <>
              <Text>Next</Text>
              <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </>
          ),
          onClick: () => focus({ id: 'stuck' }),
        },
        {
          content: (
            <>
              <Text>More details</Text>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          ),
          onClick: () => focus({ id: 'help-sources' }),
        },
      ],
    }),
    section({
      id: 'help-sources',
      position: { x: 3000, y: 3000 },
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
            We think most of the survey&apos;s respondents came from our Discord
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
            concerned that ChatGPT was so popular. We&apos;re proud of the
            breadth and depth of our documentation that we provide for free, and
            think it&apos;s one of the main things that sets us apart from
            similar libraries. We don&apos;t have any official integrations with
            any LLMs so it&apos;s a bit of a bummer to know folks are turning to
            them instead of our docs for help.
          </Text>
        </>
      ),
      action: [],
    }),
    section({
      id: 'help-sections',
      position: { x: 4000, y: 3000 },
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
              { name: 'I&apos;m not sure', value: 2 },
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
    // WHAT DO THEY GET STUCK ON -----------------------------------------------
    section({
      id: 'stuck',
      isHero: true,
      position: { x: 2000, y: 5000 },
      title: 'What is most the difficult thing about React Flow?',
      content: (
        <>
          <Text>
            So we have an idea of where folks are going to get help, but what
            exactly are they looking to get help{' '}
            <span className="italic">with</span>?
          </Text>
          <Text>
            We asked some open-ended questions about what things our users found
            most difficult about using React Flow or what features and
            functionality they felt was missing from the library. Then, we went
            through the responses and grouped them into categories or themes.
          </Text>
          <Text>Here are the most common categories:</Text>
          <div className="flex flex-wrap gap-2 my-8">
            <Button onClick={() => focus({ id: 'stuck-main-performance' })}>
              Performance
            </Button>
            <Button
              onClick={() => focus({ id: 'stuck-main-state-management' })}
            >
              State management
            </Button>
            <Button onClick={() => focus({ id: 'stuck-main-smart-edges' })}>
              "Smart" edges
            </Button>
            <Button onClick={() => focus({ id: 'stuck-main-layouting' })}>
              Layouting
            </Button>
          </div>
        </>
      ),
    }),
    section({
      id: 'stuck-main-performance',
      position: { x: 2700, y: 4500 },
      title: 'Performance',
      content: (
        <>
          <Text>
            Getting performance right in a big React app is a hard problem, and
            many of our users have definitely felt that pain. We noticed
            recurring pain points around state management: particularly related
            to custom nodes and node data.
          </Text>
          <MessageCloud
            messages={[
              'our use case became much more unique so we needed to explore new territory, specifically with rolling our own state management...I&apos;m still sitting here wondering if we are doing it "right" in terms of optimizing the performance of React Flow.',
              'Passing info from one node to another, and getting connected node&apos;s info in a large graph without slowing down the app',
            ]}
          />
          <Text>Here&apos;s what we&apos;re planning to do about it:</Text>
          <ul className="list-disc list-inside [&>*]:ml-4">
            <li>
              Put Performance FAQ in Docs (including what&apos;s not
              possible/good to make with React Flow)
            </li>
            <li>
              Create hooks for connecting node&apos;s info to a large graph
              without slowing down the app
            </li>
            <li>
              Surface more information about React Flow&apos;s internal state
            </li>
          </ul>
          <hr />
          <Text>Jump to another category:</Text>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => focus({ id: 'stuck-main-state-management' })}
            >
              State management
            </Button>
            <Button onClick={() => focus({ id: 'stuck-main-smart-edges' })}>
              "Smart" edges
            </Button>
            <Button onClick={() => focus({ id: 'stuck-main-layouting' })}>
              Layouting
            </Button>
          </div>
        </>
      ),
    }),
    section({
      id: 'stuck-main-state-management',
      position: { x: 2700, y: 5500 },
      title: 'State management',
      content: (
        <>
          <Text>
            Our users felt state management was difficult to get right in React
            Flow. There&apos;s a lot of confusion around what state is managed
            by React Flow vs what state should be managed by the user, and then
            there are questions about what library or approach to use for state
            management!
          </Text>
          <MessageCloud
            messages={[
              'The documentation has some holes in it, so I&apos;ve run into some dead ends trying to figure out how particular areas of state management should work.',
              'Maybe a complete example with state management and/or more docs on the library implementation',
              'State is difficult, but that&apos;s probably just because state is hard in general',
              'Managing state and changes for my custom nodes.',
            ]}
          />
          <Text>Here&apos;s what we&apos;re planning to do about it:</Text>
          <ul className="list-disc list-inside [&>*]:ml-4">
            <li>
              Make computed flows possible, which covers many simple cases
              without having to use a third-party library.
            </li>
            <li>Create an example where we load data from a database</li>
            <li>
              Teach some common state management tips in our React Flow
              documentation for folks who are new to React
            </li>
          </ul>
          <hr />
          <Text>Jump to another category:</Text>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => focus({ id: 'stuck-main-performance' })}>
              Performance
            </Button>
            <Button onClick={() => focus({ id: 'stuck-main-smart-edges' })}>
              "Smart" edges
            </Button>
            <Button onClick={() => focus({ id: 'stuck-main-layouting' })}>
              Layouting
            </Button>
          </div>
        </>
      ),
    }),
    section({
      id: 'stuck-main-smart-edges',
      position: { x: 1300, y: 4500 },
      title: 'Smart edges',
      content: (
        <>
          <Text>
            Smarter and more powerful edges has been a recurring request from
            our users for literally years! There&apos;s scope for the library to
            improve but we&apos;re also weary about making the library harder to
            maintain: some of the features folks want end up being quite
            complex!
          </Text>
          <MessageCloud
            messages={[
              'More animations for edges.',
              'Implementing smart edges for sure🥹, haven&apos;t been able to figure out yet, also would love if you guys could add some examples of edges routing in your documentation.',
              'I wish React Flow has something like edge routing, to avoid edge intersections.',
            ]}
          />
          <Text>Here&apos;s what we&apos;re planning to do about it:</Text>
          <ul className="list-disc list-inside [&>*]:ml-4">
            <li>
              Create a Pro Example showing off editable edges and edge routing.
            </li>
            <li>
              Create a new example demonstrating how to do custom edge
              animations.
            </li>
          </ul>
          <hr />
          <Text>Jump to another category:</Text>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => focus({ id: 'stuck-main-performance' })}>
              Performance
            </Button>
            <Button
              onClick={() => focus({ id: 'stuck-main-state-management' })}
            >
              State management
            </Button>
            <Button onClick={() => focus({ id: 'stuck-main-layouting' })}>
              Layouting
            </Button>
          </div>
        </>
      ),
    }),
    section({
      id: 'stuck-main-layouting',
      position: { x: 1300, y: 5500 },
      title: 'Layouting',
      content: (
        <>
          <Text>
            Around 50% of respondents mentioned they had implemented some sort
            of node layouting in their flows.
          </Text>
          <Text>
            We have no plans on adding layouting directly to the library – there
            are other packages out there that solve that problem much better
            than we could – but it is clear that this is something many of our
            users need and perhaps we could do a better job at pointing folks in
            the right direction.
          </Text>
          <MessageCloud
            messages={[
              'Auto layout helpers not based on other third party libraries. Better way to trigger layout changes and recalculation.',
              '...It&apos;s also hard to do auto layout on data change like getting new nodes from the database... it wasn&apos;t as straightforward as I hoped for.',
              'Auto layout options and doing the custom math for my layout. Learning to think the way a layout engine wants',
            ]}
          />
          <Text>Here&apos;s what we&apos;re planning to do about it:</Text>
          <ul className="list-disc list-inside [&>*]:ml-4">
            <li>
              Build more complex layouting examples, e.g. changing a layout
              after getting node updates from a database
            </li>
            <li>
              Create more step-by-step tutorials on how to use 3rd party
              tutorials with React Flow (like Elk, Dagre, etc.), instead of just
              the examples we already provide
            </li>
          </ul>
          <hr />
          <Text>Jump to another category:</Text>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => focus({ id: 'stuck-main-performance' })}>
              Performance
            </Button>
            <Button
              onClick={() => focus({ id: 'stuck-main-state-management' })}
            >
              State management
            </Button>
            <Button onClick={() => focus({ id: 'stuck-main-smart-edges' })}>
              Smart edges
            </Button>
          </div>
        </>
      ),
    }),
    section({
      id: 'stuck-extra',
      position: { x: 2000, y: 6000 },
      content: (
        <>
          <Text>
            We also had some responses that didn&apos;t fit into any of these
            categories...
          </Text>
          <button
            className="group self-end mt-2"
            onClick={() => focus({ id: 'stuck-extra-internals' })}
          >
            <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1 translate-y-0" />
          </button>
        </>
      ),
    }),
    section({
      id: 'stuck-extra-internals',
      position: { x: 2000, y: 6500 },
      content: (
        <>
          <Text size="lg" className="font-bold">
            Understanding the internals
          </Text>
          <MessageCloud
            messages={[
              'I find myself constantly printing out the values of edges, nodes and how they change. Maybe a small tool that displays the details of the current element on click (only enabled in dev mode.)',
              'The innerworkings of the edge API&apos;s, the tricks with nodeinternals to get edges to choose the nearest side of a node. It&apos;s great that it&apos;s possible, but also those API&apos;s are pretty confusing.',
              'Accessing the internal states are sometimes not working as expected. e.g. getNodes might not return the latest data. We ended up using some work-arounds. I guess this is more of a React problem.',
              'Something like a hashtable to query data from node / edge without searching the whole array',
            ]}
          />
          <button
            className="group self-end mt-2"
            onClick={() => focus({ id: 'stuck-extra-custom-nodes' })}
          >
            <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1 translate-y-0" />
          </button>
        </>
      ),
    }),
    section({
      id: 'stuck-extra-custom-nodes',
      position: { x: 2020, y: 7000 },
      content: (
        <>
          <Text size="lg" className="font-bold">
            Custom nodes
          </Text>
          <MessageCloud
            messages={[
              'No good examples to understand the complex node design.',
              'I feel there&apos;s a general lack of information about doing anything other than basic stuff with Custom Nodes.',
            ]}
          />
          <button
            className="group self-end mt-2"
            onClick={() => focus({ id: 'stuck-extra-interaction' })}
          >
            <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1 translate-y-0" />
          </button>
        </>
      ),
    }),
    section({
      id: 'stuck-extra-interaction',
      position: { x: 2000, y: 7300 },
      content: (
        <>
          <Text size="lg" className="font-bold">
            Interactivity and UX
          </Text>
          <MessageCloud
            messages={[
              'I think the API should facilitate the interaction between nodes. e.g. add custom props for custom nodes.',
              'Yes, the nodes data object to be passable to next connected node data more easily',
              'some UX tips/pages/sections to create a functional flow ui could be cool (there is community showcase to find inspiration, but some tips or deep explanation on how to design the node/edge for some use case, like a node, form inside a node or in a detail component, etc...)&quot;',
              'Built in UX / comprehensive examples for "making a node editor" would be great.',
            ]}
          />
          <button
            className="group self-end mt-2"
            onClick={() => focus({ id: 'pro' })}
          >
            <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1 translate-y-0" />
          </button>
        </>
      ),
    }),
    // REACT FLOW PRO ----------------------------------------------------------
    section({
      id: 'pro',
      position: { x: 2000, y: 9000 },
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
            afford to work on React Flow while keeping it open source. It&apos;s
            important to us - and maybe other open source maintainers too - to
            understand why people are (or aren&apos;t) willing to pay for our
            Pro subscription.
          </Text>
          <Text>
            We asked about it, and got responses from{' '}
            <span className="font-bold">19</span> Pro subscribers.
          </Text>
          <button
            className="group self-end mt-2"
            onClick={() => focus({ id: 'pro-who-knew' })}
          >
            <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1 translate-y-0" />
          </button>
        </>
      ),
    }),
    section({
      id: 'pro-who-knew',
      position: { x: 2000, y: 9600 },
      content: (
        <>
          <Text>
            Everyone who responded to the survey knew what React Flow Pro was!
            We&apos;ve never put money into advertising or promotion, and now we
            know we don&apos;t need to start now! <Emoji content="💅🏻" />
          </Text>
          <button
            className="group self-end mt-2"
            onClick={() => focus({ id: 'pro-why-tho' })}
          >
            <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1 translate-y-0" />
          </button>
        </>
      ),
    }),
    section({
      id: 'pro-why-tho',
      position: { x: 2000, y: 9800 },
      content: (
        <>
          <Text>
            Main reason that someone subscribed to React Flow Pro was to{' '}
            <span className="font-bold">access to Pro Examples</span>. This is
            consistent with a previous survey we did, and it&apos;s good to
            hear: we put a lot of effort into making those examples valuable!
          </Text>
          <Text>
            Most of those who subscribed said that they found the pricing fair.
            Some found it expensive, some didn&apos;t know how much their
            organization was paying. None found the price to be too low.{' '}
            <Emoji content="👁️" />
            <Emoji content="👁️" />
          </Text>
          <Text>
            One reason why folks might think the pricing is too high is that we
            currently don&apos;t offer{' '}
            <span className="italic">region-based pricing</span>. Our
            subscription is affordable to businesses in Europe or the US, but if
            you&apos;re in India or Brazil, it&apos;s significantly more
            expensive.
          </Text>
          <button
            className="group self-end mt-2"
            onClick={() => focus({ id: 'pro-why-not-tho' })}
          >
            <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1 translate-y-0" />
          </button>
        </>
      ),
    }),
    section({
      id: 'pro-why-not-tho',
      position: { x: 2000, y: 10300 },
      content: (
        <>
          <Text>
            For the folks that <span className="font-bold">didn&apos;t</span>{' '}
            subscribe to React Flow Pro, the most common reason was its price.
            We cater our Pro subscription around businesses because those are
            the folks with the money available to keep React Flow sustainable,
            but that can mean our pricing feels unfair to individuals or small
            teams.
          </Text>
          <Text>
            We offer discounts for early stage startups, and{' '}
            <span className="font-bold">students and open source projects</span>{' '}
            can access individual Pro Examples on request.
          </Text>
          <Text>
            Some people were unhappy about the subscription model and would
            prefer a one-time payment. Our Pro platform is constantly improving
            and we are regularly adding new examples! The Pro subscription is
            what allows us to keep working on React Flow as a job and keep the
            library MIT licensed: having that recurring revenue makes all that
            possible.
          </Text>
          <button
            className="group self-end mt-2"
            onClick={() => focus({ id: 'to-thank-you' })}
          >
            <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1 translate-y-0" />
          </button>
        </>
      ),
    }),
    action({
      id: 'to-thank-you',
      position: { x: 2200, y: 10900 },
      content: <Text>And lastly...</Text>,
      action: () => focus({ id: 'thank-you' }),
    }),
    //
    // THANK YOU ---------------------------------------------------------------
    section({
      id: 'thank-you',
      position: { x: 4000, y: 9000 },
      title: 'Thank you!',
      content: (
        <>
          <Text>
            Thank you to everyone who took the time to fill out our survey! We
            really appreciate your feedback and we&apos;re excited to use it to
            make React Flow even better.
          </Text>
          <Text>
            If you&apos;d like to read things in more detail, you can check out
            the full survey over on{' '}
            <Link
              href="https://xyflow.com/blog/react-flow-developer-survey-2023"
              className="hover:underline text-primary"
            >
              our blog
            </Link>
            .
          </Text>
          <Text>
            Catch you next time! <Emoji content="✌️" /> The xyflow team –
            Christopher, Hayleigh, John, Moritz, and Peter
          </Text>
        </>
      ),
    }),
    chatBubble({
      position: { x: 3900, y: 8800 },
      message: 'Keep up the good work',
    }),
    chatBubble({
      position: { x: 3950, y: 8900 },
      message: 'It&apos;s a great library!',
    }),
    chatBubble({
      position: { x: 4150, y: 8750 },
      message: 'I like a lot your product, I&apos;d like to work a lot on it',
    }),
    chatBubble({
      position: { x: 4100, y: 8850 },
      message:
        'Great project! Very grateful it exists! Thank you for your work.',
    }),
    chatBubble({
      position: { x: 4400, y: 8800 },
      message:
        'You are doing an excellent job with this. I am very happy with reactflow and would love to see you push it further. The examples are great, because they make it very easy to adopt features.',
    }),
    chatBubble({
      position: { x: 4550, y: 8950 },
      message: 'You guys are awesome',
    }),
    chatBubble({
      position: { x: 4600, y: 9050 },
      message:
        'I have great respect for the reactflow team, making a great asset for the public under MIT license.',
    }),
    chatBubble({
      position: { x: 4550, y: 9200 },
      message: 'Great product, can&apos;t wait to see the future of it.',
    }),
    chatBubble({
      position: { x: 4600, y: 9350 },
      message:
        'I really appreciate the work you&apos;ve put into this awesome library, it&apos;s enabling me to do so much more than I&apos;d otherwise be able to do.',
    }),
    chatBubble({
      position: { x: 4350, y: 9450 },
      message:
        'Good job! Really like the lib. Fits my indie-project even though I might spent to much on this part (might be hard for me as a backend-developer)',
    }),
    chatBubble({
      position: { x: 4100, y: 9530 },
      message: 'Thanks for the incredible helpful open source project',
    }),
    chatBubble({
      position: { x: 3900, y: 9400 },
      message:
        'Keep up the good working. Looking forward to getting actual feature updates again when v12 and svelte is out',
    }),
    chatBubble({
      position: { x: 3800, y: 9100 },
      message: 'I&apos;m a big fan of reactflow!',
    }),
    chatBubble({
      position: { x: 3720, y: 9250 },
      message:
        'i really like the styling of the react flow page and the docs related to components are very helpful',
    }),
    chatBubble({
      position: { x: 3700, y: 9000 },
      message: '&quot;...it&apos;s very easy I love you developers&quot;',
    }),
  ];
};

function MessageCloud({ messages }: { messages: string[] }) {
  return (
    <div className="flex flex-wrap justify-around items-start gap-x-4 gap-y-2">
      {messages.map((message) => (
        <div
          key={message}
          className="odd:mt-6 w-48 p-2 bg-blue-500 text-white rounded-tr-lg rounded-b-lg shadow-md"
        >
          <Text size="xs">{message}</Text>
        </div>
      ))}
    </div>
  );
}

const initialEdges = [
  { source: 'title', target: 'intro' },
  { source: 'intro', target: 'respondents' },
  focusEdge('respondents', 'respondents-expertise', 'prev'),
  focusEdge('respondents-expertise', 'respondents-where', 'both'),
  focusEdge('respondents-where', 'respondents-how-long', 'both'),
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
  focusEdge('user-apps', 'help', 'both'),
  focusEdge('help', 'help-sources', 'prev'),
  focusEdge('help-sources', 'help-sections', 'both'),
  { source: 'help', target: 'stuck' },
  { source: 'stuck', target: 'stuck-extra' },
  { source: 'stuck-extra', target: 'stuck-extra-internals' },
  { source: 'stuck-extra-internals', target: 'stuck-extra-custom-nodes' },
  { source: 'stuck-extra-custom-nodes', target: 'stuck-extra-interaction' },
  { source: 'stuck-extra-interaction', target: 'pro' },
  { source: 'pro', target: 'pro-who-knew' },
  { source: 'pro-who-knew', target: 'pro-why-tho' },
  { source: 'pro-why-tho', target: 'pro-why-not-tho' },
  { source: 'pro-why-not-tho', target: 'to-thank-you' },
].map((edge) => ({ ...edge, id: `${edge.source}->${edge.target}` }));
