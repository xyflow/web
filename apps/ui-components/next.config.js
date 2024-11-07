module.exports = {
  async redirects() {
    return [
      {
        // Match all routes without file extention
        // that adhere to *-*-*.json pattern
        source: "/:slug(\\w+\\-*\\w*\\-*\\w*)",
        destination: "/registry/:slug.json",
        permanent: true,
      },
    ];
  },
};
