import { ResendVerificationLink, AuthFormWrapper } from '@/components/pro/AuthForms';

const ResendVerificationLinkPage = () => {
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

export default ResendVerificationLinkPage;
