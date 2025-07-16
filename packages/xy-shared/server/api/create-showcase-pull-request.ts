import { createShowcasePR } from '..';

export async function CreateShowcasePullRequestPOST(request: Request) {
  const body = await request.json();
  const { library, comment, ...formData } = body;
  const result = await createShowcasePR(formData, library, comment);

  return Response.json({ ...result });
}
