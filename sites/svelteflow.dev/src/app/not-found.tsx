import { Metadata } from 'next';

import { NotFoundLayout } from 'xy-shared/layouts/404';

export const metadata: Metadata = {
  title: '404',
};

export default function NotFound({ ...props }) {
  return <NotFoundLayout {...props} />;
}
