import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import Card from '../components/Card';

function EnterpriseContact() {
  const router = useRouter();

  return (
    <Layout>
      <Box bg="gray.50">
        <Container
          maxW="xl"
          py={{
            base: '12',
            md: '24',
          }}
          px={{
            base: '0',
            sm: '8',
          }}
        >
          <Stack spacing="8">
            <Card
              as="form"
              py={7}
              px={6}
              method="POST"
              action="/enterprise?success=true"
              data-netlify="true"
              netlify-honeypot="bot-field"
              name="react-flow-enterprise"
            >
              <input type="hidden" name="form-name" value="react-flow-enterprise" />
              <input type="hidden" name="subject" value="React Flow Pro Enterprise Quote Request" />
              <input type="hidden" name="bot-field" />
              <Stack spacing="6">
                {router.query.success && (
                  <Alert borderRadius="md" status="success">
                    <AlertIcon />
                    Thanks for your message! We will get back to you soon.
                  </Alert>
                )}
                <Heading textAlign="center" mb={3}>
                  Enterprise Plan
                </Heading>
                <Text align="center" color="gray.600" sx={{ marginTop: '0 !important' }}>
                  Tell us more about your company to get a custom quote.
                </Text>
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel fontWeight="bold" htmlFor="name">
                      Your Name
                    </FormLabel>
                    <Input isRequired id="name" type="text" name="name" autoComplete="on" />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight="bold" htmlFor="email">
                      Your Email
                    </FormLabel>
                    <Input isRequired id="email" type="email" name="email" autoComplete="on" />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight="bold" htmlFor="company">
                      Company Website
                    </FormLabel>
                    <Input isRequired placeholder="https://..." id="company" type="url" name="company" />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight="bold" htmlFor="message">
                      Tell us how you are using React Flow and how we might be able to support
                    </FormLabel>
                    <Textarea isRequired rows={5} name="message" id="message" placeholder="Your message" />
                  </FormControl>
                </Stack>
                <Button type="submit" colorScheme="pink">
                  Submit
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export default EnterpriseContact;
