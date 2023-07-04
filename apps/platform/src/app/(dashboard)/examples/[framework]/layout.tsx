import { Framework } from 'utils/server/examples';

export default function ({ children }: { children: React.ReactNode }) {
  return children;
}

export function generateStaticParams() {
  return Object.values(Framework).map((framework) => ({ framework }));
}

export const dynamicParams = false;
