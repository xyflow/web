import React from 'react';
import dynamic from 'next/dynamic';

const SandpackViewer = dynamic(() => import('./SandpackViewer'));

function ExampleViewer({
  id,
  files = [],
  dependencies = {},
  name = '',
  description = '',
  levaConfig = {},
  isReadOnly = false,
  mdxSource = null,
  variants = [],
}) {
  return (
    <SandpackViewer
      levaConfig={levaConfig}
      name={name}
      description={description}
      files={files}
      exampleId={id}
      dependencies={dependencies}
      isReadOnly={isReadOnly}
      mdxSource={mdxSource}
      variants={variants}
      key={id}
    />
  );
}

export default ExampleViewer;
