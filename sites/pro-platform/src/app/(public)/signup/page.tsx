import { SignUpEmailPassword, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [
  { href: '/signin', label: 'Sign in without password' },
  { href: '/signin/password', label: 'Sign in using Email + Password' },
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
