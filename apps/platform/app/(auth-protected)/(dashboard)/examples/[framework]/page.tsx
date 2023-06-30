import type { Framework } from 'utils/server/examples';

export default function ({ params }: { params: { framework: Framework } }) {
  return <div>{params.framework} pro examples overview</div>;
}

// @todo add static paths here
