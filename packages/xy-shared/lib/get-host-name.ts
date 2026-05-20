export function getHostName() {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : window.location.origin;
}
