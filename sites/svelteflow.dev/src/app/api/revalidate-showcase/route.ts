import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/posts/[id]" this should be "/posts/1"
    revalidatePath('/showcase');
    return Response.json({ revalidated: true });
  } catch (error) {
    console.error(error);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return new Response('Failed to revalidate', { status: 500 });
  }
}
