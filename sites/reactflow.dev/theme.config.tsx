import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar } from 'nextra-theme-docs';
import { getMdxPagesUnderRoute } from 'xy-shared';
import { type Route } from '@/utils';

export default {
  navbar: {
    component: (props) => {
      const router = useRouter();
      const isPro = useIsPro();
      const isProSubpage = isPro && router.pathname !== '/pro';
      const proHomePageKey = isProSubpage ? 'href' : 'route';

      if (isPro) {
        return (
          <Navbar
            {...props}
            items={
              [
                // hack: the item only gets highlighted when it has a "route", not when it has a "href"
                // by doing this we prevent the "Pricing" item to be highlighted on sub routes
                { title: 'Pricing', [proHomePageKey]: '/pro' },
                {
                  title: 'Pro Examples',
                  route: '/pro/examples',
                },
                { title: 'Case Studies', route: '/pro/case-studies' },
                { title: 'Contact Us', href: 'https://xyflow.com/contact' },
              ] satisfies { title: string; route?: Route; href?: Route }[]
            }
          />
        );
      }

      return <Navbar {...props} />;
    },
  },
  toc: {
    backToTop: null,
    extraContent: () => {
      const className =
        '_text-xs _font-medium _text-gray-500 hover:_text-gray-900 dark:_text-gray-400 dark:hover:_text-gray-100 contrast-more:_text-gray-800 contrast-more:dark:_text-gray-50';

      return (
        <div className="_mt-4 _flex _flex-col _gap-2">
          <p className="_text-xs _font-semibold _tracking-tight _text-gray-600 dark:_text-gray-200 contrast-more:_text-gray-900 contrast-more:dark:_text-gray-50">
            What's new?
          </p>
          {getMdxPagesUnderRoute('/whats-new')
            .sort((a, b) =>
              b.frontMatter.date.localeCompare(a.frontMatter.date),
            )
            .slice(0, 3)
            .map(({ route, frontMatter }) => (
              <Link key={route} href={route} className={className}>
                {frontMatter.title}
              </Link>
            ))}
          <Link href="/whats-new" className={className}>
            ...and more!
          </Link>
        </div>
      );
    },
  },
  feedback: {
    useLink: () => 'https://xyflow.com/contact',
  },
};
