import { SignInEmailPassword, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [
  { href: '/signup', label: "Don't have an account? Sign Up" },
  { href: '/reset-password', label: 'Forgot Password?' },
  { href: '/signin/magic-link', label: 'Sign in with magic link' },
];

const SignInEmailPasswordPage = () => {
  return (
    <AuthFormWrapper links={authFormLinks} title="Sign In" description="Enter your email and password to sign in.">
      <SignInEmailPassword />
    </AuthFormWrapper>
  );
};

export default SignInEmailPasswordPage;
