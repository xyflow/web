export const dynamicParams = false;

import { SessionRefresher } from 'xy-shared/components/session-refresher';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <SessionRefresher />
      {children}
    </>
  );
}
