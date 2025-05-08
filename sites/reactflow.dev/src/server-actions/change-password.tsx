'use server'

import { getNhost } from '@/utils/nhost';

export async function changePassword(formData: FormData) {
  const nhost = await getNhost()
  const newPassword = formData.get('password') as string;
  return nhost.auth.changePassword({
    newPassword
  })
}
