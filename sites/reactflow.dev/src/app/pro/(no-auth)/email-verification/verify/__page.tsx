import { redirect } from 'next/navigation';
import { createNhostClient } from 'xy-shared/lib/nhost';
import { FC } from 'react';
import { SearchParams } from 'xy-shared/types';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const VerifyEmailPage: FC<PageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const nhost = await createNhostClient();
  const { ticket, redirectTo, type } = searchParams;

  if (ticket && redirectTo && type) {
    redirect(
      `${nhost.auth.baseURL}/verify?ticket=${ticket}&type=${type}&redirectTo=${redirectTo}`,
    );
  }

  redirect('/?error=invalid-ticket');
};

export default VerifyEmailPage;
