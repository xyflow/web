import { NextraMetadata } from 'nextra';
import { SignInEmailPassword, AuthFormWrapper } from '@/components/pro/AuthForms';

export const metadata: NextraMetadata = {
  asIndexPage: true,
};

const authFormLinks = [{ href: '/pro/sign-up', label: "Don't have an account? Sign Up" }];

const SignInEmailPasswordPage = () => {
  return (
    <AuthFormWrapper links={authFormLinks} title="Sign In">
      <SignInEmailPassword />
    </AuthFormWrapper>
  );
};

export default SignInEmailPasswordPage;
