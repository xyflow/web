export async function fetchTemplatePreviewUrl(baseUrl: string): Promise<string | null> {
  'use cache';
  try {
    const res = await fetch(`${baseUrl}/config.json`, {
      cache: 'force-cache',
      next: { revalidate: false },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { previewUrl?: unknown };
    if (typeof json.previewUrl === 'string' && json.previewUrl.length > 0) {
      return json.previewUrl;
    }
  } catch {
    // fall back to baseUrl
  }
  return null;
}
