import { Link } from 'nextra-theme-docs';
import { Callout } from 'nextra-theme-docs';

export default function UnusedPropWarning() {
  return (
    <Callout type="warning">
      To surpress unknown prop warnings in the browser console, please{' '}
      <Link href="/learn/guides/custom-nodes#suppress-unknown-prop-warnings">
        refer to the guide.
      </Link>
    </Callout>
  );
}
