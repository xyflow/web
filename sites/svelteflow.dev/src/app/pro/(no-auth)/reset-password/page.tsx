import { ResetPassword, AuthFormWrapper } from 'xy-shared/components/pro/AuthForms';

const authFormLinks = [{ href: '/pro/sign-in', label: 'Back to login' }];

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
