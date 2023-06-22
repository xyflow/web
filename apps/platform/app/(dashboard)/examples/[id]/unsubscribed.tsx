'use client';

import ProExamples from 'pro-examples/examples';

export default function ({ exampleId }: { exampleId: string }) {
  const App = ProExamples.find((example) => example.id === exampleId)?.component;

  if (!App) {
    return null;
  }

  return (
    <div style={{ width: 500, height: 500 }}>
      <App />
    </div>
  );
}
