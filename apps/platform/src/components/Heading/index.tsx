import { Heading, HeadingProps } from '@chakra-ui/react';

export default function CustomHeading({ children, ...rest }: HeadingProps) {
  return (
    <Heading fontSize={['3xl', '4xl', '5xl']} fontWeight="black" lineHeight={1.2} display="block" mb={2} {...rest}>
      {children}
    </Heading>
  );
}
