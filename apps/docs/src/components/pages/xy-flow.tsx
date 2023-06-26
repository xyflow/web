import Link from 'next/link';

import { Button } from 'xy-ui';
import PageSection from '@/components/page-section';

export default function XYFlowHome() {
  return (
    <>
      <PageSection
        title="Wire your ideas with XYFlow!"
        subtitle="Powerful open source libraries for building node-based UIs with React or Svelte. Ready out-of-the-box and infinitely customizable"
      >
        <div className="flex justify-center">
          <div className="max-w-[500px] w-full">
            <div className="grid grid-cols-2 gap-4 place-content-center h-48">
              <Link
                href="/react-flow"
                className="bg-gray-100 text-center p-10 shadow-md"
              >
                React Flow
              </Link>

              <Link
                href="/svelte-flow"
                className="bg-gray-100 text-center p-10 shadow-md"
              >
                Svelte Flow
              </Link>
            </div>
          </div>
        </div>
      </PageSection>
      <PageSection
        className="bg-gray-900 text-white"
        title="See what people build with xyflow"
        subtitle="Our libraries are used by thousands of people, from solo open-source
            developers to companies like Stripe and Typeform. We’ve seen the
            library used for data processing tools, chatbot builders, machine
            learning, musical synthesizers, and more."
      >
        some more content
      </PageSection>
      <PageSection
        title="About xyflow"
        subtitle="We are Christopher, Hayleigh, John, and Moritz. We are the maintainers
        of React Flow, Svelte Flow, and the communities around them."
      >
        <Button variant="xyflow">xyflow</Button>
      </PageSection>
    </>
  );
}
