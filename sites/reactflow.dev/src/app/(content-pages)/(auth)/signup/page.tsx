import {
  SignUpEmailPassword,
  AuthFormWrapper,
} from '@/components/pro/AuthForms';

const authFormLinks = [
  { href: '/signin', label: 'Already have an account? Sign In' },
];

const SignUpPage = () => {
  return (
    <AuthFormWrapper
      links={authFormLinks}
      title="Sign Up"
      description="Enter your email and password to create an account."
    >
      <SignUpEmailPassword />
    </AuthFormWrapper>
  );
};

export default SignUpPage;
