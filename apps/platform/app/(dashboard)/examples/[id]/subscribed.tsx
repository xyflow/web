import { getExampleFiles } from './utils';

export default function ({ exampleId }: { exampleId: string }) {
  const files = getExampleFiles(exampleId);

  return (
    <div>
      {files.map((file) => (
        <div key={file.name}>{file.name}</div>
      ))}
    </div>
  );
}
