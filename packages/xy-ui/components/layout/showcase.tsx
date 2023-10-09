import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  BaseLayout,
  ContentGrid,
  ContentGridItem,
  Hero,
  ProjectPreview,
} from '../../';

export type ShowcaseLayoutProps = {
  title: string;
  subtitle: string;
  showcases?: ShowcaseItem[];
  children?: React.ReactNode;
};

export type ShowcaseItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: { id: string; name: string }[];
};

export function ShowcaseLayout({
  title,
  subtitle,
  showcases = [],
  children,
}: ShowcaseLayoutProps) {
  return (
    <BaseLayout>
      <Hero
        kicker="Showcase"
        kickerIcon={MagnifyingGlassIcon}
        title={title}
        subtitle={subtitle}
        align="center"
      />

      <ContentGrid className="mt-20">
        {showcases.map((showcase) => (
          <ContentGridItem key={showcase.id} route={showcase.url}>
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
              linkLabel="Website"
            />
          </ContentGridItem>
        ))}

        <ContentGridItem
          route="https://github.com/xyflow/web/issues/new"
          className={showcases.length % 2 === 0 ? 'lg:col-span-2' : ''}
        >
          <ProjectPreview
            title="Your project here?"
            description="Have you built something exciting you want to show off? We want to feature it here!"
            linkLabel="Open an issue on GitHub"
          />
        </ContentGridItem>
      </ContentGrid>
      {children}
    </BaseLayout>
  );
}
