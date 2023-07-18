import type { Framework } from 'utils/server/examples';

export default function ({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  return (
    <div>
      {frameworkId} {exampleId}
    </div>
  );

  // return (
  //   <div style={{ width: 500, height: 500 }}>
  //     <iframe src={`https://xyflow-pro-examples.vercel.app/${exampleId}`} />
  //   </div>
  // );
}
