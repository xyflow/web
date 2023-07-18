module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-xyflow`
  extends: ['xyflow'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
