import { ResetPassword, AuthFormWrapper } from '@/components/pro/AuthForms';

const authFormLinks = [{ href: '/pro/signin', label: 'Back to login' }];

const ResetPasswordPage = () => {
  return (
    <AuthFormWrapper
      title="Reset Password"
      description="Enter your email to reset your password."
      links={authFormLinks}
      showOAuth={false}
      showHero={false}
    >
      <ResetPassword />
    </AuthFormWrapper>
  );
};

export default ResetPasswordPage;
