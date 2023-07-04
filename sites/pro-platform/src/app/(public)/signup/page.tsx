import { SignUpEmailPassword, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [
  { href: '/signin', label: 'Login without password' },
  { href: '/signin/password', label: 'Login using Email + Password' },
];

const SignUpPage = () => {
  return (
    <AuthFormWrapper links={authFormLinks} title="sign up">
      <SignUpEmailPassword />
    </AuthFormWrapper>
  );
};

export default SignUpPage;
