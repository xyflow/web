import React from 'react';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';

import Sidebar from '../Sidebar';
import Navigation from '../Navigation';
import MetaTags from '../MetaTags';
import Footer from '../Footer';
import Notifications from '../Notifications';

function Layout({ type = 'default', children, bg = 'gray.50', title, innerContainerProps = {}, ...wrapperProps }) {
  if (type === 'app') {
    return (
      <Grid templateColumns="250px 1fr" templateRows="calc(100vh)" flex="1" bg={bg}>
        <Sidebar />
        <MetaTags />
        <GridItem height="calc(100vh)" position="relative" overflow="auto" flex="1" {...wrapperProps}>
          <Notifications />
          <Box py={4} px={6} mb={100} {...innerContainerProps}>
            {title && (
              <Heading mb={4} fontSize={['3xl', '4xl', '4xl', '5xl']} as="h1">
                {title}
              </Heading>
            )}
            {children}
          </Box>
          <Footer mx="0" />
        </GridItem>
      </Grid>
    );
  }

  return (
    <Box bg={bg}>
      <MetaTags />
      <Notifications />
      <Navigation />
      <Box p={5} mb={20} minHeight="calc(100vh - 400px)" maxWidth="container.lg" mx="auto" {...wrapperProps}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
