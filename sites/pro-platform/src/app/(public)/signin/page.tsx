import { SignInMagicLink, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [{ href: '/signin/password', label: 'Login using Email + Password' }];

const SignInPage = () => {
  return (
    <AuthFormWrapper links={authFormLinks} title="sign in">
      <SignInMagicLink />
    </AuthFormWrapper>
  );
};

export default SignInPage;
