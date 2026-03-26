const EXAMPLES_IMAGE_CACHE_VERSION = 15;
const PRO_EXAMPLES_IMAGE_CACHE_VERSION = 14;

function withImageCacheVersion(url: string, version: number) {
  const separator = url.includes('?') ? '&' : '?';

  return `${url}${separator}v=${version}`;
}

export function withExamplesImageVersion(url: string) {
  return withImageCacheVersion(url, EXAMPLES_IMAGE_CACHE_VERSION);
}

export function withProExamplesImageVersion(url: string) {
  return withImageCacheVersion(url, PRO_EXAMPLES_IMAGE_CACHE_VERSION);
}
