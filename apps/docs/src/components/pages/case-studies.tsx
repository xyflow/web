import Link from 'next/link';
import { getPagesUnderRoute } from 'nextra/context';

import PageLayout from '@/components/page-layout';

export default function CaseStudies() {
  return (
    <PageLayout
      title="Case Studies"
      subtitle="Check out some of our case studies"
    >
      <ul>
        {getPagesUnderRoute('/case-studies').map((page) => {
          return (
            <li key={page.route}>
              <Link href={page.route} className="text-xl">
                {page.meta?.title || page.frontMatter?.title || page.name}
              </Link>
              <p>
                {page.frontMatter?.description}{' '}
                <span>
                  <Link href={page.route}>Read More</Link>
                </span>
              </p>
              {page.frontMatter?.date ? <p>{page.frontMatter.date}</p> : null}
            </li>
          );
        })}
      </ul>
    </PageLayout>
  );
}
