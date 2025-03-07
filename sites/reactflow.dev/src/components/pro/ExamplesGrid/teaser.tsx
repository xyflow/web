'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { Card, CardTitle, CardHeader, CardDescription } from '@xyflow/xy-ui';
import { type ProExampleConfig } from '@/types';
import Pill from '@/components/pro/Pill';
import useSubscription from '@/hooks/useSubscription';

export type ExampleTeaserProps = {
  example: ProExampleConfig;
};

export default function ExampleTeaser({ example }: ExampleTeaserProps) {
  const { isSubscribed } = useSubscription();
  const showFreeLabel = example.free && !isSubscribed;
  const isTemplate = example.type === 'template';

  const link = isTemplate
    ? `/templates/${example.id}`
    : `/examples/${example.framework}/${example.id}`;

  const linkLabel = isTemplate ? 'View Template' : 'View Example';

  return (
    <Link href={link}>
      <Card className="flex flex-col">
        <div className="relative h-[200px]">
          <Image
            alt="Example Teaser"
            fill
            src={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${example.id}/thumbnail.jpg`}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="flex-1">
          <CardTitle className="flex items-center gap-x-1.5">
            {example.name ?? example.id} {showFreeLabel && <Pill>free</Pill>}
          </CardTitle>
          {example.description && (
            <CardDescription>{example.description}</CardDescription>
          )}

          <div className="!mt-auto text-react font-bold items-center hover:text-slate-800 flex pt-4 w-full">
            {linkLabel}
            <ArrowLongRightIcon className="ml-1 h-6 w-6" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
