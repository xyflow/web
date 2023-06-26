import Link from 'next/link';
import Image from 'next/image';

import PageSection from '@/components/page-section';

import showcases from '../../../public/data/showcases.json';

export default function Showcase() {
  return (
    <PageSection
      title="Showcase"
      subtitle="  React Flow is used by thousands of people, from solo open-source
    developers to companies like Stripe and Typeform. We’ve seen the library
    used for data processing tools, chatbot builders, machine learning,
    musical synthesizers, and more. Explore a selection of our favorite
    projects that use React Flow here."
    >
      <div className="grid grid-cols-4 gap-4">
        {showcases.map((showcase) => (
          <div key={showcase.id}>
            <div className="relative" style={{ paddingBottom: '60%' }}>
              <Image
                alt="Image Alt"
                src={`/img/showcase/${showcase.image}`}
                layout="fill"
                objectFit="cover" // Scale your image down to fit into the container
              />
            </div>
            <div className="font-bold">{showcase.title}</div>
            <div>{showcase.description}</div>

            <Link href={showcase.url} target="_blank" rel="noopener noreferrer">
              URL
            </Link>
          </div>
        ))}
      </div>
    </PageSection>
  );
}
