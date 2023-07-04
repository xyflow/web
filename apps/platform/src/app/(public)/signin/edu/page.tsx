import { SignInEdu, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [{ href: '/signin', label: 'Regular Sign In' }];

const SignUpEduPage = () => {
  return (
    <AuthFormWrapper links={authFormLinks} showOAuth={false} title="xyflow pro edu">
      <SignInEdu />
    </AuthFormWrapper>
  );
};

export default SignUpEduPage;
