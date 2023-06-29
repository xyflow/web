'use client';

import { Box, Grid, GridItem } from '@chakra-ui/react';

import Sidebar from 'components/Sidebar';
import MetaTags from 'components/MetaTags';
import Footer from 'components/Footer';
// import Notifications from 'components/Notifications';

function DashboardLayout({ children, ...rest }: { children: React.ReactNode }) {
  return (
    <Grid templateColumns="250px 1fr" templateRows="calc(100vh)" flex="1">
      <Sidebar />
      <MetaTags />
      <GridItem height="calc(100vh)" position="relative" overflow="auto" flex="1">
        {/* @todo re-enable notifications */}
        {/* <Notifications /> */}
        <Box py={4} px={6} mb={100}>
          {children}
        </Box>
        <Footer mx="0" />
      </GridItem>
    </Grid>
  );
}

export default DashboardLayout;
