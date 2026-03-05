import {
  ResendVerificationLink,
  AuthFormWrapper,
} from '../../../../../components/pro/AuthForms';

export default function EmailVerificationResendLinkPage() {
  return (
    <AuthFormWrapper
      title="Resend Verification Link"
      description="Enter your email to send a new verification link."
      showOAuth={false}
      showHero={false}
    >
      <ResendVerificationLink />
    </AuthFormWrapper>
  );
};