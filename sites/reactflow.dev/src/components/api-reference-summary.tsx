import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import {
  getApiReferenceByCategory,
  type Category,
} from '@/utils/get-static-props/api-reference-by-category';
import { useMDXComponents } from '@/mdx-components';

export type ApiReferenceSummaryProps = {
  category: Category;
};

export async function ApiReferenceSummary({ category }: ApiReferenceSummaryProps) {
  const pages = await getApiReferenceByCategory(category)
  const { h2: H2, p: P } = useMDXComponents()
  return (
    <div>
      {pages.map(({ title, description, route }) => {
        return (
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
        );
      })}
    </div>
  );
}
