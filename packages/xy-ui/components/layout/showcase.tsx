import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  BaseLayout,
  ContentGrid,
  ContentGridItem,
  Hero,
  ProjectPreview,
} from '../../';
import { cn } from '../../lib/utils';
import { useCallback, useMemo, useState } from 'react';

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
  const allTags = useMemo(() => {
    return new Set([
      ...showcases.flatMap(({ tags }) => tags.map((tag) => tag.name)),
    ]);
  }, [showcases]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const toggleTag = useCallback(
    (tag: string) =>
      setSelectedTags((tags) => {
        const newTags = new Set(tags);

        if (newTags.has(tag)) {
          newTags.delete(tag);
        } else {
          newTags.add(tag);
        }
        return newTags;
      }),
    [],
  );

  const visibleShowcases = useMemo(() => {
    if (selectedTags.size === 0) {
      return showcases;
    }
    return showcases.filter(({ tags }) =>
      [...selectedTags].every((tag) => tags.some(({ name }) => name === tag)),
    );
  }, [selectedTags, showcases]);

  return (
    <BaseLayout>
      <Hero
        kicker="Showcase"
        kickerIcon={MagnifyingGlassIcon}
        title={title}
        subtitle={subtitle}
        align="center"
      />

      <div className="flex justify-center items-center flex-wrap gap-x-2 gap-y-4 max-w-4xl mx-auto">
        {[...allTags].map((tag, i) => (
          <button
            key={i}
            className={cn(
              'rounded-xl text-xs px-2 py-1',
              selectedTags.has(tag) ? 'bg-primary text-white' : 'bg-gray-200',
            )}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <ContentGrid className="mt-8">
        {visibleShowcases.map((showcase) => (
          <ContentGridItem key={showcase.id}>
            <ProjectPreview
              image={`/img/showcase/${showcase.image}`}
              title={showcase.title}
              subtitle={
                <>
                  {showcase.tags.map((tag) => (
                    <button
                      key={tag.id}
                      className="mr-2 rounded-xl bg-gray-200 px-2 py-1"
                      onClick={() => toggleTag(tag.name)}
                    >
                      {tag.name}
                    </button>
                  ))}
                </>
              }
              description={showcase.description}
              route={showcase.url}
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
