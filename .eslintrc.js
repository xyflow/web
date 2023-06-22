module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `xy-eslint-config`
  extends: ['xy-eslint-config'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
