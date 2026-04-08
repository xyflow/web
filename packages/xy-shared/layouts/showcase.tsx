'use client';

import { useCallback, useMemo, useState, ReactNode } from 'react';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import { Container } from '../components/ui/container';
import { ContentGrid, ContentGridItem } from '../components/ui/content-grid';
import { Heading } from '../components/ui/heading';
import { Link } from '../components/ui/link';
import { Text } from '../components/ui/text';
import { type MdxFile } from 'nextra';
import Image from 'next/image';

import { BaseLayout } from './base';
import { ProjectPreview } from '../components/project-preview';
import { Hero } from '../components/hero';
import { type CaseStudyFrontmatter } from './case-study-wrapper';

export type CaseStudy = MdxFile<CaseStudyFrontmatter>;

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
  demoUrl: string | null;
  repoUrl: string | null;
  openSource?: boolean;
  tags: { id: string; name: string }[];
};

function isCaseStudy(item: CaseStudy | ShowcaseItem): item is CaseStudy {
  return 'frontMatter' in item;
}

function getVisibleItems(
  showcases: ShowcaseItem[],
  caseStudies: CaseStudy[],
  selected: Set<string>,
) {
  const visibleShowcases = showcases.filter(
    ({ tags }) =>
      selected.size === 0 ||
      Array.from(selected).every((tag) => tags.some(({ name }) => name === tag)),
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
}

export function ShowcaseLayout({
  title,
  subtitle,
  showcases = [],
  caseStudies = [],
  children,
}: ShowcaseLayoutProps) {
  const { all, selected, toggle } = useTags(showcases);

  const visibleItems = useMemo(
    () => getVisibleItems(showcases, caseStudies, selected),
    [selected, showcases, caseStudies],
  );

  return (
    <BaseLayout>
      <Hero
        kicker="Showcase"
        kickerIcon={<RocketLaunchIcon />}
        title={title}
        subtitle={subtitle}
        align="center"
        backgroundVariant="gradient"
      />

      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-4">
        {Array.from(all).map((tag, i) => (
          <Tag key={i} name={tag} selected={selected.has(tag)} onClick={toggle} />
        ))}
      </div>

      <ContentGrid className="mt-8 gap-4 border-none md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {visibleItems.map((item) =>
          isCaseStudy(item) ? (
            <CaseStudyPreview
              key={item.name}
              data={item.frontMatter as CaseStudyFrontmatter}
              route={item.route}
            />
          ) : (
            <ContentGridItem
              key={item.id}
              className="relative border-none py-6 hover:bg-transparent lg:px-0 lg:py-8"
            >
              <ProjectPreview
                image={item.image}
                title={item.title}
                className="relative flex h-full flex-col"
                imageWrapperClassName="w-full"
                subtitle={
                  <>
                    {item.tags.map((tag) => (
                      <Tag
                        key={tag.id}
                        name={tag.name}
                        selected={selected.has(tag.name)}
                        onClick={toggle}
                        className="mb-2 mr-2"
                      />
                    ))}
                  </>
                }
                description={item.description}
                route={item.url}
                altRoute={
                  item.demoUrl
                    ? { href: item.demoUrl, label: 'Demo' }
                    : item.repoUrl
                      ? { href: item.repoUrl, label: 'Repo' }
                      : undefined
                }
                linkLabel="Website"
              />
            </ContentGridItem>
          ),
        )}

        <ContentGridItem route="https://wbkd.notion.site/17bf4645224281e4bf61ce34fa671059">
          <ProjectPreview
            title="Your project here?"
            description="Have you built something exciting you want to show off? We want to feature it here!"
            linkLabel="Submit your project"
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
        'bg-muted hover:bg-primary cursor-pointer rounded-xl px-2 py-1 text-xs hover:text-white',
        { 'bg-primary text-white': selected },
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
    () => new Set([...showcases.flatMap(({ tags }) => tags.map((tag) => tag.name))]),
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

function CaseStudyPreview({
  data,
  route,
}: {
  data: CaseStudyFrontmatter;
  route: string;
}) {
  return (
    <Container
      variant="dark"
      className="col-span-full"
      innerClassName="px-4 py-8 flex flex-wrap gap-12 relative w-full items-center shadow-none bg-card/10 lg:px-12 lg:py-12"
    >
      <div className="max-md:order-2 max-md:w-full md:w-1/2">
        <Text className="text-primary mb-4">{data.client}</Text>
        <Heading size="sm" className="mb-4">
          {data.title}
        </Heading>
        <Text className="mb-6">{data.description}</Text>
        <div className="grid gap-4 md:flex">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-foreground/80 hover:bg-secondary/60 w-full md:w-auto"
          >
            <Link href={route}>Read Case Study</Link>
          </Button>
          <Button asChild variant="link" className="text-md font-bold">
            <a
              href={data.project_url}
              target="_blank"
              className="flex items-center"
              rel="noreferrer"
            >
              Project Website <ArrowRightCircleIcon className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
      <div className="relative aspect-video flex-1 overflow-hidden rounded-md max-md:order-1 max-md:w-full md:w-1/2">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </div>
    </Container>
  );
}
