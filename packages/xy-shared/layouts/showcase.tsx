'use client';

import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
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
import Image from 'next/image';
import { type MdxFile } from 'nextra';
import { ReactNode, useCallback, useMemo, useState } from 'react';

import { Hero } from '../widgets/hero';
import { ProjectPreview } from '../widgets/project-preview';
import { BaseLayout } from './base';
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
  demoUrl?: string;
  repoUrl?: string;
  openSource?: boolean;
  tags: { id: string; name: string }[];
};

export function ShowcaseLayout({
  title,
  subtitle,
  showcases = [],
  caseStudies = [],
  children,
}: ShowcaseLayoutProps) {
  const { all, selected, toggle } = useTags(showcases);

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

      <div className="flex justify-center items-center flex-wrap gap-x-2 gap-y-4 max-w-4xl mx-auto">
        {Array.from(all).map((tag, i) => (
          <Tag key={i} name={tag} selected={selected.has(tag)} onClick={toggle} />
        ))}
      </div>

      <ContentGrid className="mt-8 md:grid-cols-2 lg:grid-cols-3 border-none gap-4 lg:gap-8">
        {showcases.map((item) => (
          <ContentGridItem
            key={item.title}
            className="border-none py-6 lg:py-8 lg:px-0 hover:bg-transparent relative"
          >
            <ProjectPreview
              image={item.image}
              title={item.title}
              className="relative h-full flex-col flex"
              imageWrapperClassName="w-full"
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
                  : item.repoUrl
                    ? { href: item.repoUrl, label: 'Repo' }
                    : undefined
              }
              linkLabel="Website"
            />
          </ContentGridItem>
        ))}

        <ContentGridItem route="/showcase/submit">
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
      innerClassName="px-4 py-8 flex flex-wrap gap-12 relative w-full items-center shadow-none bg-none bg-gray-100/10 lg:px-12 lg:py-12"
    >
      <div className="max-md:w-full max-md:order-2 md:w-1/2">
        <Text className="text-primary mb-4">{data.client}</Text>
        <Heading size="sm" className="mb-4">
          {data.title}
        </Heading>
        <Text className="mb-6">{data.description}</Text>
        <div className="grid md:flex gap-4">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-black hover:bg-gray-100 w-full md:w-auto"
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
              Project Website <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
      <div className="max-md:w-full max-md:order-1 aspect-video md:w-1/2 relative flex-1 rounded-md overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </div>
    </Container>
  );
}
