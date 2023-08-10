import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import ProjectPreview from '@/components/project-preview';

import showcases from '../../public/data/showcases.json';

export default function Showcase() {
  return (
    <BaseLayout>
      <Hero
        kicker="Showcase"
        kickerIcon={MagnifyingGlassIcon}
        title="From solo open-source developers to companies like Stripe and Typeform"
        subtitle="We’ve seen the library used for data processing tools, chatbot builders, machine learning, musical synthesizers, and more. Explore a selection of our favorite projects that use xyFlow here."
        align="center"
      />

      <ContentGrid className="mt-20">
        {showcases.map((showcase) => (
          <ContentGridItem key={showcase.id}>
            <ProjectPreview
              image={`/img/showcase/${showcase.image}`}
              title={showcase.title}
              subtitle={
                <>
                  {showcase.tags.map((tag) => (
                    <span key={tag.id} className="mr-2">
                      {tag.name}
                    </span>
                  ))}
                </>
              }
              description={showcase.description}
              route={showcase.url}
              linkLabel="Website"
            />
          </ContentGridItem>
        ))}
      </ContentGrid>
    </BaseLayout>
  );
}
