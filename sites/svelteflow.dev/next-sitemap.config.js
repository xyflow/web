/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://svelteflow.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/error/*'],
};
