export default {
  async redirects() {
    return [
      {
        // Match all routes without file extension
        // that adhere to *-*-*.json pattern
        source: "/:slug(\\w+\\-*\\w*\\-*\\w*)",
        destination: "/registry/:slug.json",
        permanent: true,
      },
    ];
  },
};
