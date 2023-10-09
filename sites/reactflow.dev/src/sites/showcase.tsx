import { ShowcaseLayout } from 'xy-ui';
import showcases from '../../public/data/showcases.json';
import SubscribeSection from '@/page-sections/subscribe';

// @todo this should be moved into getStaticProps
// if we have the data, it should be filtering out the react showcases from the list
const visibleShowcases = showcases;

export default function Showcase() {
  return (
    <ShowcaseLayout
      title="React Flow is used by everyone: from solo open-source projects to companies like Stripe and Typeform"
      subtitle="We've seen React Flow used to create data processing tools, chatbot builders, machine learning, musical synthesizers, and more. Explore some of our favorite projects that use xyFlow here."
      showcases={visibleShowcases}
    >
      <SubscribeSection />
    </ShowcaseLayout>
  );
}
