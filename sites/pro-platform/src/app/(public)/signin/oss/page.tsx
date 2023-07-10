import Link from 'next/link';
import { SignInOSS, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [{ href: '/signin', label: 'Regular Sign In' }];

const SignUpOSSPage = () => {
  return (
    <AuthFormWrapper
      links={authFormLinks}
      showOAuth={false}
      title="Open Source Sign In"
      description={
        <div>
          This is intended for non-commercial open source projects. If you are a business or private user of React Flow,
          please use the <Link href="/signin">regular sign up</Link>.
        </div>
      }
    >
      <SignInOSS />
    </AuthFormWrapper>
  );
};

export default SignUpOSSPage;
