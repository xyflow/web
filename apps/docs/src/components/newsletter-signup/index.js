import React, { useCallback, useState } from 'react';
import { Box, FormControl, Input, HStack, Button, FormHelperText } from '@chakra-ui/react';

export default function NewsletterSignup({ size = 'md', ...props }) {
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isError, setError] = useState(false);

  const onChange = useCallback(() => {
    setError(false);
    setLoading(false);
    setSubmitted(false);
  }, []);

  const onSubmit = useCallback(async (evt) => {
    evt.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(evt.target);
      const jsonData = Object.fromEntries(formData.entries());

      const response = await fetch(
        'https://fdsuchqhfchojqpemwyn.nhost.run/v1/functions/mail/public-newsletter-signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        }
      );

      const responseJson = await response.json();

      if (responseJson.success) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  }, []);

  return (
    <Box {...props}>
      <form onSubmit={onSubmit}>
        <FormControl>
          <HStack>
            <Input
              disabled={isLoading || isSubmitted}
              required
              bg="white"
              type="email"
              placeholder="your@email.com"
              size={size}
              borderRadius="lg"
              name="email"
              onChange={onChange}
            />
            <Button
              disabled={isLoading || isSubmitted}
              isLoading={isLoading}
              colorScheme="pink"
              type="submit"
              size={size}
              borderRadius="lg"
            >
              Subscribe
            </Button>
          </HStack>
          {isError && (
            <FormHelperText color="red">Something went wrong. Please try again.</FormHelperText>
          )}
          {isSubmitted && (
            <FormHelperText color="teal">
              Thanks for subscribing! Please check your inbox and confirm your mail.
            </FormHelperText>
          )}
        </FormControl>
      </form>
    </Box>
  );
}
