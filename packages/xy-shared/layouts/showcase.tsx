'use client';

import { useCallback, useMemo, useState, ReactNode } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Button,
  cn,
  Container,
  ContentGrid,
  ContentGridItem,
  Heading,
  Link,
  Text,
} from '@xyflow/xy-ui';
import { type MdxFile } from 'nextra';

import { BaseLayout, ProjectPreview, Hero } from '../';

export type CaseStudyFrontMatter = {
  title: string;
  client: string;
};

export type CaseStudy = MdxFile<CaseStudyFrontMatter>;

export type ShowcaseLayoutProps = {
  title: string;
  subtitle: string;
  showcases?: ShowcaseItem[];
  caseStudies?: CaseStudy[];
  children?: ReactNode;
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

function isCaseStudy(item: CaseStudy | ShowcaseItem): item is CaseStudy {
  return item.hasOwnProperty('frontMatter');
}

export function ShowcaseLayout({
  title,
  subtitle,
  showcases = [],
  caseStudies = [],
  children,
}: ShowcaseLayoutProps) {
  const { all, selected, toggle } = useTags(showcases);

  const visibleItems = useMemo(() => {
    const visibleShowcases = showcases.filter(
      ({ tags }) =>
        selected.size === 0 ||
        Array.from(selected).every((tag) =>
          tags.some(({ name }) => name === tag),
        ),
    );

    let currentCaseStudy = caseStudies[0];

    return visibleShowcases.reduce(
      (list, showcase, i) => {
        list.push(showcase);
        if (currentCaseStudy && (i + 1) % 6 === 0) {
          list.push(currentCaseStudy);
          currentCaseStudy = caseStudies[(i + 1) / 6];
        }
        return list;
      },
      [] as (ShowcaseItem | CaseStudy)[],
    );
  }, [selected, showcases, caseStudies]);

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

      <ContentGrid className="mt-8 md:grid-cols-2 lg:grid-cols-3 border-none gap-4 lg:gap-8">
        {visibleItems.map((item) =>
          isCaseStudy(item) ? (
            <CaseStudyPreview key={item.name} data={item.frontMatter} />
          ) : (
            <ContentGridItem
              key={item.id}
              className="border-none py-6 lg:py-8 lg:px-0 hover:bg-white group"
            >
              <ProjectPreview
                image={`/img/showcase/${item.image}`}
                title={item.title}
                subtitle={
                  <>
                    <span className="flex gap-2">
                      {item.tags.map((tag) => (
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
                description={item.description}
                route={item.url}
                altRoute={
                  item.demoUrl
                    ? { href: item.demoUrl, label: 'Demo' }
                    : undefined
                }
                linkLabel="Website"
              />
            </ContentGridItem>
          ),
        )}

        <ContentGridItem route="https://github.com/xyflow/web/issues/new?labels=content&template=submit-showcase.yaml">
          <ProjectPreview
            title="Your project here?"
            description="Have you built something exciting you want to show off? We want to feature it here!"
            linkLabel="Open an issue on GitHub"
          />
        </ContentGridItem>
      </ContentGrid>
      <>{children}</>
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

function CaseStudyPreview({ data }: { data?: CaseStudyFrontMatter }) {
  return (
    <Container
      variant="dark"
      className="max-lg:rounded-none col-span-full"
      innerClassName="px-4 py-8 flex flex-wrap gap-4 relative w-full items-center shadow-none bg-none bg-gray-100/10 lg:px-20 lg:py-20"
    >
      <div className="max-md:w-full md:flex-1">
        <Text className="text-gray-400 mb-4">{data?.client}</Text>
        <Heading size="md">{data?.title}</Heading>
      </div>
      <div className="max-md:w-full md:flex-1">
        <Text className="mb-8 text-gray-300">
          Get all 10 pro examples with just one month of a Pro subscription from
          129€
        </Text>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-black hover:bg-gray-100 w-full md:w-auto"
          >
            <Link href={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}>
              Try it out
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="black"
            className="bg-white/10 hover:bg-white/20 w-full md:w-auto"
          >
            <Link href="/pro/pricing">See subscription plans</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
