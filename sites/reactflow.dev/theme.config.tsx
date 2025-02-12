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
};
