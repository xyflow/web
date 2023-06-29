export default function ({ exampleId }: { exampleId: string }) {
  return (
    <div style={{ width: 500, height: 500 }}>
      <iframe src={`https://xyflow-pro-examples.vercel.app/${exampleId}`} />
    </div>
  );
}
