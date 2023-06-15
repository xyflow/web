import { Box, SimpleGrid, Heading, Link, Text, BoxProps, LinkProps, HeadingProps } from '@chakra-ui/react';
import NextLink from 'next/link';

const FooterHeading = (props: HeadingProps) => <Heading my={6} size="sm" {...props} />;

const FooterLink = (props: LinkProps) => (
  <Box mb={2}>
    <Link as="span" size="sm" {...props} />
  </Box>
);

export default function Footer(props: BoxProps) {
  return (
    <Box bg="gray.50" borderTop="1px solid" borderTopColor="gray.100" minHeight={300}>
      <Box maxWidth="container.lg" px={5} pt={4} pb={10} mx="auto" {...props}>
        <SimpleGrid columns={[1, 3]} mb={5}>
          <Box>
            <FooterHeading>React Flow Pro</FooterHeading>
            <NextLink href="/">
              <FooterLink>Home</FooterLink>
            </NextLink>
            <NextLink href="/pricing">
              <FooterLink>Pricing</FooterLink>
            </NextLink>
            <NextLink href="/pro-examples">
              <FooterLink>Pro Examples</FooterLink>
            </NextLink>
            <NextLink href="/info">
              <FooterLink>Info</FooterLink>
            </NextLink>
            <NextLink href="/signup">
              <FooterLink>Sign up</FooterLink>
            </NextLink>
            <NextLink href="/login">
              <FooterLink>Sign in</FooterLink>
            </NextLink>
          </Box>
          <Box>
            <FooterHeading>Resources</FooterHeading>
            <FooterLink isExternal href="https://reactflow.dev/docs" as="a">
              Documentation
            </FooterLink>
            <FooterLink isExternal href="https://reactflow.dev/examples" as="a">
              Examples
            </FooterLink>
            <FooterLink isExternal href="https://github.com/wbkd/react-flow" as="a">
              Github
            </FooterLink>
            <FooterLink isExternal href="https://discord.gg/Bqt6xrs" as="a">
              Discord
            </FooterLink>
          </Box>
          <Box>
            <FooterHeading>Company</FooterHeading>
            <NextLink href="/contact">
              <FooterLink>Contact</FooterLink>
            </NextLink>
            <NextLink href="/terms">
              <FooterLink>Terms of Use</FooterLink>
            </NextLink>
            <NextLink href="/privacy">
              <FooterLink>Privacy Policy</FooterLink>
            </NextLink>
            <NextLink href="/about-us">
              <FooterLink>About Us</FooterLink>
            </NextLink>
          </Box>
        </SimpleGrid>
        <Text mt={10} fontSize={12} color="gray.600" textAlign="center">
          <Link href="mailto:info@reactflow.dev">info@reactflow.dev</Link> — Copyright © 2023 webkid GmbH. All rights
          reserved.
        </Text>
      </Box>
    </Box>
  );
}
