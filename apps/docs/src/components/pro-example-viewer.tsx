import Link from 'next/link';

const baseUrl = 'https://xyflow-pro-examples.vercel.app/';

export default function ({ slug }: { slug: string }) {
  return (
    <div className="bg-react p-4">
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
