import {
  SignUpEmailPassword,
  AuthFormWrapper,
} from '../../../../components/pro/AuthForms';

const authFormLinks = [
  { href: '/pro/sign-in', label: 'Already have an account? Sign In' },
];

export default function SignUpPage() {
  return (
    <AuthFormWrapper
      links={authFormLinks}
      title="Sign Up"
      description="Enter your email and password to create an account."
    >
      <SignUpEmailPassword />
    </AuthFormWrapper>
  );
}
