import Link from 'next/link';

import {
  REACT_PRO_EXAMPLE_BASE_URL,
  SVELTE_PRO_EXAMPLE_BASE_URL,
} from '@/constants';
import useXYSite from '@/hooks/use-xy-site';

export default function ({ slug }: { slug: string }) {
  const { site } = useXYSite();

  const baseUrl =
    site === 'react' ? REACT_PRO_EXAMPLE_BASE_URL : SVELTE_PRO_EXAMPLE_BASE_URL;

  return (
    <div className="bg-react p-4 my-4">
      <div className="flex justify-between items-center	mb-4">
        This is a Pro example. If you are subscribed to React Flow Pro you can
        access the annotated source code.
        <Link href={`https://pro.xyflow.com/examples/${slug}`} target="_blank">
          View Source Code
        </Link>
      </div>
      <iframe src={`${baseUrl}${slug}`} className="h-[860px] w-full bg-white" />
    </div>
  );
}
