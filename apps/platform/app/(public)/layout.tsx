'use client';

import { Box } from '@chakra-ui/react';

import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import Notifications from 'components/Notifications';

export default function PublicPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box bg="white">
      {/* @todo re-enable notifications here? */}
      {/* <Notifications /> */}
      <Navigation />
      <Box p={5} className="content">
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
