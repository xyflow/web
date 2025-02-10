export async function GET(
  req: Request,
) {
  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/posts/[id]" this should be "/posts/1"
    // TODO: await res.revalidate('/showcase');
    return Response.json({ revalidated: true });
  } catch (err) {
    console.log(err);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return new Response('Failed to revalidate', { status: 500 });
  }
}
