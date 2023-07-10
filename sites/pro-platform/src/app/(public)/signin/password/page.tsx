import { SignInEmailPassword, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [
  { href: '/reset-password', label: 'Forgot Password?' },
  { href: '/signin', label: 'Login without Password' },
  { href: '/signup', label: "Don't have an account? Sign Up" },
];

const SignInEmailPasswordPage = () => {
  return (
    <AuthFormWrapper links={authFormLinks} title="Sign In" description="Enter your email and password to sign in.">
      <SignInEmailPassword />
    </AuthFormWrapper>
  );
};

export default SignInEmailPasswordPage;
