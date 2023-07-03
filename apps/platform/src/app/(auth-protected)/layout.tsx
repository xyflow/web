import AuthProtection from './auth-protection';

export default function AuthProtectedLayout({ children }: { children: React.ReactNode }) {
  return <AuthProtection>{children}</AuthProtection>;
}
