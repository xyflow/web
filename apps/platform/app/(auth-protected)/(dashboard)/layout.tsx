'use client';

import { Box, Grid, GridItem } from '@chakra-ui/react';

import Sidebar from 'components/Sidebar';
import MetaTags from 'components/MetaTags';
import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
// import Notifications from 'components/Notifications';

function DashboardLayout({ children, ...rest }: { children: React.ReactNode }) {
  return (
    <Box>
      {/* <Sidebar /> */}
      <Navigation />
      <MetaTags />
      <Box maxWidth={1200} mx="auto" py={4} px={6} mb={100}>
        {children}
      </Box>
      <Footer mx="0" />
      {/* <GridItem height="calc(100vh)" position="relative" overflow="auto" flex="1"> */}
      {/* @todo re-enable notifications */}
      {/* <Notifications /> */}

      {/* </GridItem> */}
    </Box>
  );
}

export default DashboardLayout;
