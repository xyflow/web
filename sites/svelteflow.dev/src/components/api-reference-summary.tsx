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
              className="block _mt-8 text-sm text-primary text-right"
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
      className="_font-semibold _tracking-tight _text-slate-900 dark:_text-slate-100 _mt-10 _border-b _pb-1 _text-3xl _border-neutral-200/70 contrast-more:_border-neutral-400 dark:_border-primary-100/10 contrast-more:dark:_border-neutral-400"
      {...props}
    >
      {children}
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
    <p className="_mt-6 _leading-7 first:_mt-0" {...props}>
      {segments.map(({ text, code }, i) =>
        text ? (
          <span key={i}>{text}</span>
        ) : (
          <code
            key={i}
            className="_border-black _border-opacity-[0.04] _bg-opacity-[0.03] _bg-black _break-words _rounded-md _border _py-0.5 _px-[.25em] _text-[.9em] dark:_border-white/10 dark:_bg-white/10"
            dir="ltr"
          >
            {code}
          </code>
        ),
      )}
    </p>
  );
}
