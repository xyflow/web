import { SignUpEmailPassword, AuthFormWrapper } from 'xy-shared/components/pro/AuthForms';

const authFormLinks = [
  { href: '/pro/sign-in', label: 'Already have an account? Sign In' },
];

const SignUpPage = () => {
  return (
    <AuthFormWrapper
      library="svelte"
      links={authFormLinks}
      title="Sign Up"
      description="Enter your email and password to create an account."
    >
      <SignUpEmailPassword />
    </AuthFormWrapper>
  );
};

export default SignUpPage;
