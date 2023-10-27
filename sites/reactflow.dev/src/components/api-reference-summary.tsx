import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useMemo } from 'react';
import {
  getApiReferenceByCategory,
  type Category,
} from '@/utils/get-static-props/api-reference-by-category';
import Link from 'next/link';

export type ApiReferenceSummaryProps = {
  category: Category;
};

export function ApiReferenceSummary({ category }: ApiReferenceSummaryProps) {
  const pages = useMemo(() => getApiReferenceByCategory(category), []);

  return (
    <div>
      {pages.map(({ title, description, route }) => {
        return (
          <article key={route}>
            <NextraH2Element>
              <Link href={route}>{title}</Link>
            </NextraH2Element>

            <NextraTextWithCode>{description}</NextraTextWithCode>

            <Link
              href={route}
              className="block nx-mt-8 text-sm text-primary text-right"
            >
              Read more <ArrowRightIcon className="inline w-3 h-3" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

function NextraH2Element({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className="nx-font-semibold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-mt-10 nx-border-b nx-pb-1 nx-text-3xl nx-border-neutral-200/70 contrast-more:nx-border-neutral-400 dark:nx-border-primary-100/10 contrast-more:dark:nx-border-neutral-400"
      {...props}
    >
      {children}
      <a
        href="#props"
        id="props"
        className="subheading-anchor"
        aria-label="Permalink for this section"
      ></a>
    </h2>
  );
}

function NextraTextWithCode({
  children = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { children: string }) {
  const segments = useMemo(
    () =>
      children
        .split('`')
        .map((segment, i) =>
          i % 2 === 0 ? { text: segment } : { code: segment },
        ),
    [children],
  );

  return (
    <p className="nx-mt-6 nx-leading-7 first:nx-mt-0" {...props}>
      {segments.map(({ text, code }, i) =>
        text ? (
          <span key={i}>{text}</span>
        ) : (
          <code
            key={i}
            className="nx-border-black nx-border-opacity-[0.04] nx-bg-opacity-[0.03] nx-bg-black nx-break-words nx-rounded-md nx-border nx-py-0.5 nx-px-[.25em] nx-text-[.9em] dark:nx-border-white/10 dark:nx-bg-white/10"
            dir="ltr"
          >
            {code}
          </code>
        ),
      )}
    </p>
  );
}
