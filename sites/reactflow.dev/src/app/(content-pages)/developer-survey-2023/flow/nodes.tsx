import { Button } from 'xy-shared/components/ui/button';
import { Heading } from 'xy-shared/components/ui/heading';
import { Link } from 'xy-shared/components/ui/link';
import { Text } from 'xy-shared/components/ui/text';
import { cn } from 'xy-shared/lib/utils';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';

export const nodeTypes = {
  action: ActionNode,
  section: SectionNode,
  project: ProjectNode,
  'chat-bubble': ChatBubble,
};

export type ActionParams = {
  id?: string;
  position: { x: number; y: number };
  action: () => void;
  content?: React.ReactNode;
};

export const action = ({ id, position, action, content }: ActionParams) => ({
  type: 'action',
  id,
  position,
  data: { content, action },
});

export function ActionNode({
  data,
}: NodeProps<Node<{ action: () => void; content?: React.ReactNode }>>) {
  return (
    <Button
      className="nopan nodrag relative bg-primary text-white flex items-center justify-center rounded-full shadow-md"
      onClick={data.action}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      {data.content}
    </Button>
  );
}

export type SectionParams = {
  id?: string;
  isHero?: boolean;
  title?: string;
  content?: React.ReactNode;
  links?: { text: string; href: string }[];
  action?:
    | (() => void)
    | { content: React.ReactNode; onClick: () => void }
    | { content: React.ReactNode; onClick: () => void }[];
  position: { x: number; y: number };
} & Omit<Node, 'id' | 'type' | 'data' | 'position'>;

type SectionNodeData = {
  content: React.ReactNode;
  links: React.ReactElement | false | undefined;
  action: React.ReactElement | null;
};

export const section = ({
  id,
  isHero,
  title,
  content,
  links,
  action,
  position,
  ...delegated
}: SectionParams) => ({
  id,
  type: 'section',
  data: {
    content: (
      <>
        {title && (
          <Heading
            size={isHero ? 'lg' : 'md'}
            className={cn('relative', isHero && 'text-center', content && 'mb-6')}
          >
            {isHero && (
              <div
                className="absolute opacity-10 w-[150%] h-[150%] -left-1/3 -top-1/3 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
                }}
              />
            )}
            {title}
          </Heading>
        )}
        {content}
      </>
    ),
    links: links && (
      <div className="flex gap-4">
        {links.map(({ text, href }, i) => (
          <Link className="nodrag nopan" key={`${href}-${i}`} href={href} size="xs">
            {text}
          </Link>
        ))}
      </div>
    ),
    action:
      typeof action === 'function' ? (
        <Button className="nodrag nopan" onClick={action}>
          Next
        </Button>
      ) : Array.isArray(action) ? (
        <div className="flex gap-2">
          {action.map(({ content, onClick }, i) => (
            <Button
              className="nodrag nopan inline-flex items-center gap-1 group"
              key={i}
              onClick={onClick}
            >
              <>{content}</>
            </Button>
          ))}
        </div>
      ) : typeof action === 'object' ? (
        <Button
          className="nodrag nopan inline-flex items-center gap-1 group"
          onClick={action.onClick}
        >
          <>{action.content}</>
        </Button>
      ) : null,
  },
  position,
  ...delegated,
});

function SectionNode({ data }: NodeProps<Node<SectionNodeData>>) {
  return (
    <div className="relative bg-white p-8 rounded-lg shadow-md max-w-lg flex flex-col gap-4">
      <Handle
        type="target"
        position={Position.Top}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      {data.content}
      {(data.links || data.action) && (
        <div className="flex gap-4 justify-between items-center justify-items-end">
          {data.links ?? <div />}
          {data.action}
        </div>
      )}
    </div>
  );
}

export type ProjectParams = {
  id?: string;
  isCategory?: boolean;
  label: string;
  position: { x: number; y: number };
} & Omit<Node, 'id' | 'type' | 'data' | 'position'>;

export const project = ({
  id,
  isCategory,
  label,
  position,
  ...delegated
}: ProjectParams) => ({
  id,
  type: 'project',
  hidden: true,
  data: { isCategory, label },
  position,
  ...delegated,
});

function ProjectNode({ data }: NodeProps<Node<ProjectParams>>) {
  return (
    <div
      className={cn(
        'relative bg-white p-4 rounded-lg shadow-md max-w-md',
        data?.isCategory && 'bg-primary text-white',
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Text size={data.isCategory ? 'sm' : 'xs'}>{data.label}</Text>
    </div>
  );
}

export type ChatBubbleParams = {
  id?: string;
  message: string;
  position: { x: number; y: number };
};

export const chatBubble = ({ id, message, position }: ChatBubbleParams) => ({
  id,
  type: 'chat-bubble',
  data: { message },
  position,
});

function ChatBubble({ data }: NodeProps<Node<ChatBubbleParams>>) {
  return (
    <div className="max-w-48 p-2 bg-blue-500 text-white rounded-tr-lg rounded-b-lg shadow-md">
      <Handle
        type="target"
        position={Position.Top}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Text size="xs">{data.message}</Text>
    </div>
  );
}
