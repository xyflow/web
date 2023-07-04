import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';

export default function OpenSource() {
  return (
    <BaseLayout>
      <HeroSection
        title="We're Open Source"
        subtitle="We love Open Source and here is why"
      >
        <p>some content</p>
      </HeroSection>
    </BaseLayout>
  );
}
