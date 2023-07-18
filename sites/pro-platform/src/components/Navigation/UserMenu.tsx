'use client';

import Link from 'next/link';
import { useUserEmail, useSignOut } from '@nhost/nextjs';
import { Select, SelectContent, SelectSeparator, SelectLabel, SelectTrigger, SelectGroup } from 'xy-ui';

export default function () {
  const userEmail = useUserEmail();
  const { signOut } = useSignOut();

  return (
    <Select>
      <SelectTrigger className="w-[80px] sm:w-[180px]">
        <div className="font-bold overflow-hidden text-ellipsis">{userEmail}</div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <Link href="/">
            <SelectLabel className="hover:bg-slate-100">Overview</SelectLabel>
          </Link>
          <SelectSeparator />
          <Link href="/account">
            <SelectLabel className="hover:bg-slate-100">Account</SelectLabel>
          </Link>
          <SelectSeparator />
          <Link href="/billing">
            <SelectLabel className="hover:bg-slate-100">Billing</SelectLabel>
          </Link>
          <SelectSeparator />
          <SelectLabel onClick={signOut} className="text-red-500 hover:bg-slate-100 cursor-pointer">
            Logout
          </SelectLabel>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
