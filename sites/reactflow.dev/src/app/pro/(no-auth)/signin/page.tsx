import {
  SignInEmailPassword,
  AuthFormWrapper,
} from '@/components/pro/AuthForms';

const authFormLinks = [
  { href: '/signup', label: "Don't have an account? Sign Up" },
];

const SignInEmailPasswordPage = () => {
  return (
    <AuthFormWrapper links={authFormLinks} title="Sign In">
      <SignInEmailPassword />
    </AuthFormWrapper>
  );
};

export default SignInEmailPasswordPage;
