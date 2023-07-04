import { SignInEmailPassword, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [
  { href: '/signin', label: 'Login without Password' },
  { href: '/signup', label: "Don't have an account? Sign Up" },
];

const SignInEmailPasswordPage = () => {
  return (
    <AuthFormWrapper links={authFormLinks} title="sign in with email and password">
      <SignInEmailPassword />
    </AuthFormWrapper>
  );
};

export default SignInEmailPasswordPage;
