import { SignInMagicLink, AuthFormWrapper } from '../../../../../components/pro/AuthForms';

const authFormLinks = [
  { href: '/pro/sign-in', label: 'Sign in using Email and Password' },
];

export default function SignInMagicLinkPage() {
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
