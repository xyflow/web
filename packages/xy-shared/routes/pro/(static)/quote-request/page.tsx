import { Metadata } from 'next';
import { getFramework } from '../../../../lib/get-framework';

const { library } = getFramework();

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    `Interested in ${library} Pro for your organization? Use this page to get an official quote.`,
};

export { default } from './page.client';
