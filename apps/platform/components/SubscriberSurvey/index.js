import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import { HiOutlineExternalLink } from 'components/Icons';

export default function SubscriberSurvey(props) {
  return (
    <Box
      bg="pink.50"
      border="1px solid"
      borderColor="pink.500"
      color="pink.500"
      px={5}
      py={5}
      borderRadius="md"
      {...props}
    >
      We want to learn more about how you{"'"}re using React Flow Pro.
      <Button
        as="a"
        cursor="pointer"
        href="https://ndmj05829wa.typeform.com/to/lWoYgbVK"
        rightIcon={<HiOutlineExternalLink />}
        colorScheme="pink"
        variant="link"
        ml={1}
        target="_blank"
      >
        Answer 3 questions for us
      </Button>
    </Box>
  );
}
