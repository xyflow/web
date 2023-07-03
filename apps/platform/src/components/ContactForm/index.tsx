import { Input, Textarea, Stack, FormControl, FormLabel, Button } from '@chakra-ui/react';

export default function ContactForm() {
  return (
    <form
      method="POST"
      action="/contact?success=true"
      data-netlify="true"
      netlify-honeypot="bot-field"
      name="react-flow-contact"
    >
      <input type="hidden" name="form-name" value="react-flow-contact" />
      <input type="hidden" name="subject" value="Your message to the React Flow team" />
      <input type="hidden" name="bot-field" />
      <Stack spacing={5}>
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input required name="email" id="email" type="email" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="message">Your Message</FormLabel>
          <Textarea required resize="none" rows={8} name="message" id="message" />
        </FormControl>
        <Button colorScheme="pink" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
