import Link from 'next/link';
import { SignInEdu, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [{ href: '/signin', label: 'Regular Sign In' }];

const SignUpEduPage = () => {
  return (
    <AuthFormWrapper
      links={authFormLinks}
      showOAuth={false}
      title="xyflow pro edu"
      description={
        <div>
          This is only intended for educational purposes. If you are a business or private user of React Flow, please
          use the <Link href={{ pathname: '/signin' }}>regular sign in</Link>. Please use your university mail for this
          form.
        </div>
      }
    >
      <SignInEdu />
    </AuthFormWrapper>
  );
};

export default SignUpEduPage;
