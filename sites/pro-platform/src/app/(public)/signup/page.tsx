import { SignUpEmailPassword, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [
  { href: '/signin', label: 'Sign in using Email + Password' },
  { href: '/signin/magic-link', label: 'Sign in without password' },
];

const SignUpPage = () => {
  return (
    <AuthFormWrapper
      links={authFormLinks}
      title="Sign Up"
      description="Enter your email and a password to create an account."
    >
      <SignUpEmailPassword />
    </AuthFormWrapper>
  );
};

export default SignUpPage;
