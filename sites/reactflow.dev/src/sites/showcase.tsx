import { ShowcaseLayout } from 'xy-ui';
import showcases from '../../public/data/showcases.json';
import SubscribeSection from '@/page-sections/subscribe';

export default function Showcase() {
  const title = `React Flow is used by everyone: from solo open-source projects
  to companies like Stripe and Typeform`;
  const subtitle = `We’ve seen React Flow used to create data processing tools,
  chatbot builders, machine learning, musical synthesizers, and more. Explore
  some of our favorite projects that use xyFlow here.`;

  return (
    <ShowcaseLayout
      title={title}
      subtitle={subtitle}
      showcases={showcases.slice(0, 10)}
      footer={<SubscribeSection />}
    />
  );
}
