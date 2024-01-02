'use client';

import { useCallback, useMemo, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { cn, ContentGrid, ContentGridItem } from '@xyflow/xy-ui';

import { BaseLayout, ProjectPreview, Hero } from '../';

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
  demoUrl?: string;
  tags: { id: string; name: string }[];
};

export function ShowcaseLayout({
  title,
  subtitle,
  showcases = [],
  children,
}: ShowcaseLayoutProps) {
  const { all, selected, toggle } = useTags(showcases);
  const visibleShowcases = useMemo(() => {
    if (selected.size === 0) {
      return showcases;
    }
    return showcases.filter(({ tags }) =>
      Array.from(selected).every((tag) =>
        tags.some(({ name }) => name === tag),
      ),
    );
  }, [selected, showcases]);

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
        {Array.from(all).map((tag, i) => (
          <Tag
            key={i}
            name={tag}
            selected={selected.has(tag)}
            onClick={toggle}
          />
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
                  <span className="flex gap-2">
                    {showcase.tags.map((tag) => (
                      <Tag
                        key={tag.id}
                        name={tag.name}
                        selected={selected.has(tag.name)}
                        onClick={toggle}
                      />
                    ))}
                  </span>
                </>
              }
              description={showcase.description}
              route={showcase.url}
              altRoute={
                showcase.demoUrl
                  ? { href: showcase.demoUrl, label: 'Demo' }
                  : undefined
              }
              linkLabel="Website"
            />
          </ContentGridItem>
        ))}

        <ContentGridItem
          route="https://github.com/xyflow/web/issues/new?labels=content&template=submit-showcase.yaml"
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

type TagProps = {
  name: string;
  selected?: boolean;
  onClick: (name: string) => void;
  className?: string;
};

function Tag({ name, selected = false, onClick, className }: TagProps) {
  return (
    <button
      className={cn(
        'rounded-xl text-xs px-2 py-1',
        selected ? 'bg-primary text-white' : 'bg-gray-200',
        className,
      )}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
}

function useTags(showcases: ShowcaseItem[]) {
  const all = useMemo(
    () =>
      new Set([
        ...showcases.flatMap(({ tags }) => tags.map((tag) => tag.name)),
      ]),
    [showcases],
  );
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = useCallback(
    (tag: string) =>
      setSelected((tags) => {
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

  return { all, selected, toggle };
}
