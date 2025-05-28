import { SignInMagicLink, AuthFormWrapper } from '@/components/pro/AuthForms';

const authFormLinks = [
  { href: '/signin', label: 'Sign in using Email and Password' },
];

const SignInEmailPasswordPage = () => {
  return (
    <AuthFormWrapper
      links={authFormLinks}
      title="Get a Magic Link"
      description="We'll send you a link to sign in or create a new account."
    >
      <SignInMagicLink />
    </AuthFormWrapper>
  );
};

export default SignInEmailPasswordPage;
