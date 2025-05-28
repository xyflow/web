import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  // const proPageMap = mergeMetaWithPageMap(pageMap, {
  //   pro: { display: 'normal' },
  //   'case-studies': { display: 'normal' },
  // });
  return (
    //   footerCategories={{
    //     'React Flow Pro': [
    //       { title: 'Pricing', route: '/pro/pricing' },
    //       { title: 'Case Studies', route: '/pro/case-studies' },
    //       { title: 'Request a Quote', route: '/pro/quote-request' },
    //       { title: 'Sign Up', route: '/pro/signup' },
    //       { title: 'Sign In', route: '/pro/signin' },
    //     ],
    //   }}
    children
  );
};

export default Layout;
