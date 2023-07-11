import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';

export default function OpenSource() {
  return (
    <BaseLayout>
      <Hero
        title="We're Open Source"
        subtitle="We love Open Source and here is why"
      >
        <p>some content</p>
      </Hero>
    </BaseLayout>
  );
}
