import { SignInMagicLink, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [{ href: '/signin/password', label: 'Login using Email + Password' }];

const SignInPage = () => {
  return (
    <AuthFormWrapper
      links={authFormLinks}
      title="sign in"
      description="Enter your email to sign in or create an account. You will receive a mail with a login link."
    >
      <SignInMagicLink />
    </AuthFormWrapper>
  );
};

export default SignInPage;
