import { ResetPassword, AuthFormWrapper } from '../../../../components/pro/AuthForms';

const authFormLinks = [{ href: '/pro/sign-in', label: 'Back to login' }];

export default function ResetPasswordPage() {
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
