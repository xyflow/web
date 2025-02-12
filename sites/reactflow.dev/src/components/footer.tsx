'use client'

import { defaultFooterCategories, Footer as XYFooter } from '@xyflow/xy-ui';
import { FC } from 'react';
import { useIsPro } from '@/utils/use-is-pro';

export const Footer: FC =  ()  => {
  const isPro = useIsPro();
  const { Projects, ...remainingCategories } = defaultFooterCategories;

  const categories = isPro
    ? {
      'React Flow Pro': [
        { title: 'Pricing', route: '/pro/pricing' },
        { title: 'Pro Examples', route: '/pro/examples' },
        { title: 'Case Studies', route: '/pro/case-studies' },
        { title: 'Request a Quote', route: '/pro/quote-request' },
        {
          title: 'Sign Up',
          route: `${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`,
        },
        {
          title: 'Sign In',
          route: `${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/login`,
        },
      ],
      ...remainingCategories,
    }
    : {
      Docs: [
        { title: 'Getting Started', route: '/learn' },
        { title: 'API Reference', route: '/api-reference' },
        { title: 'Examples', route: '/examples' },
        { title: 'Showcase', route: '/showcase' },
      ],
      ...remainingCategories,
      Legal: [
        {
          title: 'MIT License',
          route: 'https://github.com/xyflow/xyflow/blob/main/LICENSE',
        },
        {
          title: 'Code of Conduct',
          route:
            'https://github.com/xyflow/xyflow/blob/main/CODE_OF_CONDUCT.md',
        },
        { title: 'Imprint', route: 'https://xyflow.com/imprint' },
      ],
    };

  return <XYFooter categories={categories} baseUrl="https://reactflow.dev" />;
}
