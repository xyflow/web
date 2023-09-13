import AuthRedirect from './auth-redirect';

export default function ({ children }: { children: React.ReactNode }) {
  return <AuthRedirect>{children}</AuthRedirect>;
}
