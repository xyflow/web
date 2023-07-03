import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';

export default function ContactPage() {
  return (
    <BaseLayout>
      <HeroSection title="Contact" subtitle="@todo">
        <input type="text" value="Your Email" />
      </HeroSection>
    </BaseLayout>
  );
}
