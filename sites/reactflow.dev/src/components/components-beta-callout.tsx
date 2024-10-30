import Link from 'next/link';
import { Callout } from 'nextra/components';

export default function () {
  return (
    <Callout type="info">
      This project is in a very early stage. Please consider this when using the
      components. If you found a bug, please open an issue{' '}
      <Link
        className="underline"
        href="https://github.com/xyflow/web/issues/new?title=%5Bcomponents%5D:"
      >
        here
      </Link>
      .
    </Callout>
  );
}
