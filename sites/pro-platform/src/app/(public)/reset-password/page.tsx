import { ResetPassword, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [{ href: '/signin/password', label: 'Back to login' }];

const ResetPasswordPage = () => {
  return (
    <AuthFormWrapper
      title="Reset Password"
      description="Enter your email to reset your password."
      links={authFormLinks}
      showOAuth={false}
    >
      <ResetPassword />
    </AuthFormWrapper>
  );
};

export default ResetPasswordPage;
