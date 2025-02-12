'use client';

import { FC, ReactNode } from 'react';
import { Button } from '@xyflow/xy-ui';
import Link from 'next/link';
import { useIsPro } from '@/utils/use-is-pro';

export const ClientNavbar: FC<{ children: ReactNode }> = ({ children }) => {
  const isPro = useIsPro();
  if (isPro) {
    return (
      <Button asChild className="ml-auto">
        <Link
          className="shrink-0"
          href={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
        >
          Sign Up
        </Link>
      </Button>
    );
  }
  return children;
};
