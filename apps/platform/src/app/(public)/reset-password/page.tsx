import { ResetPassword, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [{ href: '/signin', label: 'Back to login' }];

const SignUpPage = () => {
  return (
    <AuthFormWrapper links={authFormLinks} showOAuth={false}>
      <ResetPassword />
    </AuthFormWrapper>
  );
};

export default SignUpPage;
