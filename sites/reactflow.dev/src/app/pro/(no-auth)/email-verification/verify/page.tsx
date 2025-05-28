import { redirect } from 'next/navigation';
import { getNhost } from '@/utils/nhost';
import { FC } from 'react';
import { SearchParams } from '@/types';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const VerifyEmailPage: FC<PageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const nhost = await getNhost();
  const { ticket, redirectTo, type } = searchParams;

  if (ticket && redirectTo && type) {
    redirect(
      `${nhost.auth.url}/verify?ticket=${ticket}&type=${type}&redirectTo=${redirectTo}`,
    );
  }

  redirect('/?error=invalid-ticket');
};

export default VerifyEmailPage;
