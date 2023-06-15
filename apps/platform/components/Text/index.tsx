import { Text, TextProps } from '@chakra-ui/react';

function TextComponent({ children, ...rest }: TextProps) {
  return (
    <Text fontSize={['lg', 'xl', '2xl']} mb={6} display="block" {...rest}>
      {children}
    </Text>
  );
}

export default TextComponent;
