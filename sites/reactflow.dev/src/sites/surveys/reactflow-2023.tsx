import { Button, CardTitle, Heading, Link, Text } from '@xyflow/xy-ui';
import { useMemo } from 'react';
import ReactFlow, { Background } from 'reactflow';

const nodeTypes = {
  section: SectionNode,
};

export default function () {
  const nodes = [
    {
      id: '1',
      type: 'section',
      data: {
        content: (
          <>
            <Heading size="lg" className="text-center relative mb-12">
              <div
                className="absolute opacity-10 w-[150%] h-[150%] -left-1/3 -top-1/3 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
                }}
              />
              Developer Survey 2023
            </Heading>
            <Text size="sm">
              We asked React Flow users about the React Flow users and the
              ecosystem of docs, support, and subscriptions around it to better
              understand our users' needs, and help guide the core team as we
              continue improving the library.
            </Text>
            <Text size="sm">Here's what we found ✌️</Text>
          </>
        ),
        actions: (
          <>
            <div className="flex gap-4">
              <Link href="" size="xs">
                See the survey
              </Link>
              <Link href="" size="xs">
                Read our write-up
              </Link>
            </div>

            <Button className="justify-self-end">Next</Button>
          </>
        ),
      },
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      type: 'section',
      data: {
        content: (
          <>
            <Heading size="sm">The survey</Heading>
            <Text size="sm">
              The survey was focused on five important questions:
            </Text>
            <ol className="list-decimal space-y-2 ml-8">
              <li>Who are our users and what is their expertise?</li>
              <li>What are they building with React Flow?</li>
              <li>Where do our users go for help?</li>
              <li>
                What features do they find most difficult to use and what do
                they want to see added?
              </li>
              <li>What do our users think about React Flow Prop</li>
            </ol>
            <Text size="sm">
              The survey was at most 19 questions long, took an average of 8:44
              minutes, and had an 42.2% completion rate.
            </Text>
          </>
        ),
        actions: (
          <>
            <div className="flex gap-4">
              <Link href="" size="xs">
                See the survey
              </Link>
              <Link href="" size="xs">
                Read our write-up
              </Link>
            </div>

            <Button className="justify-self-end">Next</Button>
          </>
        ),
      },
      position: { x: -200, y: 800 },
    },
  ];
  const edges = [];

  return (
    <div className="w-full h-full">
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} edges={edges}>
        <Background />
      </ReactFlow>
    </div>
  );
}

function SectionNode({ data }) {
  return (
    <div className="relative bg-white p-8 rounded-lg shadow-md max-w-lg flex flex-col gap-4">
      {data?.content}
      <div className="flex gap-4 justify-between items-center">
        {data?.actions}
      </div>
    </div>
  );
}
