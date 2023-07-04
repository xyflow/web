import { SignInOSS, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [{ href: '/signin', label: 'Regular Sign In' }];

const SignUpOSSPage = () => {
  return (
    <AuthFormWrapper links={authFormLinks} showOAuth={false} title="xyflow pro open source">
      <SignInOSS />
    </AuthFormWrapper>
  );
};

export default SignUpOSSPage;
