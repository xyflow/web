import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiEye, HiEyeOff } from 'components/Icons';

type PasswordFieldProps = {
  label?: string;
} & InputProps;

const PasswordField = React.forwardRef(({ label = 'Password', ...props }: PasswordFieldProps, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const mergeRef = useMergeRefs(inputRef, ref);

  const onClickReveal = () => {
    onToggle();

    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor="password">{label}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id="password"
          ref={mergeRef}
          name="password"
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          required
          {...props}
        />
      </InputGroup>
    </FormControl>
  );
});

PasswordField.displayName = 'PasswordField';

export default PasswordField;
