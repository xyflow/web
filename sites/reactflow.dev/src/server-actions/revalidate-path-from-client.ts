'use server';

import { revalidatePath } from 'next/cache';

/**
 * This function is called from the client side to revalidate a specific path.
 * It uses the Next.js `revalidatePath` function to trigger a revalidation for that path.
 * This is useful for updating the cache and ensuring that the latest data is served to users.
 */
export const revalidatePathFromClient: typeof revalidatePath = async (...args) => {
  return revalidatePath(...args);
};
