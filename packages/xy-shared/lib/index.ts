// Well this is a pretty funky class, huh. I'm gonna try and break it down a bit
// so we can understand what's going on here:
//
// sm:
//  This is a tailwind breakpoint. It means the class will only apply on screens
//  that are at least 640px wide.
//
// -mx
//  This utility sets a *negative* margin, and its ultimately how we get our
//  content to be wider than its container.
//
// calc((100vw-768px)/2)
//  768px is the max width of our content container. 100vh is the full width of
//  the viewport. So this expression calculates how much space is left on the
//  screen for us to fill. We divide it by two because we're applying this margin
//  equally on both sides of the embed.
//
// min(...,12rem)
//  As the display gets wider, we want to limit the width of our embeds to do
//  something sensible so they don't end up spanning the entire width of someone's
//  ultra-wide monitor. 12rem was chosen as an arbitrary sensible limit, it corresponds
//  to tailwind's `mx-44` utility.
//
export const wideNegativeMargin = 'sm:-mx-[min(calc((100vw-768px)/2),12rem)]';

export async function fetchJSON<T>(url: string): Promise<Record<string, T>> {
  let json = {};

  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'webkid' } });
    json = await response.json();
  } catch (error) {
    console.error(error);
  }

  return json;
}
