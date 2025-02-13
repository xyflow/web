import { type Route } from '@/utils';
import { useIsPro } from '@/utils/use-is-pro';

const config = {
  navbar: {
    component: function Navbar(props) {
      const isPro = useIsPro();
      if (isPro) {
        return (
          <Navbar
            {...props}
            items={
              [
                { title: 'Pricing', href: '/pro' },
                { title: 'Pro Examples', route: '/pro/examples' },
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
