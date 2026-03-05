export async function fetchJSON<T>(url: string): Promise<T> {
  let json = {} as T;

  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'webkid' } });
    
    if (!response.ok) {
      const text = await response.text();
      console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`, text.substring(0, 100));
      return json;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error(`Response from ${url} is not JSON. Content-Type: ${contentType}`, text.substring(0, 100));
      return json;
    }

    json = await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
  }

  return json;
}
