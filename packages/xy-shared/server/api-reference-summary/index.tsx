import { FC } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import {
  getApiReferenceByCategory,
  type Category,
} from './get-api-reference-by-category';
// @ts-expect-error -- alias to `mdx-components` file
import { useMDXComponents as getMdxComponents } from 'next-mdx-import-source-file';

export type ApiReferenceSummaryProps = {
  category: Category;
};

const { h2: H2, p: P } = getMdxComponents();

export const ApiReferenceSummary: FC<ApiReferenceSummaryProps> = async ({
  category,
}) => {
  const pages = await getApiReferenceByCategory(category);
  return (
    <div>
      {pages.map(({ title, description, route }) => (
        <article key={route}>
          <H2>
            <Link href={route}>{title}</Link>
          </H2>
          <P>{description}</P>

          <Link
            href={route}
            className="block _mt-8 text-sm text-primary text-right"
          >
            Read more <ArrowRightIcon className="inline w-3 h-3" />
          </Link>
        </article>
      ))}
    </div>
  );
};
