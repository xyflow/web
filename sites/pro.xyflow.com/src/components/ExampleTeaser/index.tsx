import Link from 'next/link';
import { Card, CardTitle, CardHeader, CardDescription } from '@xyflow/xy-ui';
import Image from 'next/image';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';

import { type Example } from '@/utils/server/examples';

export type ExampleTeaserProps = {
  example: Example;
};

export default function ExampleTeaser({ example }: ExampleTeaserProps) {
  return (
    <Card className="flex flex-col">
      <div className="relative h-[200px]">
        <Image objectFit="cover" alt="Example Teaser" fill src={`/img/examples/${example.id}.jpg`} />
      </div>
      <CardHeader className="flex-1">
        <CardTitle>{example.name ?? example.id}</CardTitle>
        {example.description && <CardDescription>{example.description}</CardDescription>}
        <Link
          className="!mt-auto font-bold items-center text-react hover:text-slate-800 flex pt-4 w-full"
          href={`/examples/${example.framework}/${example.id}`}
        >
          View Example
          <ArrowLongRightIcon className="ml-1 h-6 w-6" />
        </Link>
      </CardHeader>
    </Card>
  );
}
