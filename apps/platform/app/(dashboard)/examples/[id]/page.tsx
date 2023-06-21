'use client';

import ProExamples from 'pro-examples/examples';

export default function ({ params }: { params: { id: string } }) {
  const App = ProExamples.find((example) => example.id === params.id)?.component;

  if (!App) {
    return null;
  }

  return (
    <div style={{ width: 500, height: 500 }}>
      <App />
    </div>
  );
}
