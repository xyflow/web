import { SignInMagicLink, AuthFormWrapper } from 'xy-shared/components/pro/AuthForms';

const authFormLinks = [
  { href: '/pro/sign-in', label: 'Sign in using Email and Password' },
];

const SignInEmailPasswordPage = () => {
  return (
    <AuthFormWrapper
      library="svelte"
      links={authFormLinks}
      title="Get a Magic Link"
      description="We'll send you a link to sign in or create a new account."
    >
      <SignInMagicLink />
    </AuthFormWrapper>
  );
};

export default SignInEmailPasswordPage;
